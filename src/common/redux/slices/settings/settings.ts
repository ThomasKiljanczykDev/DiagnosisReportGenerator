import { combineReducers } from '@reduxjs/toolkit';

import { createAppSlice } from '../../redux-common';

import diagnoses from './diagnoses';
import genes from './genes';
import illnesses from './illnesses';
import mutations from './mutations';
import recommendations from './recommendations';
import staff from './staff';
import testMethods from './test-methods';

const settingsSlice = createAppSlice({
    name: 'settings',
    initialState: {},
    reducers: {}
});

const settingsReducer = combineReducers({
    [settingsSlice.name]: settingsSlice.reducer,
    [diagnoses.name]: diagnoses.reducer,
    [genes.name]: genes.reducer,
    [mutations.name]: mutations.reducer,
    [illnesses.name]: illnesses.reducer,
    [recommendations.name]: recommendations.reducer,
    [staff.name]: staff.reducer,
    [testMethods.name]: testMethods.reducer
});

export default settingsReducer;

export const settingsActions = settingsSlice.actions;
