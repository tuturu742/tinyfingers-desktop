'use strict';

const DEFAULT_PASSWORD = 'parent';

function checkPassword(entered, configured) {
  const expected =
    configured === undefined || configured === null || configured === ''
      ? DEFAULT_PASSWORD
      : configured;
  return entered === expected;
}

function createGate(options) {
  const opts = options || {};
  const configured =
    opts.password === undefined || opts.password === null || opts.password === ''
      ? DEFAULT_PASSWORD
      : opts.password;

  let buffer = '';

  return {
    type(char) {
      if (char === undefined || char === null) {
        return buffer;
      }
      buffer += String(char);
      return buffer;
    },
    backspace() {
      buffer = buffer.slice(0, -1);
      return buffer;
    },
    reset() {
      buffer = '';
      return buffer;
    },
    getValue() {
      return buffer;
    },
    submit() {
      if (checkPassword(buffer, configured)) {
        return true;
      }
      buffer = '';
      return false;
    },
  };
}

module.exports = { checkPassword, createGate, DEFAULT_PASSWORD };
