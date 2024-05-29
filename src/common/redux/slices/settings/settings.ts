import { combineReducers } from '@reduxjs/toolkit';

import { createAppSlice } from '../../redux-common';

import diagnoses from './diagnoses';
import mutations from './mutations';
import recommendations from './recommendations';
import staff from './staff';
import testMethods from './test-methods';

type RecommendationId = string;
type MutationId = string;

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
    genes: Genes[];
    illnesses: Illness[];
}

const settingsSlice = createAppSlice({
    name: 'settings',
    initialState: {
        genes: [],
        illnesses: []
    } as SettingsState,
    reducers: {}
});

const settingsReducer = combineReducers({
    [settingsSlice.name]: settingsSlice.reducer,
    [diagnoses.name]: diagnoses.reducer,
    [mutations.name]: mutations.reducer,
    [recommendations.name]: recommendations.reducer,
    [staff.name]: staff.reducer,
    [testMethods.name]: testMethods.reducer
});

export default settingsReducer;

export const settingsActions = settingsSlice.actions;
