import { useCallback, useEffect, useMemo, useState } from 'react';

import { v4 as uuidv4 } from 'uuid';

import { DataGrid, type GridColDef, useGridApiRef } from '@mui/x-data-grid';

import type { Mutation } from '@/common/types/entities';
import AppPageContent from '@/components/AppPageContent';
import { ActionCell } from '@/components/cells';
import EditCellWithErrorRenderer from '@/components/cells/EditCellWithErrorRenderer';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { mutationsSelectors } from '@/redux/selectors';
import { mutationsActions } from '@/redux/slices/settings/mutations';
import { validateName } from '@/utils/validators';

export default function MutationsSettings() {
    const dispatch = useAppDispatch();
    const apiRef = useGridApiRef();

    const mutationsState = useAppSelector(mutationsSelectors.selectAll);

    const [mutations, setMutations] = useState<Mutation[]>([]);

    const handleAddMutation = useCallback(
        (mutation: Mutation) => {
            mutation.id = uuidv4();
            dispatch(mutationsActions.addMutation(mutation));
        },
        [dispatch]
    );

    const handleRemoveMutation = useCallback(
        (id: string) => {
            dispatch(mutationsActions.removeMutation(id));
        },
        [dispatch]
    );

    const processRowUpdate = useCallback(
        (newRow: Mutation) => {
            if (newRow.id) {
                dispatch(
                    mutationsActions.updateMutation({
                        id: newRow.id,
                        changes: newRow
                    })
                );
            }

            return newRow;
        },
        [dispatch]
    );

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
            ] as GridColDef<Mutation>[],
        [handleAddMutation, handleRemoveMutation, mutations]
    );

    useEffect(() => {
        setMutations([
            ...mutationsState,
            {
                id: '',
                name: ''
            }
        ]);
    }, [mutationsState]);

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
