import { useCallback, useEffect, useMemo, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import {
    Mutation,
    mutationsActions,
    mutationsSelectors
} from '@/common/redux/slices/settings/mutations';
import AppPageContent from '@/renderer/components/AppPageContent';
import { ActionCell } from '@/renderer/components/cells';
import { useAppDispatch, useAppSelector } from '@/renderer/hooks/redux';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

export default function MutationsSettings() {
    const dispatch = useAppDispatch();

    const mutationsState = useAppSelector(mutationsSelectors.selectAll);

    const [mutations, setMutations] = useState<Mutation[]>([]);

    const handleAddMutation = useCallback((mutation: Mutation) => {
        mutation.id = uuidv4();
        dispatch(mutationsActions.addMutation(mutation));
    }, []);

    const handleRemoveMutation = useCallback((id: string) => {
        dispatch(mutationsActions.removeMutation(id));
    }, []);

    const MUTATIONS_COLUMNS: GridColDef<Mutation>[] = useMemo(
        () => [
            {
                field: 'action',
                headerName: 'Akcje',
                sortable: false,
                filterable: false,
                hideable: false,
                disableColumnMenu: true,
                renderCell: params => (
                    <ActionCell
                        entity={params.row}
                        onAdd={handleAddMutation}
                        onRemove={handleRemoveMutation}
                    />
                )
            },
            { field: 'name', headerName: 'Nazwa', hideable: false, editable: true, flex: 1 }
        ],
        [handleAddMutation, handleRemoveMutation]
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

    return (
        <AppPageContent title="Mutacje">
            <DataGrid
                columns={MUTATIONS_COLUMNS}
                rows={mutations}
                rowSelection={false}
                onCellEditStop={e => {
                    console.log(e);
                }}
            />
        </AppPageContent>
    );
}
