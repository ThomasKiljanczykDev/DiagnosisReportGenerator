import { Tooltip } from '@mui/material';
import type { GridRenderCellParams } from '@mui/x-data-grid';

import type { Patient } from '@/common/models/patient';

export default function PeselCellRenderer(params: GridRenderCellParams<Patient, string>) {
    const hasError = params.row.pesel.error !== undefined;

    function CellErrorTooltip() {
        return (
            <Tooltip title={params.row.pesel.error} arrow={true}>
                <div>{params.value || ''}</div>
            </Tooltip>
        );
    }

    return (
        <div className={hasError ? 'cell-error' : ''}>
            {hasError && <CellErrorTooltip />}
            {!hasError && <> {params.value || ''} </>}
        </div>
    );
}
