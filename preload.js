'use strict';

const { contextBridge } = require('electron');

// The renderer paints shapes for every key and click and needs nothing from the
// main process, so no IPC surface is exposed. This preload exists only to keep
// contextIsolation explicit and to give a single place to add a bridge later.
contextBridge.exposeInMainWorld('tinyfingers', {});
