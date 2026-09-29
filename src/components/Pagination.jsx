import { Box, Pagination as MuiPagination } from '@mui/material';

// Paginação. props: page (atual), totalPages e onChange (recebe o número da nova página).
export default function Pagination({ page, totalPages, onChange }) {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
      <MuiPagination count={totalPages} page={page} onChange={(_, valor) => onChange(valor)} color="primary" />
    </Box>
  );
}
