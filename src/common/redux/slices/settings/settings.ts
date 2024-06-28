import { combineReducers } from '@reduxjs/toolkit';

import { createAppSlice } from '../../redux-common';

import diagnoses from './diagnoses';
import illnesses from './illnesses';
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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface Illness {
    id: string;
    name: string;
    recommendationIds: RecommendationId[];
}

interface SettingsState {
    genes: Genes[];
}

const settingsSlice = createAppSlice({
    name: 'settings',
    initialState: {
        genes: []
    } as SettingsState,
    reducers: {}
});

const settingsReducer = combineReducers({
    [settingsSlice.name]: settingsSlice.reducer,
    [diagnoses.name]: diagnoses.reducer,
    [mutations.name]: mutations.reducer,
    [illnesses.name]: illnesses.reducer,
    [recommendations.name]: recommendations.reducer,
    [staff.name]: staff.reducer,
    [testMethods.name]: testMethods.reducer
});

export default settingsReducer;

export const settingsActions = settingsSlice.actions;
