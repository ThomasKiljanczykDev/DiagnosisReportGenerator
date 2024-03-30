import { ipcRenderer } from 'electron';

import { Patient } from '@/common/models/patient';
import { Api } from '@/common/types/api';

async function parseExcelFile(fileData: ArrayBuffer) {
    return ipcRenderer.invoke(parseExcelFile.name, fileData);
}

async function parseCsvFile(fileData: string) {
    return ipcRenderer.invoke(parseCsvFile.name, fileData);
}

async function renderReportPackage(templateFileData: Uint8Array, patientData: Patient[]) {
    return ipcRenderer.invoke(renderReportPackage.name, templateFileData, patientData);
}

const api: Api = { parseExcelFile, parseCsvFile, renderReportPackage };

export default api;
