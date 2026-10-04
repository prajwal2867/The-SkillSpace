import { createHash } from 'node:crypto';
import { HttpError } from './http.js';

const REDIS_INCREMENT_SCRIPT = `
local count = redis.call('INCR', KEYS[1])
if count == 1 then
  redis.call('PEXPIRE', KEYS[1], ARGV[1])
end
return { count, redis.call('PTTL', KEYS[1]) }
`;

function fingerprint(value) {
  return createHash('sha256').update(value).digest('hex');
}

export function createMemoryRateLimiter({ now = Date.now, maxBuckets = 50_000 } = {}) {
  const buckets = new Map();
  let lastSweep = 0;

  return {
    async consume(key, { limit, windowMs }) {
      const timestamp = now();
      if (timestamp - lastSweep > 60_000 || buckets.size >= maxBuckets) {
        for (const [bucketKey, bucket] of buckets) {
          if (bucket.resetAt <= timestamp) buckets.delete(bucketKey);
        }
        lastSweep = timestamp;
      }

      const bucketKey = fingerprint(key);
      let bucket = buckets.get(bucketKey);
      if (!bucket || bucket.resetAt <= timestamp) {
        if (!buckets.has(bucketKey) && buckets.size >= maxBuckets) {
          buckets.delete(buckets.keys().next().value);
        }
        bucket = { count: 0, resetAt: timestamp + windowMs };
      }
      bucket.count += 1;
      buckets.set(bucketKey, bucket);

      const remainingMs = Math.max(0, bucket.resetAt - timestamp);
      return {
        allowed: bucket.count <= limit,
        limit,
        remaining: Math.max(0, limit - bucket.count),
        resetSeconds: Math.max(1, Math.ceil(remainingMs / 1000))
      };
    }
  };
}

export function createRedisRateLimiter(client, { prefix = 'skillspace:rl:' } = {}) {
  return {
    async consume(key, { limit, windowMs }) {
      try {
        const [count, ttl] = await client.eval(REDIS_INCREMENT_SCRIPT, {
          keys: [`${prefix}${fingerprint(key)}`],
          arguments: [String(windowMs)]
        });
        const resetSeconds = Math.max(1, Math.ceil(Number(ttl) / 1000));
        return {
          allowed: Number(count) <= limit,
          limit,
          remaining: Math.max(0, limit - Number(count)),
          resetSeconds
        };
      } catch (error) {
        console.error('Redis rate limiter unavailable', error instanceof Error ? error.message : String(error));
        throw new HttpError(503, 'rate_limit_unavailable', 'Request protection is temporarily unavailable.', {
          'retry-after': '5'
        });
      }
    }
  };
}

export async function enforceRateLimit(limiter, key, policy) {
  const result = await limiter.consume(key, policy);
  const headers = {
    'ratelimit-limit': String(result.limit),
    'ratelimit-remaining': String(result.remaining),
    'ratelimit-reset': String(result.resetSeconds)
  };
  if (!result.allowed) {
    throw new HttpError(429, 'rate_limit_exceeded', 'Too many requests. Please try again later.', {
      ...headers,
      'retry-after': String(result.resetSeconds)
    });
  }
  return headers;
}
