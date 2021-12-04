/*
 * notion-enhancer
 * (c) 2021 dragonwocky <thedragonring.bod@gmail.com> (https://dragonwocky.me/)
 * (https://notion-enhancer.github.io/) under the MIT license
 */

'use strict';

const api = require('notion-enhancer/api/index.cjs');

window.__enhancerElectronApi = {
  platform: api.env.name,
  version: api.env.version,
  db: {
    get: api.storage.get,
    set: api.storage.set,
    addChangeListener: api.storage.addChangeListener,
    removeChangeListener: api.storage.removeChangeListener,
  },
  browser: require('electron').remote.getCurrentWindow(),
  webFrame: require('electron').webFrame,
  sendMessage: (channel, data = undefined) => {
    const { ipcRenderer } = require('electron');
    ipcRenderer.send(`notion-enhancer:${channel}`, data);
  },
  sendMessageToHost: (channel, data = undefined) => {
    const { ipcRenderer } = require('electron');
    ipcRenderer.sendToHost(`notion-enhancer:${channel}`, data);
  },
  onMessage: (channel, callback) => {
    const { ipcRenderer } = require('electron');
    ipcRenderer.on(`notion-enhancer:${channel}`, callback);
  },
};
