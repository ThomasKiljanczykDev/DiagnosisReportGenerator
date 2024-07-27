import { useCallback, useEffect, useMemo, useState } from 'react';

import { v4 as uuidv4 } from 'uuid';

import { DataGrid, type GridColDef, useGridApiRef } from '@mui/x-data-grid';

import type { Gene } from '@/common/types/entities';
import AppPageContent from '@/components/AppPageContent';
import { ActionCell } from '@/components/cells';
import EditCellWithErrorRenderer from '@/components/cells/EditCellWithErrorRenderer';
import MultiSelectCell from '@/components/cells/MultiSelectCell';
import MultiSelectEditCell from '@/components/cells/MultiSelectEditCell';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { genesSelectors, mutationsSelectors, testMethodsSelectors } from '@/redux/selectors';
import { genesActions } from '@/redux/slices/settings/genes';
import { validateName } from '@/utils/validators';

export default function GenesSettings() {
    const dispatch = useAppDispatch();
    const apiRef = useGridApiRef();

    const genesState = useAppSelector(genesSelectors.selectAll);
    const testMethods = useAppSelector(testMethodsSelectors.selectAll);
    const mutations = useAppSelector(mutationsSelectors.selectAll);

    const [genes, setGenes] = useState<Gene[]>([]);

    const handleAddGene = useCallback(
        (gene: Gene) => {
            gene.id = uuidv4();
            dispatch(genesActions.addGene(gene));
        },
        [dispatch]
    );

    const handleRemoveGene = useCallback(
        (id: string) => {
            dispatch(genesActions.removeGene(id));
        },
        [dispatch]
    );

    const processRowUpdate = useCallback(
        (newRow: Gene) => {
            if (newRow.id) {
                dispatch(
                    genesActions.updateGene({
                        id: newRow.id,
                        changes: newRow
                    })
                );
            }

            return newRow;
        },
        [dispatch]
    );

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
            ] as GridColDef<Gene>[],
        [handleAddGene, handleRemoveGene, genes, testMethods, mutations]
    );

    useEffect(() => {
        setGenes([
            ...genesState,
            {
                id: '',
                name: '',
                testMethodIds: [],
                mutationIds: []
            }
        ]);
    }, [genesState]);

    useEffect(() => {
        window.setTimeout(async () => {
            await apiRef.current.autosizeColumns();
        }, 100);
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
