import { Sex } from '@/common/models/patient';
import type { StaffRole } from '@/common/types/entities';

export function sexToPolishString(sex: Sex): string {
    switch (sex) {
        case Sex.Male:
            return 'Mężczyzna';
        case Sex.Female:
            return 'Kobieta';
        default:
            return 'Nieznana';
    }
}

export function staffRoleToPolishString(staffRole: StaffRole): string {
    switch (staffRole) {
        case 'doctor':
            return 'Lekarz';
        case 'technician':
            return 'Technik';
        case 'consultant':
            return 'Konsultant';
        case 'assistant':
            return 'Asystent';
        default:
            return 'Nieznana';
    }
}
