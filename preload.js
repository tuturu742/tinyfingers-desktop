'use strict';

const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('tinyFingers', {
  submitPassword(password) {
    ipcRenderer.send('gate:submit', String(password));
  },
});
