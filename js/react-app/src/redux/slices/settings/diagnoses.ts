import { createEntityAdapter } from '@reduxjs/toolkit';

import type { Diagnosis } from '@/common/types/entities';
import { createAppSlice } from '@/redux/common';

export const diagnosesAdapter = createEntityAdapter<Diagnosis>({
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

export const diagnosesActions = diagnosesSlice.actions;
