import { createApiServer } from './app.js';
import { pool } from './db.js';
import { createClient } from 'redis';
import { createMemoryRateLimiter, createRedisRateLimiter } from './rate-limit.js';

const port = Number(process.env.API_PORT || 3000);
let redisClient;
let rateLimiter = createMemoryRateLimiter();

if (process.env.REDIS_URL) {
  redisClient = createClient({ url: process.env.REDIS_URL });
  redisClient.on('error', (error) => console.error('Redis connection error', error.message));
  await redisClient.connect();
  rateLimiter = createRedisRateLimiter(redisClient);
} else if (process.env.NODE_ENV === 'production') {
  throw new Error('REDIS_URL is required in production for shared request rate limiting.');
} else {
  console.warn('REDIS_URL is unset; using per-process rate limiting for local development only.');
}

const server = createApiServer({ rateLimiter });

server.listen(port, () => {
  console.info(`SkillSpace API listening on port ${port}`);
});

async function shutdown(signal) {
  console.info(`Received ${signal}; shutting down API`);
  server.close(async (error) => {
    await pool.end();
    if (redisClient?.isOpen) await redisClient.quit();
    if (error) {
      console.error('API shutdown failed', error);
      process.exitCode = 1;
    }
  });
}

process.once('SIGINT', () => shutdown('SIGINT'));
process.once('SIGTERM', () => shutdown('SIGTERM'));
