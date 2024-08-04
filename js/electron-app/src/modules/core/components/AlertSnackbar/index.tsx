import type { ReactNode, SyntheticEvent } from 'react';

import { Alert, type AlertColor, type SnackbarCloseReason } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';

import classes from './AlertSnackbar.module.css';

export default function AlertSnackbar(props: {
    children: ReactNode;
    open: boolean;
    openSetter: (value: boolean) => void;
    severity: AlertColor;
    autoHideDuration?: number;
}) {
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

    const autoHideDuration = props.autoHideDuration ?? 6000;

    return (
        <Snackbar
            open={props.open}
            autoHideDuration={autoHideDuration}
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
