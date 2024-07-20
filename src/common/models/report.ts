import type { Diagnosis, Mutation, TestMethod } from '@/common/types/entities';

export interface ReportGene {
    id: string;
    name: string;
    testMethods: TestMethod[];
    mutations: Mutation[];
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
    diagnosis: Diagnosis | null;
    level1Recommendations: string[];
    level2Recommendations: string[];
}
