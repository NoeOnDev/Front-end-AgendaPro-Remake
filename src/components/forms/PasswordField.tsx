import {
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Typography
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

interface PasswordFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  error: boolean;
  showPassword: boolean;
  onToggleShowPassword: () => void;
  onMouseDownPassword: (event: React.MouseEvent<HTMLButtonElement>) => void;
  autoComplete?: string;
  required?: boolean;
  errorMessage?: string;
}

export function PasswordField({
  id,
  label,
  value,
  onChange,
  error,
  showPassword,
  onToggleShowPassword,
  onMouseDownPassword,
  autoComplete = "current-password",
  required = true,
  errorMessage
}: PasswordFieldProps) {
  return (
    <FormControl
      variant="outlined"
      fullWidth
      size="small"
      margin="normal"
      required={required}
      error={error}
    >
      <InputLabel htmlFor={id}>{label}</InputLabel>
      <OutlinedInput
        id={id}
        name={id}
        type={showPassword ? 'text' : 'password'}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        autoComplete={autoComplete}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label={showPassword ? 'ocultar contraseña' : 'mostrar contraseña'}
              onClick={onToggleShowPassword}
              onMouseDown={onMouseDownPassword}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
        label={label}
      />
      {error && errorMessage && (
        <Typography variant="caption" color="error" sx={{ mt: 0.5, ml: 1.5 }}>
          {errorMessage}
        </Typography>
      )}
    </FormControl>
  );
}