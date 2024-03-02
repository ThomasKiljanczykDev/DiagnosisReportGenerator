import { Grid, Stack } from '@mui/material';
import { DataGrid, GridColDef, GridLocaleText } from '@mui/x-data-grid';

import PanelGridItem from '../../common/PanelGridItem';

import MainPageActionButtons from './MainPageActionButtons';

const PATIENT_COLUMNS: GridColDef[] = [
  { field: 'firstName', headerName: 'Imię' },
  { field: 'lastName', headerName: 'Nazwisko' },
  { field: 'pesel', headerName: 'PESEL', flex: 1 },
];

const DIAGNOSIS_COLUMNS: GridColDef[] = [
  { field: 'name', headerName: 'Nazwa' },
  { field: 'code', headerName: 'Kod' },
];

const DATAGRID_LOCALE_PL: Partial<GridLocaleText> = {
  noRowsLabel: 'Brak danych',
};

export default function MainPage() {
  return (
    <Stack display="inline-flex" spacing={1}>
      <MainPageActionButtons />

      <Grid alignItems="stretch" container spacing={2}>
        <PanelGridItem title="Lista pacjentów" width={400}>
          <DataGrid
            columns={PATIENT_COLUMNS}
            localeText={DATAGRID_LOCALE_PL}
            rows={[
              {
                id: 1,
                firstName: 'Jan',
                lastName: 'Kowalski',
                pesel: '12345678901',
              },
            ]}
            style={{ height: '400px' }}
          />
        </PanelGridItem>
        <PanelGridItem title="Rozpoznania" width={400}>
          <DataGrid
            columns={DIAGNOSIS_COLUMNS}
            localeText={DATAGRID_LOCALE_PL}
            rows={[]}
            style={{ height: '400px' }}
          />
        </PanelGridItem>
        <PanelGridItem title="Treść rozpoznania" width={250} />
        <PanelGridItem title="Dane pacjenta" width={250} />
      </Grid>
    </Stack>
  );
}
