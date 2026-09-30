'use strict'

const CTRL_BLOCKED = new Set([
  'w', 'r', 't', 'n', 'l', 'q', 'p', 's', 'f', 'h', 'o',
  '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'
])

const FUNCTION_KEY = /^F[1-9]$|^F1[0-2]$/

function shouldBlock(input) {
  if (input == null || typeof input !== 'object') return false

  const key = input.key
  const ctrlKey = input.ctrlKey === true
  const altKey = input.altKey === true

  if (key === 'Escape') return true
  if (key === '/') return true
  if (typeof key === 'string' && FUNCTION_KEY.test(key)) return true

  if (ctrlKey && typeof key === 'string' && CTRL_BLOCKED.has(key.toLowerCase())) {
    return true
  }

  if (altKey && (key === 'ArrowLeft' || key === 'ArrowRight')) return true

  return false
}

module.exports = { shouldBlock }
