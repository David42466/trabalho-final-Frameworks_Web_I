# Pokédex React

Aplicação web que lista Pokémon, com busca por nome, filtro por tipo, paginação e página de detalhes. Trabalho final da disciplina Frameworks Web I (Unilavras).

**API utilizada:** [PokéAPI](https://pokeapi.co/)

## Integrantes

- David Borges Santos

## Funcionalidades

- Listagem com paginação (20 itens por página)
- Busca em tempo real combinada com filtro por tipo
- Página de detalhes em rota dinâmica (`/item/:id`) com tipos, medidas, habilidades e status
- Indicador de carregamento e mensagens de erro amigáveis

## Tecnologias

React (Vite), react-router-dom, axios, Material-UI

## Como executar

Pré-requisito: Node.js instalado.

```bash
git clone https://github.com/David42466/trabalho-final-Frameworks_Web_I.git
cd trabalho-final-Frameworks_Web_I
npm install
npm run dev
```

Abra o endereço exibido no terminal (normalmente http://localhost:5173).

## Estrutura

```
src/
  components/  Header, SearchBar, TypeFilter, PokemonCard, Pagination, Loading, ErrorMessage
  pages/       Home (listagem) e Details (detalhes)
  services/    api.js (requisições com axios)
```