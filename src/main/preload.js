const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    processData: () => {
        ipcRenderer.invoke('process-data', 'ping-me')
            .then((data) => {
                console.log(data);
            })
    }
});