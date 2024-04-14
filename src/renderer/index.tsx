import { lazy, StrictMode, Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';

import MaterialSymbolPreloader from '@/renderer/components/MaterialSymbolPreloader';

import './index.css';

import 'react-material-symbols/rounded';

const App = lazy(() => import('@/renderer/App'));

const Index = () => {
    return (
        <StrictMode>
            <HashRouter>
                <Suspense>
                    <App />
                </Suspense>
            </HashRouter>
            <MaterialSymbolPreloader icons={['genetics']} />
        </StrictMode>
    );
};

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(<Index />);

postMessage({ payload: 'removeLoading' }, '*');
