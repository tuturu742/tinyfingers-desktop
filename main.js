'use strict';

const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('node:path');
const { shouldBlock } = require('./src/key-blocker.js');
const { PasswordGate } = require('./src/password-gate.js');

const configuredPassword = process.env.TINYFINGERS_PASSWORD;

function createWindow() {
  const gate = new PasswordGate(configuredPassword);
  let gatePending = false;

  const win = new BrowserWindow({
    fullscreen: true,
    kiosk: true,
    alwaysOnTop: true,
    autoHideMenuBar: true,
    frame: false,
    backgroundColor: '#000000',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
    },
  });

  win.setMenuBarVisibility(false);
  win.loadFile('index.html');

  function finish() {
    gate.clear();
    gatePending = false;
    win.close();
  }

  win.webContents.on('before-input-event', (event, input) => {
    if (shouldBlock(input)) {
      event.preventDefault();
      return;
    }

    if (!gatePending) {
      if (input.control && input.shift && String(input.key).toLowerCase() === 'q') {
        gatePending = true;
        gate.clear();
        event.preventDefault();
      }
      return;
    }

    if (input.key === 'Enter') {
      event.preventDefault();
      if (gate.check()) {
        finish();
      } else {
        gate.clear();
        gatePending = false;
      }
      return;
    }

    if (input.key === 'Escape') {
      gate.clear();
      gatePending = false;
      event.preventDefault();
      return;
    }

    if (typeof input.key === 'string' && input.key.length === 1) {
      gate.append(input.key);
      event.preventDefault();
    }
  });

  return win;
}

ipcMain.on('gate:submit', (event, password) => {
  const win = BrowserWindow.fromWebContents(event.sender);
  if (!win) {
    return;
  }
  const gate = new PasswordGate(configuredPassword);
  for (const char of String(password)) {
    gate.append(char);
  }
  if (gate.check()) {
    gate.clear();
    win.close();
  } else {
    gate.clear();
  }
});

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
