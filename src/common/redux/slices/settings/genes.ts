import { createEntityAdapter } from '@reduxjs/toolkit';

import { createAppSlice } from '@/common/redux/redux-common';
import { mutationsActions } from '@/common/redux/slices/settings/mutations';
import { testMethodsActions } from '@/common/redux/slices/settings/test-methods';
import { type RootState } from '@/common/redux/store';

export interface Gene {
    id: string;
    name: string;
    testMethodIds: string[];
    mutationIds: string[];
}

const genesAdapter = createEntityAdapter<Gene>({
    sortComparer: (a, b) => a.name.localeCompare(b.name)
});

const genesSlice = createAppSlice({
    name: 'genes',
    initialState: genesAdapter.getInitialState(),
    reducers: {
        addGene: genesAdapter.addOne,
        updateGene: genesAdapter.updateOne,
        removeGene: genesAdapter.removeOne
    },
    // TODO: Add reducers for removing test methods and mutations
    extraReducers: builder => {
        builder.addCase(testMethodsActions.removeTestMethods, (state, action) => {
            const testMethodId = action.payload;
            for (const gene of Object.values(state.entities)) {
                const index = gene.testMethodIds.indexOf(testMethodId);
                if (index === -1) {
                    continue;
                }

                gene.testMethodIds.splice(index, 1);
            }
        });

        builder.addCase(mutationsActions.removeMutation, (state, action) => {
            const mutationId = action.payload;
            for (const gene of Object.values(state.entities)) {
                const index = gene.mutationIds.indexOf(mutationId);
                if (index === -1) {
                    continue;
                }

                gene.mutationIds.splice(index, 1);
            }
        });
    }
});

export default genesSlice;

export const genesSelectors = genesAdapter.getSelectors((state: RootState) => state.settings.genes);

export const genesActions = genesSlice.actions;
