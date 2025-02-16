import { useCallback, useEffect, useState } from 'react';

import { type TestMethodDto, TestMethodService } from '@diagnosis-report-generator/api/services';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import { Button } from '@mui/material';
import { createLazyFileRoute } from '@tanstack/react-router';

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
            <AppPageContent
                title="Metody Badań"
                actionButtons={
                    <Button
                        variant="contained"
                        onClick={() => setShowCreateTestMethodModal(true)}
                        startIcon={<AddCircleOutlineRoundedIcon fontSize="small" />}
                    >
                        Dodaj metodę badania
                    </Button>
                }
            >
                <TestMethodsDataGrid
                    testMethods={testMethods}
                    onTestMethodsChanged={getTestMethods}
                />
            </AppPageContent>
        </>
    );
}

export const Route = createLazyFileRoute('/settings/test-methods/')({
    component: TestMethodsSettings
});
