'use strict';

const BLOCKED_FUNCTION_KEY = /^F[1-9]$|^F1[0-2]$/;

function shouldBlock(input) {
  const key = input && input.key;
  const ctrlKey = Boolean(input && input.ctrlKey);
  const altKey = Boolean(input && input.altKey);
  const shiftKey = Boolean(input && input.shiftKey);

  if (key === 'Escape') return true;
  if (key === '/') return true;
  if (typeof key === 'string' && BLOCKED_FUNCTION_KEY.test(key)) return true;

  const lower = String(key).toLowerCase();

  if (ctrlKey && (lower === 'w' || lower === 'r')) return true;
  if (ctrlKey && shiftKey && lower === 'i') return true;
  if (altKey && (key === 'ArrowLeft' || key === 'ArrowRight')) return true;

  return false;
}

module.exports = { shouldBlock };
