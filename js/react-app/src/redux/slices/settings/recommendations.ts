import { createEntityAdapter } from '@reduxjs/toolkit';

import { createAppSlice } from '@/redux/common';
import type { Recommendation } from '@/common/types/entities';

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
