import { Box, Button, Typography, Link as MuiLink } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { FormContainer } from "../components/forms/FormContainer";
import { EmailField } from "../components/forms/EmailField";
import { PasswordField } from "../components/forms/PasswordField";
import { useEmailValidation } from "../hooks/useEmailValidation";
import { usePasswordField } from "../hooks/usePasswordField";

export default function Login() {
    const email = useEmailValidation();
    const password = usePasswordField();

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        // Validar email y contraseña
        const isEmailValid = email.validate();

        // Si hay errores, no continuar
        if (!isEmailValid) return;

        console.log("Email:", email.value, "Password:", password.value);
    };

    return (
        <FormContainer title="Iniciar Sesión">
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                <EmailField
                    value={email.value}
                    onChange={email.handleChange}
                    error={email.error}
                    autoFocus
                />

                <PasswordField
                    id="password"
                    label="Contraseña"
                    value={password.value}
                    onChange={password.handleChange}
                    error={password.error}
                    showPassword={password.showPassword}
                    onToggleShowPassword={password.handleClickShowPassword}
                    onMouseDownPassword={password.handleMouseDownPassword}
                />

                <Box sx={{ textAlign: 'right' }}>
                    <MuiLink
                        component={RouterLink}
                        to="/reset-password"
                        variant="body2"
                    >
                        ¿Olvidaste tu contraseña?
                    </MuiLink>
                </Box>

                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 2.5, mb: 2 }}
                >
                    Iniciar Sesión
                </Button>

                <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="body2">
                        ¿No tienes una cuenta?{" "}
                        <MuiLink
                            component={RouterLink}
                            to="/register"
                        >
                            Regístrate aquí
                        </MuiLink>
                    </Typography>
                </Box>
            </Box>
        </FormContainer>
    );
}