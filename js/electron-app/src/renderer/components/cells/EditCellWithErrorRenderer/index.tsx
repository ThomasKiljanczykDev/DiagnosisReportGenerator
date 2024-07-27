import { GridEditInputCell, type GridRenderEditCellParams } from '@mui/x-data-grid';

import { type Patient } from '@/common/models/patient';
import ErrorTooltip from '@/renderer/components/ErrorTooltip';

import classes from './EditCellWithErrorRenderer.module.css';

export default function EditCellWithErrorRenderer(
    params: GridRenderEditCellParams<Patient, string>
) {
    const hasError = !!params.error;

    return (
        <ErrorTooltip open={hasError} title={params.error}>
            <GridEditInputCell
                {...params}
                error={hasError}
                className={`${classes.Cell} ${hasError ? classes.CellError : ''}`}
            />
        </ErrorTooltip>
    );
}
