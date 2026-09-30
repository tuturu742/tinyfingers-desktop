'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');

const { checkPassword, createGate } = require('../src/password-gate');

test('checkPassword accepts the exact configured password', () => {
  assert.equal(checkPassword('secret', 'secret'), true);
  assert.equal(checkPassword('parent', 'parent'), true);
});

test('checkPassword defaults to "parent" when configured is omitted/undefined/empty', () => {
  assert.equal(checkPassword('parent'), true);
  assert.equal(checkPassword('parent', undefined), true);
  assert.equal(checkPassword('parent', ''), true);
  assert.equal(checkPassword('parent', null), true);
});

test('checkPassword rejects a wrong password or the default when one is set', () => {
  assert.equal(checkPassword('wrong', 'secret'), false);
  assert.equal(checkPassword('parent', 'secret'), false);
  assert.equal(checkPassword('Parent', 'parent'), false);
  assert.equal(checkPassword('', 'secret'), false);
});

test('gate submits correctly for a configured password', () => {
  const gate = createGate({ password: 'secret' });
  for (const ch of 'secret') gate.type(ch);
  assert.equal(gate.submit(), true);
});

test('gate submits correctly for the default password', () => {
  const gate = createGate();
  for (const ch of 'parent') gate.type(ch);
  assert.equal(gate.submit(), true);
});

test('gate rejects a wrong password', () => {
  const gate = createGate({ password: 'secret' });
  for (const ch of 'nope') gate.type(ch);
  assert.equal(gate.submit(), false);
});

test('gate clears the buffer after a wrong submission', () => {
  const gate = createGate({ password: 'parent' });
  for (const ch of 'parnet') gate.type(ch);
  assert.equal(gate.submit(), false);
  assert.equal(gate.getValue(), '');
  assert.equal(gate.submit(), false, 'empty buffer is not the password');
});

test('typing the right password after a failed attempt succeeds only with fresh input', () => {
  const gate = createGate({ password: 'parent' });
  for (const ch of 'parenx') gate.type(ch);
  assert.equal(gate.submit(), false);
  for (const ch of 'parent') gate.type(ch);
  assert.equal(gate.submit(), true);
});

test('gate backspace removes the last character', () => {
  const gate = createGate({ password: 'parent' });
  for (const ch of 'paren') gate.type(ch);
  gate.type('t');
  assert.equal(gate.getValue(), 'parent');
  gate.backspace();
  assert.equal(gate.getValue(), 'paren');
  assert.equal(gate.submit(), false);
});

test('gate reset clears the buffer', () => {
  const gate = createGate({ password: 'parent' });
  for (const ch of 'par') gate.type(ch);
  gate.reset();
  assert.equal(gate.getValue(), '');
});

test('gate exposes its value and tolerates undefined characters', () => {
  const gate = createGate({ password: 'parent' });
  gate.type('p');
  gate.type(undefined);
  assert.equal(gate.getValue(), 'p');
});
