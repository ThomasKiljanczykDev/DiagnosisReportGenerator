import React, { type PropsWithChildren, type ReactNode, memo } from 'react';

import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import NavigateNextRoundedIcon from '@mui/icons-material/NavigateNextRounded';
import { Breadcrumbs, Grid2 } from '@mui/material';
import { Link, useLocation } from '@tanstack/react-router';

interface AppPageContentProps {
    title: string;
    actionButtons?: ReactNode;
}

function AppBreadcrumbs() {
    const location = useLocation();

    const pathElements = location.pathname.split('/');

    return (
        <Breadcrumbs
            separator={<NavigateNextRoundedIcon fontSize="small" />}
            aria-label="breadcrumb"
            sx={{
                color: 'black'
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
    );
}

const AppPageContent = memo(function AppPageContent(props: PropsWithChildren<AppPageContentProps>) {
    return (
        <Grid2
            container
            flexDirection="column"
            height="100%"
            width="100%"
            spacing={3}
            minWidth={0}
            minHeight={0}
            maxWidth="100%"
        >
            <Grid2 flexShrink={0} minWidth={0} minHeight={0} maxWidth="100%">
                <AppBreadcrumbs />
            </Grid2>
            <Grid2
                display="flex"
                flexShrink={0}
                minWidth={0}
                minHeight={0}
                maxWidth="100%"
                justifyContent="space-between"
            >
                <h2 style={{ color: 'black', margin: 0 }}>{props.title}</h2>
                {props.actionButtons}
            </Grid2>
            <Grid2
                display="flex"
                flex={1}
                flexDirection="column"
                minWidth={0}
                minHeight={0}
                maxWidth="100%"
            >
                {props.children}
            </Grid2>
        </Grid2>
    );
});
export default AppPageContent;
