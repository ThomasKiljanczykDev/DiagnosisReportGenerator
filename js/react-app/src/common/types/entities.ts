import type { Range } from '@/components/cells/RangeEditCell';

export interface Diagnosis {
    id: string;
    name: string;
}

export interface Gene {
    id: string;
    name: string;
    testMethodIds: string[];
    mutationIds: string[];
}

export interface Illness {
    id: string;
    name: string;
    recommendationIds: string[];
}

export interface Mutation {
    id: string;
    name: string;
}

export enum RecommendationLevel {
    I = 1,
    II = 2,
    III = 3
}

export interface Recommendation {
    id: string;
    name: string;
    content: string;
    recommendationLevel: RecommendationLevel;
    priority: number | null;
    ageRange: Range;
}

export enum StaffRole {
    Doctor = 'doctor',
    Technician = 'technician',
    Consultant = 'consultant',
    Assistant = 'assistant'
}

export interface StaffMember {
    id: string;
    name: string;
    title: string;
    role: StaffRole;
}

export interface TestMethod {
    id: string;
    name: string;
}
