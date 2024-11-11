import { type ZodTypeAny } from 'zod';

import type { CreateUpdateStaffMemberDto } from '@diagnosis-report-generator/api/services';

import { z } from '@/modules/core/lib/zod-i18n';

type StaffMemberShape = {
    [k in keyof CreateUpdateStaffMemberDto]: ZodTypeAny;
};

export function staffMemberValidator() {
    return z.object({
        name: z.string(),
        title: z.string(),
        role: z.string()
    } as StaffMemberShape);
}
