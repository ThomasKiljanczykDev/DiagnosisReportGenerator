import React, { useCallback, useEffect, useState } from 'react';

import {
    type IllnessDto,
    IllnessService,
    type RecommendationDto,
    RecommendationService
} from '@diagnosis-report-generator/api/services';

import AppPageContent from '@/modules/core/components/AppPageContent';
import IllnessesDataGrid from '@/modules/settings/components/illnesses/IllnessesDataGrid';

export default function IllnessesSettings() {
    const [illnesses, setIllnesses] = useState<IllnessDto[]>([]);
    const [recommendations, setRecommendations] = useState<RecommendationDto[]>([]);

    const getIllnesses = useCallback(async (signal?: AbortSignal) => {
        const response = await IllnessService.getList(undefined, { signal });

        response.items.push({
            id: '',
            name: '',
            recommendationIds: []
        });
        setIllnesses(response.items);
    }, []);

    useEffect(() => {
        const abortController = new AbortController();

        getIllnesses(abortController.signal);

        RecommendationService.getList(undefined, { signal: abortController.signal }).then(
            (response) => {
                setRecommendations(response.items);
            }
        );

        return () => {
            abortController.abort();
        };
    }, [getIllnesses]);

    return (
        <AppPageContent title="Choroby">
            <IllnessesDataGrid
                illnesses={illnesses}
                recommendations={recommendations}
                onIllnessesChanged={getIllnesses}
            />
        </AppPageContent>
    );
}
