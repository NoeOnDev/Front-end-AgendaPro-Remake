import { Box, Button, Typography, Link as MuiLink, Grid } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { FormContainer } from "../components/forms/FormContainer";
import { EmailField } from "../components/forms/EmailField";
import { PasswordField } from "../components/forms/PasswordField";
import { TextField } from "../components/forms/TextField";
import { useEmailValidation } from "../hooks/useEmailValidation";
import { usePasswordField } from "../hooks/usePasswordField";
import { useConfirmPasswordField } from "../hooks/useConfirmPasswordField";
import { useTextField } from "../hooks/useTextField";

export default function Register() {
    const firstName = useTextField("", true);
    const lastName = useTextField("", true);
    const email = useEmailValidation();
    const password = usePasswordField();
    const confirmPassword = useConfirmPasswordField(password);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        // Validar todos los campos
        const isFirstNameValid = firstName.validate();
        const isLastNameValid = lastName.validate();
        const isEmailValid = email.validate();
        const isPasswordValid = password.validate();
        const doPasswordsMatch = confirmPassword.validate();

        // Si hay errores, no continuar
        if (!isFirstNameValid || !isLastNameValid || !isEmailValid || !isPasswordValid || !doPasswordsMatch) {
            return;
        }

        console.log(
            "Nombre:", firstName.value,
            "Apellidos:", lastName.value,
            "Email:", email.value,
            "Password:", password.value
        );
    };

    return (
        <FormContainer title="Registrarse" maxWidth="sm">
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                <Grid container spacing={2}>
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField
                            id="firstName"
                            label="Nombre(s)"
                            value={firstName.value}
                            onChange={firstName.handleChange}
                            error={firstName.error}
                            autoFocus
                            autoComplete="given-name"
                            errorMessage="Este campo es requerido"
                        />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField
                            id="lastName"
                            label="Apellidos"
                            value={lastName.value}
                            onChange={lastName.handleChange}
                            error={lastName.error}
                            autoComplete="family-name"
                            errorMessage="Este campo es requerido"
                        />
                    </Grid>
                </Grid>

                <EmailField
                    value={email.value}
                    onChange={email.handleChange}
                    error={email.error}
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
                    autoComplete="new-password"
                    errorMessage="La contraseña debe tener al menos 6 caracteres"
                />

                <PasswordField
                    id="confirmPassword"
                    label="Confirmar Contraseña"
                    value={confirmPassword.value}
                    onChange={confirmPassword.handleChange}
                    error={confirmPassword.error}
                    showPassword={confirmPassword.showPassword}
                    onToggleShowPassword={confirmPassword.handleClickShowPassword}
                    onMouseDownPassword={confirmPassword.handleMouseDownPassword}
                    autoComplete="new-password"
                    errorMessage="Las contraseñas no coinciden"
                />

                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Registrarse
                </Button>

                <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="body2">
                        ¿Ya tienes una cuenta?{" "}
                        <MuiLink
                            component={RouterLink}
                            to="/"
                        >
                            Inicia sesión aquí
                        </MuiLink>
                    </Typography>
                </Box>
            </Box>
        </FormContainer>
    );
}