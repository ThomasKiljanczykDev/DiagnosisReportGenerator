import { createAppSlice } from '@/common/redux/redux-common';
import { RootState } from '@/common/redux/store';
import { createEntityAdapter } from '@reduxjs/toolkit';

export enum StaffRole {
    Doctor = 'doctor',
    Technician = 'technician',
    Consultant = 'consultant',
    Assistant = 'assistant'
}

export interface StaffMember {
    id: string;
    name: string;
    title: string;
    role: StaffRole;
}

const staffAdapter = createEntityAdapter<StaffMember>({
    sortComparer: (a, b) => a.name.localeCompare(b.name)
});

const staffSlice = createAppSlice({
    name: 'staff',
    initialState: staffAdapter.getInitialState(),
    reducers: {
        addStaffMember: staffAdapter.addOne,
        updateStaffMember: staffAdapter.updateOne,
        removeStaffMember: staffAdapter.removeOne
    }
});

export default staffSlice;

export const staffSelectors = staffAdapter.getSelectors((state: RootState) => state.settings.staff);

export const staffActions = staffSlice.actions;
