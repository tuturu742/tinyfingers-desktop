'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');

const {
  DEFAULT_PASSWORD,
  getPassword,
  isPasswordCorrect,
  createPasswordEntry,
  appendPasswordChar,
} = require('../src/password-gate');

test('DEFAULT_PASSWORD is parent', () => {
  assert.equal(DEFAULT_PASSWORD, 'parent');
});

test('getPassword falls back to the default', () => {
  assert.equal(getPassword({}), 'parent');
  assert.equal(getPassword({ password: 'xyz' }), 'xyz');
  assert.equal(getPassword({ password: '' }), 'parent');
  assert.equal(getPassword(), 'parent');
});

test('isPasswordCorrect matches the configured password', () => {
  assert.equal(isPasswordCorrect('parent', {}), true);
  assert.equal(isPasswordCorrect('wrong', {}), false);
  assert.equal(isPasswordCorrect(undefined, {}), false);
  assert.equal(isPasswordCorrect(null, {}), false);
  assert.equal(isPasswordCorrect('', {}), false);
  assert.equal(isPasswordCorrect('xyz', { password: 'xyz' }), true);
  assert.equal(isPasswordCorrect('parent', { password: 'xyz' }), false);
});

test('isPasswordCorrect is case-sensitive', () => {
  assert.equal(isPasswordCorrect('Parent', {}), false);
});

test('appendPasswordChar accumulates to acceptance', () => {
  let entry = createPasswordEntry();
  for (const char of ['p', 'a', 'r', 'e', 'n']) {
    entry = appendPasswordChar(entry, char, {});
    assert.equal(entry.accepted, false);
  }
  entry = appendPasswordChar(entry, 't', {});
  assert.equal(entry.accepted, true);
  assert.equal(entry.typed, 'parent');
});

test('appendPasswordChar resets on a wrong answer', () => {
  const original = createPasswordEntry();
  const afterP = appendPasswordChar(original, 'p', {});
  const afterA = appendPasswordChar(afterP, 'a', {});
  const afterX = appendPasswordChar(afterA, 'x', {});

  assert.deepEqual(afterX, { typed: '', accepted: false });
  assert.deepEqual(original, { typed: '' });
  assert.deepEqual(afterP, { typed: 'p', accepted: false });
});

test('appendPasswordChar does not mutate its input', () => {
  const original = { typed: 'par' };
  const next = appendPasswordChar(original, 'e', {});
  assert.deepEqual(original, { typed: 'par' });
  assert.deepEqual(next, { typed: 'pare', accepted: false });
});
