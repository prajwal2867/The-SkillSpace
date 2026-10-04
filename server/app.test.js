import test, { after, before } from 'node:test';
import assert from 'node:assert/strict';
import { createApiServer } from './app.js';

const server = createApiServer();
let origin;

before(async () => {
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  origin = `http://127.0.0.1:${server.address().port}`;
});

after(async () => {
  server.closeIdleConnections();
  await new Promise((resolve, reject) => server.close((error) => error ? reject(error) : resolve()));
});

test('unknown API routes use a stable JSON error shape', async () => {
  const response = await fetch(`${origin}/api/v1/no-such-route`);
  assert.equal(response.status, 404);
  assert.deepEqual(await response.json(), {
    error: { code: 'not_found', message: 'Route was not found.' }
  });
});

test('authentication mutations enforce origin checks before database access', async () => {
  const response = await fetch(`${origin}/api/v1/auth/register`, {
    method: 'POST',
    headers: { 'content-type': 'application/json', origin: 'https://untrusted.example' },
    body: JSON.stringify({ email: 'person@example.com', password: 'correct horse battery staple', name: 'Example Person' })
  });
  assert.equal(response.status, 403);
  assert.equal((await response.json()).error.code, 'invalid_origin');
});

test('registration validates input before accessing the database', async () => {
  const response = await fetch(`${origin}/api/v1/auth/register`, {
    method: 'POST',
    headers: { 'content-type': 'application/json', origin: 'http://localhost:5173' },
    body: JSON.stringify({ email: 'invalid', password: 'short', name: 'A' })
  });
  assert.equal(response.status, 400);
  assert.equal((await response.json()).error.code, 'invalid_email');
});

test('community creation and settings mutations require an authenticated owner', async () => {
  const headers = {
    'content-type': 'application/json',
    origin: 'http://localhost:5173'
  };
  const create = await fetch(`${origin}/api/v1/communities`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ title: 'Example Community' })
  });
  assert.equal(create.status, 401);
  assert.equal((await create.json()).error.code, 'authentication_required');

  const update = await fetch(`${origin}/api/v1/communities/community-id`, {
    method: 'PATCH',
    headers,
    body: JSON.stringify({
      title: 'Example Community',
      description: '',
      accessType: 'Private',
      accent: '#123456',
      initials: 'EC'
    })
  });
  assert.equal(update.status, 401);
  assert.equal((await update.json()).error.code, 'authentication_required');
});

test('catalog pagination rejects malformed page sizes', async () => {
  const response = await fetch(`${origin}/api/v1/communities?limit=twenty`);
  assert.equal(response.status, 400);
  assert.equal((await response.json()).error.code, 'invalid_limit');
});

test('sensitive routes return 429 and retry headers after their configured limit', async () => {
  const limitedServer = createApiServer({
    rateLimits: { authRegister: { limit: 1, windowMs: 60_000 } }
  });
  await new Promise((resolve) => limitedServer.listen(0, '127.0.0.1', resolve));
  const limitedOrigin = `http://127.0.0.1:${limitedServer.address().port}`;
  const request = () => fetch(`${limitedOrigin}/api/v1/auth/register`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      origin: 'http://localhost:5173'
    },
    body: JSON.stringify({ email: 'invalid', password: 'short', name: 'A' })
  });

  try {
    assert.equal((await request()).status, 400);
    const blocked = await request();
    assert.equal(blocked.status, 429);
    assert.equal(blocked.headers.get('ratelimit-limit'), '1');
    assert.ok(Number(blocked.headers.get('retry-after')) > 0);
    assert.equal((await blocked.json()).error.code, 'rate_limit_exceeded');
  } finally {
    limitedServer.closeIdleConnections();
    await new Promise((resolve, reject) => limitedServer.close((error) => error ? reject(error) : resolve()));
  }
});

test('trusted proxy hops determine the identity used by rate limits', async () => {
  const keys = [];
  const proxyServer = createApiServer({
    trustedProxyHops: 1,
    rateLimiter: {
      async consume(key) {
        keys.push(key);
        return { allowed: true, limit: 5, remaining: 4, resetSeconds: 60 };
      }
    }
  });
  await new Promise((resolve) => proxyServer.listen(0, '127.0.0.1', resolve));
  const proxyOrigin = `http://127.0.0.1:${proxyServer.address().port}`;

  try {
    const response = await fetch(`${proxyOrigin}/api/v1/auth/register`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        origin: 'http://localhost:5173',
        'x-forwarded-for': '198.51.100.10'
      },
      body: JSON.stringify({ email: 'invalid', password: 'short', name: 'A' })
    });
    assert.equal(response.status, 400);
    assert.equal(keys[0], 'authRegister:198.51.100.10');
  } finally {
    proxyServer.closeIdleConnections();
    await new Promise((resolve, reject) => proxyServer.close((error) => error ? reject(error) : resolve()));
  }
});
