'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');

const {
  DEFAULT_PASSWORD,
  getPassword,
  isPasswordCorrect,
} = require('../src/password-gate.js');

test('DEFAULT_PASSWORD is the string "parent"', () => {
  assert.equal(DEFAULT_PASSWORD, 'parent');
});

test('getPassword({}) returns parent', () => {
  assert.equal(getPassword({}), 'parent');
});

test('getPassword({ password: "xyz" }) returns xyz', () => {
  assert.equal(getPassword({ password: 'xyz' }), 'xyz');
});

test('getPassword ignores non-string or empty passwords', () => {
  assert.equal(getPassword({ password: '' }), 'parent');
  assert.equal(getPassword({ password: 42 }), 'parent');
  assert.equal(getPassword({ password: null }), 'parent');
  assert.equal(getPassword(undefined), 'parent');
});

test('correct password is accepted with default config', () => {
  assert.equal(isPasswordCorrect('parent', {}), true);
});

test('wrong string is rejected', () => {
  assert.equal(isPasswordCorrect('wrong', {}), false);
});

test('undefined, null and empty inputs are rejected', () => {
  assert.equal(isPasswordCorrect(undefined, {}), false);
  assert.equal(isPasswordCorrect(null, {}), false);
  assert.equal(isPasswordCorrect('', {}), false);
});

test('configured password is accepted and the default is rejected', () => {
  assert.equal(isPasswordCorrect('xyz', { password: 'xyz' }), true);
  assert.equal(isPasswordCorrect('parent', { password: 'xyz' }), false);
});

test('comparison is case-sensitive', () => {
  assert.equal(isPasswordCorrect('Parent', {}), false);
});

test('repeated calls with the same config return the same result', () => {
  const config = { password: 'xyz' };
  const first = isPasswordCorrect('xyz', config);
  const second = isPasswordCorrect('xyz', config);
  assert.equal(first, second);
  assert.equal(first, true);
});

test('inputs are not mutated', () => {
  const config = { password: 'xyz' };
  isPasswordCorrect('xyz', config);
  assert.deepEqual(config, { password: 'xyz' });
});
