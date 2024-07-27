import { createEntityAdapter } from '@reduxjs/toolkit';

import type { StaffMember } from '@/common/types/entities';
import { createAppSlice } from '@/redux/common';

export const staffAdapter = createEntityAdapter<StaffMember>({
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

export const staffActions = staffSlice.actions;
