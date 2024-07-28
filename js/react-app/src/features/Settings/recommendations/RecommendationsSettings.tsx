import { useCallback, useEffect, useMemo, useState } from 'react';

import {
    type Range,
    type RecommendationDto,
    RecommendationLevel,
    RecommendationService
} from '@diagnosis-report-generator/api/services';
import { DataGrid, type GridColDef, useGridApiRef } from '@mui/x-data-grid';

import AppPageContent from '@/components/AppPageContent';
import { ActionCell, RangeEditCell } from '@/components/cells';
import EditCellWithErrorRenderer from '@/components/cells/EditCellWithErrorRenderer';
import { validateName } from '@/utils/validators';

export default function RecommendationsSettings() {
    const apiRef = useGridApiRef();

    const [recommendations, setRecommendations] = useState<RecommendationDto[]>([]);

    const getRecommendations = useCallback(async (signal?: AbortSignal) => {
        const response = await RecommendationService.getList(undefined, { signal });

        response.items.push({
            id: '',
            name: '',
            content: '',
            level: RecommendationLevel.I,
            priority: 0,
            ageRange: {
                from: undefined,
                to: undefined
            }
        });
        setRecommendations(response.items);
    }, []);

    const handleAddRecommendation = useCallback(
        async (recommendation: RecommendationDto) => {
            await RecommendationService.create({
                body: recommendation
            });
            await getRecommendations();
        },
        [getRecommendations]
    );

    const handleRemoveRecommendation = useCallback(async (id: string) => {
        await RecommendationService.delete({ id });
    }, []);

    const processRowUpdate = useCallback(async (newRow: RecommendationDto) => {
        if (newRow.id) {
            newRow = await RecommendationService.update({
                id: newRow.id,
                body: newRow
            });
        }

        return newRow;
    }, []);

    const RECOMMENDATIONS_COLUMNS = useMemo(
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
                            onAdd={handleAddRecommendation}
                            onRemove={handleRemoveRecommendation}
                        />
                    )
                },
                {
                    field: 'name',
                    headerName: 'Nazwa',
                    editable: true,
                    preProcessEditCellProps: (params) => {
                        const errorMessage = validateName(params.props.value, recommendations);
                        return { ...params.props, error: errorMessage };
                    },
                    renderEditCell: EditCellWithErrorRenderer
                },
                {
                    field: 'content',
                    headerName: 'Opis',
                    editable: true
                },
                {
                    field: 'level',
                    headerName: 'Poziom zalecenia',
                    editable: true,
                    type: 'singleSelect',
                    valueOptions: [
                        RecommendationLevel.I,
                        RecommendationLevel.II,
                        RecommendationLevel.III
                    ]
                },
                {
                    field: 'ageRange',
                    headerName: 'Zakres wiekowy',
                    editable: true,
                    type: 'custom',
                    valueFormatter: (range: Range) => {
                        if (range.from != null && range.to != null) {
                            return `od ${range.from} lat do ${range.to} lat`;
                        } else if (range.from != null) {
                            return `od ${range.from} lat`;
                        } else if (range.to != null) {
                            return `do ${range.to} lat`;
                        } else {
                            return '';
                        }
                    },
                    renderEditCell: (params) => (
                        <RangeEditCell params={params} defaultValue={params.row.ageRange} />
                    )
                }
            ] as GridColDef<RecommendationDto>[],
        [handleAddRecommendation, handleRemoveRecommendation, recommendations]
    );

    useEffect(() => {
        const abortController = new AbortController();

        getRecommendations(abortController.signal);

        return () => {
            abortController.abort();
        };
    }, [getRecommendations]);

    useEffect(() => {
        window.setTimeout(async () => {
            await apiRef.current.autosizeColumns();
        }, 100);
    }, [recommendations, apiRef]);

    return (
        <AppPageContent title="Zalecenia">
            <DataGrid
                apiRef={apiRef}
                columns={RECOMMENDATIONS_COLUMNS}
                rows={recommendations}
                rowSelection={false}
                processRowUpdate={processRowUpdate}
                getRowClassName={(row) => (row.id ? '' : 'new-row')}
                autosizeOnMount={true}
            />
        </AppPageContent>
    );
}
