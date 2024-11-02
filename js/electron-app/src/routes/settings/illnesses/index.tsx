import React, { useCallback, useEffect, useState } from 'react';

import {
    type IllnessDto,
    IllnessService,
    type RecommendationDto,
    RecommendationService
} from '@diagnosis-report-generator/api/services';
import { Box, Button } from '@mui/material';
import { createFileRoute } from '@tanstack/react-router';

import AppPageContent from '@/modules/core/components/AppPageContent';
import CreateIllnessDialog from '@/modules/settings/components/illnesses/CreateIllnessDialog';
import IllnessesDataGrid from '@/modules/settings/components/illnesses/IllnessesDataGrid';

function IllnessesSettings() {
    const [showCreateIllnessModal, setShowCreateIllnessModal] = useState(false);
    const [illnesses, setIllnesses] = useState<IllnessDto[]>([]);
    const [recommendations, setRecommendations] = useState<RecommendationDto[]>([]);

    const getIllnesses = useCallback(async (signal?: AbortSignal) => {
        const response = await IllnessService.getList(undefined, { signal });
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
        <>
            <CreateIllnessDialog
                open={showCreateIllnessModal}
                onClose={() => {
                    setShowCreateIllnessModal(false);
                }}
                onIllnessesChanged={getIllnesses}
                recommendations={recommendations}
            />
            <AppPageContent title="Choroby">
                <Box marginBottom={1}>
                    <Button variant="contained" onClick={() => setShowCreateIllnessModal(true)}>
                        Stwórz chorobę
                    </Button>
                </Box>

                <Box flexGrow={1}>
                    <IllnessesDataGrid
                        illnesses={illnesses}
                        recommendations={recommendations}
                        onIllnessesChanged={getIllnesses}
                    />
                </Box>
            </AppPageContent>
        </>
    );
}

export const Route = createFileRoute('/settings/illnesses/')({
    component: IllnessesSettings
});
