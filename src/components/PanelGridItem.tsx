import { ReactNode } from 'react';

import { Grid, Paper } from '@mui/material';

interface PanelGridItemProps {
    children?: ReactNode;
    title: string;
    width: number | string;
    height: number | string;
}

export default function PanelGridItem({ children, title, width, height }: PanelGridItemProps) {
    return (
        <Grid item>
            <Paper sx={{ width, height }}>
                <Grid container flexDirection="column" height="100%" sx={{ padding: 3 }}>
                    <Grid item>
                        <h3 style={{ marginTop: 0 }}>{title}</h3>
                    </Grid>
                    <Grid flex={1} item minHeight={0} minWidth={0}>
                        {children}
                    </Grid>
                </Grid>
            </Paper>
        </Grid>
    );
}
