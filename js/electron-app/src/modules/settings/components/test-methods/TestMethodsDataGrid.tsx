import { useCallback, useEffect, useMemo } from 'react';

import { type TestMethodDto, TestMethodService } from '@diagnosis-report-generator/api/services';
import { DataGrid, type GridColDef, useGridApiRef } from '@mui/x-data-grid';

import AppPageContent from '@/modules/core/components/AppPageContent';
import { ActionCell } from '@/modules/core/components/cells';
import EditCellWithErrorRenderer from '@/modules/core/components/cells/EditCellWithErrorRenderer';
import { validateName } from '@/modules/core/utils/validators';

interface TestMethodsDataGridProps {
    testMethods: TestMethodDto[];
    onTestMethodsChanged: () => Promise<void>;
}

export default function TestMethodsDataGrid(props: TestMethodsDataGridProps) {
    const apiRef = useGridApiRef();

    const handleAddTestMethod = useCallback(
        async (testMethod: TestMethodDto) => {
            await TestMethodService.create({
                body: testMethod
            });
            await props.onTestMethodsChanged();
        },
        [props]
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
                        const errorMessage = validateName(params.props.value, props.testMethods);
                        return { ...params.props, error: errorMessage };
                    },
                    renderEditCell: EditCellWithErrorRenderer
                }
            ] as GridColDef<TestMethodDto>[],
        [handleAddTestMethod, handleRemoveTestMethod, props.testMethods]
    );
    useEffect(() => {
        window.setTimeout(async () => {
            await apiRef.current.autosizeColumns({
                includeOutliers: true,
                includeHeaders: true
            });
        }, 100);
    }, [props.testMethods, apiRef]);

    return (
        <DataGrid
            apiRef={apiRef}
            columns={METODY_COLUMNS}
            rows={props.testMethods}
            rowSelection={false}
            processRowUpdate={processRowUpdate}
            getRowClassName={(row) => (row.id ? '' : 'new-row')}
            autosizeOnMount={true}
        />
    );
}
