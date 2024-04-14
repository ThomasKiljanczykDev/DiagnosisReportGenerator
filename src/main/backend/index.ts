import { ipcMain } from 'electron';
import Store from 'electron-store';

import { Api } from '@/common/types/api';
import ExportService from '@/main/backend/services/export.service';
import { ImportService } from '@/main/backend/services/import.service';

export function setupBackend(cwd: string) {
    const store = new Store({
        cwd: cwd
    });

    ipcMain.handle(
        'setStoreValue' satisfies keyof Api,
        async (_, ...args: Parameters<Api['setStoreValue']>): ReturnType<Api['setStoreValue']> => {
            store.set(args[0], args[1]);
        }
    );

    ipcMain.handle(
        'getStoreValue' satisfies keyof Api,
        async (_, ...args: Parameters<Api['getStoreValue']>): ReturnType<Api['getStoreValue']> => {
            return store.get(args[0]);
        }
    );

    ipcMain.handle(
        'deleteStoreValue' satisfies keyof Api,
        async (
            _,
            ...args: Parameters<Api['deleteStoreValue']>
        ): ReturnType<Api['deleteStoreValue']> => {
            store.delete(args[0]);
        }
    );

    ipcMain.handle(
        'parseExcelFile' satisfies keyof Api,
        async (
            _,
            ...args: Parameters<Api['parseExcelFile']>
        ): ReturnType<Api['parseExcelFile']> => {
            try {
                return await ImportService.parseExcelFile(args[0]);
            } catch (e) {
                console.error(`Error parsing Excel file: ${e}`);
                throw e;
            }
        }
    );

    ipcMain.handle(
        'parseCsvFile' satisfies keyof Api,
        async (_, ...args: Parameters<Api['parseCsvFile']>): ReturnType<Api['parseCsvFile']> => {
            return await ImportService.parseCsvFile(args[0]);
        }
    );

    ipcMain.handle(
        'renderReportPackage' satisfies keyof Api,
        async (
            _,
            ...args: Parameters<Api['renderReportPackage']>
        ): ReturnType<Api['renderReportPackage']> => {
            return await ExportService.generateReport(args[0], args[1]);
        }
    );
}
