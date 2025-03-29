import React, { type PropsWithChildren, type ReactNode, memo } from 'react';

import Brightness4RoundedIcon from '@mui/icons-material/Brightness4Rounded';
import BrightnessHighRoundedIcon from '@mui/icons-material/BrightnessHighRounded';
import { Grid, useColorScheme, useTheme } from '@mui/material';

import AppBreadcrumbs from '@/modules/core/components/AppPageContent/AppBreadcrumbs';
import ToggleIcon from '@/modules/core/components/ToggleIcon';

interface AppPageContentProps {
    title: string;
    actionButtons?: ReactNode;
}

function DarkModeToggle() {
    const { mode, setMode } = useColorScheme();

    return (
        <ToggleIcon
            on={mode === 'dark'}
            onIcon={<BrightnessHighRoundedIcon onClick={() => setMode('light')} />}
            offIcon={<Brightness4RoundedIcon onClick={() => setMode('dark')} />}
        />
    );
}

const AppPageContent = memo(function AppPageContent(props: PropsWithChildren<AppPageContentProps>) {
    const theme = useTheme();

    return (
        <Grid
            container
            flexDirection="column"
            height="100%"
            width="100%"
            spacing={3}
            minWidth={0}
            minHeight={0}
            maxWidth="100%"
        >
            <Grid
                flexShrink={0}
                minWidth={0}
                minHeight={0}
                maxWidth="100%"
                display="flex"
                justifyContent="space-between"
            >
                <AppBreadcrumbs />
                <DarkModeToggle />
            </Grid>
            <Grid
                display="flex"
                flexShrink={0}
                minWidth={0}
                minHeight={0}
                maxWidth="100%"
                justifyContent="space-between"
            >
                <h2 style={{ color: theme.palette.text.primary, margin: 0 }}>{props.title}</h2>
                {props.actionButtons}
            </Grid>
            <Grid
                display="flex"
                flex={1}
                flexDirection="column"
                minWidth={0}
                minHeight={0}
                maxWidth="100%"
            >
                {props.children}
            </Grid>
        </Grid>
    );
});
export default AppPageContent;
