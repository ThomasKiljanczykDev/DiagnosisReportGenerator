import { type ReactNode } from 'react';

import { Grid2, Paper } from '@mui/material';

interface PanelProps {
    children?: ReactNode;
    title: string;
    width: number | string;
    height: number | string;
}

export default function Panel(props: PanelProps) {
    return (
        <Paper sx={{ width: props.width, height: props.height }}>
            <Grid2 container flexDirection="column" height="100%" sx={{ padding: 3 }}>
                <Grid2>
                    <h3 style={{ marginTop: 0 }}>{props.title}</h3>
                </Grid2>
                <Grid2 flex={1} minHeight={0} minWidth={0}>
                    {props.children}
                </Grid2>
            </Grid2>
        </Paper>
    );
}
