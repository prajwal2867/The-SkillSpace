import test from 'node:test';
import assert from 'node:assert/strict';
import { createMemoryRateLimiter, createRedisRateLimiter, enforceRateLimit } from './rate-limit.js';
import { HttpError } from './http.js';

test('memory limiter enforces fixed windows and resets after expiry', async () => {
  let time = 1_000;
  const limiter = createMemoryRateLimiter({ now: () => time });
  const policy = { limit: 2, windowMs: 1_000 };

  assert.equal((await limiter.consume('client-a', policy)).allowed, true);
  assert.equal((await limiter.consume('client-a', policy)).remaining, 0);
  assert.equal((await limiter.consume('client-a', policy)).allowed, false);
  assert.equal((await limiter.consume('client-b', policy)).allowed, true);
  time += 1_001;
  assert.equal((await limiter.consume('client-a', policy)).allowed, true);
});

test('rate limit enforcement returns standard headers and retry information', async () => {
  const limiter = createMemoryRateLimiter();
  const policy = { limit: 1, windowMs: 60_000 };
  await enforceRateLimit(limiter, 'client-a', policy);

  await assert.rejects(
    enforceRateLimit(limiter, 'client-a', policy),
    (error) => error instanceof HttpError
      && error.status === 429
      && error.headers['retry-after'] !== undefined
  );
});

test('Redis limiter fails closed when the shared store is unavailable', async () => {
  const limiter = createRedisRateLimiter({
    eval: async () => { throw new Error('redis unavailable'); }
  });
  await assert.rejects(
    limiter.consume('client-a', { limit: 2, windowMs: 60_000 }),
    (error) => error instanceof HttpError && error.status === 503 && error.code === 'rate_limit_unavailable'
  );
});
