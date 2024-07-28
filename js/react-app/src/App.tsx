import { Suspense, lazy } from 'react';

import axios from 'axios';
import 'react-material-symbols/rounded';
import { HashRouter } from 'react-router-dom';

import { serviceOptions } from '@diagnosis-report-generator/api/services';

const AppContent = lazy(() => import('@/AppContent'));

serviceOptions.axios = axios.create({
    baseURL: import.meta.env.VITE_API_URL
});

export default function App() {
    // TODO: Move appbar height to a global const
    return (
        <Suspense>
            <HashRouter>
                <AppContent />
            </HashRouter>
        </Suspense>
    );
}
