import { useCallback, useEffect, useMemo } from 'react';

import {
    type CreateUpdateDiagnosisDto,
    type DiagnosisDto,
    DiagnosisService,
    type RecommendationDto
} from '@diagnosis-report-generator/api/services';
import { DataGrid, type GridColDef, useGridApiRef } from '@mui/x-data-grid';

import { ActionCell } from '@/modules/core/components/cells';
import EditCellWithErrorRenderer from '@/modules/core/components/cells/EditCellWithErrorRenderer';
import MultiSelectCell from '@/modules/core/components/cells/MultiSelectCell';
import MultiSelectEditCell from '@/modules/core/components/cells/MultiSelectEditCell';
import { validateName } from '@/modules/core/utils/validators';

interface DiagnosesDataGridProps {
    diagnoses: DiagnosisDto[];
    recommendations: RecommendationDto[];
    onDiagnosesChanged: () => Promise<void>;
}

export default function DiagnosesDataGrid(props: DiagnosesDataGridProps) {
    const apiRef = useGridApiRef();

    const handleAddDiagnosis = useCallback(
        async (diagnosis: CreateUpdateDiagnosisDto) => {
            await DiagnosisService.create({
                body: diagnosis
            });

            await props.onDiagnosesChanged();
        },
        [props]
    );

    const handleRemoveDiagnosis = useCallback(
        async (id: string) => {
            await DiagnosisService.delete({ id });
            await props.onDiagnosesChanged();
        },
        [props]
    );

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
                        const errorMessage = validateName(params.props.value, props.diagnoses);
                        return { ...params.props, error: errorMessage };
                    },
                    renderEditCell: EditCellWithErrorRenderer
                },
                {
                    field: 'recommendationIds',
                    headerName: 'Zalecenia',
                    editable: true,
                    type: 'custom',
                    renderEditCell: (params) => (
                        <MultiSelectEditCell
                            params={params}
                            items={props.recommendations}
                            initialValue={params.value}
                            keyFn={(item) => item.id}
                            displayFn={(item) => item.name}
                            valueFn={(item) => item.id}
                        />
                    ),
                    renderCell: (params) => (
                        <MultiSelectCell
                            params={params}
                            items={props.recommendations}
                            value={params.value}
                            keyFn={(item) => item.id}
                            displayFn={(item) => item.name}
                        />
                    )
                }
            ] as GridColDef<DiagnosisDto>[],
        [props.diagnoses, handleAddDiagnosis, handleRemoveDiagnosis, props.recommendations]
    );

    useEffect(() => {
        window.setTimeout(async () => {
            await apiRef.current.autosizeColumns({
                includeOutliers: true,
                includeHeaders: true
            });
        }, 100);
    }, [props.diagnoses, apiRef]);

    return (
        <DataGrid
            apiRef={apiRef}
            columns={DIAGNOSES_COLUMNS}
            rows={props.diagnoses}
            rowSelection={false}
            processRowUpdate={processRowUpdate}
            autosizeOnMount={true}
        />
    );
}
