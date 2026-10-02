'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const { checkPassword, PasswordGate } = require('../src/password-gate.js');

test('checkPassword returns true for the right password', () => {
  assert.equal(checkPassword('secret', 'secret'), true);
});

test('checkPassword returns false for a wrong password', () => {
  assert.equal(checkPassword('nope', 'secret'), false);
});

test('checkPassword is exact and case-sensitive', () => {
  assert.equal(checkPassword('Parent', 'parent'), false);
  assert.equal(checkPassword('parent ', 'parent'), false);
});

test('checkPassword defaults the configured password to parent', () => {
  assert.equal(checkPassword('parent'), true);
  assert.equal(checkPassword('other'), false);
});

test('PasswordGate defaults the configured password to parent', () => {
  const gate = new PasswordGate();
  for (const char of 'parent') {
    gate.append(char);
  }
  assert.equal(gate.value(), 'parent');
  assert.equal(gate.check(), true);
});

test('PasswordGate accumulates and checks a correct password', () => {
  const gate = new PasswordGate('letmein');
  for (const char of 'letmein') {
    gate.append(char);
  }
  assert.equal(gate.value(), 'letmein');
  assert.equal(gate.check(), true);
});

test('a wrong answer clears the buffer and allows a later correct entry', () => {
  const gate = new PasswordGate('parent');

  for (const char of 'wrong') {
    gate.append(char);
  }
  assert.equal(gate.check(), false);
  gate.clear();
  assert.equal(gate.value(), '');

  for (const char of 'parent') {
    gate.append(char);
  }
  assert.equal(gate.check(), true);
});

test('clear empties the buffer', () => {
  const gate = new PasswordGate('parent');
  gate.append('p');
  gate.append('a');
  assert.equal(gate.value(), 'pa');
  gate.clear();
  assert.equal(gate.value(), '');
});
