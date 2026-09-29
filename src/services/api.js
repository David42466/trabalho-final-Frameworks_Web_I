// Camada de serviço: concentra todas as requisições à PokéAPI usando axios.
import axios from 'axios';

const api = axios.create({ baseURL: 'https://pokeapi.co/api/v2' });

// A API também lista formas alternativas (ids > 10000) sem imagem oficial.
// Usamos só os Pokémon da Pokédex nacional (até o id 1025).
const MAX_ID = 1025;

// Guardamos a lista em memória para não pedir de novo ao voltar da página de detalhes.
let cacheLista = null;

// Extrai o id numérico da URL (ex.: ".../pokemon/25/" -> 25).
const extrairId = (url) => Number(url.split('/').filter(Boolean).pop());

// Deixa a primeira letra maiúscula (ex.: "pikachu" -> "Pikachu").
export const capitalizar = (texto) => texto.charAt(0).toUpperCase() + texto.slice(1);

// URL da imagem oficial; montada pelo id, sem precisar de uma requisição por card.
export const imagemOficial = (id) =>
  `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

// Lista completa (só nome e id). A paginação e a busca são feitas no cliente.
export async function getTodosPokemon() {
  if (cacheLista) return cacheLista;
  const { data } = await api.get('/pokemon', { params: { limit: 1400 } });
  cacheLista = data.results
    .map((p) => ({ name: p.name, id: extrairId(p.url) }))
    .filter((p) => p.id <= MAX_ID);
  return cacheLista;
}

// Tipos disponíveis para o filtro (fogo, água, planta...).
export async function getTipos() {
  const { data } = await api.get('/type');
  return data.results.map((t) => t.name).filter((n) => !['unknown', 'stellar', 'shadow'].includes(n));
}

// Nomes dos Pokémon de um tipo, em um Set para consulta rápida.
export async function getNomesPorTipo(tipo) {
  const { data } = await api.get(`/type/${tipo}`);
  return new Set(data.pokemon.map((p) => p.pokemon.name));
}

// Detalhes completos de um Pokémon (usado na página /item/:id).
export async function getDetalhes(id) {
  const { data } = await api.get(`/pokemon/${id}`);
  return data;
}
