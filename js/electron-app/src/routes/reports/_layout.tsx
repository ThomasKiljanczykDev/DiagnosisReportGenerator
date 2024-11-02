import React from 'react';

import { Box } from '@mui/material';
import { Outlet, createFileRoute } from '@tanstack/react-router';

import MainAppBar from '@/modules/core/components/MainAppBar';
import MainDrawer from '@/modules/core/components/drawer/MainDrawer';

export function ReportsLayout() {
    return (
        <>
            <MainAppBar />
            <Box
                minWidth={0}
                minHeight={0}
                sx={{
                    display: 'flex',
                    width: '100%',
                    height: `calc(100% - ${64}px)`
                }}
            >
                <MainDrawer />
                <Box
                    component="main"
                    sx={{
                        flexGrow: 1,
                        padding: 3,
                        minWidth: 0,
                        minHeight: 0,
                        backgroundColor: 'white',
                        borderRadius: '4px',
                        margin: '1rem'
                    }}
                >
                    <Outlet />
                </Box>
            </Box>
        </>
    );
}

export const Route = createFileRoute('/reports')({
    component: ReportsLayout
});
