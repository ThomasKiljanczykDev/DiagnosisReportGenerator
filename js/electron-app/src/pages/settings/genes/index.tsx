import { useCallback, useEffect, useState } from 'react';

import {
    type GeneDto,
    GeneService,
    type MutationDto,
    MutationService,
    type TestMethodDto,
    TestMethodService
} from '@diagnosis-report-generator/api/services';

import AppPageContent from '@/modules/core/components/AppPageContent';
import GenesDataGrid from '@/modules/settings/components/genes/GenesDataGrid';

export default function GenesSettings() {
    const [genes, setGenes] = useState<GeneDto[]>([]);
    const [testMethods, setTestMethods] = useState<TestMethodDto[]>([]);
    const [mutations, setMutations] = useState<MutationDto[]>([]);

    const getGenes = useCallback(async (signal?: AbortSignal) => {
        const response = await GeneService.getList(undefined, { signal });

        response.items.push({
            id: '',
            name: '',
            testMethodIds: [],
            mutationIds: []
        });
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
        <AppPageContent title="Geny">
            <GenesDataGrid
                genes={genes}
                testMethods={testMethods}
                mutations={mutations}
                onGenesChanged={getGenes}
            />
        </AppPageContent>
    );
}
