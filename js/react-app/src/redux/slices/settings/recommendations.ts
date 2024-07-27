import { createEntityAdapter } from '@reduxjs/toolkit';

import type { Recommendation } from '@/common/types/entities';
import { createAppSlice } from '@/redux/common';

export const recommendationAdapter = createEntityAdapter<Recommendation>({
    sortComparer: (a, b) => a.name.localeCompare(b.name)
});

const recommendationsSlice = createAppSlice({
    name: 'recommendations',
    initialState: recommendationAdapter.getInitialState(),
    reducers: {
        addRecommendation: recommendationAdapter.addOne,
        updateRecommendation: recommendationAdapter.updateOne,
        removeRecommendation: recommendationAdapter.removeOne
    }
});

export default recommendationsSlice;

export const recommendationActions = recommendationsSlice.actions;
