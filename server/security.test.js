import test from 'node:test';
import assert from 'node:assert/strict';
import { hashPassword, hashSessionToken, verifyPassword } from './security.js';

test('password hashes are salted, encoded with scrypt, and verifiable', async () => {
  const firstHash = await hashPassword('a long test password');
  const secondHash = await hashPassword('a long test password');

  assert.match(firstHash, /^scrypt\$32768\$8\$1\$/);
  assert.notEqual(firstHash, secondHash);
  assert.equal(await verifyPassword('a long test password', firstHash), true);
  assert.equal(await verifyPassword('wrong password', firstHash), false);
});

test('invalid password hash encodings fail closed', async () => {
  assert.equal(await verifyPassword('anything', 'not-a-password-hash'), false);
});

test('session tokens are stored as one-way hashes', () => {
  assert.equal(hashSessionToken('session-token').length, 64);
  assert.notEqual(hashSessionToken('session-token'), 'session-token');
});
