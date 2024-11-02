import React from 'react';

import { Box } from '@mui/material';
import { Outlet, createFileRoute } from '@tanstack/react-router';

import MainAppBar from '@/modules/core/components/MainAppBar';
import SettingsDrawer from '@/modules/core/components/drawer/SettingsDrawer';

function SettingsLayout() {
    return (
        <>
            <MainAppBar title="Ustawienia" />
            <Box
                minWidth={0}
                minHeight={0}
                sx={{
                    display: 'flex',
                    width: '100%',
                    height: `calc(100% - ${64}px)`
                }}
            >
                <SettingsDrawer />
                <Box
                    component="main"
                    sx={{
                        flexGrow: 1,
                        padding: 3,
                        minWidth: 0,
                        minHeight: 0,
                        backgroundColor: 'white'
                    }}
                >
                    <Outlet />
                </Box>
            </Box>
        </>
    );
}

export const Route = createFileRoute('/settings')({
    component: SettingsLayout
});
