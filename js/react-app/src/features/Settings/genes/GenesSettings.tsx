import { useCallback, useEffect, useMemo, useState } from 'react';

import {
    type GeneDto,
    GeneService,
    type MutationDto,
    MutationService,
    type TestMethodDto,
    TestMethodService
} from '@diagnosis-report-generator/api/services';
import { DataGrid, type GridColDef, useGridApiRef } from '@mui/x-data-grid';

import AppPageContent from '@/components/AppPageContent';
import { ActionCell } from '@/components/cells';
import EditCellWithErrorRenderer from '@/components/cells/EditCellWithErrorRenderer';
import MultiSelectCell from '@/components/cells/MultiSelectCell';
import MultiSelectEditCell from '@/components/cells/MultiSelectEditCell';
import { validateName } from '@/utils/validators';

export default function GenesSettings() {
    const apiRef = useGridApiRef();

    const [genes, setGenes] = useState<GeneDto[]>([]);
    const [testMethods, setTestMethods] = useState<TestMethodDto[]>([]);
    const [mutations, setMutations] = useState<MutationDto[]>([]);

    const getGenes = useCallback(async (signal?: AbortSignal) => {
        const response = await GeneService.getList(undefined, { signal });

        response.items.push({
            id: '',
            name: '',
            testMethodIds: [],
            mutationIds: []
        });
        setGenes(response.items);
    }, []);

    const handleAddGene = useCallback(
        async (gene: GeneDto) => {
            await GeneService.create({
                body: gene
            });
            await getGenes();
        },
        [getGenes]
    );

    const handleRemoveGene = useCallback(async (id: string) => {
        await GeneService.delete({ id });
    }, []);

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
                        <ActionCell
                            params={params}
                            onAdd={handleAddGene}
                            onRemove={handleRemoveGene}
                        />
                    )
                },
                {
                    field: 'name',
                    headerName: 'Nazwa',
                    hideable: false,
                    editable: true,
                    preProcessEditCellProps: (params) => {
                        const errorMessage = validateName(params.props.value, genes);
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
                            items={testMethods}
                            initialValue={params.value}
                            keyFn={(item) => item.id}
                            displayFn={(item) => item.name}
                            valueFn={(item) => item.id}
                        />
                    ),
                    renderCell: (params) => (
                        <MultiSelectCell
                            params={params}
                            items={testMethods}
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
                            items={mutations}
                            initialValue={params.value}
                            keyFn={(item) => item.id}
                            displayFn={(item) => item.name}
                            valueFn={(item) => item.id}
                        />
                    ),
                    renderCell: (params) => (
                        <MultiSelectCell
                            params={params}
                            items={mutations}
                            value={params.value}
                            keyFn={(item) => item.id}
                            displayFn={(item) => item.name}
                        />
                    )
                }
            ] as GridColDef<GeneDto>[],
        [handleAddGene, handleRemoveGene, genes, testMethods, mutations]
    );

    useEffect(() => {
        const abortController = new AbortController();

        getGenes(abortController.signal);

        TestMethodService.getList(undefined, { signal: abortController.signal }).then(
            (response) => {
                setTestMethods(response.items);
            }
        );

        MutationService.getList(undefined, { signal: abortController.signal }).then((response) => {
            setMutations(response.items);
        });

        return () => {
            abortController.abort();
        };
    }, [getGenes]);

    useEffect(() => {
        window.setTimeout(async () => {
            await apiRef.current.autosizeColumns({
                includeOutliers: true,
                includeHeaders: true
            });
        }, 50);
    }, [genes, apiRef]);

    return (
        <AppPageContent title="Geny">
            <DataGrid
                apiRef={apiRef}
                columns={GENES_COLUMNS}
                rows={genes}
                rowSelection={false}
                processRowUpdate={processRowUpdate}
                getRowClassName={(row) => (row.id ? '' : 'new-row')}
                autosizeOnMount={true}
            />
        </AppPageContent>
    );
}
