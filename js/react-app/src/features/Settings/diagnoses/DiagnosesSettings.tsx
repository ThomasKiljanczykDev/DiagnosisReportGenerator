import { useCallback, useEffect, useMemo, useState } from 'react';

import {
    type CreateUpdateDiagnosisDto,
    type DiagnosisDto,
    DiagnosisService
} from '@diagnosis-report-generator/api/services';
import { DataGrid, type GridColDef, useGridApiRef } from '@mui/x-data-grid';

import AppPageContent from '@/components/AppPageContent';
import { ActionCell } from '@/components/cells';
import EditCellWithErrorRenderer from '@/components/cells/EditCellWithErrorRenderer';
import { validateName } from '@/utils/validators';

export default function DiagnosesSettings() {
    const apiRef = useGridApiRef();

    const [diagnoses, setDiagnoses] = useState<DiagnosisDto[]>([]);

    const getDiagnoses = useCallback(async (signal?: AbortSignal) => {
        const response = await DiagnosisService.getList(undefined, { signal });

        response.items.push({
            id: '',
            name: ''
        });
        setDiagnoses(response.items);
    }, []);

    const handleAddDiagnosis = useCallback(
        async (diagnosis: CreateUpdateDiagnosisDto) => {
            await DiagnosisService.create({
                body: diagnosis
            });
            await getDiagnoses();
        },
        [getDiagnoses]
    );

    const handleRemoveDiagnosis = useCallback(async (id: string) => {
        await DiagnosisService.delete({ id });
    }, []);

    const processRowUpdate = useCallback(async (newRow: DiagnosisDto) => {
        if (newRow.id) {
            newRow = await DiagnosisService.update({
                id: newRow.id,
                body: newRow
            });
        }

        return newRow;
    }, []);

    const DIAGNOSES_COLUMNS = useMemo(
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
                            onAdd={handleAddDiagnosis}
                            onRemove={handleRemoveDiagnosis}
                        />
                    )
                },
                {
                    field: 'name',
                    headerName: 'Nazwa',
                    hideable: false,
                    editable: true,
                    preProcessEditCellProps: (params) => {
                        const errorMessage = validateName(params.props.value, diagnoses);
                        return { ...params.props, error: errorMessage };
                    },
                    renderEditCell: EditCellWithErrorRenderer
                }
            ] as GridColDef<DiagnosisDto>[],
        [diagnoses, handleAddDiagnosis, handleRemoveDiagnosis]
    );

    useEffect(() => {
        window.setTimeout(async () => {
            await apiRef.current.autosizeColumns();
        }, 100);
    }, [diagnoses, apiRef]);

    useEffect(() => {
        const abortController = new AbortController();

        getDiagnoses(abortController.signal);

        return () => {
            abortController.abort();
        };
    }, [getDiagnoses]);

    return (
        <AppPageContent title="Rozpoznania">
            <DataGrid
                apiRef={apiRef}
                columns={DIAGNOSES_COLUMNS}
                rows={diagnoses}
                rowSelection={false}
                processRowUpdate={processRowUpdate}
                autosizeOnMount={true}
            />
        </AppPageContent>
    );
}
