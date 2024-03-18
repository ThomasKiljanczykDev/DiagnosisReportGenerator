import { useCallback, useState } from 'react';

import { Grid, Stack } from '@mui/material';
import { DataGrid, GridColDef, GridRowParams } from '@mui/x-data-grid';

import PanelGridItem from '../../common/PanelGridItem';

import MainPageActionButtons from './MainPageActionButtons';

const PATIENT_COLUMNS: GridColDef[] = [
  { field: 'name', headerName: 'Nazwisko i imię', flex: 0.6 },
  { field: 'pesel', headerName: 'PESEL', flex: 0.4 },
];

const DIAGNOSIS_COLUMNS: GridColDef[] = [
  { field: 'name', headerName: 'Nazwa' },
  { field: 'code', headerName: 'Kod' },
];

enum Sex {
  Male = 'M',
  Female = 'F',
}

interface Patient {
  id: number;
  name: string;
  pesel: string;
  age: number;
  sex: Sex;
}

function sexToPolishString(sex: Sex): string {
  switch (sex) {
    case Sex.Male:
      return 'Mężczyzna';
    case Sex.Female:
      return 'Kobieta';
    default:
      return 'Nieznana';
  }
}

export default function MainPage() {
  const [patientData, setPatientData] = useState<Patient[]>([]);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);

  const onFileImport = useCallback((fileContent: string[][]) => {
    // skip first row
    const newPatientData: Patient[] = fileContent
      .slice(1)
      .map((row, index) => ({
        id: index + 1,
        name: row[1],
        pesel: row[2],
        age: parseInt(row[2].slice(0, 2), 10),
        sex: parseInt(row[2].slice(-1), 10) % 2 === 0 ? Sex.Male : Sex.Female,
      }));

    setPatientData(newPatientData);
  }, []);

  const handlePatientRowClick = useCallback(
    (params: GridRowParams<Patient>) => {
      setSelectedPatient(params.row);
    },
    [],
  );

  return (
    <Stack display="inline-flex" spacing={1}>
      <MainPageActionButtons onFileImport={onFileImport} />

      <Grid alignItems="stretch" container spacing={2}>
        <PanelGridItem height={400} title="Lista pacjentów" width={600}>
          <DataGrid
            columns={PATIENT_COLUMNS}
            onRowClick={handlePatientRowClick}
            rows={patientData}
          />
        </PanelGridItem>
        <PanelGridItem height={400} title="Rozpoznania" width={600}>
          <DataGrid columns={DIAGNOSIS_COLUMNS} rows={[]} />
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
                <strong>PESEL:</strong> {selectedPatient.pesel}
              </div>
              <div>
                <strong>Wiek:</strong> {selectedPatient.age}
              </div>
              <div>
                <strong>Płeć:</strong> {sexToPolishString(selectedPatient.sex)}
              </div>
            </Stack>
          )}
        </PanelGridItem>
        <PanelGridItem height={400} title="Treść rozpoznania" width={600} />
      </Grid>
    </Stack>
  );
}
