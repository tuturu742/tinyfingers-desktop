'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');

const { shouldBlock } = require('../src/key-blocker');

const blocked = [
  { name: 'Escape', input: { key: 'Escape' } },
  { name: 'Escape with modifiers', input: { key: 'Escape', ctrlKey: true, shiftKey: true } },
  { name: 'slash', input: { key: '/' } },
  { name: 'slash with shift', input: { key: '/', shiftKey: true } },
  { name: 'F1', input: { key: 'F1' } },
  { name: 'F2', input: { key: 'F2' } },
  { name: 'F3', input: { key: 'F3' } },
  { name: 'F4', input: { key: 'F4' } },
  { name: 'F5', input: { key: 'F5' } },
  { name: 'F6', input: { key: 'F6' } },
  { name: 'F7', input: { key: 'F7' } },
  { name: 'F8', input: { key: 'F8' } },
  { name: 'F9', input: { key: 'F9' } },
  { name: 'F10', input: { key: 'F10' } },
  { name: 'F11', input: { key: 'F11' } },
  { name: 'F12', input: { key: 'F12' } },
  { name: 'Ctrl+W', input: { key: 'w', ctrlKey: true } },
  { name: 'Ctrl+W uppercase', input: { key: 'W', ctrlKey: true } },
  { name: 'Ctrl+Shift+W', input: { key: 'w', ctrlKey: true, shiftKey: true } },
  { name: 'Ctrl+R', input: { key: 'r', ctrlKey: true } },
  { name: 'Ctrl+R uppercase', input: { key: 'R', ctrlKey: true } },
  { name: 'Ctrl+Shift+R', input: { key: 'r', ctrlKey: true, shiftKey: true } },
  { name: 'Ctrl+Shift+I', input: { key: 'i', ctrlKey: true, shiftKey: true } },
  { name: 'Ctrl+Shift+I uppercase', input: { key: 'I', ctrlKey: true, shiftKey: true } },
  { name: 'Alt+ArrowLeft', input: { key: 'ArrowLeft', altKey: true } },
  { name: 'Alt+ArrowRight', input: { key: 'ArrowRight', altKey: true } },
];

const allowed = [
  { name: 'plain a', input: { key: 'a' } },
  { name: 'plain 1', input: { key: '1' } },
  { name: 'plain bang', input: { key: '!' } },
  { name: 'Tab with alt', input: { key: 'Tab', altKey: true } },
  { name: 'Tab with meta', input: { key: 'Tab', metaKey: true } },
  { name: 'plain Tab', input: { key: 'Tab' } },
  { name: 'plain ArrowLeft', input: { key: 'ArrowLeft' } },
  { name: 'plain ArrowRight', input: { key: 'ArrowRight' } },
  { name: 'Delete', input: { key: 'Delete' } },
  { name: 'missing key', input: {} },
  { name: 'undefined key', input: { key: undefined } },
];

test('blocks keys the shell must swallow', () => {
  for (const { name, input } of blocked) {
    assert.equal(shouldBlock(input), true, `${name} should be blocked`);
  }
});

test('allows ordinary keys the toy is for', () => {
  for (const { name, input } of allowed) {
    assert.equal(shouldBlock(input), false, `${name} should be allowed`);
  }
});

test('does not throw on malformed input', () => {
  assert.equal(shouldBlock({}), false);
  assert.equal(shouldBlock({ key: null }), false);
});
