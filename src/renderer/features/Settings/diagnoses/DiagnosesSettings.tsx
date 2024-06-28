import { useCallback, useEffect, useMemo, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import {
    diagnosesActions,
    diagnosesSelectors,
    type Diagnosis
} from '@/common/redux/slices/settings/diagnoses';
import AppPageContent from '@/renderer/components/AppPageContent';
import { ActionCell } from '@/renderer/components/cells';
import { useAppDispatch, useAppSelector } from '@/renderer/hooks/redux';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';

export default function DiagnosesSettings() {
    const dispatch = useAppDispatch();

    const diagnosesState = useAppSelector(diagnosesSelectors.selectAll);

    const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);

    const handleAddDiagnosis = useCallback((diagnosis: Diagnosis) => {
        diagnosis.id = uuidv4();
        dispatch(diagnosesActions.addDiagnosis(diagnosis));
    }, []);

    const handleRemoveDiagnosis = useCallback((id: string) => {
        dispatch(diagnosesActions.removeDiagnosis(id));
    }, []);

    const DIAGNOSES_COLUMNS: GridColDef<Diagnosis>[] = useMemo(
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
                        onAdd={handleAddDiagnosis}
                        onRemove={handleRemoveDiagnosis}
                    />
                )
            },
            { field: 'name', headerName: 'Nazwa', hideable: false, editable: true, flex: 1 }
        ],
        [handleAddDiagnosis, handleRemoveDiagnosis]
    );

    useEffect(() => {
        setDiagnoses([
            ...diagnosesState,
            {
                id: '',
                name: ''
            }
        ]);
    }, [diagnosesState]);

    return (
        <AppPageContent title="Rozpoznania">
            <DataGrid
                columns={DIAGNOSES_COLUMNS}
                rows={diagnoses}
                rowSelection={false}
                processRowUpdate={newRow => {
                    if (newRow.id) {
                        dispatch(
                            diagnosesActions.updateDiagnosis({
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
