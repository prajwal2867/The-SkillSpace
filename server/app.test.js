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

test('catalog pagination rejects malformed page sizes', async () => {
  const response = await fetch(`${origin}/api/v1/communities?limit=twenty`);
  assert.equal(response.status, 400);
  assert.equal((await response.json()).error.code, 'invalid_limit');
});
