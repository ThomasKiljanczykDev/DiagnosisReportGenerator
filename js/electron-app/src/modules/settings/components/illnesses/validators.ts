import { type ZodTypeAny } from 'zod';

import type {
    CreateUpdateIllnessDto
} from '@diagnosis-report-generator/api/services';

import { z } from '@/modules/core/lib/pl-zod';

type IllnessShape = {
    [k in keyof CreateUpdateIllnessDto]: ZodTypeAny;
};

export function illnessValidator() {
    return z.object({
        name: z.string(),
        recommendationIds: z.array(z.string())
    } as IllnessShape);
}
