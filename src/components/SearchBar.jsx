import { TextField } from '@mui/material';

// Campo de busca controlado. props: value (texto atual) e onChange (recebe o novo texto).
export default function SearchBar({ value, onChange }) {
  return (
    <TextField
      label="Buscar por nome"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      fullWidth
    />
  );
}
