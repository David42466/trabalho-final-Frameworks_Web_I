import { AppBar, Toolbar, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

// Cabeçalho fixo; o título leva de volta para a página inicial.
export default function Header() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component={Link} to="/" sx={{ color: 'inherit', textDecoration: 'none', fontWeight: 700 }}>
          Pokédex
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
