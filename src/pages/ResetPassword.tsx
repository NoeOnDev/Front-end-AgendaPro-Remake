import { useState } from "react";
import { Box, Button, Typography, Alert, Link as MuiLink } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { FormContainer } from "../components/forms/FormContainer";
import { EmailField } from "../components/forms/EmailField";
import { useEmailValidation } from "../hooks/useEmailValidation";

export default function ResetPassword() {
    const email = useEmailValidation();
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!email.validate()) return;

        console.log("Solicitud de recuperación enviada para:", email.value);
        setSubmitted(true);
    };

    return (
        <FormContainer title="Recuperar Contraseña">
            {submitted ? (
                <Box sx={{ mt: 2 }}>
                    <Alert severity="success" sx={{ mb: 2 }}>
                        Hemos enviado un correo con instrucciones para recuperar tu contraseña.
                    </Alert>
                    <Typography variant="body2" align="center" sx={{ mt: 2 }}>
                        Revisa tu bandeja de entrada. Si no lo encuentras, verifica también la carpeta de spam.
                    </Typography>
                    <Box sx={{ textAlign: 'center', mt: 3 }}>
                        <MuiLink component={RouterLink} to="/" variant="body2">
                            Volver al inicio de sesión
                        </MuiLink>
                    </Box>
                </Box>
            ) : (
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                    <Typography variant="body2" sx={{ mb: 2 }}>
                        Ingresa tu correo electrónico y te enviaremos instrucciones para restablecer tu contraseña.
                    </Typography>

                    <EmailField
                        value={email.value}
                        onChange={email.handleChange}
                        error={email.error}
                        autoFocus
                    />

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Enviar Instrucciones
                    </Button>

                    <Box sx={{ textAlign: 'center' }}>
                        <MuiLink component={RouterLink} to="/" variant="body2">
                            Volver al inicio de sesión
                        </MuiLink>
                    </Box>
                </Box>
            )}
        </FormContainer>
    );
}