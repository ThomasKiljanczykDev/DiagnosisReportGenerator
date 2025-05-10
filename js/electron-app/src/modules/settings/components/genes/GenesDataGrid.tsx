import { useCallback, useEffect, useMemo } from 'react';

import {
    type GeneDto,
    GeneService,
    type MutationDto,
    type TestMethodDto
} from '@diagnosis-report-generator/api/services';
import { DataGrid, type GridColDef, useGridApiRef } from '@mui/x-data-grid';

import { ActionCell } from '@/modules/core/components/cells';
import EditCellWithErrorRenderer from '@/modules/core/components/cells/EditCellWithErrorRenderer';
import MultiSelectCell from '@/modules/core/components/cells/MultiSelectCell';
import MultiSelectEditCell from '@/modules/core/components/cells/MultiSelectEditCell';
import { validateName } from '@/modules/core/utils/validators';

interface GenesDataGridProps {
    genes: GeneDto[];
    testMethods: TestMethodDto[];
    mutations: MutationDto[];
    onGenesChanged: () => Promise<void>;
}

export default function GenesDataGrid(props: GenesDataGridProps) {
    const apiRef = useGridApiRef();

    const handleRemoveGene = useCallback(
        async (id: string) => {
            await GeneService.delete({ id });
            await props.onGenesChanged();
        },
        [props]
    );

    const processRowUpdate = useCallback(async (newRow: GeneDto) => {
        if (newRow.id) {
            newRow = await GeneService.update({
                id: newRow.id,
                body: newRow
            });
        }

        return newRow;
    }, []);

    const GENES_COLUMNS = useMemo(
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
                        <ActionCell params={params} onRemove={handleRemoveGene} />
                    )
                },
                {
                    field: 'name',
                    headerName: 'Nazwa',
                    hideable: false,
                    editable: true,
                    preProcessEditCellProps: (params) => {
                        const errorMessage = validateName(params.props.value, props.genes);
                        return { ...params.props, error: errorMessage };
                    },
                    renderEditCell: EditCellWithErrorRenderer
                },
                {
                    field: 'testMethodIds',
                    headerName: 'Metody Badań',
                    editable: true,
                    type: 'custom',
                    renderEditCell: (params) => (
                        <MultiSelectEditCell
                            params={params}
                            items={props.testMethods}
                            initialValue={params.value}
                            keyFn={(item) => item.id}
                            displayFn={(item) => item.name}
                            valueFn={(item) => item.id}
                        />
                    ),
                    renderCell: (params) => (
                        <MultiSelectCell
                            params={params}
                            items={props.testMethods}
                            value={params.value}
                            keyFn={(item) => item.id}
                            displayFn={(item) => item.name}
                        />
                    )
                },
                {
                    field: 'mutationIds',
                    headerName: 'Mutacje',
                    editable: true,
                    type: 'custom',
                    renderEditCell: (params) => (
                        <MultiSelectEditCell
                            params={params}
                            items={props.mutations}
                            initialValue={params.value}
                            keyFn={(item) => item.id}
                            displayFn={(item) => item.name}
                            valueFn={(item) => item.id}
                        />
                    ),
                    renderCell: (params) => (
                        <MultiSelectCell
                            params={params}
                            items={props.mutations}
                            value={params.value}
                            keyFn={(item) => item.id}
                            displayFn={(item) => item.name}
                        />
                    )
                }
            ] as GridColDef<GeneDto>[],
        [handleRemoveGene, props.genes, props.testMethods, props.mutations]
    );

    useEffect(() => {
        window.setTimeout(async () => {
            await apiRef.current?.autosizeColumns({
                includeOutliers: true,
                includeHeaders: true
            });
        }, 50);
    }, [props.genes, apiRef]);

    return (
        <DataGrid
            apiRef={apiRef}
            columns={GENES_COLUMNS}
            rows={props.genes}
            rowSelection={false}
            processRowUpdate={processRowUpdate}
            autosizeOnMount={true}
        />
    );
}
