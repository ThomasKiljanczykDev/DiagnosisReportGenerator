import { memo, useMemo } from 'react';

import { useLocation } from 'react-router-dom';

import { AppBar, Toolbar, Typography } from '@mui/material';

const MainAppBar = memo(function MainAppBar() {
    const location = useLocation();

    const title = useMemo(() => {
        if (location.pathname.startsWith('/reports')) {
            return 'Generowanie raportów';
        }

        if (location.pathname.startsWith('/settings')) {
            return 'Ustawienia';
        }

        return '';
    }, [location.pathname]);

    // TODO: Move drawer width to a global const
    return (
        <AppBar
            position="sticky"
            sx={{
                width: `calc(100% - ${240}px)`,
                marginLeft: `${240}px`,
                height: '64px'
            }}
        >
            <Toolbar>
                <Typography variant="h6" noWrap component="div">
                    {title}
                </Typography>
            </Toolbar>
        </AppBar>
    );
});

export default MainAppBar;
