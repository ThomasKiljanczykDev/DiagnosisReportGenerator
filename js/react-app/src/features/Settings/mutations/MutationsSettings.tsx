import { useCallback, useEffect, useMemo, useState } from 'react';

import { type MutationDto, MutationService } from '@diagnosis-report-generator/api/services';
import { DataGrid, type GridColDef, useGridApiRef } from '@mui/x-data-grid';

import AppPageContent from '@/components/AppPageContent';
import { ActionCell } from '@/components/cells';
import EditCellWithErrorRenderer from '@/components/cells/EditCellWithErrorRenderer';
import { validateName } from '@/utils/validators';

export default function MutationsSettings() {
    const apiRef = useGridApiRef();

    const [mutations, setMutations] = useState<MutationDto[]>([]);

    const getMutations = useCallback(async (signal?: AbortSignal) => {
        const response = await MutationService.getList(undefined, { signal });

        response.items.push({
            id: '',
            name: ''
        });
        setMutations(response.items);
    }, []);

    const handleAddMutation = useCallback(
        async (mutation: MutationDto) => {
            await MutationService.create({
                body: mutation
            });
            await getMutations();
        },
        [getMutations]
    );

    const handleRemoveMutation = useCallback(async (id: string) => {
        await MutationService.delete({ id });
    }, []);

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
                        <ActionCell
                            params={params}
                            onAdd={handleAddMutation}
                            onRemove={handleRemoveMutation}
                        />
                    )
                },
                {
                    field: 'name',
                    headerName: 'Nazwa',
                    hideable: false,
                    editable: true,
                    preProcessEditCellProps: (params) => {
                        const errorMessage = validateName(params.props.value, mutations);
                        return { ...params.props, error: errorMessage };
                    },
                    renderEditCell: EditCellWithErrorRenderer
                }
            ] as GridColDef<MutationDto>[],
        [handleAddMutation, handleRemoveMutation, mutations]
    );

    useEffect(() => {
        const abortController = new AbortController();

        getMutations(abortController.signal);

        return () => {
            abortController.abort();
        };
    }, [getMutations]);

    useEffect(() => {
        window.setTimeout(async () => {
            await apiRef.current.autosizeColumns();
        }, 100);
    }, [mutations, apiRef]);

    return (
        <AppPageContent title="Mutacje">
            <DataGrid
                apiRef={apiRef}
                columns={MUTATIONS_COLUMNS}
                rows={mutations}
                rowSelection={false}
                processRowUpdate={processRowUpdate}
                getRowClassName={(row) => (row.id ? '' : 'new-row')}
                autosizeOnMount={true}
            />
        </AppPageContent>
    );
}
