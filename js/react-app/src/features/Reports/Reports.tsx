import { useCallback, useState } from 'react';

import { Box, Grid, LinearProgress } from '@mui/material';

import { type Patient } from '@/common/models/patient';
import AppPageContent from '@/components/AppPageContent';
import PatientsDataGrid from '@/features/Reports/PatientsDataGrid';

import ReportsActionButtons from './ReportsActionButtons';

export default function Reports() {
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
        <AppPageContent title="Pacjenci">
            <Grid
                container
                flexDirection="column"
                height="100%"
                width="100%"
                spacing={3}
                minWidth={0}
                minHeight={0}
                maxWidth="100%"
            >
                <Grid item flexShrink={0} minWidth={0} minHeight={0} maxWidth="100%">
                    <ReportsActionButtons onFileImport={onFileImport} patientData={patientData} />
                </Grid>
                <Grid item flex={1} minWidth={0} minHeight={0} maxWidth="100%">
                    {loading && (
                        <Box
                            display="flex"
                            width="100%"
                            height="100%"
                            alignItems="center"
                            justifyContent="center"
                        >
                            <LinearProgress
                                style={{
                                    width: '20rem'
                                }}
                            />
                        </Box>
                    )}
                    {!loading && (
                        <PatientsDataGrid patients={patientData} onRowUpdate={processRowUpdate} />
                    )}
                </Grid>
            </Grid>
        </AppPageContent>
    );
}
