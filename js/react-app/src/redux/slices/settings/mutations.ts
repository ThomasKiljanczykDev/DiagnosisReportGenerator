import { createEntityAdapter } from '@reduxjs/toolkit';

import type { Mutation } from '@/common/types/entities';
import { createAppSlice } from '@/redux/common';

export const mutationsAdapter = createEntityAdapter<Mutation>({
    sortComparer: (a, b) => a.name.localeCompare(b.name)
});

const mutationsSlice = createAppSlice({
    name: 'mutations',
    initialState: mutationsAdapter.getInitialState(),
    reducers: {
        addMutation: mutationsAdapter.addOne,
        updateMutation: mutationsAdapter.updateOne,
        removeMutation: mutationsAdapter.removeOne
    }
});

export default mutationsSlice;

export const mutationsActions = mutationsSlice.actions;
