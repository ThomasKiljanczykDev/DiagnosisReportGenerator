import { persistStore } from 'redux-persist';

import { createAppStore } from '@/common/redux/store';
import { interProcessStorage } from '@/renderer/redux/inter-process-storage';

export const rendererStore = createAppStore(interProcessStorage);
export const rendererPersistor = persistStore(rendererStore);

export type AppDispatch = typeof rendererStore.dispatch;
