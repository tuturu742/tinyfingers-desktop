'use strict';

const DEFAULT_PASSWORD = 'parent';

function checkPassword(entered, configured) {
  const expected = configured === undefined ? DEFAULT_PASSWORD : configured;
  return entered === expected;
}

class PasswordGate {
  constructor(configured) {
    this.configured = configured === undefined ? DEFAULT_PASSWORD : configured;
    this.buffer = '';
  }

  append(char) {
    this.buffer += String(char);
    return this.buffer;
  }

  value() {
    return this.buffer;
  }

  check() {
    return checkPassword(this.buffer, this.configured);
  }

  clear() {
    this.buffer = '';
    return this.buffer;
  }
}

module.exports = { checkPassword, PasswordGate, DEFAULT_PASSWORD };
