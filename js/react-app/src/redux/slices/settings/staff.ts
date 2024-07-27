import { createEntityAdapter } from '@reduxjs/toolkit';

import { createAppSlice } from '@/redux/common';
import type { StaffMember } from '@/common/types/entities';

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
