import { app, ipcMain } from 'electron';
import Store from 'electron-store';

import { type Api } from '@/common/types/api';
import ExportService from '@/main/backend/services/export.service';
import { ImportService } from '@/main/backend/services/import.service';

function handle<T extends keyof Api>(
    channel: T,
    listener: (...args: Parameters<Api[T]>) => ReturnType<Api[T]>
) {
    ipcMain.handle(channel, async (_, ...args: Parameters<Api[T]>) => {
        return listener(...args);
    });
}

export function createElectronStore() {
    // create log file
    const path = import.meta.env.DEV ? app.getAppPath() : process.cwd();

    return new Store({
        cwd: path
    });
}

export function setupBackend() {
    const store = createElectronStore();

    handle('setStoreValue', async (...args) => {
        store.set(args[0], args[1]);
    });

    handle('getStoreValue', async (...args) => {
        return store.get(args[0]);
    });

    handle('deleteStoreValue', async (...args) => {
        store.delete(args[0]);
    });

    handle('parseExcelFile', async (...args) => {
        return ImportService.parseExcelFile(args[0]);
    });

    handle('parseCsvFile', async (...args) => {
        return ImportService.parseCsvFile(args[0]);
    });

    handle('renderReportPackage', async (...args) => {
        return ExportService.generateReport(args[0], args[1]);
    });
}
