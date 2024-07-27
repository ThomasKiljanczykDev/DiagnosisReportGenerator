import { StrictMode, Suspense, lazy } from 'react';

import ReactDOM from 'react-dom/client';
import 'react-material-symbols/rounded';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';

import MaterialSymbolPreloader from '@/renderer/components/MaterialSymbolPreloader';
import { rendererPersistor, rendererStore } from '@/renderer/redux/store';

import './index.css';

const App = lazy(() => import('@/renderer/App'));

const Index = () => {
    return (
        <StrictMode>
            <Provider store={rendererStore}>
                <PersistGate loading={null} persistor={rendererPersistor}>
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
};

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(<Index />);

postMessage({ payload: 'removeLoading' }, '*');
