import { Suspense, lazy } from 'react';

import 'react-material-symbols/rounded';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';

import { persistor, store } from '@/redux/store';

const AppContent = lazy(() => import('@/AppContent'));

export default function App() {
    // TODO: Move appbar height to a global const
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <HashRouter>
                    <Suspense>
                        <AppContent />
                    </Suspense>
                </HashRouter>
            </PersistGate>
        </Provider>
    );
}
