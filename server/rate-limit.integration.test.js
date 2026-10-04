import test, { after, before } from 'node:test';
import assert from 'node:assert/strict';
import { createHash, randomUUID } from 'node:crypto';
import { createClient } from 'redis';
import { createRedisRateLimiter } from './rate-limit.js';

if (!process.env.REDIS_URL) {
  throw new Error('Redis integration tests require REDIS_URL to point to an isolated test Redis instance.');
}

const client = createClient({ url: process.env.REDIS_URL });
client.on('error', (error) => console.error('Test Redis error', error.message));
let firstLimiter;
let secondLimiter;
const key = `integration-${randomUUID()}`;
let keyHash;

before(async () => {
  await client.connect();
  keyHash = createHash('sha256').update(key).digest('hex');
  firstLimiter = createRedisRateLimiter(client, { prefix: 'skillspace:test:rl:' });
  secondLimiter = createRedisRateLimiter(client, { prefix: 'skillspace:test:rl:' });
});

after(async () => {
  if (keyHash) await client.del(`skillspace:test:rl:${keyHash}`);
  await client.quit();
});

test('separate API limiter instances share counters through Redis', async () => {
  const policy = { limit: 1, windowMs: 60_000 };
  assert.equal((await firstLimiter.consume(key, policy)).allowed, true);
  const blocked = await secondLimiter.consume(key, policy);
  assert.equal(blocked.allowed, false);
  assert.equal(blocked.remaining, 0);
});
