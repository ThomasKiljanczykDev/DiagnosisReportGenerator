import staff from '@/common/redux/slices/settings/staff';
import { combineReducers } from '@reduxjs/toolkit';

import { createAppSlice } from '../redux-common';

type RecommendationId = string;
type MutationId = string;

interface Diagnosis {
    id: string;
    name: string;
}

interface Mutation {
    id: MutationId;
    name: string;
}

interface Recommendation {
    id: RecommendationId;
    name: string;
    content: string;
    level: 1 | 2 | 3;
    priority: number;
    ageRange: {
        from: number;
        to: number;
    };
}

interface Genes {
    id: string;
    name: string;
    testMethods: string[];
    mutationIds: MutationId[];
}

interface Illness {
    id: string;
    name: string;
    recommendationIds: RecommendationId[];
}

interface SettingsState {
    diagnoses: Diagnosis[];
    mutations: Mutation[];
    recommendations: Recommendation[];
    genes: Genes[];
    illnesses: Illness[];
}

const settingsSlice = createAppSlice({
    name: 'settings',
    initialState: {
        diagnoses: [],
        mutations: [],
        recommendations: [],
        genes: [],
        illnesses: []
    } as SettingsState,
    reducers: {}
});

const settingsReducer = combineReducers({
    [settingsSlice.name]: settingsSlice.reducer,
    [staff.name]: staff.reducer
});

export default settingsReducer;

export const settingsActions = settingsSlice.actions;
