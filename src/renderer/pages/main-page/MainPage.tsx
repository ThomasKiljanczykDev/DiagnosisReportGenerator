import { useCallback, useState } from 'react';
import { format } from 'date-fns';

import { Patient, Pesel } from '@/common/models/patient';
import { sexToPolishString } from '@/renderer/util/text-util';
import { Grid, Stack } from '@mui/material';
import { DataGrid, GridColDef, GridRowParams } from '@mui/x-data-grid';

import PanelGridItem from '../../components/PanelGridItem';

import MainPageActionButtons from './MainPageActionButtons';

const PATIENT_COLUMNS: GridColDef<Patient>[] = [
    { field: 'name', headerName: 'Nazwisko i imię', flex: 0.6 },
    {
        field: 'pesel',
        headerName: 'PESEL',
        flex: 0.4,
        valueFormatter: (value: Pesel) => value.string
    }
];

const DIAGNOSIS_COLUMNS: GridColDef[] = [
    { field: 'name', headerName: 'Nazwa' },
    { field: 'code', headerName: 'Kod' }
];

const DIAGNOSIS_DATA = [
    { name: 'HBC', code: '1' },
    { name: 'HBC ss', code: '2' },
    { name: 'NS', code: '4' },
    { name: 'NS kch', code: '5' },
    { name: 'NS mch', code: '6' },
    { name: 'FRC ss', code: '7' }
];

export default function MainPage() {
    const [patientData, setPatientData] = useState<Patient[]>([]);
    const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);

    const onFileImport = useCallback((newPatientData: Patient[]) => {
        setPatientData(newPatientData);
    }, []);

    const handlePatientRowClick = useCallback((params: GridRowParams<Patient>) => {
        setSelectedPatient(params.row);
    }, []);

    return (
        <Stack display="inline-flex" spacing={1}>
            <MainPageActionButtons onFileImport={onFileImport} patientData={patientData} />

            <Grid alignItems="stretch" container spacing={2}>
                <PanelGridItem height={400} title="Lista pacjentów" width={600}>
                    <DataGrid
                        columns={PATIENT_COLUMNS}
                        onRowClick={handlePatientRowClick}
                        rows={patientData}
                    />
                </PanelGridItem>
                <PanelGridItem height={400} title="Rozpoznania" width={600}>
                    <DataGrid
                        columns={DIAGNOSIS_COLUMNS}
                        rows={DIAGNOSIS_DATA}
                        getRowId={row => row.code}
                    />
                </PanelGridItem>
            </Grid>
            <Grid alignItems="stretch" container spacing={2}>
                <PanelGridItem height={400} title="Dane pacjenta" width={600}>
                    {selectedPatient && (
                        <Stack spacing={1}>
                            <div>
                                <strong>Nazwisko i imię:</strong> {selectedPatient.name}
                            </div>
                            <div>
                                <strong>PESEL:</strong> {selectedPatient.pesel.string}
                            </div>
                            <div>
                                <strong>Data urodzenia:</strong>{' '}
                                {format(selectedPatient.pesel.birthdate, 'dd.MM.yyyy')}
                            </div>
                            <div>
                                <strong>Wiek:</strong> {selectedPatient.pesel.age}
                            </div>
                            <div>
                                <strong>Płeć:</strong>{' '}
                                {sexToPolishString(selectedPatient.pesel.sex)}
                            </div>
                        </Stack>
                    )}
                </PanelGridItem>
                <PanelGridItem height={400} title="Treść rozpoznania" width={600} />
            </Grid>
        </Stack>
    );
}
