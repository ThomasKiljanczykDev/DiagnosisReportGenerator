import { useCallback, useEffect, useState } from 'react';

import { type TestMethodDto, TestMethodService } from '@diagnosis-report-generator/api/services';

import AppPageContent from '@/modules/core/components/AppPageContent';
import TestMethodsDataGrid from '@/modules/settings/components/test-methods/TestMethodsDataGrid';

export default function TestMethodsSettings() {
    const [testMethods, setTestMethods] = useState<TestMethodDto[]>([]);

    const getTestMethods = useCallback(async (signal?: AbortSignal) => {
        const response = await TestMethodService.getList(undefined, { signal });

        response.items.push({
            id: '',
            name: ''
        });
        setTestMethods(response.items);
    }, []);

    useEffect(() => {
        const abortController = new AbortController();
        getTestMethods(abortController.signal);

        return () => {
            abortController.abort();
        };
    }, [getTestMethods]);

    return (
        <AppPageContent title="Metody Badań">
            <TestMethodsDataGrid testMethods={testMethods} onTestMethodsChanged={getTestMethods} />
        </AppPageContent>
    );
}
