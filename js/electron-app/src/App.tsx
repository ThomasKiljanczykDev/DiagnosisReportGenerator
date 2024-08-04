import React, { Suspense, useMemo } from 'react';

import axios from 'axios';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';

import { serviceOptions } from '@diagnosis-report-generator/api/services';
import { routes } from '@generouted/react-router/lazy';
import { ThemeProvider, createTheme } from '@mui/material';
import { plPL } from '@mui/material/locale';
import { plPL as dataGridPlPL } from '@mui/x-data-grid/locales';

import MaterialSymbolPreloader from '@/modules/app/components/MaterialSymbolPreloader';

import './App.css';

const router = createMemoryRouter(routes);

serviceOptions.axios = axios.create({
    baseURL: import.meta.env.VITE_API_URL
});

export default function App() {
    const themeWithLocale = useMemo(() => createTheme(plPL, dataGridPlPL), []);

    return (
        <ThemeProvider theme={themeWithLocale}>
            <Suspense>
                <RouterProvider router={router} />
            </Suspense>
            <MaterialSymbolPreloader />
        </ThemeProvider>
    );
}
