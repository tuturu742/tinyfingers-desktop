'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const { shouldBlock } = require('../src/key-blocker.js');

function event(key, modifiers) {
  return Object.assign(
    { key, ctrl: false, shift: false, alt: false, meta: false },
    modifiers
  );
}

test('blocks Escape', () => {
  assert.equal(shouldBlock(event('Escape')), true);
});

test('blocks slash', () => {
  assert.equal(shouldBlock(event('/')), true);
});

test('blocks F11', () => {
  assert.equal(shouldBlock(event('F11')), true);
});

test('blocks every function key F1 through F12, case-insensitively', () => {
  for (let i = 1; i <= 12; i += 1) {
    assert.equal(shouldBlock(event('F' + i)), true, 'F' + i);
    assert.equal(shouldBlock(event('f' + i)), true, 'f' + i);
  }
});

test('blocks Ctrl+W', () => {
  assert.equal(shouldBlock(event('w', { ctrl: true })), true);
  assert.equal(shouldBlock(event('W', { ctrl: true })), true);
});

test('blocks Ctrl+R', () => {
  assert.equal(shouldBlock(event('r', { ctrl: true })), true);
  assert.equal(shouldBlock(event('R', { ctrl: true })), true);
});

test('blocks Ctrl+Shift+I', () => {
  assert.equal(shouldBlock(event('i', { ctrl: true, shift: true })), true);
  assert.equal(shouldBlock(event('I', { ctrl: true, shift: true })), true);
});

test('blocks Alt+Left', () => {
  assert.equal(shouldBlock(event('ArrowLeft', { alt: true })), true);
  assert.equal(shouldBlock(event('arrowleft', { alt: true })), true);
});

test('blocks Alt+Right', () => {
  assert.equal(shouldBlock(event('ArrowRight', { alt: true })), true);
  assert.equal(shouldBlock(event('arrowright', { alt: true })), true);
});

test('does not block plain letters', () => {
  for (const key of ['a', 'z', 'A', 'Z']) {
    assert.equal(shouldBlock(event(key)), false, key);
  }
});

test('does not block digits', () => {
  for (const key of ['0', '5', '9']) {
    assert.equal(shouldBlock(event(key)), false, key);
  }
});

test('does not block allowed punctuation and space', () => {
  for (const key of ['.', ',', ';', "'", '-', '=', '[', ']', '\\', ' ']) {
    assert.equal(shouldBlock(event(key)), false, JSON.stringify(key));
  }
});

test('does not block modified ordinary keys', () => {
  assert.equal(shouldBlock(event('a', { ctrl: true })), false);
  assert.equal(shouldBlock(event('a', { shift: true })), false);
  assert.equal(shouldBlock(event('ArrowLeft')), false);
});

test('does not mutate its argument', () => {
  const input = { key: 'Escape', ctrl: false, shift: false, alt: false, meta: false };
  const copy = { ...input };
  shouldBlock(input);
  assert.deepEqual(input, copy);
});

test('is pure: same input yields same output', () => {
  const input = event('F11');
  assert.equal(shouldBlock(input), shouldBlock(input));
});
