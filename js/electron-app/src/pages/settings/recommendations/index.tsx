import { useCallback, useEffect, useState } from 'react';

import {
    type RecommendationDto,
    RecommendationService
} from '@diagnosis-report-generator/api/services';
import { Box, Button } from '@mui/material';

import AppPageContent from '@/modules/core/components/AppPageContent';
import CreateRecommendationDialog from '@/modules/settings/components/recommendations/CreateRecommendationDialog';
import RecommendationsDataGrid from '@/modules/settings/components/recommendations/RecommendationsDataGrid';

export default function RecommendationsSettings() {
    const [showAddRecommendationModal, setShowCreateRecommendationModal] = useState(false);
    const [recommendations, setRecommendations] = useState<RecommendationDto[]>([]);

    const getRecommendations = useCallback(async (signal?: AbortSignal) => {
        const response = await RecommendationService.getList(undefined, { signal });
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
        <>
            <CreateRecommendationDialog
                open={showAddRecommendationModal}
                onClose={() => {
                    setShowCreateRecommendationModal(false);
                }}
                onRecommendationsChanged={getRecommendations}
            />
            <AppPageContent title="Zalecenia">
                <Box marginBottom={1}>
                    <Button
                        variant="contained"
                        onClick={() => setShowCreateRecommendationModal(true)}
                    >
                        Stwórz zalecenie
                    </Button>
                </Box>

                <Box flexGrow={1}>
                    <RecommendationsDataGrid
                        recommendations={recommendations}
                        onRecommendationsChanged={getRecommendations}
                    />
                </Box>
            </AppPageContent>
        </>
    );
}
