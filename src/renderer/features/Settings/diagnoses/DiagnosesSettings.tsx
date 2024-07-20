import { useCallback, useEffect, useMemo, useState } from 'react';

import { v4 as uuidv4 } from 'uuid';

import { DataGrid, type GridColDef, useGridApiRef } from '@mui/x-data-grid';

import { diagnosesSelectors } from '@/common/redux/selectors';
import { diagnosesActions } from '@/common/redux/slices/settings/diagnoses';
import type { Diagnosis } from '@/common/types/entities';
import AppPageContent from '@/renderer/components/AppPageContent';
import { ActionCell } from '@/renderer/components/cells';
import { useAppDispatch, useAppSelector } from '@/renderer/hooks/redux';

export default function DiagnosesSettings() {
    const dispatch = useAppDispatch();
    const apiRef = useGridApiRef();

    const diagnosesState = useAppSelector(diagnosesSelectors.selectAll);

    const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);

    const handleAddDiagnosis = useCallback(
        (diagnosis: Diagnosis) => {
            diagnosis.id = uuidv4();
            dispatch(diagnosesActions.addDiagnosis(diagnosis));
        },
        [dispatch]
    );

    const handleRemoveDiagnosis = useCallback(
        (id: string) => {
            dispatch(diagnosesActions.removeDiagnosis(id));
        },
        [dispatch]
    );

    const DIAGNOSES_COLUMNS: GridColDef<Diagnosis>[] = useMemo(
        () => [
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
                        onAdd={handleAddDiagnosis}
                        onRemove={handleRemoveDiagnosis}
                    />
                )
            },
            {
                field: 'name',
                headerName: 'Nazwa',
                hideable: false,
                editable: true
            }
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

    useEffect(() => {
        window.setTimeout(async () => {
            await apiRef.current.autosizeColumns();
        }, 100);
    }, [diagnoses, apiRef]);

    return (
        <AppPageContent title="Rozpoznania">
            <DataGrid
                apiRef={apiRef}
                columns={DIAGNOSES_COLUMNS}
                rows={diagnoses}
                rowSelection={false}
                processRowUpdate={(newRow) => {
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
                autosizeOnMount={true}
            />
        </AppPageContent>
    );
}
