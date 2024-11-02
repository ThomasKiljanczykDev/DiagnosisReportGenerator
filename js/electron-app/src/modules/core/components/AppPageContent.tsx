import { type PropsWithChildren, memo } from 'react';

import { Grid2 } from '@mui/material';

interface AppPageContentProps {
    title: string;
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
                <h2 style={{ color: 'black', margin: 0 }}>{props.title}</h2>
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
