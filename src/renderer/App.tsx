import { useMemo } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import MainDrawer from '@/renderer/components/drawer/MainDrawer';
import SettingsDrawer from '@/renderer/components/drawer/SettingsDrawer';
import MainAppBar from '@/renderer/components/MainAppBar';
import Redirect from '@/renderer/components/Redirect';
import Reports from '@/renderer/pages/reports/Reports';
import Settings from '@/renderer/pages/settings/Settings';
import { Box, createTheme, ThemeProvider } from '@mui/material';
import { plPL } from '@mui/material/locale';
import { plPL as dataGridPlPL } from '@mui/x-data-grid/locales';

import './App.css';

export default function App() {
    const themeWithLocale = useMemo(() => createTheme(plPL, dataGridPlPL), []);
    const location = useLocation();

    const showSettingsDrawer = useMemo(() => {
        return location.pathname.startsWith('/settings');
    }, [location.pathname]);

    // TODO: Move appbar height to a global const
    return (
        <ThemeProvider theme={themeWithLocale}>
            <MainAppBar />
            <Box
                sx={{
                    display: 'flex',
                    width: '100%',
                    height: `calc(100% - ${64}px)`
                }}
            >
                {!showSettingsDrawer && <MainDrawer />}
                {showSettingsDrawer && <SettingsDrawer />}
                <Box
                    component="main"
                    sx={{
                        flexGrow: 1,
                        padding: 3,
                        backgroundColor: 'white'
                    }}
                >
                    <Routes>
                        <Route element={<Redirect to="/reports" />} path="/" />
                        <Route element={<Reports />} path="/reports" />
                        <Route element={<Settings />} path="/settings/*" />
                    </Routes>
                </Box>
            </Box>
        </ThemeProvider>
    );
}
