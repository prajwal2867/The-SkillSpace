import http from 'k6/http';
import { check, sleep } from 'k6';

const baseUrl = __ENV.BASE_URL || 'http://localhost:3000';
const targetRate = Number(__ENV.TARGET_RPS || 25);
const localTarget = /^https?:\/\/(localhost|127\.0\.0\.1|host\.docker\.internal)(:\d+)?(?:\/|$)/i.test(baseUrl);

if (!Number.isSafeInteger(targetRate) || targetRate < 1) {
  throw new Error('TARGET_RPS must be a positive integer.');
}
if (!localTarget && __ENV.ALLOW_REMOTE_TARGET !== 'true') {
  throw new Error('Load testing a remote target requires ALLOW_REMOTE_TARGET=true.');
}

export const options = {
  scenarios: {
    community_catalog: {
      executor: 'ramping-arrival-rate',
      startRate: 1,
      timeUnit: '1s',
      preAllocatedVUs: Math.min(targetRate, 20),
      maxVUs: Math.max(targetRate * 2, 50),
      stages: [
        { target: Math.max(1, Math.floor(targetRate / 5)), duration: '30s' },
        { target: targetRate, duration: '60s' },
        { target: targetRate, duration: '60s' }
      ],
      gracefulStop: '10s'
    }
  },
  thresholds: {
    http_req_failed: ['rate<0.01'],
    'http_req_duration{endpoint:catalog}': ['p(95)<500'],
    checks: ['rate>0.99']
  }
};

export default function () {
  const response = http.get(`${baseUrl}/api/v1/communities?limit=24`, {
    tags: { endpoint: 'catalog' }
  });
  let payload;
  try {
    payload = response.json();
  } catch {
    payload = null;
  }
  check(response, {
    'catalog returns HTTP 200': (result) => result.status === 200,
    'catalog response includes a community list': () => Array.isArray(payload?.communities),
    'catalog page is bounded': () => Array.isArray(payload?.communities) && payload.communities.length <= 24
  });
  sleep(0.01);
}
