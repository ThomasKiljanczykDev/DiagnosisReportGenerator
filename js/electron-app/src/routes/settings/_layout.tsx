import React from 'react';

import { Box, useTheme } from '@mui/material';
import { Outlet, createFileRoute } from '@tanstack/react-router';

import SettingsDrawer from '@/modules/core/components/drawer/SettingsDrawer';

function SettingsLayout() {
    const theme = useTheme();

    return (
        <Box
            minWidth={0}
            minHeight={0}
            sx={{
                display: 'flex',
                width: '100%',
                height: `100%`,
                backgroundColor: theme.palette.background.default,
                transition: 'background-color 0.3s'
            }}
        >
            <SettingsDrawer />
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    padding: 3,
                    minWidth: 0,
                    minHeight: 0
                }}
            >
                <Outlet />
            </Box>
        </Box>
    );
}

export const Route = createFileRoute('/settings')({
    component: SettingsLayout
});
