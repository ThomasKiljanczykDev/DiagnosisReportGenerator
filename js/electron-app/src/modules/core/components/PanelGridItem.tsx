import { type ReactNode } from 'react';

import { Grid } from '@mui/material';

import Panel from '@/modules/core/components/Panel';

interface PanelGridItemProps {
    children?: ReactNode;
    title: string;
    width: number | string;
    height: number | string;
}

export default function PanelGridItem(props: PanelGridItemProps) {
    return (
        <Grid item>
            <Panel title={props.title} width={props.width} height={props.height}>
                {props.children}
            </Panel>
        </Grid>
    );
}
