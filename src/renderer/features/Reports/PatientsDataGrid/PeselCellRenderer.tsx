import ErrorRoundedIcon from '@mui/icons-material/ErrorRounded';
import { Tooltip } from '@mui/material';
import type { GridRenderCellParams } from '@mui/x-data-grid';

import type { Patient } from '@/common/models/patient';

import classes from './PatientsDataGrid.module.css';

interface CellErrorTooltipProps {
    error: string;
}

function CellErrorTooltip(props: CellErrorTooltipProps) {
    return (
        <Tooltip title={props.error} arrow={true}>
            <ErrorRoundedIcon className={classes.CellErrorIcon} />
        </Tooltip>
    );
}

export default function PeselCellRenderer(params: GridRenderCellParams<Patient, string>) {
    const hasError = !!params.row.pesel.error;

    return (
        <div className={classes.CellWrapper}>
            {hasError && <CellErrorTooltip error={params.row.pesel.error!} />}
            <span>{params.value}</span>
        </div>
    );
}
