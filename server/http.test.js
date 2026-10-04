import test from 'node:test';
import assert from 'node:assert/strict';
import { clearSessionCookie, HttpError, parseCookies, sessionCookie, validateOrigin } from './http.js';

test('cookie parsing handles encoded values and malformed segments', () => {
  assert.deepEqual(parseCookies('a=1; skillspace_session=abc%2B123; broken=%E0%A4%A'), {
    a: '1',
    skillspace_session: 'abc+123',
    broken: ''
  });
});

test('session cookies are HttpOnly and use SameSite=Lax', () => {
  const cookie = sessionCookie('token', 60);
  assert.match(cookie, /HttpOnly/);
  assert.match(cookie, /SameSite=Lax/);
  assert.match(cookie, /Max-Age=60/);
  assert.match(clearSessionCookie(), /Max-Age=0/);
});

test('mutations reject missing and untrusted origins', () => {
  assert.throws(() => validateOrigin({ headers: {} }), (error) => error instanceof HttpError && error.status === 403);
  assert.throws(
    () => validateOrigin({ headers: { origin: 'https://attacker.example' } }),
    (error) => error instanceof HttpError && error.code === 'invalid_origin'
  );
});
