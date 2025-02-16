import React, { useCallback, useEffect, useState } from 'react';

import {
    type GeneDto,
    GeneService,
    type MutationDto,
    MutationService,
    type TestMethodDto,
    TestMethodService
} from '@diagnosis-report-generator/api/services';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import { Box, Button } from '@mui/material';
import { createLazyFileRoute } from '@tanstack/react-router';

import AppPageContent from '@/modules/core/components/AppPageContent';
import CreateGeneDialog from '@/modules/settings/components/genes/CreateGeneDialog';
import GenesDataGrid from '@/modules/settings/components/genes/GenesDataGrid';

function GenesSettings() {
    const [showCreateGeneModal, setShowCreateGeneModal] = useState(false);
    const [genes, setGenes] = useState<GeneDto[]>([]);
    const [testMethods, setTestMethods] = useState<TestMethodDto[]>([]);
    const [mutations, setMutations] = useState<MutationDto[]>([]);

    const getGenes = useCallback(async (signal?: AbortSignal) => {
        const response = await GeneService.getList(undefined, { signal });
        setGenes(response.items);
    }, []);

    useEffect(() => {
        const abortController = new AbortController();

        getGenes(abortController.signal);

        TestMethodService.getList(undefined, { signal: abortController.signal }).then(
            (response) => {
                setTestMethods(response.items);
            }
        );

        MutationService.getList(undefined, { signal: abortController.signal }).then((response) => {
            setMutations(response.items);
        });

        return () => {
            abortController.abort();
        };
    }, [getGenes]);

    return (
        <>
            <CreateGeneDialog
                open={showCreateGeneModal}
                onClose={() => {
                    setShowCreateGeneModal(false);
                }}
                onGenesChanged={getGenes}
                testMethods={testMethods}
                mutations={mutations}
            />
            <AppPageContent
                title="Geny"
                actionButtons={
                    <Button
                        variant="contained"
                        onClick={() => setShowCreateGeneModal(true)}
                        startIcon={<AddCircleOutlineRoundedIcon fontSize="small" />}
                    >
                        Dodaj gen
                    </Button>
                }
            >
                <Box flexGrow={1}>
                    <GenesDataGrid
                        genes={genes}
                        testMethods={testMethods}
                        mutations={mutations}
                        onGenesChanged={getGenes}
                    />
                </Box>
            </AppPageContent>
        </>
    );
}

export const Route = createLazyFileRoute('/settings/genes/')({
    component: GenesSettings
});
