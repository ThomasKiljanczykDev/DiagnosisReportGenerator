import { useCallback, useEffect, useMemo, useState } from 'react';

import { v4 as uuidv4 } from 'uuid';

import { DataGrid, type GridColDef } from '@mui/x-data-grid';

import { recommendationsSelectors } from '@/common/redux/selectors';
import { recommendationActions } from '@/common/redux/slices/settings/recommendations';
import { type Recommendation, RecommendationLevel } from '@/common/types/entities';
import AppPageContent from '@/renderer/components/AppPageContent';
import { ActionCell, RangeEditCell } from '@/renderer/components/cells';
import { type Range } from '@/renderer/components/cells/RangeEditCell';
import { useAppDispatch, useAppSelector } from '@/renderer/hooks/redux';

export default function RecommendationsSettings() {
    const dispatch = useAppDispatch();

    const recommendationsState = useAppSelector(recommendationsSelectors.selectAll);

    const [recommendations, setRecommendations] = useState<Recommendation[]>([]);

    const handleAddRecommendation = useCallback(
        (recommendation: Recommendation) => {
            recommendation.id = uuidv4();
            dispatch(recommendationActions.addRecommendation(recommendation));
        },
        [dispatch]
    );

    const handleRemoveRecommendation = useCallback(
        (id: string) => {
            dispatch(recommendationActions.removeRecommendation(id));
        },
        [dispatch]
    );

    const processRowUpdate = useCallback(
        (newRow: Recommendation) => {
            if (newRow.id) {
                dispatch(
                    recommendationActions.updateRecommendation({
                        id: newRow.id,
                        changes: newRow
                    })
                );
            }

            return newRow;
        },
        [dispatch]
    );

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
                            entity={params.row}
                            onAdd={handleAddRecommendation}
                            onRemove={handleRemoveRecommendation}
                        />
                    )
                },
                { field: 'name', headerName: 'Nazwa', editable: true, flex: 1 },
                { field: 'content', headerName: 'Opis', editable: true, flex: 1 },
                {
                    field: 'recommendationLevel',
                    headerName: 'Poziom zalecenia',
                    editable: true,
                    type: 'singleSelect',
                    valueOptions: [
                        RecommendationLevel.I,
                        RecommendationLevel.II,
                        RecommendationLevel.III
                    ],
                    flex: 1
                },
                {
                    field: 'ageRange',
                    headerName: 'Zakres wiekowy',
                    editable: true,
                    type: 'custom',
                    flex: 1,
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
            ] as GridColDef<Recommendation>[],
        [handleAddRecommendation, handleRemoveRecommendation]
    );

    useEffect(() => {
        setRecommendations([
            ...recommendationsState,
            {
                id: '',
                name: '',
                content: '',
                recommendationLevel: RecommendationLevel.I,
                priority: null,
                ageRange: {
                    from: null,
                    to: null
                }
            }
        ]);
    }, [recommendationsState]);

    return (
        <AppPageContent title="Zalecenia">
            <DataGrid
                columns={RECOMMENDATIONS_COLUMNS}
                rows={recommendations}
                rowSelection={false}
                processRowUpdate={processRowUpdate}
                getRowClassName={(row) => (row.id ? '' : 'new-row')}
            />
        </AppPageContent>
    );
}
