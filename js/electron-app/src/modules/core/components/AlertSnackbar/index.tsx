import type { SyntheticEvent } from 'react';

import { Alert, type AlertColor, type SnackbarCloseReason } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import type { SnackbarProps } from '@mui/material/Snackbar/Snackbar';

import classes from './AlertSnackbar.module.css';

interface AlertSnackbarProps extends SnackbarProps {
    openSetter: (value: boolean) => void;
    severity: AlertColor;
}

export default function AlertSnackbar(props: AlertSnackbarProps) {
    function handleSnackbarClose(
        visibilitySetter: (value: boolean) => void,
        event?: SyntheticEvent | Event,
        reason?: SnackbarCloseReason
    ) {
        if (reason === 'clickaway') {
            return;
        }

        visibilitySetter(false);
    }

    return (
        <Snackbar
            {...{
                ...props,
                openSetter: undefined,
                severity: undefined
            }}
            open={props.open}
            onClose={(event, reason) => handleSnackbarClose(props.openSetter, event, reason)}
        >
            <Alert
                className={classes.AlertSnackbarAlert}
                severity={props.severity}
                onClose={() => handleSnackbarClose(props.openSetter)}
            >
                {props.children}
            </Alert>
        </Snackbar>
    );
}
