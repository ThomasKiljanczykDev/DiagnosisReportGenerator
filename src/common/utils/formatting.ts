import type { StaffMember } from '@/common/types/entities';

export function formatStaffMember(staffMember: StaffMember | null): string {
    if (!staffMember) {
        return '';
    }

    let result = '';
    if (staffMember?.title) {
        result += `${staffMember.title} `;
    }
    if (staffMember?.name) {
        result += `${staffMember.name} `;
    }

    return result;
}
