import { createEntityAdapter } from '@reduxjs/toolkit';

import { createAppSlice } from '@/common/redux/redux-common';
import { recommendationActions } from '@/common/redux/slices/settings/recommendations';
import { type RootState } from '@/common/redux/store';

export interface Illness {
    id: string;
    name: string;
    recommendationIds: string[];
}

const illnessesAdapter = createEntityAdapter<Illness>({
    sortComparer: (a, b) => a.name.localeCompare(b.name)
});

const illnessesSlice = createAppSlice({
    name: 'illnesses',
    initialState: illnessesAdapter.getInitialState(),
    reducers: {
        addIllness: illnessesAdapter.addOne,
        updateIllness: illnessesAdapter.updateOne,
        removeIllness: illnessesAdapter.removeOne
    },
    extraReducers: builder => {
        builder.addCase(recommendationActions.removeRecommendation, (state, action) => {
            const recommendationId = action.payload;
            for (const illness of Object.values(state.entities)) {
                const index = illness.recommendationIds.indexOf(recommendationId);
                if (index === -1) {
                    continue;
                }

                illness.recommendationIds.splice(index, 1);
            }
        });
    }
});

export default illnessesSlice;

export const illnessesSelectors = illnessesAdapter.getSelectors(
    (state: RootState) => state.settings.illnesses
);

export const illnessesActions = illnessesSlice.actions;
