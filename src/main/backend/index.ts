import { ipcMain } from 'electron';
import Store from 'electron-store';

import { Patient } from '@/common/models/patient';
import { Api } from '@/common/types/api';
import ExportService from '@/main/backend/services/export.service';
import { ImportService } from '@/main/backend/services/import.service';

// noinspection JSUnusedLocalSymbols
const apiStub: Api = {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    setStoreValue(key: string, value: unknown): Promise<void> {
        throw new Error('Method not implemented.');
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    getStoreValue(key: string): Promise<any> {
        throw new Error('Method not implemented.');
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    deleteStoreValue(key: string): Promise<void> {
        throw new Error('Method not implemented.');
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    parseCsvFile(fileData: string): Promise<Patient[]> {
        throw new Error('Method not implemented.');
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    parseExcelFile(fileData: Uint8Array): Promise<Patient[]> {
        throw new Error('Method not implemented.');
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    renderReportPackage(templateFileData: Uint8Array, patientData: Patient[]): Promise<Uint8Array> {
        throw new Error('Method not implemented.');
    }
};

export function setupBackend(cwd: string) {
    const store = new Store({
        cwd: cwd
    });

    ipcMain.handle(
        apiStub.setStoreValue.name,
        async (_, ...args: Parameters<typeof apiStub.setStoreValue>) => {
            store.set(args[0], args[1]);
        }
    );

    ipcMain.handle(
        apiStub.getStoreValue.name,
        async (_, ...args: Parameters<typeof apiStub.getStoreValue>) => {
            return store.get(args[0]);
        }
    );

    ipcMain.handle(
        apiStub.deleteStoreValue.name,
        async (_, ...args: Parameters<typeof apiStub.deleteStoreValue>) => {
            store.delete(args[0]);
        }
    );

    ipcMain.handle(
        apiStub.parseExcelFile.name,
        async (_, ...args: Parameters<typeof apiStub.parseExcelFile>) => {
            try {
                return await ImportService.parseExcelFile(args[0]);
            } catch (e) {
                console.error(`Error parsing Excel file: ${e}`);
                throw e;
            }
        }
    );

    ipcMain.handle(
        apiStub.parseCsvFile.name,
        async (_, ...args: Parameters<typeof apiStub.parseCsvFile>) => {
            return await ImportService.parseCsvFile(args[0]);
        }
    );

    ipcMain.handle(
        apiStub.renderReportPackage.name,
        async (_, ...args: Parameters<typeof apiStub.renderReportPackage>) => {
            return await ExportService.generateReport(args[0], args[1]);
        }
    );
}
