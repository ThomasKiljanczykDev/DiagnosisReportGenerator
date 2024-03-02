import { Button, Grid } from '@mui/material';

export default function MainPageActionButtons() {
  return (
    <Grid container spacing={2}>
      <Grid item>
        <Button variant="contained">Importuj plik Excel</Button>
      </Grid>
      <Grid item>
        <Button variant="contained">Generuj raporty</Button>
      </Grid>
    </Grid>
  );
}
