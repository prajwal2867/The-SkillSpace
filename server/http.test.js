import test from 'node:test';
import assert from 'node:assert/strict';
import { clearSessionCookie, clientAddress, HttpError, parseCookies, sessionCookie, validateOrigin } from './http.js';

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

test('client address uses the socket peer unless proxy hops are explicitly trusted', () => {
  const request = {
    headers: { 'x-forwarded-for': '198.51.100.10, 192.0.2.20' },
    socket: { remoteAddress: '10.0.0.5' }
  };
  assert.equal(clientAddress(request), '10.0.0.5');
  assert.equal(clientAddress(request, 1), '192.0.2.20');
  assert.equal(clientAddress(request, 2), '198.51.100.10');
});

test('trusted proxy address chains must contain enough valid IP hops', () => {
  const request = {
    headers: { 'x-forwarded-for': '198.51.100.10, not-an-ip' },
    socket: { remoteAddress: '10.0.0.5' }
  };
  assert.throws(
    () => clientAddress(request, 1),
    (error) => error instanceof HttpError && error.code === 'invalid_forwarded_for'
  );
  assert.throws(
    () => clientAddress({ ...request, headers: { 'x-forwarded-for': '198.51.100.10' } }, 2),
    (error) => error instanceof HttpError && error.code === 'invalid_forwarded_for'
  );
});
