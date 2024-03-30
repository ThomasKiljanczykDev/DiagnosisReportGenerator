import { createReport } from 'docx-templates';
import { zip as zipCb } from 'fflate';
import { AsyncZippable } from 'fflate';
import { promisify } from 'util';

import { Patient } from '@/common/models/patient';

const zip = promisify(zipCb);

export default class ExportService {
    static async generateReport(templateFileData: Uint8Array, patientData: Patient[]) {
        const reports: AsyncZippable = {};

        for (const patient of patientData) {
            const data: { [key: string]: string } = {
                date: new Date().toLocaleDateString(),
                cardNumber: patient.cardNumber,
                name: patient.name,
                pesel: patient.pesel.toString()
            };

            const report = await createReport({
                template: templateFileData,
                cmdDelimiter: ['{{', '}}'],
                data
            });

            const patientName = patient.name.replace(' ', '-');
            const filename = `${patient.cardNumber}-${patientName}.docx`;
            reports[filename] = new Uint8Array(report);
        }

        return zip(reports);
    }
}
