import { useCallback, useEffect, useState } from 'react';

import { type MutationDto, MutationService } from '@diagnosis-report-generator/api/services';
import { Box, Button } from '@mui/material';
import { createFileRoute } from '@tanstack/react-router';

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
            <AppPageContent title="Mutacje">
                <Box marginBottom={1}>
                    <Button
                        variant="contained"
                        onClick={() => setShowCreateRecommendationModal(true)}
                    >
                        Stwórz mutację
                    </Button>
                </Box>

                <Box flexGrow={1}>
                    <MutationsDataGrid mutations={mutations} onMutationsChanged={getMutations} />
                </Box>
            </AppPageContent>
        </>
    );
}

export const Route = createFileRoute('/settings/mutations/')({
    component: MutationsSettings
});
