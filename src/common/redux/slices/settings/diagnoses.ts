import { createAppSlice } from '@/common/redux/redux-common';
import { type RootState } from '@/common/redux/store';
import { createEntityAdapter } from '@reduxjs/toolkit';

export interface Diagnosis {
    id: string;
    name: string;
}

const diagnosesAdapter = createEntityAdapter<Diagnosis>({
    sortComparer: (a, b) => a.name.localeCompare(b.name)
});

const diagnosesSlice = createAppSlice({
    name: 'diagnoses',
    initialState: diagnosesAdapter.getInitialState(),
    reducers: {
        addDiagnosis: diagnosesAdapter.addOne,
        updateDiagnosis: diagnosesAdapter.updateOne,
        removeDiagnosis: diagnosesAdapter.removeOne
    }
});

export default diagnosesSlice;

export const diagnosesSelectors = diagnosesAdapter.getSelectors(
    (state: RootState) => state.settings.diagnoses
);

export const diagnosesActions = diagnosesSlice.actions;
