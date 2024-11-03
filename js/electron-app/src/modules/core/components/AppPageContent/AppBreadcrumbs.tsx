import React from 'react';

import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import NavigateNextRoundedIcon from '@mui/icons-material/NavigateNextRounded';
import { Breadcrumbs, useTheme } from '@mui/material';
import { Link, useLocation } from '@tanstack/react-router';

export default function AppBreadcrumbs() {
    const theme = useTheme();
    const location = useLocation();

    const pathElements = location.pathname.split('/');

    return (
        <Breadcrumbs
            separator={<NavigateNextRoundedIcon fontSize="small" />}
            aria-label="breadcrumb"
        >
            {pathElements.map((pathElement, index) => {
                const isRoot = index === 0;
                const isActive = index === pathElements.length - 1;

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
                            <HomeRoundedIcon fontSize="small" />
                        </Link>
                    );
                }

                // TODO: Add i18n translations
                return (
                    <Link
                        key={index}
                        to={to}
                        style={{
                            color: !isActive ? 'inherit' : theme.palette.primary.main,
                            textDecoration: 'none'
                        }}
                    >
                        {pathElement}
                    </Link>
                );
            })}
        </Breadcrumbs>
    );
}
