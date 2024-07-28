import { useCallback, useEffect, useMemo, useState } from 'react';

import {
    type StaffMemberDto,
    StaffRole,
    StaffService
} from '@diagnosis-report-generator/api/services';
import { DataGrid, type GridColDef, useGridApiRef } from '@mui/x-data-grid';

import AppPageContent from '@/components/AppPageContent';
import { ActionCell } from '@/components/cells';
import EditCellWithErrorRenderer from '@/components/cells/EditCellWithErrorRenderer';
import { staffRoleToPolishString } from '@/utils/text-util';
import { validateName } from '@/utils/validators';

export default function StaffSettings() {
    const apiRef = useGridApiRef();

    const [staff, setStaff] = useState<StaffMemberDto[]>([]);

    const getStaff = useCallback(async (signal?: AbortSignal) => {
        const response = await StaffService.getList(undefined, { signal });

        response.items.push({
            id: '',
            name: '',
            title: '',
            role: StaffRole.Doctor
        });
        setStaff(response.items);
    }, []);

    const handleAddStaffMember = useCallback(
        async (staffMember: StaffMemberDto) => {
            await StaffService.create({
                body: staffMember
            });
            await getStaff();
        },
        [getStaff]
    );

    const handleRemoveStaffMember = useCallback(async (id: string) => {
        await StaffService.delete({ id });
    }, []);

    const processRowUpdate = useCallback(async (newRow: StaffMemberDto) => {
        if (newRow.id) {
            newRow = await StaffService.update({
                id: newRow.id,
                body: newRow
            });
        }

        return newRow;
    }, []);

    const STAFF_COLUMNS = useMemo(
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
                            onAdd={handleAddStaffMember}
                            onRemove={handleRemoveStaffMember}
                        />
                    )
                },
                {
                    field: 'name',
                    headerName: 'Imię i nazwisko',
                    editable: true,
                    preProcessEditCellProps: (params) => {
                        const errorMessage = validateName(params.props.value, staff);
                        return { ...params.props, error: errorMessage };
                    },
                    renderEditCell: EditCellWithErrorRenderer
                },
                {
                    field: 'title',
                    headerName: 'Tytuł',
                    editable: true
                },
                {
                    field: 'role',
                    headerName: 'Rola',
                    editable: true,
                    type: 'singleSelect',
                    valueOptions: Object.values(StaffRole),
                    getOptionLabel: (staffRole: StaffRole) => staffRoleToPolishString(staffRole)
                }
            ] as GridColDef<StaffMemberDto>[],
        [handleAddStaffMember, handleRemoveStaffMember, staff]
    );

    useEffect(() => {
        const abortController = new AbortController();
        getStaff(abortController.signal);

        return () => {
            abortController.abort();
        };
    }, [getStaff]);

    useEffect(() => {
        window.setTimeout(async () => {
            await apiRef.current.autosizeColumns();
        }, 100);
    }, [staff, apiRef]);

    return (
        <AppPageContent title="Personel">
            <DataGrid
                apiRef={apiRef}
                columns={STAFF_COLUMNS}
                rows={staff}
                rowSelection={false}
                processRowUpdate={processRowUpdate}
                getRowClassName={(row) => (row.id ? '' : 'new-row')}
                autosizeOnMount
            />
        </AppPageContent>
    );
}
