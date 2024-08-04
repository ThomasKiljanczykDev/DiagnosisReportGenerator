import { type PropsWithChildren, memo } from 'react';

import { Grid } from '@mui/material';

interface AppPageContentProps {
    title: string;
}

const AppPageContent = memo(function AppPageContent(props: PropsWithChildren<AppPageContentProps>) {
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
            <Grid item flexShrink={0} minWidth={0} minHeight={0} maxWidth="100%">
                <h2 style={{ color: 'black', margin: 0 }}>{props.title}</h2>
            </Grid>
            <Grid
                item
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
