import { useCallback, useEffect, useMemo, useState } from 'react';

import { v4 as uuidv4 } from 'uuid';

import { DataGrid, type GridColDef } from '@mui/x-data-grid';

import {
    type StaffMember,
    StaffRole,
    staffActions,
    staffSelectors
} from '@/common/redux/slices/settings/staff';
import AppPageContent from '@/renderer/components/AppPageContent';
import { ActionCell } from '@/renderer/components/cells';
import { useAppDispatch, useAppSelector } from '@/renderer/hooks/redux';

export default function StaffSettings() {
    const dispatch = useAppDispatch();

    const staffState = useAppSelector(staffSelectors.selectAll);

    const [staff, setStaff] = useState<StaffMember[]>([]);

    const handleAddStaffMember = useCallback(
        (staffMember: StaffMember) => {
            staffMember.id = uuidv4();
            dispatch(staffActions.addStaffMember(staffMember));
        },
        [dispatch]
    );

    const handleRemoveStaffMember = useCallback(
        (id: string) => {
            dispatch(staffActions.removeStaffMember(id));
        },
        [dispatch]
    );

    const processRowUpdate = useCallback(
        (newRow: StaffMember) => {
            if (newRow.id) {
                dispatch(
                    staffActions.updateStaffMember({
                        id: newRow.id,
                        changes: newRow
                    })
                );
            }

            return newRow;
        },
        [dispatch]
    );

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
                            entity={params.row}
                            onAdd={handleAddStaffMember}
                            onRemove={handleRemoveStaffMember}
                        />
                    )
                },
                { field: 'name', headerName: 'Imię i nazwisko', editable: true, flex: 1 },
                { field: 'title', headerName: 'Tytuł', editable: true, flex: 1 },
                {
                    field: 'role',
                    headerName: 'Rola',
                    editable: true,
                    type: 'singleSelect',
                    valueOptions: Object.values(StaffRole),
                    flex: 1
                }
            ] as GridColDef<StaffMember>[],
        [handleAddStaffMember, handleRemoveStaffMember]
    );

    useEffect(() => {
        setStaff([
            ...staffState,
            {
                id: '',
                name: '',
                title: '',
                role: StaffRole.Doctor
            }
        ]);
    }, [staffState]);

    return (
        <AppPageContent title="Personel">
            <DataGrid
                columns={STAFF_COLUMNS}
                rows={staff}
                rowSelection={false}
                processRowUpdate={processRowUpdate}
                getRowClassName={(row) => (row.id ? '' : 'new-row')}
            />
        </AppPageContent>
    );
}
