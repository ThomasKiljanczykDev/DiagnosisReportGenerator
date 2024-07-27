import { StrictMode, Suspense, lazy } from 'react';

import 'react-material-symbols/rounded';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';

import MaterialSymbolPreloader from '@/components/MaterialSymbolPreloader';
import { persistor, store } from '@/redux/store';

import './Index.css';

const App = lazy(() => import('@/App'));

export default function Index() {
    return (
        <StrictMode>
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <HashRouter>
                        <Suspense>
                            <App />
                        </Suspense>
                    </HashRouter>
                </PersistGate>
            </Provider>
            <MaterialSymbolPreloader icons={['genetics']} />
        </StrictMode>
    );
}
