import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { capitalizar } from '../services/api';

// Filtro por tipo. props: tipos (lista de nomes), value (tipo escolhido) e onChange.
export default function TypeFilter({ tipos, value, onChange }) {
  return (
    <FormControl fullWidth>
      <InputLabel id="filtro-tipo">Tipo</InputLabel>
      <Select labelId="filtro-tipo" label="Tipo" value={value} onChange={(e) => onChange(e.target.value)}>
        <MenuItem value="">Todos</MenuItem>
        {tipos.map((t) => (
          <MenuItem key={t} value={t}>{capitalizar(t)}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
