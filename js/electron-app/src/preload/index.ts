import { contextBridge, ipcRenderer } from 'electron';

import api from '@/preload/api';

// --------- Expose some API to the Renderer process ---------
contextBridge.exposeInMainWorld('ipcRenderer', {
    on(...args: Parameters<typeof ipcRenderer.on>) {
        const [channel, listener] = args;
        // eslint-disable-next-line @typescript-eslint/no-shadow
        ipcRenderer.on(channel, (event, ...args) => listener(event, ...args));
    },
    off(...args: Parameters<typeof ipcRenderer.off>) {
        const [channel, ...omit] = args;
        ipcRenderer.off(channel, ...omit);
    },
    send(...args: Parameters<typeof ipcRenderer.send>) {
        const [channel, ...omit] = args;
        ipcRenderer.send(channel, ...omit);
    },
    invoke(...args: Parameters<typeof ipcRenderer.invoke>) {
        const [channel, ...omit] = args;
        return ipcRenderer.invoke(channel, ...omit);
    }

    // You can expose other APTs you need here.
    // ...
});

contextBridge.exposeInMainWorld('api', api);
