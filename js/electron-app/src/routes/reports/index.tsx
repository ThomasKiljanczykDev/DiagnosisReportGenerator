import React, { useCallback, useState } from 'react';

import { createFileRoute } from '@tanstack/react-router';

import AppPageContent from '@/modules/core/components/AppPageContent';
import LoadingContainer from '@/modules/core/components/LoadingContainer';
import PatientsDataGrid from '@/modules/reports/components/PatientsDataGrid';
import ReportsActionButtons from '@/modules/reports/components/ReportsActionButtons';
import { type Patient } from '@/types/patient';

function Reports() {
    const [patientData, setPatientData] = useState<Patient[]>([]);
    const [loading, setLoading] = useState(false);

    const processRowUpdate = useCallback((newRow: Patient) => {
        setPatientData((prevPatientData) =>
            prevPatientData.map((patient) =>
                patient.id === newRow.id ? { ...patient, ...newRow } : patient
            )
        );
    }, []);

    const onFileImport = useCallback((newPatientData: Patient[]) => {
        setLoading(true);
        setPatientData(newPatientData);
        window.setTimeout(async () => {
            setLoading(false);
        }, 100);
    }, []);

    return (
        <AppPageContent
            title="Pacjenci"
            actionButtons={
                <ReportsActionButtons onFileImport={onFileImport} patientData={patientData} />
            }
        >
            <LoadingContainer loading={loading}>
                <PatientsDataGrid patients={patientData} onRowUpdate={processRowUpdate} />
            </LoadingContainer>
        </AppPageContent>
    );
}

export const Route = createFileRoute('/reports/')({
    component: Reports
});
