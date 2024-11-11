import { type ZodTypeAny } from 'zod';

import type { CreateUpdateRecommendationDto } from '@diagnosis-report-generator/api/services';

import { z } from '@/modules/core/lib/zod-i18n';

type RecommendationShape = {
    [k in keyof CreateUpdateRecommendationDto]: ZodTypeAny;
};

export function recommendationValidator() {
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
