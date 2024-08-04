import { type ZodTypeAny } from 'zod';

import type { CreateUpdateRecommendationDto } from '@diagnosis-report-generator/api/services';

import { z } from '@/modules/core/lib/pl-zod';

type RecommendationShape = {
    [k in keyof CreateUpdateRecommendationDto]: ZodTypeAny;
};

export function recommendationValidator() {
    // TODO: Add validation for age range (from < to)
    return z.object({
        name: z.string(),
        content: z.string(),
        priority: z.number().int().min(1).optional(),
        level: z.string(),
        ageRange: z.object({
            from: z.number().int().nullish(),
            to: z.number().int().nullish()
        })
    } as RecommendationShape);
}
