import { forwardRef } from 'react';

import { type CustomContentProps, SnackbarContent, useSnackbar } from 'notistack';

import { Alert, type AlertColor } from '@mui/material';

import classes from './AlertSnackbar.module.css';

const AlertSnackbar = forwardRef<HTMLDivElement, CustomContentProps>(
    function AlertSnackbar(props, ref) {
        const { closeSnackbar } = useSnackbar();

        let severity: AlertColor;
        switch (props.variant) {
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
                    className={`${classes.AlertSnackbar} ${props.className}`}
                    severity={severity}
                    onClose={() => closeSnackbar(props.id)}
                >
                    {props.message}
                </Alert>
            </SnackbarContent>
        );
    }
);

export default AlertSnackbar;
