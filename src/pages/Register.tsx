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
    Link as MuiLink,
    Grid
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export default function Register() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [confirmPasswordError, setConfirmPasswordError] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        let hasError = false;

        // Validar correo electrónico
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setEmailError(true);
            hasError = true;
        }

        // Validar contraseña
        if (password.length < 6) {
            setPasswordError(true);
            hasError = true;
        }

        // Validar que las contraseñas coincidan
        if (password !== confirmPassword) {
            setConfirmPasswordError(true);
            hasError = true;
        }

        if (hasError) return;

        // Enviar datos del formulario
        console.log("Nombre:", firstName, "Apellidos:", lastName, "Email:", email, "Password:", password);
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
            <Container maxWidth="sm">
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
                        Registrarse
                    </Typography>

                    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                        <Grid container spacing={2}>
                            <Grid size={{ xs: 12, sm: 6 }}>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    size="small"
                                    id="firstName"
                                    label="Nombre(s)"
                                    name="firstName"
                                    autoComplete="given-name"
                                    autoFocus
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                />
                            </Grid>
                            <Grid size={{ xs: 12, sm: 6 }}>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    size="small"
                                    id="lastName"
                                    label="Apellidos"
                                    name="lastName"
                                    autoComplete="family-name"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                />
                            </Grid>
                        </Grid>

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
                            error={passwordError}
                        >
                            <InputLabel htmlFor="password">Contraseña</InputLabel>
                            <OutlinedInput
                                id="password"
                                name="password"
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                    setPasswordError(false);
                                    if (confirmPassword) setConfirmPasswordError(false);
                                }}
                                autoComplete="new-password"
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
                            {passwordError && (
                                <Typography variant="caption" color="error" sx={{ mt: 0.5, ml: 1.5 }}>
                                    La contraseña debe tener al menos 6 caracteres
                                </Typography>
                            )}
                        </FormControl>

                        <FormControl
                            variant="outlined"
                            fullWidth
                            size="small"
                            margin="normal"
                            required
                            error={confirmPasswordError}
                        >
                            <InputLabel htmlFor="confirmPassword">Confirmar Contraseña</InputLabel>
                            <OutlinedInput
                                id="confirmPassword"
                                name="confirmPassword"
                                type={showConfirmPassword ? 'text' : 'password'}
                                value={confirmPassword}
                                onChange={(e) => {
                                    setConfirmPassword(e.target.value);
                                    setConfirmPasswordError(false);
                                }}
                                autoComplete="new-password"
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label={showConfirmPassword ? 'ocultar contraseña' : 'mostrar contraseña'}
                                            onClick={handleClickShowConfirmPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="Confirmar Contraseña"
                            />
                            {confirmPasswordError && (
                                <Typography variant="caption" color="error" sx={{ mt: 0.5, ml: 1.5 }}>
                                    Las contraseñas no coinciden
                                </Typography>
                            )}
                        </FormControl>

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
                </Paper>
            </Container>
        </Box>
    );
}