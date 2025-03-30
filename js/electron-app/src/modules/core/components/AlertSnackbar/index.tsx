import type { Ref } from 'react';

import { type CustomContentProps, SnackbarContent, useSnackbar } from 'notistack';

import { Alert, type AlertColor } from '@mui/material';

import classes from './AlertSnackbar.module.css';

function AlertSnackbar({
    className,
    id,
    message,
    variant,
    ref
}: CustomContentProps & {
    ref: Ref<HTMLDivElement>;
}) {
    const { closeSnackbar } = useSnackbar();

    let severity: AlertColor;
    switch (variant) {
        case 'success':
            severity = 'success';
            break;
        case 'error':
            severity = 'error';
            break;
        case 'warning':
            severity = 'warning';
            break;
        case 'info':
            severity = 'info';
            break;
        case 'default':
        default:
            severity = 'info';
            break;
    }

    return (
        <SnackbarContent ref={ref}>
            <Alert
                className={`${classes.AlertSnackbar} ${className}`}
                severity={severity}
                onClose={() => closeSnackbar(id)}
            >
                {message}
            </Alert>
        </SnackbarContent>
    );
}

export default AlertSnackbar;
