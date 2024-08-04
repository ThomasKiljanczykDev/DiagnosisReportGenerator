import React from 'react';

import { Outlet } from 'react-router-dom';

import { Box } from '@mui/material';

import MainAppBar from '@/modules/core/components/MainAppBar';
import MainDrawer from '@/modules/core/components/drawer/MainDrawer';

export default function ReportsLayout() {
    return (
        <>
            <MainAppBar title="Generowanie raportów" />
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
                        backgroundColor: 'white'
                    }}
                >
                    <Outlet />
                </Box>
            </Box>
        </>
    );
}
