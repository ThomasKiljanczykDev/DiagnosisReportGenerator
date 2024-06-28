import { createAppSlice } from '@/common/redux/redux-common';
import { type RootState } from '@/common/redux/store';
import { createEntityAdapter } from '@reduxjs/toolkit';

export interface Mutation {
    id: string;
    name: string;
}

const mutationsAdapter = createEntityAdapter<Mutation>({
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

export const mutationsSelectors = mutationsAdapter.getSelectors(
    (state: RootState) => state.settings.mutations
);

export const mutationsActions = mutationsSlice.actions;
