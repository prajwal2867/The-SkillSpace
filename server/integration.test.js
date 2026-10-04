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
let ownedCommunityId;
let ownerUserId;
let otherUserId;
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
    if (ownedCommunityId) await pool.query('DELETE FROM communities WHERE id = $1', [ownedCommunityId]);
    if (userId) await pool.query('DELETE FROM users WHERE id = $1', [userId]);
    if (ownerUserId) await pool.query('DELETE FROM users WHERE id = $1', [ownerUserId]);
    if (otherUserId) await pool.query('DELETE FROM users WHERE id = $1', [otherUserId]);
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

test('community creation and general settings persist and are owner-only', async () => {
  const registration = await jsonRequest('/api/v1/auth/register', {
    method: 'POST',
    body: { email: `owner-${email}`, password: 'integration password phrase', name: 'Community Owner' }
  });
  assert.equal(registration.response.status, 201);
  ownerUserId = registration.payload.user.id;
  const ownerCookie = registration.response.headers.get('set-cookie').split(';', 1)[0];

  const created = await jsonRequest('/api/v1/communities', {
    method: 'POST',
    body: { title: 'Persistent Community' },
    cookie: ownerCookie
  });
  assert.equal(created.response.status, 201);
  assert.equal(created.payload.community.title, 'Persistent Community');
  assert.equal(created.payload.community.accessType, 'Private');
  ownedCommunityId = created.payload.community.id;

  const otherRegistration = await jsonRequest('/api/v1/auth/register', {
    method: 'POST',
    body: { email: `other-${email}`, password: 'integration password phrase', name: 'Other User' }
  });
  assert.equal(otherRegistration.response.status, 201);
  otherUserId = otherRegistration.payload.user.id;
  const otherCookie = otherRegistration.response.headers.get('set-cookie').split(';', 1)[0];
  const privateFeed = await jsonRequest(`/api/v1/communities/${ownedCommunityId}/posts`, { cookie: otherCookie });
  assert.equal(privateFeed.response.status, 403);
  assert.equal(privateFeed.payload.error.code, 'membership_required');
  const privateJoin = await jsonRequest(`/api/v1/communities/${ownedCommunityId}/membership`, {
    method: 'POST',
    body: {},
    cookie: otherCookie
  });
  assert.equal(privateJoin.response.status, 403);
  assert.equal(privateJoin.payload.error.code, 'membership_unavailable');
  const forbidden = await jsonRequest(`/api/v1/communities/${ownedCommunityId}`, {
    method: 'PATCH',
    body: {
      title: 'Changed Name',
      description: 'Updated description',
      accessType: 'Public',
      accent: '#123456',
      initials: 'CN'
    },
    cookie: otherCookie
  });
  assert.equal(forbidden.response.status, 403);

  const updated = await jsonRequest(`/api/v1/communities/${ownedCommunityId}`, {
    method: 'PATCH',
    body: {
      title: 'Changed Name',
      description: 'Updated description',
      accessType: 'Public',
      accent: '#123456',
      initials: 'CN'
    },
    cookie: ownerCookie
  });
  assert.equal(updated.response.status, 200);
  assert.equal(updated.payload.community.title, 'Changed Name');
  assert.equal(updated.payload.community.description, 'Updated description');
  assert.equal(updated.payload.community.accessType, 'Public');
  assert.equal(updated.payload.community.accent, '#123456');
  assert.equal(updated.payload.community.initials, 'CN');

  const publicCatalog = await jsonRequest('/api/v1/communities', { cookie: otherCookie });
  assert.equal(publicCatalog.payload.communities.some((item) => item.id === ownedCommunityId), true);
  const joined = await jsonRequest(`/api/v1/communities/${ownedCommunityId}/membership`, {
    method: 'POST',
    body: {},
    cookie: otherCookie
  });
  assert.equal(joined.response.status, 200);
  const memberFeed = await jsonRequest(`/api/v1/communities/${ownedCommunityId}/posts`, { cookie: otherCookie });
  assert.equal(memberFeed.response.status, 200);

  const catalog = await jsonRequest('/api/v1/communities', { cookie: ownerCookie });
  assert.equal(catalog.payload.communities.some((item) => item.id === ownedCommunityId), true);
  const ownerLeave = await jsonRequest(`/api/v1/communities/${ownedCommunityId}/membership`, {
    method: 'DELETE',
    body: {},
    cookie: ownerCookie
  });
  assert.equal(ownerLeave.response.status, 403);
  assert.equal(ownerLeave.payload.error.code, 'owner_membership_required');
  const membership = await jsonRequest('/api/v1/me/memberships', { cookie: ownerCookie });
  assert.equal(membership.payload.memberships.some((item) => item.communityId === ownedCommunityId), true);
});
