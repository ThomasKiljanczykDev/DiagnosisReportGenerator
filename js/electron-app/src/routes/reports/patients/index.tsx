import React, { useCallback, useState } from 'react';

import { createFileRoute } from '@tanstack/react-router';

import AppPageContent from '@/modules/core/components/AppPageContent';
import PatientsDataGrid from '@/modules/reports/components/PatientsDataGrid';
import ReportsActionButtons from '@/modules/reports/components/ReportsActionButtons';
import { type Patient } from '@/types/patient';

function Reports() {
    const [patientData, setPatientData] = useState<Patient[]>([]);

    const processRowUpdate = useCallback((newRow: Patient) => {
        setPatientData((prevPatientData) =>
            prevPatientData.map((patient) =>
                patient.id === newRow.id ? { ...patient, ...newRow } : patient
            )
        );
    }, []);

    return (
        <AppPageContent
            title="Pacjenci"
            actionButtons={
                <ReportsActionButtons onFileImport={setPatientData} patientData={patientData} />
            }
        >
            <PatientsDataGrid patients={patientData} onRowUpdate={processRowUpdate} />
        </AppPageContent>
    );
}

export const Route = createFileRoute('/reports/patients/')({
    component: Reports
});
