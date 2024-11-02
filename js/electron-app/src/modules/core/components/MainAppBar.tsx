import { memo } from 'react';

import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import NavigateNextRoundedIcon from '@mui/icons-material/NavigateNextRounded';
import { AppBar, Breadcrumbs, Toolbar } from '@mui/material';
import { Link, useLocation } from '@tanstack/react-router';

const MainAppBar = memo(function MainAppBar() {
    const location = useLocation();

    const pathElements = location.pathname.split('/');

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
                <Breadcrumbs
                    separator={<NavigateNextRoundedIcon fontSize="small" />}
                    aria-label="breadcrumb"
                    sx={{
                        color: 'white'
                    }}
                >
                    {pathElements.map((pathElement, index) => {
                        const isRoot = index === 0;
                        const to = pathElements.slice(0, index + 1).join('/');

                        // TODO: Move styles to css file
                        if (isRoot) {
                            return (
                                <Link
                                    key={index}
                                    to="/"
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        color: 'inherit',
                                        textDecoration: 'none'
                                    }}
                                >
                                    <HomeRoundedIcon />
                                </Link>
                            );
                        }

                        // TODO: Add i18n translations
                        return (
                            <Link
                                key={index}
                                to={to}
                                style={{
                                    color: 'inherit',
                                    textDecoration: 'none'
                                }}
                            >
                                {pathElement}
                            </Link>
                        );
                    })}
                </Breadcrumbs>
            </Toolbar>
        </AppBar>
    );
});

export default MainAppBar;
