import { type ZodTypeAny } from 'zod';

import type { CreateUpdateDiagnosisDto } from '@diagnosis-report-generator/api/services';

import { z } from '@/modules/core/lib/pl-zod';

type DiagnosisShape = {
    [k in keyof CreateUpdateDiagnosisDto]: ZodTypeAny;
};

export function diagnosisValidator() {
    return z.object({
        name: z.string(),
        recommendationIds: z.array(z.string()).min(1)
    } as DiagnosisShape);
}
