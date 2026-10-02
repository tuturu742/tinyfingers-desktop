'use strict';

const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('node:path');
const { shouldBlock } = require('./src/key-blocker.js');
const { checkPassword } = require('./src/password-gate.js');

const configuredPassword = process.env.TINYFINGERS_PASSWORD;

function createWindow() {
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

  win.webContents.on('before-input-event', (event, input) => {
    if (shouldBlock(input)) {
      event.preventDefault();
    }
  });

  return win;
}

ipcMain.on('gate:submit', (event, password) => {
  if (!checkPassword(String(password), configuredPassword)) {
    return;
  }
  const win = BrowserWindow.fromWebContents(event.sender);
  if (win) {
    win.close();
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
