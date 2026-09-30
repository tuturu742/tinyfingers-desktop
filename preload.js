'use strict';

const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('tinyfingers', {
  requestExit: (pw) => ipcRenderer.invoke('request-exit', pw),
});
