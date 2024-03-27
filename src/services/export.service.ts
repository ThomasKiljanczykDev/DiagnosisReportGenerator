import { createReport } from 'docx-templates';
import { zip as zipCb } from 'fflate';
import { AsyncZippable } from 'fflate/esm/browser';
import { promisify } from 'util';

import { Patient } from '@/type/common';

const zip = promisify(zipCb);

export default class ExportService {
    static async generateReport(templateFile: File, patientData: Patient[]) {
        const docxBuffer = await templateFile.arrayBuffer();
        const uint8Array = new Uint8Array(docxBuffer);

        const reports: AsyncZippable = {};

        for (const patient of patientData) {
            const data: { [key: string]: string } = {
                date: new Date().toLocaleDateString(),
                cardNumber: patient.cardNumber,
                name: patient.name,
                pesel: patient.pesel.toString()
            };

            const report = await createReport({
                template: uint8Array,
                cmdDelimiter: ['{{', '}}'],
                data
            });

            const patientName = patient.name.replace(' ', '_');
            const filename = `${patient.cardNumber}-${patientName}.docx`;
            reports[filename] = new Uint8Array(report);
        }

        return zip(reports);
    }
}
