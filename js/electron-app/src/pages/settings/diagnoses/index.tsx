import { useCallback, useEffect, useState } from 'react';

import {
    type DiagnosisDto,
    DiagnosisService,
    type RecommendationDto,
    RecommendationService
} from '@diagnosis-report-generator/api/services';
import { useGridApiRef } from '@mui/x-data-grid';

import AppPageContent from '@/modules/core/components/AppPageContent';
import DiagnosesDataGrid from '@/modules/settings/components/diagnoses/DiagnosesDataGrid';

export default function DiagnosesSettings() {
    const apiRef = useGridApiRef();

    const [diagnoses, setDiagnoses] = useState<DiagnosisDto[]>([]);
    const [recommendations, setRecommendations] = useState<RecommendationDto[]>([]);

    const getDiagnoses = useCallback(async (signal?: AbortSignal) => {
        const response = await DiagnosisService.getList(undefined, { signal });

        response.items.push({
            id: '',
            name: '',
            recommendationIds: []
        });
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
        <AppPageContent title="Rozpoznania">
            <DiagnosesDataGrid
                diagnoses={diagnoses}
                recommendations={recommendations}
                onDiagnosesChanged={getDiagnoses}
            />
        </AppPageContent>
    );
}
