import { useCallback, useEffect, useState } from 'react';

import { type MutationDto, MutationService } from '@diagnosis-report-generator/api/services';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import { Button } from '@mui/material';
import { createLazyFileRoute } from '@tanstack/react-router';

import AppPageContent from '@/modules/core/components/AppPageContent';
import CreateMutationDialog from '@/modules/settings/components/mutations/CreateMutationDialog';
import MutationsDataGrid from '@/modules/settings/components/mutations/MutationsDataGrid';

function MutationsSettings() {
    const [showCreateRecommendationModal, setShowCreateRecommendationModal] = useState(false);
    const [mutations, setMutations] = useState<MutationDto[]>([]);

    const getMutations = useCallback(async (signal?: AbortSignal) => {
        const response = await MutationService.getList(undefined, { signal });

        setMutations(response.items);
    }, []);

    useEffect(() => {
        const abortController = new AbortController();

        getMutations(abortController.signal);

        return () => {
            abortController.abort();
        };
    }, [getMutations]);

    return (
        <>
            <CreateMutationDialog
                open={showCreateRecommendationModal}
                onClose={() => {
                    setShowCreateRecommendationModal(false);
                }}
                onMutationsChanged={getMutations}
            />
            <AppPageContent
                title="Mutacje"
                actionButtons={
                    <Button
                        variant="contained"
                        onClick={() => setShowCreateRecommendationModal(true)}
                        startIcon={<AddCircleOutlineRoundedIcon fontSize="small" />}
                    >
                        Dodaj mutację
                    </Button>
                }
            >
                <MutationsDataGrid mutations={mutations} onMutationsChanged={getMutations} />
            </AppPageContent>
        </>
    );
}

export const Route = createLazyFileRoute('/settings/mutations/')({
    component: MutationsSettings
});
