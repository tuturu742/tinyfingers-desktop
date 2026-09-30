'use strict';

const DEFAULT_PASSWORD = 'parent';

function getPassword(config) {
  const configured = config && config.password;
  if (typeof configured === 'string' && configured.length > 0) {
    return configured;
  }
  return DEFAULT_PASSWORD;
}

function isPasswordCorrect(input, config) {
  return String(input) === getPassword(config);
}

function createPasswordEntry() {
  return { typed: '' };
}

function appendPasswordChar(entry, char, config) {
  const next = (entry.typed || '') + String(char);
  const password = getPassword(config);

  if (next === password) {
    return { typed: next, accepted: true };
  }

  if (password.startsWith(next)) {
    return { typed: next, accepted: false };
  }

  return { typed: '', accepted: false };
}

module.exports = {
  DEFAULT_PASSWORD,
  getPassword,
  isPasswordCorrect,
  createPasswordEntry,
  appendPasswordChar,
};
