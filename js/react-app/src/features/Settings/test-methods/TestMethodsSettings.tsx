import { useCallback, useEffect, useMemo, useState } from 'react';

import { type TestMethodDto, TestMethodService } from '@diagnosis-report-generator/api/services';
import { DataGrid, type GridColDef, useGridApiRef } from '@mui/x-data-grid';

import AppPageContent from '@/components/AppPageContent';
import { ActionCell } from '@/components/cells';
import EditCellWithErrorRenderer from '@/components/cells/EditCellWithErrorRenderer';
import { validateName } from '@/utils/validators';

export default function TestMethodsSettings() {
    const apiRef = useGridApiRef();

    const [testMethods, setTestMethods] = useState<TestMethodDto[]>([]);

    const getTestMethods = useCallback(async (signal?: AbortSignal) => {
        const response = await TestMethodService.getList(undefined, { signal });

        response.items.push({
            id: '',
            name: ''
        });
        setTestMethods(response.items);
    }, []);

    const handleAddTestMethod = useCallback(
        async (testMethod: TestMethodDto) => {
            await TestMethodService.create({
                body: testMethod
            });
            await getTestMethods();
        },
        [getTestMethods]
    );

    const handleRemoveTestMethod = useCallback(async (id: string) => {
        await TestMethodService.delete({ id });
    }, []);

    const processRowUpdate = useCallback(async (newRow: TestMethodDto) => {
        if (newRow.id) {
            newRow = await TestMethodService.update({
                id: newRow.id,
                body: newRow
            });
        }

        return newRow;
    }, []);

    const METODY_COLUMNS = useMemo(
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
                            onAdd={handleAddTestMethod}
                            onRemove={handleRemoveTestMethod}
                        />
                    )
                },
                {
                    field: 'name',
                    headerName: 'Nazwa',
                    hideable: false,
                    editable: true,
                    preProcessEditCellProps: (params) => {
                        const errorMessage = validateName(params.props.value, testMethods);
                        return { ...params.props, error: errorMessage };
                    },
                    renderEditCell: EditCellWithErrorRenderer
                }
            ] as GridColDef<TestMethodDto>[],
        [handleAddTestMethod, handleRemoveTestMethod, testMethods]
    );

    useEffect(() => {
        const abortController = new AbortController();
        getTestMethods(abortController.signal);

        return () => {
            abortController.abort();
        };
    }, [getTestMethods]);

    useEffect(() => {
        window.setTimeout(async () => {
            await apiRef.current.autosizeColumns();
        }, 100);
    }, [testMethods, apiRef]);

    return (
        <AppPageContent title="Metody Badań">
            <DataGrid
                apiRef={apiRef}
                columns={METODY_COLUMNS}
                rows={testMethods}
                rowSelection={false}
                processRowUpdate={processRowUpdate}
                getRowClassName={(row) => (row.id ? '' : 'new-row')}
                autosizeOnMount={true}
            />
        </AppPageContent>
    );
}
