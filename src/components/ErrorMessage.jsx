import { Alert, Button } from '@mui/material';

// Mensagem de erro amigável, com botão opcional para tentar de novo.
// props: message (texto) e onRetry (função, opcional).
export default function ErrorMessage({ message, onRetry }) {
  return (
    <Alert
      severity="error"
      sx={{ my: 4 }}
      action={onRetry && <Button color="inherit" size="small" onClick={onRetry}>Tentar de novo</Button>}
    >
      {message}
    </Alert>
  );
}
