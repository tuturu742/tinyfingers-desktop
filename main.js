'use strict';

const { app, BrowserWindow, Menu, ipcMain } = require('electron');
const path = require('path');

const { shouldBlock } = require('./src/key-blocker');
const {
  isPasswordCorrect,
  createPasswordEntry,
  appendPasswordChar,
} = require('./src/password-gate');

let mainWindow = null;
let allowClose = false;
let entry = createPasswordEntry();

function passwordConfig() {
  return { password: process.env.TINYFINGERS_PASSWORD };
}

function createWindow() {
  mainWindow = new BrowserWindow({
    fullscreen: true,
    kiosk: true,
    alwaysOnTop: true,
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  mainWindow.webContents.on('before-input-event', (event, input) => {
    const mapped = {
      key: input.key,
      ctrlKey: input.control,
      altKey: input.alt,
      metaKey: input.meta,
      shiftKey: input.shift,
    };

    if (shouldBlock(mapped)) {
      event.preventDefault();
    }

    if (input.type === 'keyDown' && typeof input.key === 'string' && input.key.length === 1) {
      entry = appendPasswordChar(entry, input.key, passwordConfig());

      if (entry.accepted) {
        if (isPasswordCorrect(entry.typed, passwordConfig())) {
          allowClose = true;
          mainWindow.close();
        }
      }
    }
  });

  mainWindow.on('close', (event) => {
    if (!allowClose) {
      event.preventDefault();
    }
  });

  mainWindow.loadFile('index.html');
}

ipcMain.handle('request-exit', (event, input) => {
  const ok = isPasswordCorrect(input, passwordConfig());

  if (ok) {
    allowClose = true;
    mainWindow.close();
  }

  return ok;
});

app.whenReady().then(() => {
  Menu.setApplicationMenu(null);
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
