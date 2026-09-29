import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { capitalizar, imagemOficial } from '../services/api';

// Card de um Pokémon na listagem. props: id e name.
// Clicar no card navega para a rota dinâmica /item/:id.
export default function PokemonCard({ id, name }) {
  return (
    <Card>
      <CardActionArea component={Link} to={`/item/${id}`}>
        <CardMedia component="img" image={imagemOficial(id)} alt={name} loading="lazy" sx={{ p: 2, height: 180, objectFit: 'contain' }} />
        <CardContent>
          <Typography variant="caption" color="text.secondary">#{id}</Typography>
          <Typography variant="h6">{capitalizar(name)}</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
