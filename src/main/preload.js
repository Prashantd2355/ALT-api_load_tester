/* eslint-disable prettier/prettier */
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    processData: (isBulk, reqObj) => {
        return ipcRenderer.invoke('process-data', isBulk, reqObj);
    },
});
