import React, { useCallback, useEffect, useState } from 'react';

import {
    type DiagnosisDto,
    DiagnosisService,
    type RecommendationDto,
    RecommendationService
} from '@diagnosis-report-generator/api/services';
import { Button } from '@mui/material';
import { useGridApiRef } from '@mui/x-data-grid';
import { createFileRoute } from '@tanstack/react-router';

import AppPageContent from '@/modules/core/components/AppPageContent';
import CreateDiagnosisDialog from '@/modules/settings/components/diagnoses/CreateDiagnosisDialog';
import DiagnosesDataGrid from '@/modules/settings/components/diagnoses/DiagnosesDataGrid';

function DiagnosesSettings() {
    const [showCreateDiagnosisModal, setShowCreateDiagnosisModal] = useState(false);
    const apiRef = useGridApiRef();

    const [diagnoses, setDiagnoses] = useState<DiagnosisDto[]>([]);
    const [recommendations, setRecommendations] = useState<RecommendationDto[]>([]);

    const getDiagnoses = useCallback(async (signal?: AbortSignal) => {
        const response = await DiagnosisService.getList(undefined, { signal });
        setDiagnoses(response.items);
    }, []);

    useEffect(() => {
        window.setTimeout(async () => {
            await apiRef.current.autosizeColumns();
        }, 100);
    }, [diagnoses, apiRef]);

    useEffect(() => {
        const abortController = new AbortController();

        getDiagnoses(abortController.signal);

        RecommendationService.getList(undefined, { signal: abortController.signal }).then(
            (response) => {
                setRecommendations(response.items);
            }
        );

        return () => {
            abortController.abort();
        };
    }, [getDiagnoses]);

    return (
        <>
            <CreateDiagnosisDialog
                open={showCreateDiagnosisModal}
                onClose={() => {
                    setShowCreateDiagnosisModal(false);
                }}
                onDiagnosesChanged={getDiagnoses}
                recommendations={recommendations}
            />
            <AppPageContent
                title="Rozpoznania"
                actionButtons={
                    <Button variant="contained" onClick={() => setShowCreateDiagnosisModal(true)}>
                        Stwórz rozpoznanie
                    </Button>
                }
            >
                <DiagnosesDataGrid
                    diagnoses={diagnoses}
                    recommendations={recommendations}
                    onDiagnosesChanged={getDiagnoses}
                />
            </AppPageContent>
        </>
    );
}

export const Route = createFileRoute('/settings/diagnoses/')({
    component: DiagnosesSettings
});
