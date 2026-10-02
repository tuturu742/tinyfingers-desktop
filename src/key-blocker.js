'use strict';

const BLOCKED_KEYS = new Set([
  'escape',
  '/',
  'f1',
  'f2',
  'f3',
  'f4',
  'f5',
  'f6',
  'f7',
  'f8',
  'f9',
  'f10',
  'f11',
  'f12',
]);

function shouldBlock(input) {
  const event = input || {};
  const key = typeof event.key === 'string' ? event.key.toLowerCase() : '';
  const ctrl = Boolean(event.ctrl);
  const shift = Boolean(event.shift);
  const alt = Boolean(event.alt);
  const meta = Boolean(event.meta);

  if (BLOCKED_KEYS.has(key)) {
    return true;
  }

  if (ctrl && (key === 'w' || key === 'r')) {
    return true;
  }

  if (ctrl && shift && key === 'i') {
    return true;
  }

  if (alt && (key === 'arrowleft' || key === 'arrowright')) {
    return true;
  }

  return false;
}

module.exports = { shouldBlock };
