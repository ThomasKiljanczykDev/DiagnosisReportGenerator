import { ReducerCreators } from '@reduxjs/toolkit';

import { createAppSlice } from '../redux-common';

interface SettingsState {
    test: string;
    testObj: {
        test1: string;
        test2: string;
    };
}

function reducers(create: ReducerCreators<SettingsState>) {
    const setTest = create.reducer<string>((state, action) => {
        state.test = action.payload;
    });

    return {
        setTest
    };
}

const settingsSlice = createAppSlice({
    name: 'settings',
    initialState: {
        test: 'init',
        testObj: {
            test1: 'init1',
            test2: 'init2'
        }
    } as SettingsState,
    reducers
});

export default settingsSlice;

export const { setTest } = settingsSlice.actions;
