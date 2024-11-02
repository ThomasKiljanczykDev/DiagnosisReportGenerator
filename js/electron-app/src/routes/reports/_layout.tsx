import React from 'react';

import { Box } from '@mui/material';
import { Outlet, createFileRoute } from '@tanstack/react-router';

import MainDrawer from '@/modules/core/components/drawer/MainDrawer';

export function ReportsLayout() {
    return (
        <>
            <Box
                minWidth={0}
                minHeight={0}
                sx={{
                    display: 'flex',
                    width: '100%',
                    height: `100%`
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
