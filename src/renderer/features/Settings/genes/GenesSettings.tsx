import { useCallback, useEffect, useMemo, useState } from 'react';

import { v4 as uuidv4 } from 'uuid';

import { DataGrid, type GridColDef } from '@mui/x-data-grid';

import { genesSelectors, mutationsSelectors, testMethodsSelectors } from '@/common/redux/selectors';
import { genesActions } from '@/common/redux/slices/settings/genes';
import type { Gene } from '@/common/types/entities';
import AppPageContent from '@/renderer/components/AppPageContent';
import { ActionCell } from '@/renderer/components/cells';
import MultiSelectCell from '@/renderer/components/cells/MultiSelectCell';
import MultiSelectEditCell from '@/renderer/components/cells/MultiSelectEditCell';
import { useAppDispatch, useAppSelector } from '@/renderer/hooks/redux';

export default function GenesSettings() {
    const dispatch = useAppDispatch();

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
                            entity={params.row}
                            onAdd={handleAddGene}
                            onRemove={handleRemoveGene}
                        />
                    )
                },
                { field: 'name', headerName: 'Nazwa', hideable: false, editable: true, flex: 1 },
                {
                    field: 'testMethodIds',
                    headerName: 'Metody Badań',
                    editable: true,
                    flex: 1,
                    type: 'custom',
                    renderEditCell: (params) => (
                        <MultiSelectEditCell
                            params={params}
                            items={testMethods}
                            initialValue={params.value}
                            keyFn={(item) => item.id}
                            displayFn={(item) => item.name}
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
                    ),
                    flex: 1
                }
            ] as GridColDef<Gene>[],
        [handleAddGene, handleRemoveGene, testMethods, mutations]
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

    return (
        <AppPageContent title="Geny">
            <DataGrid
                columns={GENES_COLUMNS}
                rows={genes}
                rowSelection={false}
                processRowUpdate={processRowUpdate}
                getRowClassName={(row) => (row.id ? '' : 'new-row')}
            />
        </AppPageContent>
    );
}
