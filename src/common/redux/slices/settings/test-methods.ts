import { createEntityAdapter } from '@reduxjs/toolkit';

import { createAppSlice } from '@/common/redux/redux-common';
import { type RootState } from '@/common/redux/store';

export interface TestMethod {
    id: string;
    name: string;
}

const testMethodsAdapter = createEntityAdapter<TestMethod>({
    sortComparer: (a, b) => a.name.localeCompare(b.name)
});

const testMethodsSlice = createAppSlice({
    name: 'testMethods',
    initialState: testMethodsAdapter.getInitialState(),
    reducers: {
        addTestMethods: testMethodsAdapter.addOne,
        updateTestMethods: testMethodsAdapter.updateOne,
        removeTestMethods: testMethodsAdapter.removeOne
    }
});

export default testMethodsSlice;

export const testMethodsSelectors = testMethodsAdapter.getSelectors(
    (state: RootState) => state.settings.testMethods
);

export const testMethodsActions = testMethodsSlice.actions;
