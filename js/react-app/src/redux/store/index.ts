import { persistReducer, persistStore } from 'redux-persist';
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE } from 'redux-persist/es/constants';
import storage from 'redux-persist/lib/storage';

import { combineReducers, configureStore } from '@reduxjs/toolkit';

import settingsReducer from '../slices/settings';

const reducers = combineReducers({
    settings: settingsReducer
});

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['settings']
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
    reducer: persistedReducer,
    devTools: import.meta.env.VITE_NODE_ENV !== 'production',
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
            }
        });
    }
});

export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof reducers>;
export type AppDispatch = typeof store.dispatch;
