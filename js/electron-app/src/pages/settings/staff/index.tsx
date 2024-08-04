import { useCallback, useEffect, useState } from 'react';

import {
    type StaffMemberDto,
    StaffRole,
    StaffService
} from '@diagnosis-report-generator/api/services';

import AppPageContent from '@/modules/core/components/AppPageContent';
import StaffDataGrid from '@/modules/settings/components/staff/StaffDataGrid';

export default function StaffSettings() {
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

    useEffect(() => {
        const abortController = new AbortController();
        getStaff(abortController.signal);

        return () => {
            abortController.abort();
        };
    }, [getStaff]);

    return (
        <AppPageContent title="Personel">
            <StaffDataGrid staff={staff} onStaffChanged={getStaff} />
        </AppPageContent>
    );
}
