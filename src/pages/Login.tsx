import { useState } from "react";
import {
    Box,
    Paper,
    TextField,
    Button,
    Typography,
    Container,
    InputAdornment,
    IconButton,
    FormControl,
    InputLabel,
    OutlinedInput,
    Link as MuiLink
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [emailError, setEmailError] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setEmailError(true);
            return;
        }

        console.log("Email:", email, "Password:", password);
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
                        Iniciar Sesión
                    </Typography>

                    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
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

                        <FormControl
                            variant="outlined"
                            fullWidth
                            size="small"
                            margin="normal"
                            required
                        >
                            <InputLabel htmlFor="password">Contraseña</InputLabel>
                            <OutlinedInput
                                id="password"
                                name="password"
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                autoComplete="current-password"
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label={showPassword ? 'ocultar contraseña' : 'mostrar contraseña'}
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="Contraseña"
                            />
                        </FormControl>

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

                        {/* Enlace para registrarse */}
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
                </Paper>
            </Container>
        </Box>
    );
}