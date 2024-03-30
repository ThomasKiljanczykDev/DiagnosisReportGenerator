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
