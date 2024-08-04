import { type ZodTypeAny } from 'zod';

import type { CreateUpdateMutationDto } from '@diagnosis-report-generator/api/services';

import { z } from '@/modules/core/lib/pl-zod';

type MutationShape = {
    [k in keyof CreateUpdateMutationDto]: ZodTypeAny;
};

export function mutationValidator() {
    return z.object({
        name: z.string()
    } as MutationShape);
}
