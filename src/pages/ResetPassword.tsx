import { useState } from "react";
import {
    Box,
    Paper,
    TextField,
    Button,
    Typography,
    Container,
    Link as MuiLink,
    Alert
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

export default function ResetPassword() {
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        // Validar correo electrónico
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setEmailError(true);
            return;
        }

        // Simulación de envío - aquí iría la lógica para enviar el correo
        console.log("Solicitud de recuperación enviada para:", email);
        setSubmitted(true);
    };

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "100vh",
                backgroundColor: (theme) => theme.palette.background.default
            }}
        >
            <Container maxWidth="xs">
                <Paper
                    elevation={3}
                    sx={{
                        p: 4,
                        display: "flex",
                        flexDirection: "column",
                        width: "100%"
                    }}
                >
                    <Typography component="h1" variant="h5" align="center" gutterBottom>
                        Recuperar Contraseña
                    </Typography>

                    {submitted ? (
                        <Box sx={{ mt: 2 }}>
                            <Alert severity="success" sx={{ mb: 2 }}>
                                Hemos enviado un correo con instrucciones para recuperar tu contraseña.
                            </Alert>
                            <Typography variant="body2" align="center" sx={{ mt: 2 }}>
                                Revisa tu bandeja de entrada. Si no lo encuentras, verifica también la carpeta de spam.
                            </Typography>
                            <Box sx={{ textAlign: 'center', mt: 3 }}>
                                <MuiLink
                                    component={RouterLink}
                                    to="/"
                                    variant="body2"
                                >
                                    Volver al inicio de sesión
                                </MuiLink>
                            </Box>
                        </Box>
                    ) : (
                        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                            <Typography variant="body2" sx={{ mb: 2 }}>
                                Ingresa tu correo electrónico y te enviaremos instrucciones para restablecer tu contraseña.
                            </Typography>

                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                size="small"
                                id="email"
                                label="Correo Electrónico"
                                placeholder="correo@ejemplo.com"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                    setEmailError(false);
                                }}
                                error={emailError}
                                helperText={emailError ? "Ingrese un correo electrónico válido" : ""}
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
                                <MuiLink
                                    component={RouterLink}
                                    to="/"
                                    variant="body2"
                                >
                                    Volver al inicio de sesión
                                </MuiLink>
                            </Box>
                        </Box>
                    )}
                </Paper>
            </Container>
        </Box>
    );
}