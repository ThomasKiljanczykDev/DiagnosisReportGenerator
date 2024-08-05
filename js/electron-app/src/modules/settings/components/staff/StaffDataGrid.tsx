import { useCallback, useEffect, useMemo } from 'react';

import {
    type StaffMemberDto,
    StaffRole,
    StaffService
} from '@diagnosis-report-generator/api/services';
import { DataGrid, type GridColDef, useGridApiRef } from '@mui/x-data-grid';

import { ActionCell } from '@/modules/core/components/cells';
import EditCellWithErrorRenderer from '@/modules/core/components/cells/EditCellWithErrorRenderer';
import { staffRoleToPolishString } from '@/modules/core/utils/text-util';
import { validateName } from '@/modules/core/utils/validators';

interface StaffSettingsProps {
    staff: StaffMemberDto[];
    onStaffChanged: () => Promise<void>;
}

export default function StaffDataGrid(props: StaffSettingsProps) {
    const apiRef = useGridApiRef();

    const handleRemoveStaffMember = useCallback(
        async (id: string) => {
            await StaffService.delete({ id });
            await props.onStaffChanged();
        },
        [props]
    );

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
                        <ActionCell params={params} onRemove={handleRemoveStaffMember} />
                    )
                },
                {
                    field: 'name',
                    headerName: 'Imię i nazwisko',
                    editable: true,
                    preProcessEditCellProps: (params) => {
                        const errorMessage = validateName(params.props.value, props.staff);
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
        [handleRemoveStaffMember, props.staff]
    );

    useEffect(() => {
        window.setTimeout(async () => {
            await apiRef.current.autosizeColumns({
                includeOutliers: true,
                includeHeaders: true
            });
        }, 50);
    }, [props.staff, apiRef]);

    return (
        <DataGrid
            apiRef={apiRef}
            columns={STAFF_COLUMNS}
            rows={props.staff}
            rowSelection={false}
            processRowUpdate={processRowUpdate}
            getRowClassName={(row) => (row.id ? '' : 'new-row')}
            autosizeOnMount
        />
    );
}
