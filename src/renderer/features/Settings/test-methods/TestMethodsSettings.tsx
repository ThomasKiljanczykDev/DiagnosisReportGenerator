import { useCallback, useEffect, useMemo, useState } from 'react';

import { v4 as uuidv4 } from 'uuid';

import { DataGrid, type GridColDef, useGridApiRef } from '@mui/x-data-grid';

import { testMethodsSelectors } from '@/common/redux/selectors';
import { testMethodsActions } from '@/common/redux/slices/settings/test-methods';
import type { TestMethod } from '@/common/types/entities';
import AppPageContent from '@/renderer/components/AppPageContent';
import { ActionCell } from '@/renderer/components/cells';
import { useAppDispatch, useAppSelector } from '@/renderer/hooks/redux';

export default function TestMethodsSettings() {
    const dispatch = useAppDispatch();
    const apiRef = useGridApiRef();

    const testMethodsState = useAppSelector(testMethodsSelectors.selectAll);

    const [testMethods, setTestMethods] = useState<TestMethod[]>([]);

    const handleAddTestMethod = useCallback(
        (testMethod: TestMethod) => {
            testMethod.id = uuidv4();
            dispatch(testMethodsActions.addTestMethods(testMethod));
        },
        [dispatch]
    );

    const handleRemoveTestMethod = useCallback(
        (id: string) => {
            dispatch(testMethodsActions.removeTestMethods(id));
        },
        [dispatch]
    );

    const processRowUpdate = useCallback(
        (newRow: TestMethod) => {
            if (newRow.id) {
                dispatch(
                    testMethodsActions.updateTestMethods({
                        id: newRow.id,
                        changes: newRow
                    })
                );
            }

            return newRow;
        },
        [dispatch]
    );

    const METODY_COLUMNS: GridColDef<TestMethod>[] = useMemo(
        () => [
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
                        onAdd={handleAddTestMethod}
                        onRemove={handleRemoveTestMethod}
                    />
                )
            },
            {
                field: 'name',
                headerName: 'Nazwa',
                hideable: false,
                editable: true
            }
        ],
        [handleAddTestMethod, handleRemoveTestMethod]
    );

    useEffect(() => {
        setTestMethods([
            ...testMethodsState,
            {
                id: '',
                name: ''
            }
        ]);
    }, [testMethodsState]);

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
