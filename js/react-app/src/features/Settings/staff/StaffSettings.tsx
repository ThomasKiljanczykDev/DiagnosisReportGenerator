import { useCallback, useEffect, useMemo, useState } from 'react';

import { v4 as uuidv4 } from 'uuid';

import { DataGrid, type GridColDef, useGridApiRef } from '@mui/x-data-grid';

import { staffSelectors } from '@/redux/selectors';
import { staffActions } from '@/redux/slices/settings/staff';
import { type StaffMember, StaffRole } from '@/common/types/entities';
import AppPageContent from '@/components/AppPageContent';
import { ActionCell } from '@/components/cells';
import EditCellWithErrorRenderer from '@/components/cells/EditCellWithErrorRenderer';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { staffRoleToPolishString } from '@/utils/text-util';
import { validateName } from '@/utils/validators';

export default function StaffSettings() {
    const dispatch = useAppDispatch();
    const apiRef = useGridApiRef();

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
            ] as GridColDef<StaffMember>[],
        [handleAddStaffMember, handleRemoveStaffMember, staff]
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
