import { StrictMode } from 'react';

import ReactDOM from 'react-dom/client';

import App from '@diagnosis-report-generator/react-app/App';
import '@fontsource-variable/roboto-flex';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <StrictMode>
        <App />
    </StrictMode>
);

postMessage({ payload: 'removeLoading' }, '*');
