import { useCallback, useEffect, useState } from 'react';

import {
    type RecommendationDto,
    RecommendationLevel,
    RecommendationService
} from '@diagnosis-report-generator/api/services';

import AppPageContent from '@/modules/core/components/AppPageContent';
import RecommendationsDataGrid from '@/modules/settings/components/recommendations/RecommendationsDataGrid';

const int32max = 2147483647;

export default function RecommendationsSettings() {
    const [recommendations, setRecommendations] = useState<RecommendationDto[]>([]);

    const getRecommendations = useCallback(async (signal?: AbortSignal) => {
        const response = await RecommendationService.getList(undefined, { signal });

        response.items.push({
            id: '',
            name: '',
            content: '',
            level: RecommendationLevel.I,
            // Max 32-bit signed integer value
            priority: int32max,
            ageRange: {
                from: undefined,
                to: undefined
            }
        });
        setRecommendations(response.items);
    }, []);

    useEffect(() => {
        const abortController = new AbortController();

        getRecommendations(abortController.signal);

        return () => {
            abortController.abort();
        };
    }, [getRecommendations]);

    return (
        <AppPageContent title="Zalecenia">
            <RecommendationsDataGrid
                recommendations={recommendations}
                onRecommendationsChanged={getRecommendations}
            />
        </AppPageContent>
    );
}
