import { Box, CircularProgress } from '@mui/material';

// Indicador de carregamento exibido durante as requisições.
export default function Loading() {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
      <CircularProgress aria-label="Carregando" />
    </Box>
  );
}
