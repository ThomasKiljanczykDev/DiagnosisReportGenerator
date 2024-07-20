import { Tooltip } from '@mui/material';
import type { GridRenderCellParams } from '@mui/x-data-grid';

import type { Patient } from '@/common/models/patient';

interface CellErrorTooltipProps {
    error: string;
    value: string | undefined;
}

function CellErrorTooltip(props: CellErrorTooltipProps) {
    return (
        <Tooltip title={props.error} arrow={true}>
            <div>{props.value || ''}</div>
        </Tooltip>
    );
}

export default function PeselCellRenderer(params: GridRenderCellParams<Patient, string>) {
    const hasError = params.row.pesel.error !== undefined;

    return (
        <div className={hasError ? 'cell-error' : ''}>
            {hasError && <CellErrorTooltip error={params.row.pesel.error!} value={params.value} />}
            {!hasError && <> {params.value || ''} </>}
        </div>
    );
}
