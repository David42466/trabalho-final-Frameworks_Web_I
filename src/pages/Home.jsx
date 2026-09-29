import { useEffect, useMemo, useState } from 'react';
import { Box, Container, Typography } from '@mui/material';
import SearchBar from '../components/SearchBar';
import TypeFilter from '../components/TypeFilter';
import PokemonCard from '../components/PokemonCard';
import Pagination from '../components/Pagination';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';
import { getTodosPokemon, getTipos, getNomesPorTipo } from '../services/api';

const POR_PAGINA = 20;

// Página inicial: listagem com busca, filtro por tipo e paginação.
export default function Home() {
  const [pokemon, setPokemon] = useState([]);      // lista completa (nome + id)
  const [tipos, setTipos] = useState([]);          // tipos para o filtro
  const [nomesDoTipo, setNomesDoTipo] = useState(null); // Set com os nomes do tipo escolhido
  const [busca, setBusca] = useState('');
  const [tipo, setTipo] = useState('');
  const [pagina, setPagina] = useState(1);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState('');
  const [tentativa, setTentativa] = useState(0);   // muda para refazer a requisição

  // Carrega a lista e os tipos ao abrir a página (e ao clicar em "Tentar de novo").
  useEffect(() => {
    let cancelado = false;
    async function carregar() {
      setLoading(true);
      setErro('');
      try {
        const [lista, listaTipos] = await Promise.all([getTodosPokemon(), getTipos()]);
        if (!cancelado) {
          setPokemon(lista);
          setTipos(listaTipos);
        }
      } catch {
        if (!cancelado) setErro('Não foi possível carregar os Pokémon. Verifique sua conexão e tente novamente.');
      } finally {
        if (!cancelado) setLoading(false);
      }
    }
    carregar();
    return () => { cancelado = true; }; // evita atualizar estado se o componente for desmontado
  }, [tentativa]);

  // Sempre que o tipo muda, busca os Pokémon daquele tipo.
  useEffect(() => {
    if (!tipo) {
      setNomesDoTipo(null);
      return;
    }
    let cancelado = false;
    setLoading(true);
    getNomesPorTipo(tipo)
      .then((nomes) => !cancelado && setNomesDoTipo(nomes))
      .catch(() => !cancelado && setErro('Não foi possível filtrar por tipo. Tente novamente.'))
      .finally(() => !cancelado && setLoading(false));
    return () => { cancelado = true; };
  }, [tipo]);

  // Busca e tipo combinam: o Pokémon precisa atender aos dois ao mesmo tempo.
  const filtrados = useMemo(
    () =>
      pokemon.filter(
        (p) => p.name.includes(busca.trim().toLowerCase()) && (!nomesDoTipo || nomesDoTipo.has(p.name))
      ),
    [pokemon, busca, nomesDoTipo]
  );

  const totalPaginas = Math.max(1, Math.ceil(filtrados.length / POR_PAGINA));
  const daPagina = filtrados.slice((pagina - 1) * POR_PAGINA, pagina * POR_PAGINA);

  // Ao mudar a busca ou o filtro, volta para a primeira página.
  const mudarBusca = (valor) => { setBusca(valor); setPagina(1); };
  const mudarTipo = (valor) => { setTipo(valor); setPagina(1); };

  return (
    <Container sx={{ py: 4 }}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '2fr 1fr' }, gap: 2, mb: 4 }}>
        <SearchBar value={busca} onChange={mudarBusca} />
        <TypeFilter tipos={tipos} value={tipo} onChange={mudarTipo} />
      </Box>

      {loading && <Loading />}
      {!loading && erro && <ErrorMessage message={erro} onRetry={() => setTentativa((n) => n + 1)} />}

      {!loading && !erro && (
        <>
          {daPagina.length === 0 ? (
            <Typography align="center" color="text.secondary" sx={{ py: 6 }}>
              Nenhum Pokémon encontrado. Tente outro nome ou limpe o filtro de tipo.
            </Typography>
          ) : (
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 2 }}>
              {daPagina.map((p) => (
                <PokemonCard key={p.id} id={p.id} name={p.name} />
              ))}
            </Box>
          )}
          <Pagination page={pagina} totalPages={totalPaginas} onChange={setPagina} />
        </>
      )}
    </Container>
  );
}
