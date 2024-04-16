import { Patient } from '@/common/models/patient';

export interface Api {
    setStoreValue: (key: string, value: unknown) => Promise<void>;
    getStoreValue: (key: string) => Promise<unknown>;
    deleteStoreValue: (key: string) => Promise<void>;
    parseExcelFile: (fileData: Uint8Array) => Promise<Patient[]>;
    parseCsvFile: (fileData: string) => Promise<Patient[]>;
    renderReportPackage: (
        templateFileData: Uint8Array,
        patientData: Patient[]
    ) => Promise<Uint8Array>;
}
