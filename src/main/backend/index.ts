import { ipcMain } from 'electron';
import Store from 'electron-store';

import { Api } from '@/common/types/api';
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

export function setupBackend(cwd: string) {
    const store = new Store({
        cwd: cwd
    });

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
        return await ImportService.parseExcelFile(args[0]);
    });

    handle('parseCsvFile', async (...args) => {
        return await ImportService.parseCsvFile(args[0]);
    });

    handle('renderReportPackage', async (...args) => {
        return await ExportService.generateReport(args[0], args[1]);
    });
}
