import React, { type PropsWithChildren, type ReactNode, memo } from 'react';

import { Grid2, useTheme } from '@mui/material';

import AppBreadcrumbs from '@/modules/core/components/AppBreadcrumbs';
import DarkModeToggle from '@/modules/core/components/DarkModeToggle';

interface AppPageContentProps {
    title: string;
    actionButtons?: ReactNode;
}

const AppPageContent = memo(function AppPageContent(props: PropsWithChildren<AppPageContentProps>) {
    const theme = useTheme();

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
            <Grid2
                flexShrink={0}
                minWidth={0}
                minHeight={0}
                maxWidth="100%"
                display="flex"
                justifyContent="space-between"
            >
                <AppBreadcrumbs />
                <DarkModeToggle />
            </Grid2>
            <Grid2
                display="flex"
                flexShrink={0}
                minWidth={0}
                minHeight={0}
                maxWidth="100%"
                justifyContent="space-between"
            >
                <h2 style={{ color: theme.palette.text.primary, margin: 0 }}>{props.title}</h2>
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
