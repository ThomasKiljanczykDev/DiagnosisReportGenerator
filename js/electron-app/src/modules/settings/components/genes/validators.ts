import { type ZodTypeAny } from 'zod';

import type { CreateUpdateGeneDto } from '@diagnosis-report-generator/api/services';

import { z } from '@/modules/core/lib/pl-zod';

type GeneShape = {
    [k in keyof CreateUpdateGeneDto]: ZodTypeAny;
};

export function geneValidator() {
    return z.object({
        name: z.string(),
        testMethodIds: z.array(z.string()).min(1),
        mutationIds: z.array(z.string()).min(1)
    } as GeneShape);
}
