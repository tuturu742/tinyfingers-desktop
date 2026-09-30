'use strict';

const { app, BrowserWindow, Menu } = require('electron');
const path = require('node:path');

const { shouldBlockKey } = require('./src/key-blocker');
const { createGate } = require('./src/password-gate');

Menu.setApplicationMenu(null);

let win = null;
const gate = createGate({ password: process.env.TINYFINGERS_PASSWORD });

function normaliseInput(input) {
  return {
    key: input.key,
    code: input.code,
    ctrlKey: input.control,
    altKey: input.alt,
    shiftKey: input.shift,
    metaKey: input.meta,
  };
}

function createWindow() {
  win = new BrowserWindow({
    fullscreen: true,
    kiosk: true,
    alwaysOnTop: true,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  win.loadFile(path.join(__dirname, 'index.html'));

  win.webContents.on('before-input-event', (event, input) => {
    if (shouldBlockKey(normaliseInput(input))) {
      event.preventDefault();
    }
  });

  win.on('closed', () => {
    win = null;
  });
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  app.quit();
});

function handleExitKey(key) {
  if (key === 'Backspace') {
    gate.backspace();
    return;
  }
  if (key === 'Enter') {
    if (gate.submit()) {
      if (win) {
        win.close();
      }
      app.quit();
    }
    return;
  }
  if (typeof key === 'string' && key.length === 1) {
    gate.type(key);
  }
}

app.on('web-contents-created', (_event, contents) => {
  contents.on('before-input-event', (event, input) => {
    if (!shouldBlockKey(normaliseInput(input))) {
      handleExitKey(input.key);
    }
  });
});
