import { type ReactNode } from 'react';

import { Grid, Paper } from '@mui/material';

interface PanelProps {
    children?: ReactNode;
    title: string;
    width: number | string;
    height: number | string;
}

export default function Panel(props: PanelProps) {
    return (
        <Paper sx={{ width: props.width, height: props.height }}>
            <Grid container flexDirection="column" height="100%" sx={{ padding: 3 }}>
                <Grid item>
                    <h3 style={{ marginTop: 0 }}>{props.title}</h3>
                </Grid>
                <Grid flex={1} item minHeight={0} minWidth={0}>
                    {props.children}
                </Grid>
            </Grid>
        </Paper>
    );
}
