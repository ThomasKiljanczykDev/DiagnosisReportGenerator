import { type ZodTypeAny } from 'zod';

import type { CreateUpdateTestMethodDto } from '@diagnosis-report-generator/api/services';

import { z } from '@/modules/core/lib/zod-i18n';

type TestMethodShape = {
    [k in keyof CreateUpdateTestMethodDto]: ZodTypeAny;
};

export function testMethodValidator() {
    return z.object({
        name: z.string()
    } as TestMethodShape);
}
