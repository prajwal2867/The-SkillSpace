import test from 'node:test';
import assert from 'node:assert/strict';
import { validateAuthInput, isCheckoutReady } from '../src/domain/validation.js';

test('login accepts a valid email and password', () => {
  assert.equal(validateAuthInput({ email: '  USER@example.com ', password: 'password123' }, 'login'), null);
});

test('auth rejects missing required fields', () => {
  assert.equal(validateAuthInput({ email: '', password: '' }, 'login'), 'All fields are required.');
});

test('auth rejects malformed email addresses', () => {
  assert.equal(validateAuthInput({ email: 'not-an-email', password: 'password123' }, 'login'), 'Please enter a valid email address.');
});

test('auth rejects passwords shorter than eight characters', () => {
  assert.equal(validateAuthInput({ email: 'user@example.com', password: 'short' }, 'login'), 'Password must be at least 8 characters.');
});

test('registration requires names and matching passwords', () => {
  assert.equal(validateAuthInput({ email: 'user@example.com', password: 'password123', firstName: 'Ada', lastName: 'Lovelace' }, 'register'), 'All fields are required.');
  assert.equal(validateAuthInput({ email: 'user@example.com', password: 'password123', confirmPassword: 'different', firstName: 'Ada', lastName: 'Lovelace' }, 'register'), 'Passwords do not match.');
});

test('registration accepts complete valid details', () => {
  assert.equal(validateAuthInput({ email: 'user@example.com', password: 'password123', confirmPassword: 'password123', firstName: 'Ada', lastName: 'Lovelace' }, 'register'), null);
});

test('checkout requires a name and correctly shaped card fields', () => {
  assert.equal(isCheckoutReady({ communityName: 'My group', cardNumber: '1234567890123456', expiryMonth: '12', expiryYear: '27', cvc: '123' }), true);
  assert.equal(isCheckoutReady({ communityName: 'My group', cardNumber: '1234x', expiryMonth: '12', expiryYear: '27', cvc: '123' }), false);
  assert.equal(isCheckoutReady({ communityName: 'My group', cardNumber: '1234567890123456', expiryMonth: '13', expiryYear: '27', cvc: '123' }), false);
  assert.equal(isCheckoutReady({ communityName: '  ', cardNumber: '1234567890123456', expiryMonth: '12', expiryYear: '27', cvc: '123' }), false);
});
