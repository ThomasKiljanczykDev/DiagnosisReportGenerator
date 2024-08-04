import { memo } from 'react';

import { AppBar, Toolbar, Typography } from '@mui/material';

interface MainAppBarProps {
    title: string;
}

const MainAppBar = memo(function MainAppBar(props: MainAppBarProps) {
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
                    {props.title}
                </Typography>
            </Toolbar>
        </AppBar>
    );
});

export default MainAppBar;
