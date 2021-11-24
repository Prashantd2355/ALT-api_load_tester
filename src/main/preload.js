const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  send: (channel, data) => {
      // whitelist channels
      let validChannels = ["process-data"];
      if (validChannels.includes(channel)) {
          ipcRenderer.send(channel, data);
      }
  }
});
