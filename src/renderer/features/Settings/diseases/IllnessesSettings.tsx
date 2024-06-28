import { useCallback, useEffect, useMemo, useState } from 'react';

import { v4 as uuidv4 } from 'uuid';

import { DataGrid, type GridColDef } from '@mui/x-data-grid';

import {
    type Illness,
    illnessesActions,
    illnessesSelectors
} from '@/common/redux/slices/settings/illnesses';
import { recommendationSelectors } from '@/common/redux/slices/settings/recommendations';
import AppPageContent from '@/renderer/components/AppPageContent';
import { ActionCell } from '@/renderer/components/cells';
import MultiSelectEditCell from '@/renderer/components/cells/MultiSelectEditCell';
import { useAppDispatch, useAppSelector } from '@/renderer/hooks/redux';

export default function IllnessesSettings() {
    const dispatch = useAppDispatch();

    const illnessesState = useAppSelector(illnessesSelectors.selectAll);
    const recommendations = useAppSelector(recommendationSelectors.selectAll);

    const [illnesses, setIllnesses] = useState<Illness[]>([]);

    const handleAddIllnesses = useCallback((illness: Illness) => {
        illness.id = uuidv4();
        dispatch(illnessesActions.addIllness(illness));
    }, []);

    const handleRemoveIllnesses = useCallback((id: string) => {
        dispatch(illnessesActions.removeIllness(id));
    }, []);

    const ILLNESSES_COLUMNS: GridColDef<Illness>[] = useMemo(
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
                        onAdd={handleAddIllnesses}
                        onRemove={handleRemoveIllnesses}
                    />
                )
            },
            { field: 'name', headerName: 'Nazwa', hideable: false, editable: true, flex: 1 },
            {
                field: 'recommendationIds',
                headerName: 'Zalecenia',
                editable: true,
                type: 'custom',
                renderEditCell: params => (
                    <MultiSelectEditCell
                        params={params}
                        items={recommendations}
                        defaultValue={params.value}
                        keyFn={item => item.id}
                        valueFn={item => item.name}
                    />
                ),
                flex: 1
            }
        ],
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

    return (
        <AppPageContent title="Choroby">
            <DataGrid
                columns={ILLNESSES_COLUMNS}
                rows={illnesses}
                rowSelection={false}
                processRowUpdate={newRow => {
                    if (newRow.id) {
                        dispatch(
                            illnessesActions.updateIllness({
                                id: newRow.id,
                                changes: newRow
                            })
                        );
                    }

                    return newRow;
                }}
            />
        </AppPageContent>
    );
}
