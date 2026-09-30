'use strict'

const test = require('node:test')
const assert = require('node:assert/strict')

const { shouldBlock } = require('../src/key-blocker.js')

const F_KEYS = Array.from({ length: 12 }, (_, i) => `F${i + 1}`)
const CTRL_KEYS = ['w', 'r', 't', 'n', 'l', 'q', 'p', 's', 'f', 'h', 'o',
  '0', '1', '2', '3', '4', '5', '6', '7', '8', '9']

const cases = [
  ['Escape', { key: 'Escape' }, true],
  ['Escape with modifiers', { key: 'Escape', ctrlKey: true, altKey: true, metaKey: true, shiftKey: true }, true],
  ['slash', { key: '/' }, true],
  ['slash with modifiers', { key: '/', ctrlKey: true, shiftKey: true }, true],
  ...F_KEYS.map((k) => [k, { key: k }, true]),
  ...CTRL_KEYS.map((k) => [`Ctrl+${k}`, { key: k, ctrlKey: true }, true]),
  ['Ctrl+W lowercase', { key: 'w', ctrlKey: true }, true],
  ['Ctrl+Shift+W', { key: 'W', ctrlKey: true, shiftKey: true }, true],
  ['Alt+Left', { key: 'ArrowLeft', altKey: true }, true],
  ['Alt+Right', { key: 'ArrowRight', altKey: true }, true],
  ['a alone', { key: 'a' }, false],
  ['Left alone', { key: 'ArrowLeft' }, false],
  ['Tab with alt', { key: 'Tab', altKey: true }, false],
  ['Tab with meta', { key: 'Tab', metaKey: true }, false],
  ['Ctrl+Alt+Delete', { key: 'Delete', ctrlKey: true, altKey: true }, false],
  ['missing key field', {}, false]
]

for (const [name, input, expected] of cases) {
  test(`${name} -> ${expected}`, () => {
    assert.equal(shouldBlock(input), expected)
  })
}

test('missing modifier fields default to false without throwing', () => {
  assert.equal(shouldBlock({ key: 'a' }), false)
  assert.equal(shouldBlock({ key: 'w' }), false)
  assert.equal(shouldBlock({ key: 'ArrowLeft' }), false)
})

test('null or non-object input returns false', () => {
  assert.equal(shouldBlock(null), false)
  assert.equal(shouldBlock(undefined), false)
})
