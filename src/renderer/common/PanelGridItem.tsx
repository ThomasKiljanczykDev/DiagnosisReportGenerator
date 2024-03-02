import { ReactNode } from 'react';

import { Container, Grid, Paper } from '@mui/material';

interface PanelGridItemProps {
  children?: ReactNode;
  title: string;
  width: number | string;
}

export default function PanelGridItem({
  children,
  title,
  width,
}: PanelGridItemProps) {
  return (
    <Grid item>
      <Paper sx={{ width, height: '100%' }}>
        <Container sx={{ padding: 3 }}>
          <h3 style={{ marginTop: 0 }}>{title}</h3>
          {children}
        </Container>
      </Paper>
    </Grid>
  );
}
