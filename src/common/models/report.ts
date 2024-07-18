import type { Mutation, TestMethod } from '@/common/types/entities';

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
    level1Recommendations: string[];
    level2Recommendations: string[];
}
