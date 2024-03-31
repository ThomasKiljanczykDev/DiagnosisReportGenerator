import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';

import MaterialSymbolPreloader from '@/renderer/components/MaterialSymbolPreloader';

import App from './App';

import './index.css';

import 'react-material-symbols/rounded';

const Index = () => {
    return (
        <StrictMode>
            <HashRouter>
                <App />
            </HashRouter>
            <MaterialSymbolPreloader icons={['genetics']} />
        </StrictMode>
    );
};

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(<Index />);

postMessage({ payload: 'removeLoading' }, '*');
