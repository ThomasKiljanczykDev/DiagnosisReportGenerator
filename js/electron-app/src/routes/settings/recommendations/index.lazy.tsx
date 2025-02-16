import { useCallback, useEffect, useState } from 'react';

import {
    type RecommendationDto,
    RecommendationService
} from '@diagnosis-report-generator/api/services';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import { Button } from '@mui/material';
import { createLazyFileRoute } from '@tanstack/react-router';

import AppPageContent from '@/modules/core/components/AppPageContent';
import CreateRecommendationDialog from '@/modules/settings/components/recommendations/CreateRecommendationDialog';
import RecommendationsDataGrid from '@/modules/settings/components/recommendations/RecommendationsDataGrid';

function RecommendationsSettings() {
    const [showCreateRecommendationModal, setShowCreateRecommendationModal] = useState(false);
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
                open={showCreateRecommendationModal}
                onClose={() => {
                    setShowCreateRecommendationModal(false);
                }}
                onRecommendationsChanged={getRecommendations}
            />
            <AppPageContent
                title="Zalecenia"
                actionButtons={
                    <Button
                        variant="contained"
                        onClick={() => setShowCreateRecommendationModal(true)}
                        startIcon={<AddCircleOutlineRoundedIcon fontSize="small" />}
                    >
                        Dodaj zalecenie
                    </Button>
                }
            >
                <RecommendationsDataGrid
                    recommendations={recommendations}
                    onRecommendationsChanged={getRecommendations}
                />
            </AppPageContent>
        </>
    );
}

export const Route = createLazyFileRoute('/settings/recommendations/')({
    component: RecommendationsSettings
});
