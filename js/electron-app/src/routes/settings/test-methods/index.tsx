import { useCallback, useEffect, useState } from 'react';

import { type TestMethodDto, TestMethodService } from '@diagnosis-report-generator/api/services';
import { Box, Button } from '@mui/material';
import { createFileRoute } from '@tanstack/react-router';

import AppPageContent from '@/modules/core/components/AppPageContent';
import CreateTestMethodDialog from '@/modules/settings/components/test-methods/CreateTestMethodDialog';
import TestMethodsDataGrid from '@/modules/settings/components/test-methods/TestMethodsDataGrid';

function TestMethodsSettings() {
    const [showCreateTestMethodModal, setShowCreateTestMethodModal] = useState(false);
    const [testMethods, setTestMethods] = useState<TestMethodDto[]>([]);

    const getTestMethods = useCallback(async (signal?: AbortSignal) => {
        const response = await TestMethodService.getList(undefined, { signal });
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
        <>
            <CreateTestMethodDialog
                open={showCreateTestMethodModal}
                onClose={() => setShowCreateTestMethodModal(false)}
                onTestMethodsChanged={getTestMethods}
            />
            <AppPageContent title="Metody Badań">
                <Box marginBottom={1}>
                    <Button variant="contained" onClick={() => setShowCreateTestMethodModal(true)}>
                        Stwórz metodę badania
                    </Button>
                </Box>

                <Box flexGrow={1}>
                    <TestMethodsDataGrid
                        testMethods={testMethods}
                        onTestMethodsChanged={getTestMethods}
                    />
                </Box>
            </AppPageContent>
        </>
    );
}

export const Route = createFileRoute('/settings/test-methods/')({
    component: TestMethodsSettings
});
