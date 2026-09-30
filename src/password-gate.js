'use strict';

const DEFAULT_PASSWORD = 'parent';

function getPassword(config) {
  if (config && typeof config.password === 'string' && config.password.length > 0) {
    return config.password;
  }
  return DEFAULT_PASSWORD;
}

function isPasswordCorrect(input, config) {
  return String(input) === getPassword(config);
}

module.exports = { DEFAULT_PASSWORD, getPassword, isPasswordCorrect };
