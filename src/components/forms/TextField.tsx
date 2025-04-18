import { TextField as MuiTextField } from '@mui/material';

interface TextFieldProps {
    id: string;
    label: string;
    value: string;
    onChange: (value: string) => void;
    error: boolean;
    required?: boolean;
    autoFocus?: boolean;
    autoComplete?: string;
    fullWidth?: boolean;
    errorMessage?: string;
}

export function TextField({
    id,
    label,
    value,
    onChange,
    error,
    required = true,
    autoFocus = false,
    autoComplete,
    fullWidth = true,
    errorMessage
}: TextFieldProps) {
    return (
        <MuiTextField
            margin="normal"
            required={required}
            fullWidth={fullWidth}
            size="small"
            id={id}
            label={label}
            name={id}
            autoComplete={autoComplete}
            autoFocus={autoFocus}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            error={error}
            helperText={error && errorMessage ? errorMessage : ""}
        />
    );
}