'use strict';

const FUNCTION_KEY_RE = /^F([1-9]|1[0-9]|2[0-4])$/;

function isFunctionKey(input) {
  const code = typeof input.code === 'string' ? input.code : '';
  const match = /^F([0-9]{1,2})$/.exec(code);
  if (match && FUNCTION_KEY_RE.test(code)) {
    return true;
  }
  return typeof input.key === 'string' && FUNCTION_KEY_RE.test(input.key);
}

function shouldBlockKey(input) {
  const event = input || {};
  const key = typeof event.key === 'string' ? event.key : '';
  const code = typeof event.code === 'string' ? event.code : '';
  const ctrl = event.ctrlKey === true;
  const alt = event.altKey === true;
  const shift = event.shiftKey === true;
  const meta = event.metaKey === true;

  if (key === 'Escape' || key === 'Esc' || code === 'Escape') {
    return true;
  }

  if (key === '/' || code === 'Slash') {
    return true;
  }

  if (isFunctionKey({ key, code })) {
    return true;
  }

  if (ctrl && !alt && !meta && (key === 'w' || key === 'W' || code === 'KeyW')) {
    return true;
  }

  if (ctrl && !alt && !meta && (key === 'r' || key === 'R' || code === 'KeyR')) {
    return true;
  }

  if (ctrl && shift && !alt && !meta && (key === 'i' || key === 'I' || code === 'KeyI')) {
    return true;
  }

  if (alt && !ctrl && !meta && (key === 'ArrowLeft' || code === 'ArrowLeft')) {
    return true;
  }

  if (alt && !ctrl && !meta && (key === 'ArrowRight' || code === 'ArrowRight')) {
    return true;
  }

  return false;
}

module.exports = { shouldBlockKey };
