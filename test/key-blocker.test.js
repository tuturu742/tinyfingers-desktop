'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');

const { shouldBlockKey } = require('../src/key-blocker');

function input(overrides) {
  return Object.assign(
    { key: '', code: '', ctrlKey: false, altKey: false, shiftKey: false, metaKey: false },
    overrides
  );
}

test('blocks Escape', () => {
  assert.equal(shouldBlockKey(input({ key: 'Escape', code: 'Escape' })), true);
});

test('blocks the slash key by key and by code', () => {
  assert.equal(shouldBlockKey(input({ key: '/', code: 'Slash' })), true);
  assert.equal(shouldBlockKey(input({ key: 'Unidentified', code: 'Slash' })), true);
  assert.equal(shouldBlockKey(input({ key: '/', code: '' })), true);
});

test('blocks F11', () => {
  assert.equal(shouldBlockKey(input({ key: 'F11', code: 'F11' })), true);
});

test('blocks Ctrl+W', () => {
  assert.equal(shouldBlockKey(input({ key: 'w', code: 'KeyW', ctrlKey: true })), true);
  assert.equal(shouldBlockKey(input({ key: 'W', code: 'KeyW', ctrlKey: true, shiftKey: true })), true);
});

test('blocks Ctrl+R', () => {
  assert.equal(shouldBlockKey(input({ key: 'r', code: 'KeyR', ctrlKey: true })), true);
  assert.equal(shouldBlockKey(input({ key: 'R', code: 'KeyR', ctrlKey: true, shiftKey: true })), true);
});

test('blocks Ctrl+Shift+I', () => {
  assert.equal(
    shouldBlockKey(input({ key: 'I', code: 'KeyI', ctrlKey: true, shiftKey: true })),
    true
  );
});

test('blocks Alt+ArrowLeft and Alt+ArrowRight', () => {
  assert.equal(shouldBlockKey(input({ key: 'ArrowLeft', code: 'ArrowLeft', altKey: true })), true);
  assert.equal(shouldBlockKey(input({ key: 'ArrowRight', code: 'ArrowRight', altKey: true })), true);
});

test('blocks all function keys F1 through F24', () => {
  for (let n = 1; n <= 24; n += 1) {
    const name = `F${n}`;
    assert.equal(shouldBlockKey(input({ key: name, code: name })), true, `${name} should block`);
  }
});

test('blocks representative function keys explicitly', () => {
  for (const name of ['F1', 'F5', 'F12', 'F24']) {
    assert.equal(shouldBlockKey(input({ key: name, code: name })), true, `${name} should block`);
  }
});

test('does not block ordinary letters', () => {
  for (const ch of ['a', 'z', 'A', 'Z', 'm', 'Q']) {
    const code = `Key${ch.toUpperCase()}`;
    assert.equal(shouldBlockKey(input({ key: ch, code })), false, `${ch} should paint`);
  }
});

test('does not block digits', () => {
  for (const ch of ['0', '5', '9']) {
    assert.equal(shouldBlockKey(input({ key: ch, code: `Digit${ch}` })), false, `${ch} should paint`);
  }
});

test('does not block punctuation the toy uses', () => {
  for (const ch of ['.', ',', ';', "'", '[', ']', '-', '=']) {
    assert.equal(shouldBlockKey(input({ key: ch })), false, `${ch} should paint`);
  }
});

test('does not block the space bar', () => {
  assert.equal(shouldBlockKey(input({ key: ' ', code: 'Space' })), false);
});

test('does not block unmodified arrow keys', () => {
  assert.equal(shouldBlockKey(input({ key: 'ArrowLeft', code: 'ArrowLeft' })), false);
  assert.equal(shouldBlockKey(input({ key: 'ArrowRight', code: 'ArrowRight' })), false);
  assert.equal(shouldBlockKey(input({ key: 'ArrowUp', code: 'ArrowUp' })), false);
  assert.equal(shouldBlockKey(input({ key: 'ArrowDown', code: 'ArrowDown' })), false);
});

test('does not block Shift-modified letters', () => {
  assert.equal(shouldBlockKey(input({ key: 'A', code: 'KeyA', shiftKey: true })), false);
  assert.equal(shouldBlockKey(input({ key: 'Z', code: 'KeyZ', shiftKey: true })), false);
});

test('is deterministic and safe with missing input', () => {
  const ev = input({ key: 'a', code: 'KeyA' });
  assert.equal(shouldBlockKey(ev), shouldBlockKey(ev));
  assert.equal(shouldBlockKey(undefined), false);
  assert.equal(shouldBlockKey({}), false);
});
