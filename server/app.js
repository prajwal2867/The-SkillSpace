import { createServer } from 'node:http';
import { randomBytes } from 'node:crypto';
import { inTransaction, pool } from './db.js';
import { clearSessionCookie, HttpError, parseCookies, readJson, sendJson, sessionCookie, validateOrigin } from './http.js';
import { createMemoryRateLimiter, enforceRateLimit } from './rate-limit.js';
import { hashPassword, hashSessionToken, verifyPassword } from './security.js';

const SESSION_SECONDS = 7 * 24 * 60 * 60;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function pageLimit(value, fallback, maximum) {
  if (value === null) return fallback;
  if (!/^\d+$/.test(value)) throw new HttpError(400, 'invalid_limit', 'Page size must be a whole number.');
  return Math.min(Math.max(Number(value), 1), maximum);
}

function positiveInteger(value, fallback) {
  if (value === undefined) return fallback;
  const parsed = Number(value);
  if (!Number.isSafeInteger(parsed) || parsed < 1) throw new Error('Rate limit configuration must be a positive integer.');
  return parsed;
}

function rateLimitPolicies(env = process.env) {
  return {
    authLogin: { limit: positiveInteger(env.RATE_LIMIT_AUTH_LOGIN_MAX, 10), windowMs: 15 * 60_000 },
    authRegister: { limit: positiveInteger(env.RATE_LIMIT_AUTH_REGISTER_MAX, 5), windowMs: 60 * 60_000 },
    catalog: { limit: positiveInteger(env.RATE_LIMIT_CATALOG_MAX, 300), windowMs: 60_000 },
    account: { limit: positiveInteger(env.RATE_LIMIT_ACCOUNT_MAX, 120), windowMs: 60_000 },
    membership: { limit: positiveInteger(env.RATE_LIMIT_MEMBERSHIP_MAX, 30), windowMs: 60_000 },
    feedRead: { limit: positiveInteger(env.RATE_LIMIT_FEED_READ_MAX, 120), windowMs: 60_000 },
    feedWrite: { limit: positiveInteger(env.RATE_LIMIT_FEED_WRITE_MAX, 20), windowMs: 60_000 }
  };
}

function rateLimitGroup(method, pathname) {
  if (pathname === '/api/v1/auth/login' && method === 'POST') return 'authLogin';
  if (pathname === '/api/v1/auth/register' && method === 'POST') return 'authRegister';
  if (pathname === '/api/v1/auth/logout' && method === 'POST') return 'account';
  if (pathname === '/api/v1/communities' && method === 'GET') return 'catalog';
  if (pathname === '/api/v1/me' && method === 'GET') return 'account';
  if (pathname === '/api/v1/me/memberships' && method === 'GET') return 'account';
  if (/^\/api\/v1\/communities\/[^/]+\/membership$/.test(pathname) && ['POST', 'DELETE'].includes(method)) return 'membership';
  if (/^\/api\/v1\/communities\/[^/]+\/posts$/.test(pathname)) {
    if (method === 'GET') return 'feedRead';
    if (method === 'POST') return 'feedWrite';
  }
  return null;
}

function normalizeEmail(email) {
  return email.trim().toLowerCase();
}

function publicUser(row) {
  return { id: row.id, email: row.email, name: row.display_name, createdAt: row.created_at };
}

function validateUserInput(body, registering) {
  const email = typeof body.email === 'string' ? normalizeEmail(body.email) : '';
  const password = typeof body.password === 'string' ? body.password : '';
  const name = typeof body.name === 'string' ? body.name.trim() : '';
  if (!EMAIL_PATTERN.test(email) || email.length > 254) {
    throw new HttpError(400, 'invalid_email', 'Enter a valid email address.');
  }
  if (password.length < 12 || password.length > 256) {
    throw new HttpError(400, 'invalid_password', 'Password must be between 12 and 256 characters.');
  }
  if (registering && (name.length < 2 || name.length > 100)) {
    throw new HttpError(400, 'invalid_name', 'Name must be between 2 and 100 characters.');
  }
  return { email, password, name };
}

async function createSession(userId) {
  const token = randomBytes(32).toString('base64url');
  const tokenHash = hashSessionToken(token);
  await pool.query(
    `INSERT INTO user_sessions (user_id, token_hash, expires_at)
     VALUES ($1, $2, now() + ($3 * interval '1 second'))`,
    [userId, tokenHash, SESSION_SECONDS]
  );
  return token;
}

async function currentUser(request) {
  const token = parseCookies(request.headers.cookie).skillspace_session;
  if (!token || token.length > 128) return null;
  const result = await pool.query(
    `SELECT u.id, u.email, u.display_name, u.created_at
       FROM user_sessions s
       JOIN users u ON u.id = s.user_id
      WHERE s.token_hash = $1 AND s.expires_at > now()`,
    [hashSessionToken(token)]
  );
  return result.rows[0] || null;
}

async function requireUser(request) {
  const user = await currentUser(request);
  if (!user) throw new HttpError(401, 'authentication_required', 'Sign in to continue.');
  return user;
}

function communityIdFromPath(pathname, segment) {
  const match = pathname.match(new RegExp(`^/api/v1/communities/([^/]+)/${segment}$`));
  if (!match) return null;
  try {
    return decodeURIComponent(match[1]);
  } catch {
    throw new HttpError(400, 'invalid_community_id', 'Community ID is invalid.');
  }
}

async function handle(request, response, rateLimiter, policies) {
  const url = new URL(request.url, 'http://localhost');
  const { pathname, searchParams } = url;
  const method = request.method || 'GET';

  const group = rateLimitGroup(method, pathname);
  if (group) {
    const address = request.socket.remoteAddress || 'unknown';
    const headers = await enforceRateLimit(
      rateLimiter,
      `${group}:${address}`,
      policies[group]
    );
    for (const [name, value] of Object.entries(headers)) response.setHeader(name, value);
  }

  if (method === 'GET' && pathname === '/api/health') {
    await pool.query('SELECT 1');
    return sendJson(response, 200, { status: 'ok' });
  }

  if (method === 'GET' && pathname === '/api/v1/me') {
    const user = await currentUser(request);
    return sendJson(response, 200, { user: user ? publicUser(user) : null });
  }

  if (method === 'GET' && pathname === '/api/v1/me/memberships') {
    const user = await requireUser(request);
    const result = await pool.query(
      `SELECT community_id AS "communityId"
         FROM community_memberships
        WHERE user_id = $1
        ORDER BY created_at DESC`,
      [user.id]
    );
    return sendJson(response, 200, { memberships: result.rows });
  }

  if (method === 'POST' && (pathname === '/api/v1/auth/register' || pathname === '/api/v1/auth/login')) {
    validateOrigin(request);
    const registering = pathname.endsWith('/register');
    const { email, password, name } = validateUserInput(await readJson(request), registering);

    if (registering) {
      const passwordHash = await hashPassword(password);
      const result = await inTransaction(async (client) => {
        const inserted = await client.query(
          `INSERT INTO users (email, password_hash, display_name)
           VALUES ($1, $2, $3)
           ON CONFLICT ((lower(email))) DO NOTHING
           RETURNING id, email, display_name, created_at`,
          [email, passwordHash, name]
        );
        if (!inserted.rowCount) throw new HttpError(409, 'email_unavailable', 'An account with this email already exists.');
        const token = randomBytes(32).toString('base64url');
        await client.query(
          `INSERT INTO user_sessions (user_id, token_hash, expires_at)
           VALUES ($1, $2, now() + ($3 * interval '1 second'))`,
          [inserted.rows[0].id, hashSessionToken(token), SESSION_SECONDS]
        );
        return { user: inserted.rows[0], token };
      });
      return sendJson(response, 201, { user: publicUser(result.user) }, {
        'set-cookie': sessionCookie(result.token, SESSION_SECONDS)
      });
    }

    const result = await pool.query(
      `SELECT id, email, display_name, created_at, password_hash
         FROM users
        WHERE lower(email) = $1`,
      [email]
    );
    const user = result.rows[0];
    if (!user || !(await verifyPassword(password, user.password_hash))) {
      throw new HttpError(401, 'invalid_credentials', 'Email or password is incorrect.');
    }
    const token = await createSession(user.id);
    return sendJson(response, 200, { user: publicUser(user) }, {
      'set-cookie': sessionCookie(token, SESSION_SECONDS)
    });
  }

  if (method === 'POST' && pathname === '/api/v1/auth/logout') {
    validateOrigin(request);
    const token = parseCookies(request.headers.cookie).skillspace_session;
    if (token) await pool.query('DELETE FROM user_sessions WHERE token_hash = $1', [hashSessionToken(token)]);
    return sendJson(response, 200, { ok: true }, { 'set-cookie': clearSessionCookie() });
  }

  if (method === 'GET' && pathname === '/api/v1/communities') {
    const limit = pageLimit(searchParams.get('limit'), 24, 100);
    const cursor = searchParams.get('cursor');
    const search = searchParams.get('q')?.trim() || '';
    if (search.length > 100) throw new HttpError(400, 'invalid_search', 'Search text cannot exceed 100 characters.');
    const category = searchParams.get('category');
    const priceType = searchParams.get('priceType');
    const accessType = searchParams.get('accessType');
    const result = await pool.query(
      `SELECT id, details, member_count
         FROM communities
        WHERE ($1 = '' OR to_tsvector('simple', coalesce(details->>'title', '') || ' ' || coalesce(details->>'description', '')) @@ websearch_to_tsquery('simple', $1))
          AND ($2::text IS NULL OR category = $2)
          AND ($3::text IS NULL OR price_type = $3)
          AND ($4::text IS NULL OR access_type = $4)
          AND ($5::text IS NULL OR id > $5)
        ORDER BY id
        LIMIT $6`,
      [search, category || null, priceType || null, accessType || null, cursor, limit + 1]
    );
    const hasMore = result.rows.length > limit;
    const rows = result.rows.slice(0, limit).map(({ id, details, member_count }) => ({
      ...details,
      id,
      members: Number(member_count),
      onlineCount: 0
    }));
    return sendJson(response, 200, {
      communities: rows,
      nextCursor: hasMore ? rows.at(-1).id : null
    });
  }

  const joinCommunityId = communityIdFromPath(pathname, 'membership');
  if (joinCommunityId && (method === 'POST' || method === 'DELETE')) {
    validateOrigin(request);
    const user = await requireUser(request);
    const community = await pool.query(
      `SELECT id, access_type, price_type FROM communities WHERE id = $1`,
      [joinCommunityId]
    );
    if (!community.rowCount) throw new HttpError(404, 'community_not_found', 'Community was not found.');
    if (method === 'POST' && (community.rows[0].access_type !== 'Public' || community.rows[0].price_type !== 'Free')) {
      throw new HttpError(403, 'membership_unavailable', 'This community requires approval or payment.');
    }

    if (method === 'POST') {
      await inTransaction(async (client) => {
        const inserted = await client.query(
          `INSERT INTO community_memberships (user_id, community_id)
           VALUES ($1, $2)
           ON CONFLICT (user_id, community_id) DO NOTHING`,
          [user.id, joinCommunityId]
        );
        if (inserted.rowCount) {
          await client.query('UPDATE communities SET member_count = member_count + 1 WHERE id = $1', [joinCommunityId]);
        }
      });
      return sendJson(response, 200, { joined: true });
    }

    await inTransaction(async (client) => {
      const deleted = await client.query(
        `DELETE FROM community_memberships WHERE user_id = $1 AND community_id = $2`,
        [user.id, joinCommunityId]
      );
      if (deleted.rowCount) {
        await client.query('UPDATE communities SET member_count = GREATEST(member_count - 1, 0) WHERE id = $1', [joinCommunityId]);
      }
    });
    return sendJson(response, 200, { joined: false });
  }

  const postsCommunityId = communityIdFromPath(pathname, 'posts');
  if (postsCommunityId && (method === 'GET' || method === 'POST')) {
    if (method === 'POST') validateOrigin(request);
    const body = method === 'POST' ? await readJson(request) : null;
    const content = typeof body?.content === 'string' ? body.content.trim() : '';
    if (method === 'POST' && (!content || content.length > 5_000)) {
      throw new HttpError(400, 'invalid_post', 'Post text must be between 1 and 5000 characters.');
    }
    const user = await requireUser(request);
    const membership = await pool.query(
      `SELECT 1 FROM community_memberships WHERE user_id = $1 AND community_id = $2`,
      [user.id, postsCommunityId]
    );
    if (!membership.rowCount) throw new HttpError(403, 'membership_required', 'Join this community to access its feed.');

    if (method === 'GET') {
      const limit = pageLimit(searchParams.get('limit'), 20, 50);
      const result = await pool.query(
        `SELECT p.id, p.content, p.created_at, u.id AS author_id, u.display_name AS author_name
           FROM posts p
           JOIN users u ON u.id = p.user_id
          WHERE p.community_id = $1
          ORDER BY p.created_at DESC, p.id DESC
          LIMIT $2`,
        [postsCommunityId, limit]
      );
      return sendJson(response, 200, { posts: result.rows });
    }

    const result = await inTransaction(async (client) => {
      const lock = await client.query(
        `SELECT 1 FROM community_memberships
          WHERE user_id = $1 AND community_id = $2
          FOR KEY SHARE`,
        [user.id, postsCommunityId]
      );
      if (!lock.rowCount) throw new HttpError(403, 'membership_required', 'Join this community to access its feed.');
      return client.query(
        `INSERT INTO posts (community_id, user_id, content)
         VALUES ($1, $2, $3)
         RETURNING id, content, created_at`,
        [postsCommunityId, user.id, content]
      );
    });
    return sendJson(response, 201, {
      post: { ...result.rows[0], author_id: user.id, author_name: user.display_name }
    });
  }

  throw new HttpError(404, 'not_found', 'Route was not found.');
}

export function createApiServer({ rateLimiter = createMemoryRateLimiter(), rateLimits = rateLimitPolicies() } = {}) {
  return createServer(async (request, response) => {
    try {
      await handle(request, response, rateLimiter, rateLimits);
    } catch (error) {
      if (response.headersSent) {
        response.destroy(error);
        return;
      }
      if (error instanceof HttpError) {
        sendJson(response, error.status, { error: { code: error.code, message: error.message } }, error.headers);
        return;
      }
      console.error('API request failed', {
        method: request.method,
        path: request.url,
        error: error instanceof Error ? error.message : String(error)
      });
      sendJson(response, 500, { error: { code: 'internal_error', message: 'An unexpected server error occurred.' } });
    }
  });
}
