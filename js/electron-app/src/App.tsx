import React, { Suspense, useMemo } from 'react';

import axios from 'axios';

import { serviceOptions } from '@diagnosis-report-generator/api/services';
import { ThemeProvider, createTheme } from '@mui/material';
import { plPL } from '@mui/material/locale';
import { plPL as dataGridPlPL } from '@mui/x-data-grid/locales';
import { RouterProvider, createRouter } from '@tanstack/react-router';

import MaterialSymbolPreloader from '@/modules/app/components/MaterialSymbolPreloader';

import './App.css';
// Import the generated route tree
import { routeTree } from './routeTree.gen';

// Create a new router instance
const router = createRouter({ routeTree });

// Register the router instance for type safety
declare module '@tanstack/react-router' {
    interface Register {
        router: typeof router;
    }
}

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
