import { format } from 'date-fns';
import { createReport } from 'docx-templates';
import { zip as zipCb } from 'fflate';
import { AsyncZippable } from 'fflate';
import { promisify } from 'util';

import { Patient } from '@/common/models/patient';
import { Report } from '@/common/models/report';

const zip = promisify(zipCb);

export default class ExportService {
    static async generateReport(templateFileData: Uint8Array, patientData: Patient[]) {
        const reports: AsyncZippable = {};

        for (const patient of patientData) {
            const data: Report = {
                date: format(new Date(), 'dd-MM-yyyy'),
                cardNumber: patient.cardNumber,
                name: patient.name,
                pesel: patient.pesel.string,
                doctor: patient.doctor,
                assistants: patient.assistants.join(', '),
                // TODO: How to handle undefined technicians?
                technicians: patient.technicians?.join(', ') ?? '',
                consultants: patient.consultants.join(', ')
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
