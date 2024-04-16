import { ipcRenderer } from 'electron';

import { Patient } from '@/common/models/patient';
import { Api } from '@/common/types/api';

function setStoreValue(key: string, value: unknown) {
    return ipcRenderer.invoke(setStoreValue.name, key, value);
}

function getStoreValue(key: string) {
    return ipcRenderer.invoke(getStoreValue.name, key);
}

function deleteStoreValue(key: string) {
    return ipcRenderer.invoke(deleteStoreValue.name, key);
}

async function parseExcelFile(fileData: ArrayBuffer) {
    return ipcRenderer.invoke(parseExcelFile.name, fileData);
}

async function parseCsvFile(fileData: string) {
    return ipcRenderer.invoke(parseCsvFile.name, fileData);
}

async function renderReportPackage(templateFileData: Uint8Array, patientData: Patient[]) {
    return ipcRenderer.invoke(renderReportPackage.name, templateFileData, patientData);
}

const api: Api = {
    setStoreValue,
    getStoreValue,
    deleteStoreValue,
    parseExcelFile,
    parseCsvFile,
    renderReportPackage
};

export default api;
