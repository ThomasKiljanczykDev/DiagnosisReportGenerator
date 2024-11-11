import React from 'react';

import { Box, useTheme } from '@mui/material';
import { Outlet, createRootRoute } from '@tanstack/react-router';

import AppDrawer from '@/modules/core/components/AppDrawer';

function Layout() {
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
            <AppDrawer />
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

export const Route = createRootRoute({
    component: Layout
});
