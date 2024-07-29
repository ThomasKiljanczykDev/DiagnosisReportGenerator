import { format } from 'date-fns';
import { createReport } from 'docx-templates';
import { type AsyncZippable, zip as zipCb } from 'fflate';
import { promisify } from 'util';

import {
    MutationService,
    RecommendationLevel,
    RecommendationService,
    TestMethodService
} from '@diagnosis-report-generator/api/services';

import { type Patient } from '@/common/models/patient';
import { type Report, type ReportGene } from '@/common/models/report';
import { formatStaffMember } from '@/common/utils/formatting';

const zip = promisify(zipCb);

export default class ExportService {
    static async generateReport(templateFileData: Uint8Array, patientData: Patient[]) {
        const reports: AsyncZippable = {};

        const mutations = await MutationService.getList().then((result) => result.items);
        const recommendations = await RecommendationService.getList().then(
            (result) => result.items
        );
        const testMethods = await TestMethodService.getList().then((result) => result.items);

        for (const patient of patientData) {
            const patientLevel1Recommendations = new Set<string>(
                patient.illness?.recommendationIds
                    .map((recommendationId) =>
                        recommendations.find(
                            (r) => r.id === recommendationId && r.level == RecommendationLevel.I
                        )
                    )
                    .sort((a, b) => (a?.priority ?? -1) - (b?.priority ?? -1))
                    .map((recommendation) => recommendation?.name)
                    .filter((name) => name !== undefined)
                    .map((name) => name!)
                    .flat() ?? []
            );

            const patientLevel2Recommendations = new Set<string>(
                patient.illness?.recommendationIds
                    .map((recommendationId) =>
                        recommendations.find(
                            (r) => r.id === recommendationId && r.level == RecommendationLevel.II
                        )
                    )
                    .sort((a, b) => (a?.priority ?? -1) - (b?.priority ?? -1))
                    .map((recommendation) => recommendation?.name)
                    .filter((name) => name !== undefined)
                    .map((name) => name!)
                    .flat() ?? []
            );

            const genes: ReportGene[] = patient.genes.map((gene) => ({
                id: gene.id,
                name: gene.name,
                testMethods: gene.testMethodIds
                    .map((testMethodId) => testMethods.find((tm) => tm.id === testMethodId))
                    .filter((testMethod) => testMethod !== undefined)
                    .map((testMethod) => testMethod!),
                mutations: gene.mutationIds
                    .map((mutationId) => mutations.find((m) => m.id === mutationId))
                    .filter((mutation) => mutation !== undefined)
                    .map((mutation) => mutation!)
            }));

            const data: Report = {
                date: format(new Date(), 'dd-MM-yyyy'),
                cardNumber: patient.cardNumber,
                name: patient.name,
                pesel: patient.pesel.string,
                doctor: formatStaffMember(patient.doctor),
                assistants: patient.assistants
                    .map((assistant) => formatStaffMember(assistant))
                    .join(', '),
                // TODO: How to handle undefined technicians?
                technicians:
                    patient.technicians
                        ?.map((technician) => formatStaffMember(technician))
                        .join(', ') ?? '',
                consultants: patient.consultants
                    .map((consultant) => formatStaffMember(consultant))
                    .join(', '),
                genes: genes,
                diagnosis: patient.diagnosis,
                level1Recommendations: [...patientLevel1Recommendations],
                level2Recommendations: [...patientLevel2Recommendations]
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
