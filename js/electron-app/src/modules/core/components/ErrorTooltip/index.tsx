import type { ReactElement, ReactNode } from 'react';

import { Tooltip } from '@mui/material';

import classes from './ErrorTooltip.module.css';

interface ErrorTooltipProps {
    open: boolean;
    title: ReactNode;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    children: ReactElement<any, any>;
}

export default function ErrorTooltip(props: ErrorTooltipProps) {
    return (
        <Tooltip
            open={props.open}
            title={props.title}
            arrow={true}
            classes={{
                tooltip: classes.ErrorTooltip,
                tooltipArrow: classes.ErrorTooltip,
                arrow: classes.ErrorTooltipArrow
            }}
        >
            {props.children}
        </Tooltip>
    );
}
