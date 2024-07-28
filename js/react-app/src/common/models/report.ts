import type {
    DiagnosisDto,
    MutationDto,
    TestMethodDto
} from '@diagnosis-report-generator/api/services';

export interface ReportGene {
    id: string;
    name: string;
    testMethods: TestMethodDto[];
    mutations: MutationDto[];
}

export interface Report {
    date: string;
    cardNumber: string;
    name: string;
    pesel: string;
    doctor: string;
    assistants: string;
    technicians: string;
    consultants: string;
    genes: ReportGene[];
    diagnosis: DiagnosisDto | null;
    level1Recommendations: string[];
    level2Recommendations: string[];
}
