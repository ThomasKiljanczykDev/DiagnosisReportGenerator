import { useCallback, useEffect, useState } from 'react';

import { type StaffMemberDto, StaffService } from '@diagnosis-report-generator/api/services';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import { Button } from '@mui/material';
import { createLazyFileRoute } from '@tanstack/react-router';

import AppPageContent from '@/modules/core/components/AppPageContent';
import CreateStaffMemberDialog from '@/modules/settings/components/staff/CreateStaffMemberDialog';
import StaffDataGrid from '@/modules/settings/components/staff/StaffDataGrid';

function StaffSettings() {
    const [showCreateStaffMemberModal, setShowCreateStaffMemberModal] = useState(false);
    const [staff, setStaff] = useState<StaffMemberDto[]>([]);

    const getStaff = useCallback(async (signal?: AbortSignal) => {
        const response = await StaffService.getList(undefined, { signal });
        setStaff(response.items);
    }, []);

    useEffect(() => {
        const abortController = new AbortController();
        getStaff(abortController.signal);

        return () => {
            abortController.abort();
        };
    }, [getStaff]);

    return (
        <>
            <CreateStaffMemberDialog
                open={showCreateStaffMemberModal}
                onClose={() => {
                    setShowCreateStaffMemberModal(false);
                }}
                onStaffChanged={getStaff}
            />
            <AppPageContent
                title="Personel"
                actionButtons={
                    <Button
                        variant="contained"
                        onClick={() => setShowCreateStaffMemberModal(true)}
                        startIcon={<AddCircleOutlineRoundedIcon fontSize="small" />}
                    >
                        Dodaj członka personelu
                    </Button>
                }
            >
                <StaffDataGrid staff={staff} onStaffChanged={getStaff} />
            </AppPageContent>
        </>
    );
}

export const Route = createLazyFileRoute('/settings/staff/')({
    component: StaffSettings
});
