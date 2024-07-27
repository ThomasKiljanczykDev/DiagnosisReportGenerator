import { persistStore } from 'redux-persist';

import { createAppStore } from '@/common/redux/store';
import { InterProcessStorage } from '@/renderer/redux/inter-process-storage';

export const rendererStore = createAppStore(new InterProcessStorage());
export const rendererPersistor = persistStore(rendererStore);

export type AppDispatch = typeof rendererStore.dispatch;
