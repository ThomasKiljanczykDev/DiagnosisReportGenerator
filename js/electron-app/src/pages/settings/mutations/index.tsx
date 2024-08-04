import { useCallback, useEffect, useState } from 'react';

import { type MutationDto, MutationService } from '@diagnosis-report-generator/api/services';

import AppPageContent from '@/modules/core/components/AppPageContent';
import MutationsDataGrid from '@/modules/settings/components/mutations/MutationsDataGrid';

export default function MutationsSettings() {
    const [mutations, setMutations] = useState<MutationDto[]>([]);

    const getMutations = useCallback(async (signal?: AbortSignal) => {
        const response = await MutationService.getList(undefined, { signal });

        response.items.push({
            id: '',
            name: ''
        });
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
        <AppPageContent title="Mutacje">
            <MutationsDataGrid mutations={mutations} onMutationsChanged={getMutations} />
        </AppPageContent>
    );
}
