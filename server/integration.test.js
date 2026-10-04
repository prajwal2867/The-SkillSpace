import test, { after, before } from 'node:test';
import assert from 'node:assert/strict';
import { randomUUID } from 'node:crypto';
import { createApiServer } from './app.js';
import { pool } from './db.js';

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl || !/_test$/.test(new URL(databaseUrl).pathname)) {
  throw new Error('Integration tests require DATABASE_URL to point to a database whose name ends with "_test".');
}

const server = createApiServer();
const communityId = `test-${randomUUID()}`;
const email = `integration-${randomUUID()}@example.test`;
let origin;
let userId;
let sessionCookie;
let communityCreated = false;
let serverStarted = false;

before(async () => {
  await pool.query(
    `INSERT INTO communities (id, slug, category, price_type, access_type, details)
     VALUES ($1, $1, 'Integration', 'Free', 'Public', $2::jsonb)`,
    [communityId, JSON.stringify({ title: 'Integration Test Community', description: 'Test data.' })]
  );
  communityCreated = true;
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  serverStarted = true;
  origin = `http://127.0.0.1:${server.address().port}`;
});

after(async () => {
  if (serverStarted) {
    server.closeIdleConnections();
    await new Promise((resolve, reject) => server.close((error) => error ? reject(error) : resolve()));
  }
  if (communityCreated) {
    if (userId) await pool.query('DELETE FROM posts WHERE user_id = $1', [userId]);
    await pool.query('DELETE FROM communities WHERE id = $1', [communityId]);
    if (userId) await pool.query('DELETE FROM users WHERE id = $1', [userId]);
  }
  await pool.end();
});

async function jsonRequest(path, { method = 'GET', body, cookie } = {}) {
  const headers = { origin: 'http://localhost:5173' };
  if (body !== undefined) headers['content-type'] = 'application/json';
  if (cookie) headers.cookie = cookie;
  const response = await fetch(`${origin}${path}`, {
    method,
    headers,
    ...(body !== undefined ? { body: JSON.stringify(body) } : {})
  });
  return { response, payload: await response.json() };
}

test('registration, session, free membership, and member-only feed work end to end', async () => {
  const registration = await jsonRequest('/api/v1/auth/register', {
    method: 'POST',
    body: { email, password: 'integration password phrase', name: 'Integration User' }
  });
  assert.equal(registration.response.status, 201);
  assert.equal(registration.payload.user.email, email);
  assert.equal('password_hash' in registration.payload.user, false);
  userId = registration.payload.user.id;
  sessionCookie = registration.response.headers.get('set-cookie').split(';', 1)[0];

  const session = await jsonRequest('/api/v1/me', { cookie: sessionCookie });
  assert.equal(session.response.status, 200);
  assert.equal(session.payload.user.id, userId);

  const rejectedFeed = await jsonRequest(`/api/v1/communities/${communityId}/posts`, { cookie: sessionCookie });
  assert.equal(rejectedFeed.response.status, 403);
  assert.equal(rejectedFeed.payload.error.code, 'membership_required');

  const joined = await jsonRequest(`/api/v1/communities/${communityId}/membership`, {
    method: 'POST',
    body: {},
    cookie: sessionCookie
  });
  assert.equal(joined.response.status, 200);
  assert.equal(joined.payload.joined, true);

  const posted = await jsonRequest(`/api/v1/communities/${communityId}/posts`, {
    method: 'POST',
    body: { content: 'This post is persisted by PostgreSQL.' },
    cookie: sessionCookie
  });
  assert.equal(posted.response.status, 201);
  assert.equal(posted.payload.post.author_id, userId);

  const feed = await jsonRequest(`/api/v1/communities/${communityId}/posts`, { cookie: sessionCookie });
  assert.equal(feed.response.status, 200);
  assert.equal(feed.payload.posts.length, 1);
  assert.equal(feed.payload.posts[0].content, 'This post is persisted by PostgreSQL.');

  const membership = await jsonRequest('/api/v1/me/memberships', { cookie: sessionCookie });
  assert.equal(membership.payload.memberships.some((item) => item.communityId === communityId), true);

  const loggedOut = await jsonRequest('/api/v1/auth/logout', {
    method: 'POST',
    body: {},
    cookie: sessionCookie
  });
  assert.equal(loggedOut.response.status, 200);
  const expiredSession = await jsonRequest('/api/v1/me', { cookie: sessionCookie });
  assert.equal(expiredSession.payload.user, null);
});
