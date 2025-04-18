import { TextField } from '@mui/material';

interface EmailFieldProps {
  value: string;
  onChange: (value: string) => void;
  error: boolean;
  required?: boolean;
  autoFocus?: boolean;
  placeholder?: string;
}

export function EmailField({
  value,
  onChange,
  error,
  required = true,
  autoFocus = false,
  placeholder = "correo@ejemplo.com"
}: EmailFieldProps) {
  return (
    <TextField
      margin="normal"
      required={required}
      fullWidth
      size="small"
      id="email"
      label="Correo Electrónico"
      placeholder={placeholder}
      name="email"
      autoComplete="email"
      autoFocus={autoFocus}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      error={error}
      helperText={error ? "Ingrese un correo electrónico válido" : ""}
    />
  );
}