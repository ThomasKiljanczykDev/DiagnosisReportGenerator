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

const int32max = 2147483647;

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
            // Max 32-bit signed integer value
            priority: int32max,
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

    const handleMove = useCallback(
        async (id: string, increment: 1 | -1) => {
            const recommendation = recommendations.find((r) => r.id === id);
            if (recommendation == null || recommendation.priority <= 1) {
                return;
            }

            recommendation.priority += increment;
            await RecommendationService.update({
                id,
                body: recommendation
            });
            await getRecommendations();
        },
        [getRecommendations, recommendations]
    );

    const handleMoveUp = useCallback(
        async (id: string) => {
            await handleMove(id, -1);
        },
        [handleMove]
    );

    const handleMoveDown = useCallback(
        async (id: string) => {
            await handleMove(id, 1);
        },
        [handleMove]
    );

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
                    renderCell: (params) => {
                        const isFirstRow = recommendations.indexOf(params.row) === 0;
                        const isLastRow =
                            recommendations.indexOf(params.row) === recommendations.length - 2;

                        return (
                            <ActionCell
                                params={params}
                                onAdd={handleAddRecommendation}
                                onRemove={handleRemoveRecommendation}
                                onMoveUp={isFirstRow ? undefined : handleMoveUp}
                                onMoveDown={isLastRow ? undefined : handleMoveDown}
                            />
                        );
                    }
                },
                {
                    field: 'priority',
                    headerName: 'Priorytet',
                    sortable: false,
                    editable: true,
                    renderCell: (params) => {
                        if (params.value == null) {
                            return params.value;
                        }

                        return params.value >= int32max ? null : params.value;
                    }
                } as GridColDef<RecommendationDto, number>,
                {
                    field: 'name',
                    headerName: 'Nazwa',
                    sortable: false,
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
                    sortable: false,
                    editable: true
                },
                {
                    field: 'level',
                    headerName: 'Poziom zalecenia',
                    sortable: false,
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
                    sortable: false,
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
        [
            handleAddRecommendation,
            handleMoveDown,
            handleMoveUp,
            handleRemoveRecommendation,
            recommendations
        ]
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
            await apiRef.current.autosizeColumns({
                includeOutliers: true,
                includeHeaders: true
            });
        }, 50);
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
