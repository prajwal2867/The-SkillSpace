import test from 'node:test';
import assert from 'node:assert/strict';
import { createViewRouter } from '../src/app/router.js';

test('router resolves registered views', () => {
  const discover = () => 'discover';
  const profile = () => 'profile';
  const router = createViewRouter({ discover, profile });

  assert.equal(router.resolve('discover'), discover);
  assert.equal(router.resolve('profile'), profile);
});

test('router uses the configured fallback for unknown views', () => {
  const settings = () => 'settings';
  const router = createViewRouter({ settings });

  assert.equal(router.resolve('missing'), settings);
});

test('router rejects a missing fallback renderer', () => {
  const router = createViewRouter({ discover: () => 'discover' });

  assert.throws(() => router.resolve('missing'), /No view renderer registered/);
});
