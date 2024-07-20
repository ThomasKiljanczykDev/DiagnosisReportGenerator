import { useCallback, useEffect, useMemo, useState } from 'react';

import { v4 as uuidv4 } from 'uuid';

import { DataGrid, type GridColDef, useGridApiRef } from '@mui/x-data-grid';

import { illnessesSelectors, recommendationsSelectors } from '@/common/redux/selectors';
import { illnessesActions } from '@/common/redux/slices/settings/illnesses';
import type { Illness } from '@/common/types/entities';
import AppPageContent from '@/renderer/components/AppPageContent';
import { ActionCell } from '@/renderer/components/cells';
import MultiSelectCell from '@/renderer/components/cells/MultiSelectCell';
import MultiSelectEditCell from '@/renderer/components/cells/MultiSelectEditCell';
import { useAppDispatch, useAppSelector } from '@/renderer/hooks/redux';

export default function IllnessesSettings() {
    const dispatch = useAppDispatch();
    const apiRef = useGridApiRef();

    const illnessesState = useAppSelector(illnessesSelectors.selectAll);
    const recommendations = useAppSelector(recommendationsSelectors.selectAll);

    const [illnesses, setIllnesses] = useState<Illness[]>([]);

    const handleAddIllnesses = useCallback(
        (illness: Illness) => {
            illness.id = uuidv4();
            dispatch(illnessesActions.addIllness(illness));
        },
        [dispatch]
    );

    const handleRemoveIllnesses = useCallback(
        (id: string) => {
            dispatch(illnessesActions.removeIllness(id));
        },
        [dispatch]
    );

    const processRowUpdate = useCallback(
        (newRow: Illness) => {
            if (newRow.id) {
                dispatch(
                    illnessesActions.updateIllness({
                        id: newRow.id,
                        changes: newRow
                    })
                );
            }

            return newRow;
        },
        [dispatch]
    );

    const ILLNESSES_COLUMNS = useMemo(
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
                            entity={params.row}
                            onAdd={handleAddIllnesses}
                            onRemove={handleRemoveIllnesses}
                        />
                    )
                },
                {
                    field: 'name',
                    headerName: 'Nazwa',
                    hideable: false,
                    editable: true
                },
                {
                    field: 'recommendationIds',
                    headerName: 'Zalecenia',
                    editable: true,
                    type: 'custom',
                    renderEditCell: (params) => (
                        <MultiSelectEditCell
                            params={params}
                            items={recommendations}
                            initialValue={params.value}
                            keyFn={(item) => item.id}
                            displayFn={(item) => item.name}
                            valueFn={(item) => item.id}
                        />
                    ),
                    renderCell: (params) => (
                        <MultiSelectCell
                            params={params}
                            items={recommendations}
                            value={params.value}
                            keyFn={(item) => item.id}
                            displayFn={(item) => item.name}
                        />
                    )
                }
            ] as GridColDef<Illness>[],
        [handleAddIllnesses, handleRemoveIllnesses, recommendations]
    );

    useEffect(() => {
        setIllnesses([
            ...illnessesState,
            {
                id: '',
                name: '',
                recommendationIds: []
            }
        ]);
    }, [illnessesState]);

    useEffect(() => {
        window.setTimeout(async () => {
            await apiRef.current.autosizeColumns();
        }, 100);
    }, [illnesses, apiRef]);

    return (
        <AppPageContent title="Choroby">
            <DataGrid
                apiRef={apiRef}
                columns={ILLNESSES_COLUMNS}
                rows={illnesses}
                rowSelection={false}
                processRowUpdate={processRowUpdate}
                getRowClassName={(row) => (row.id ? '' : 'new-row')}
                autosizeOnMount={true}
            />
        </AppPageContent>
    );
}
