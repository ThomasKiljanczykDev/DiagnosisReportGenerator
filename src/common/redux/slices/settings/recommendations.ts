import { createAppSlice } from '@/common/redux/redux-common';
import { RootState } from '@/common/redux/store';
import { Range } from '@/renderer/components/cells/RangeEditCell';
import { createEntityAdapter } from '@reduxjs/toolkit';

export enum RecommendationLevel {
    I = 1,
    II = 2,
    III = 3
}

export interface Recommendation {
    id: string;
    name: string;
    content: string;
    recommendationLevel: RecommendationLevel;
    priority: number | null;
    ageRange: Range;
}

const recommendationAdapter = createEntityAdapter<Recommendation>({
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

export const recommendationSelectors = recommendationAdapter.getSelectors(
    (state: RootState) => state.settings.recommendations
);

export const recommendationActions = recommendationsSlice.actions;
