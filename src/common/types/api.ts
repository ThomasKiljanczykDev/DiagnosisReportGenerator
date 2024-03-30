import { Patient } from '@/common/models/patient';

export interface Api {
    parseExcelFile: (fileData: Uint8Array) => Promise<Patient[]>;
    parseCsvFile: (fileData: string) => Promise<Patient[]>;
    renderReportPackage: (
        templateFileData: Uint8Array,
        patientData: Patient[]
    ) => Promise<Uint8Array>;
}
