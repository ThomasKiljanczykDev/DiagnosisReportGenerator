import type { StaffMemberDto } from '@diagnosis-report-generator/api/services';

export function formatStaffMember(staffMember: StaffMemberDto | null): string {
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
