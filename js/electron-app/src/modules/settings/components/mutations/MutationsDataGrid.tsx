import { useCallback, useEffect, useMemo } from 'react';

import { type MutationDto, MutationService } from '@diagnosis-report-generator/api/services';
import { DataGrid, type GridColDef, useGridApiRef } from '@mui/x-data-grid';

import { ActionCell } from '@/modules/core/components/cells';
import EditCellWithErrorRenderer from '@/modules/core/components/cells/EditCellWithErrorRenderer';
import { validateName } from '@/modules/core/utils/validators';

interface MutationsDataGridProps {
    mutations: MutationDto[];
    onMutationsChanged: () => Promise<void>;
}

export default function MutationsDataGrid(props: MutationsDataGridProps) {
    const apiRef = useGridApiRef();

    const handleRemoveMutation = useCallback(
        async (id: string) => {
            await MutationService.delete({ id });
            await props.onMutationsChanged();
        },
        [props]
    );

    const processRowUpdate = useCallback(async (newRow: MutationDto) => {
        if (newRow.id) {
            newRow = await MutationService.update({
                id: newRow.id,
                body: newRow
            });
        }

        return newRow;
    }, []);

    const MUTATIONS_COLUMNS = useMemo(
        () =>
            [
                {
                    field: 'action',
                    headerName: 'Akcje',
                    sortable: false,
                    filterable: false,
                    hideable: false,
                    disableColumnMenu: true,
                    renderCell: (params) => (
                        <ActionCell params={params} onRemove={handleRemoveMutation} />
                    )
                },
                {
                    field: 'name',
                    headerName: 'Nazwa',
                    hideable: false,
                    editable: true,
                    preProcessEditCellProps: (params) => {
                        const errorMessage = validateName(params.props.value, props.mutations);
                        return { ...params.props, error: errorMessage };
                    },
                    renderEditCell: EditCellWithErrorRenderer
                }
            ] as GridColDef<MutationDto>[],
        [handleRemoveMutation, props.mutations]
    );

    useEffect(() => {
        window.setTimeout(async () => {
            await apiRef.current?.autosizeColumns({
                includeOutliers: true,
                includeHeaders: true
            });
        }, 50);
    }, [props.mutations, apiRef]);

    return (
        <DataGrid
            apiRef={apiRef}
            columns={MUTATIONS_COLUMNS}
            rows={props.mutations}
            rowSelection={false}
            processRowUpdate={processRowUpdate}
            autosizeOnMount={true}
        />
    );
}
