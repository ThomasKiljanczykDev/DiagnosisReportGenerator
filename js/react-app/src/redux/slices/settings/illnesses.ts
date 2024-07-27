import { createEntityAdapter } from '@reduxjs/toolkit';

import type { Illness } from '@/common/types/entities';
import { createAppSlice } from '@/redux/common';
import { recommendationActions } from '@/redux/slices/settings/recommendations';

export const illnessesAdapter = createEntityAdapter<Illness>({
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
    extraReducers: (builder) => {
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

export const illnessesActions = illnessesSlice.actions;
