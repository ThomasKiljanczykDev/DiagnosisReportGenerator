// eslint-disable-next-line spaced-comment
/// <reference types="vite/client" />

interface Window {
    // expose in the `electron/preload/index.ts`
    ipcRenderer: import('electron').IpcRenderer;
}
