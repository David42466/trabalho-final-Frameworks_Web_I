import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Box, Button, Chip, Container, LinearProgress, Paper, Stack, Typography } from '@mui/material';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';
import { capitalizar, getDetalhes } from '../services/api';

// Página de detalhes, acessada por /item/:id.
export default function Details() {
  const { id } = useParams(); // pega o :id da URL
  const [dados, setDados] = useState(null);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState('');

  useEffect(() => {
    let cancelado = false;
    setLoading(true);
    setErro('');
    getDetalhes(id)
      .then((d) => !cancelado && setDados(d))
      .catch(() => !cancelado && setErro('Pokémon não encontrado ou a API está indisponível. Volte para a lista e tente outro.'))
      .finally(() => !cancelado && setLoading(false));
    return () => { cancelado = true; };
  }, [id]);

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Button component={Link} to="/" sx={{ mb: 2 }}>Voltar para a lista</Button>

      {loading && <Loading />}
      {!loading && erro && <ErrorMessage message={erro} />}

      {!loading && dados && (
        <Paper sx={{ p: 3 }}>
          <Box
            component="img"
            src={dados.sprites.other['official-artwork'].front_default}
            alt={dados.name}
            sx={{ display: 'block', mx: 'auto', width: 220, maxWidth: '100%' }}
          />
          <Typography variant="h4" align="center">{capitalizar(dados.name)}</Typography>
          <Typography align="center" color="text.secondary" gutterBottom>#{dados.id}</Typography>

          {/* Tipos */}
          <Stack direction="row" spacing={1} justifyContent="center" sx={{ mb: 3 }}>
            {dados.types.map((t) => (
              <Chip key={t.type.name} label={capitalizar(t.type.name)} color="primary" />
            ))}
          </Stack>

          {/* A API entrega altura em decímetros e peso em hectogramas. */}
          <Typography>Altura: {dados.height / 10} m</Typography>
          <Typography>Peso: {dados.weight / 10} kg</Typography>
          <Typography sx={{ mb: 3 }}>
            Habilidades: {dados.abilities.map((a) => capitalizar(a.ability.name)).join(', ')}
          </Typography>

          {/* Status base em barras (150 é um teto razoável para a escala). */}
          <Typography variant="h6" gutterBottom>Status base</Typography>
          {dados.stats.map((s) => (
            <Box key={s.stat.name} sx={{ mb: 1.5 }}>
              <Typography variant="body2">{capitalizar(s.stat.name)}: {s.base_stat}</Typography>
              <LinearProgress variant="determinate" value={Math.min((s.base_stat / 150) * 100, 100)} />
            </Box>
          ))}
        </Paper>
      )}
    </Container>
  );
}
