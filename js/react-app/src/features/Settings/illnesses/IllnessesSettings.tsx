import { useCallback, useEffect, useMemo, useState } from 'react';

import {
    type IllnessDto,
    IllnessService,
    type RecommendationDto,
    RecommendationService
} from '@diagnosis-report-generator/api/services';
import { DataGrid, type GridColDef, useGridApiRef } from '@mui/x-data-grid';

import AppPageContent from '@/components/AppPageContent';
import { ActionCell } from '@/components/cells';
import EditCellWithErrorRenderer from '@/components/cells/EditCellWithErrorRenderer';
import MultiSelectCell from '@/components/cells/MultiSelectCell';
import MultiSelectEditCell from '@/components/cells/MultiSelectEditCell';
import { validateName } from '@/utils/validators';

export default function IllnessesSettings() {
    const apiRef = useGridApiRef();

    const [illnesses, setIllnesses] = useState<IllnessDto[]>([]);
    const [recommendations, setRecommendations] = useState<RecommendationDto[]>([]);

    const getIllnesses = useCallback(async (signal?: AbortSignal) => {
        const response = await IllnessService.getList(undefined, { signal });

        response.items.push({
            id: '',
            name: '',
            recommendationIds: []
        });
        setIllnesses(response.items);
    }, []);

    const handleAddIllnesses = useCallback(
        async (illness: IllnessDto) => {
            await IllnessService.create({
                body: illness
            });
            await getIllnesses();
        },
        [getIllnesses]
    );

    const handleRemoveIllnesses = useCallback(async (id: string) => {
        await IllnessService.delete({ id });
    }, []);

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
                        <ActionCell
                            params={params}
                            onAdd={handleAddIllnesses}
                            onRemove={handleRemoveIllnesses}
                        />
                    )
                },
                {
                    field: 'name',
                    headerName: 'Nazwa',
                    hideable: false,
                    editable: true,
                    preProcessEditCellProps: (params) => {
                        const errorMessage = validateName(params.props.value, illnesses);
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
            ] as GridColDef<IllnessDto>[],
        [handleAddIllnesses, handleRemoveIllnesses, illnesses, recommendations]
    );

    useEffect(() => {
        const abortController = new AbortController();

        getIllnesses(abortController.signal);

        RecommendationService.getList(undefined, { signal: abortController.signal }).then(
            (response) => {
                setRecommendations(response.items);
            }
        );

        return () => {
            abortController.abort();
        };
    }, [getIllnesses]);

    useEffect(() => {
        window.setTimeout(async () => {
            await apiRef.current.autosizeColumns({
                includeOutliers: true,
                includeHeaders: true
            });
        }, 50);
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
