import axios from 'axios';
import { BrowserWindow, app, ipcMain, nativeTheme, shell } from 'electron';
import contextMenu from 'electron-context-menu';
import { release } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { HomeService, serviceOptions } from '@diagnosis-report-generator/api/services';

import { update } from './update';

app.commandLine.appendSwitch('js-flags', '--enable-source-maps');

// setup api axios
serviceOptions.axios = axios.create({
    baseURL: import.meta.env.VITE_API_URL
});

globalThis.__filename = fileURLToPath(import.meta.url);
globalThis.__dirname = dirname(__filename);

// The built directory structure
//
// ├─┬ dist-electron
// │ ├─┬ main
// │ │ └── index.js    > Electron-Main
// │ └─┬ preload
// │   └── index.mjs    > Preload-Scripts
// ├─┬ dist
// │ └── index.html    > Electron-Renderer
//
process.env.DIST_ELECTRON = join(__dirname, '../');
process.env.DIST = join(process.env.DIST_ELECTRON, '../dist');
process.env.VITE_PUBLIC = process.env.VITE_DEV_SERVER_URL
    ? join(process.env.DIST_ELECTRON, '../public')
    : process.env.DIST;

// Disable GPU Acceleration for Windows 7
if (release().startsWith('6.1')) {
    app.disableHardwareAcceleration();
}

// Set application name for Windows 10+ notifications
if (process.platform === 'win32') {
    app.setAppUserModelId(app.getName());
}

if (!app.requestSingleInstanceLock()) {
    app.quit();
    process.exit(0);
}

// Remove electron security warnings
// This warning only shows in development mode
// Read more on https://www.electronjs.org/docs/latest/tutorial/security
// process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'

let win: BrowserWindow | null = null;
// Here, you can also use other preload
const preload = join(__dirname, '../preload/index.mjs');
const devServerUrl = process.env.VITE_DEV_SERVER_URL;
const indexHtml = join(process.env.DIST, 'index.html');

// Force light theme
nativeTheme.themeSource = 'light';

if (devServerUrl) {
    contextMenu({});
}

async function createWindow() {
    win = new BrowserWindow({
        title: 'Main window',
        icon: join(process.env.VITE_PUBLIC, 'favicon.ico'),
        width: 1600,
        height: 900,
        webPreferences: {
            preload
            // Warning: Enable nodeIntegration and disable contextIsolation is not secure in production
            // nodeIntegration: true,

            // Consider using contextBridge.exposeInMainWorld
            // Read more on https://www.electronjs.org/docs/latest/tutorial/context-isolation
            // contextIsolation: false,
        }
    });

    if (devServerUrl) {
        // electron-vite-vue#298
        win.loadURL(devServerUrl);
        // Open devTool if the app is not packaged
        win.webContents.openDevTools();
    } else {
        win.loadFile(indexHtml);
    }

    // Test actively push message to the Electron-Renderer
    win.webContents.on('did-finish-load', () => {
        win?.webContents.send('main-process-message', new Date().toLocaleString());
    });

    // Make all links open with the browser, not with the application
    win.webContents.setWindowOpenHandler(({ url }) => {
        if (url.startsWith('https:')) shell.openExternal(url);
        return { action: 'deny' };
    });

    // Apply electron-updater
    update(win);

    nativeTheme.themeSource = 'system';
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    win = null;
    if (process.platform !== 'darwin') app.quit();
});

app.on('second-instance', () => {
    if (win) {
        // Focus on the main window if the user tried to open another
        if (win.isMinimized()) win.restore();
        win.focus();
    }
});

app.on('activate', () => {
    const allWindows = BrowserWindow.getAllWindows();
    if (allWindows.length) {
        allWindows[0].focus();
    } else {
        createWindow();
    }
});

app.on('before-quit', async () => {
    if (process.env.NODE_ENV !== 'development') {
        await HomeService.shutdown();
    }
});

// New window example arg: new windows url
ipcMain.handle('open-win', (_, arg: string) => {
    const childWindow = new BrowserWindow({
        webPreferences: {
            preload,
            nodeIntegration: false,
            contextIsolation: true
        }
    });

    if (process.env.VITE_DEV_SERVER_URL) {
        childWindow.loadURL(`${devServerUrl}#${arg}`);
    } else {
        childWindow.loadFile(indexHtml, { hash: arg });
    }
});
