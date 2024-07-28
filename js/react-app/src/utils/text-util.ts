import { StaffRole } from '@diagnosis-report-generator/api/services';

import { Sex } from '@/common/models/patient';

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
        case StaffRole.Doctor:
            return 'Lekarz';
        case StaffRole.Technician:
            return 'Technik';
        case StaffRole.Consultant:
            return 'Konsultant';
        case StaffRole.Assistant:
            return 'Asystent';
        default:
            return 'Nieznana';
    }
}
