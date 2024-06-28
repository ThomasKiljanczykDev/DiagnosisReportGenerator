import { useCallback, useState } from 'react';

import { parsePesel, type Patient, type Pesel } from '@/common/models/patient';
import AppPageContent from '@/renderer/components/AppPageContent';
import { Grid, Tooltip } from '@mui/material';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';

import ReportsActionButtons from './ReportsActionButtons';

import './Reports.css';

const PATIENT_COLUMNS: GridColDef<Patient>[] = [
    { field: 'cardNumber', headerName: 'Numer karty', editable: true, flex: 1 },
    { field: 'name', headerName: 'Nazwisko i imię', editable: true, flex: 1 },
    {
        field: 'pesel',
        headerName: 'PESEL',
        editable: true,
        flex: 1,
        valueGetter: (pesel: Pesel) => pesel.string,
        valueSetter: (peselString, patient) => {
            const newPatient = structuredClone(patient);
            newPatient.pesel = parsePesel(peselString);

            return newPatient;
        },
        renderCell: params => {
            const hasError = params.row.pesel.error !== undefined;

            function CellErrorTooltip() {
                return (
                    <Tooltip title={params.row.pesel.error} arrow={true}>
                        <div>{params.value || ''}</div>
                    </Tooltip>
                );
            }

            return (
                <div className={hasError ? 'cell-error' : ''}>
                    {hasError && <CellErrorTooltip />}
                    {!hasError && <> {params.value || ''} </>}
                </div>
            );
        }
    },
    {
        field: 'doctor',
        headerName: 'Lekarz prowadzący',
        editable: true,
        flex: 1
    },
    {
        field: 'assistants',
        headerName: 'Asystenci',
        editable: true,
        flex: 1
    },
    {
        field: 'technicians',
        headerName: 'Technicy',
        editable: true,
        flex: 1
    },
    {
        field: 'consultants',
        headerName: 'Konsultanci',
        editable: true,
        flex: 1
    },
    {
        field: 'date',
        headerName: 'Data',
        editable: true,
        type: 'date',
        flex: 1
    }
];

export default function Reports() {
    const [patientData, setPatientData] = useState<Patient[]>([]);

    const onFileImport = useCallback((newPatientData: Patient[]) => {
        setPatientData(newPatientData);
    }, []);

    return (
        <AppPageContent title="Pacjenci">
            <Grid container flexDirection="column" height="100%" width="100%" spacing={3}>
                <Grid item flexShrink={0}>
                    <ReportsActionButtons onFileImport={onFileImport} patientData={patientData} />
                </Grid>
                <Grid flex={1} item minHeight={0} minWidth={0}>
                    <DataGrid columns={PATIENT_COLUMNS} rows={patientData} rowSelection={false} />
                </Grid>
            </Grid>
        </AppPageContent>
    );
}
