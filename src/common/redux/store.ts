import { persistReducer, type WebStorage } from 'redux-persist';
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE } from 'redux-persist/es/constants';

import { combineReducers, configureStore } from '@reduxjs/toolkit';

import settingsReducer from './slices/settings';

const reducers = combineReducers({
    settings: settingsReducer
});

export function createAppStore(storage: WebStorage) {
    const persistConfig = {
        key: 'root',
        storage,
        whitelist: ['settings']
    };

    const persistedReducer = persistReducer(persistConfig, reducers);

    return configureStore({
        reducer: persistedReducer,
        devTools: import.meta.env.VITE_NODE_ENV !== 'production',
        middleware: getDefaultMiddleware => {
            return getDefaultMiddleware({
                serializableCheck: {
                    ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
                }
            });
        }
    });
}

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof reducers>;
