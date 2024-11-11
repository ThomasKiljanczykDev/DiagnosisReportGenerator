import React, { Suspense, useMemo } from 'react';

import axios from 'axios';
import { SnackbarProvider } from 'notistack';
import { useTranslation } from 'react-i18next';
import 'react-material-symbols/rounded';

import { serviceOptions } from '@diagnosis-report-generator/api/services';
import { ThemeProvider, createTheme } from '@mui/material';
import * as muiLocales from '@mui/material/locale';
import * as muiDataGridLocales from '@mui/x-data-grid/locales';
import { RouterProvider, createRouter } from '@tanstack/react-router';

import AlertSnackbar from '@/modules/core/components/AlertSnackbar';

import './App.css';
import './i18n';
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

function getMuiLocaleKey<T extends object>(locales: T, language: string): keyof T | undefined {
    return Object.keys(locales).find((key) =>
        key.toLowerCase().startsWith(language.toLowerCase())
    ) as keyof T | undefined;
}

export default function App() {
    const { i18n } = useTranslation();

    const themeWithLocale = useMemo(() => {
        const muiLocaleKey = getMuiLocaleKey(muiLocales, i18n.language) ?? 'enUS';
        const muiDataGridLocaleKey = getMuiLocaleKey(muiDataGridLocales, i18n.language) ?? 'enUS';

        return createTheme(
            {
                colorSchemes: {
                    dark: true
                },
                defaultColorScheme: 'light'
            },
            muiLocales[muiLocaleKey],
            muiDataGridLocales[muiDataGridLocaleKey]
        );
    }, [i18n.language]);

    return (
        <ThemeProvider theme={themeWithLocale}>
            <SnackbarProvider
                Components={{
                    error: AlertSnackbar,
                    success: AlertSnackbar,
                    warning: AlertSnackbar,
                    info: AlertSnackbar
                }}
            >
                <Suspense>
                    <RouterProvider router={router} />
                </Suspense>
            </SnackbarProvider>
        </ThemeProvider>
    );
}
