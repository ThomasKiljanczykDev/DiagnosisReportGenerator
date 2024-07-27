import { persistStore } from 'redux-persist';

import { createAppStore } from '@/common/redux/store';
import ElectronStorage from '@/main/backend/redux/electron-storage';

export const backendStore = createAppStore(new ElectronStorage());

export const backendPersistor = persistStore(backendStore);
