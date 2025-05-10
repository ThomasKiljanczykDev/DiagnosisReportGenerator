import { useCallback, useEffect, useMemo } from 'react';

import {
    type IllnessDto,
    IllnessService,
    type RecommendationDto
} from '@diagnosis-report-generator/api/services';
import { DataGrid, type GridColDef, useGridApiRef } from '@mui/x-data-grid';

import { ActionCell } from '@/modules/core/components/cells';
import EditCellWithErrorRenderer from '@/modules/core/components/cells/EditCellWithErrorRenderer';
import MultiSelectCell from '@/modules/core/components/cells/MultiSelectCell';
import MultiSelectEditCell from '@/modules/core/components/cells/MultiSelectEditCell';
import { validateName } from '@/modules/core/utils/validators';

interface IllnessesDataGridProps {
    illnesses: IllnessDto[];
    recommendations: RecommendationDto[];
    onIllnessesChanged: () => Promise<void>;
}

export default function IllnessesDataGrid(props: IllnessesDataGridProps) {
    const apiRef = useGridApiRef();

    const handleRemoveIllnesses = useCallback(
        async (id: string) => {
            await IllnessService.delete({ id });
            await props.onIllnessesChanged();
        },
        [props]
    );

    const processRowUpdate = useCallback(async (newRow: IllnessDto) => {
        if (newRow.id) {
            newRow = await IllnessService.update({
                id: newRow.id,
                body: newRow
            });
        }

        return newRow;
    }, []);

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
                        <ActionCell params={params} onRemove={handleRemoveIllnesses} />
                    )
                },
                {
                    field: 'name',
                    headerName: 'Nazwa',
                    hideable: false,
                    editable: true,
                    preProcessEditCellProps: (params) => {
                        const errorMessage = validateName(params.props.value, props.illnesses);
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
            ] as GridColDef<IllnessDto>[],
        [handleRemoveIllnesses, props.illnesses, props.recommendations]
    );

    useEffect(() => {
        window.setTimeout(async () => {
            await apiRef.current?.autosizeColumns({
                includeOutliers: true,
                includeHeaders: true
            });
        }, 50);
    }, [props.illnesses, apiRef]);

    return (
        <DataGrid
            apiRef={apiRef}
            columns={ILLNESSES_COLUMNS}
            rows={props.illnesses}
            rowSelection={false}
            processRowUpdate={processRowUpdate}
            autosizeOnMount={true}
        />
    );
}
