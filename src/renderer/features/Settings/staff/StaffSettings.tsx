import { useCallback, useEffect, useMemo, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import {
    staffActions,
    StaffMember,
    StaffRole,
    staffSelectors
} from '@/common/redux/slices/settings/staff';
import AppPageContent from '@/renderer/components/AppPageContent';
import ActionsCell from '@/renderer/features/Settings/staff/ActionsCell';
import { useAppDispatch, useAppSelector } from '@/renderer/hooks/redux';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

export default function StaffSettings() {
    const dispatch = useAppDispatch();

    const staffState = useAppSelector(staffSelectors.selectAll);

    const [staff, setStaff] = useState<StaffMember[]>([]);

    const handleAddStaffMember = useCallback((staffMember: StaffMember) => {
        staffMember.id = uuidv4();
        dispatch(staffActions.addStaffMember(staffMember));
    }, []);

    const handleRemoveStaffMember = useCallback((id: string) => {
        dispatch(staffActions.removeStaffMember(id));
    }, []);

    const STAFF_COLUMNS: GridColDef<StaffMember>[] = useMemo(
        () => [
            {
                field: 'action',
                headerName: 'Akcje',
                sortable: false,
                filterable: false,
                hideable: false,
                disableColumnMenu: true,
                renderCell: params => (
                    <ActionsCell
                        staffMember={params.row}
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
        ],
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
                onCellEditStop={e => {
                    console.log(e);
                }}
            />
        </AppPageContent>
    );
}
