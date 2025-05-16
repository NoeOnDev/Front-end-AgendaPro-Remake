'use client';
import { useState } from 'react';
import { Typography, LinearProgress, Checkbox, FormControlLabel, useTheme, Link, CircularProgress, Button, Box } from '@mui/material';
import { SignInPage } from '@toolpad/core/SignInPage';
import { Navigate, useNavigate } from 'react-router-dom';
import { useSession, type Session } from '../SessionContext';
import { signInWithCredentials } from '../api/auth';

function RememberMeCheckbox() {
  const theme = useTheme();
  return (
    <FormControlLabel
      label="Recordarme"
      control={
        <Checkbox
          name="remember"
          value="true"
          color="primary"
          sx={{ padding: 0.5, '& .MuiSvgIcon-root': { fontSize: 20 } }}
        />
      }
      slotProps={{
        typography: {
          color: 'textSecondary',
          fontSize: theme.typography.pxToRem(14),
        },
      }}
    />
  );
}

function ForgotPasswordLink() {
  return (
    <Link href="/forgot-password" variant="body2">
      ¿Olvidaste tu contraseña?
    </Link>
  );
}

function SignUpLink() {
  return (
    <Typography variant="body2" color="textSecondary">
      ¿No tienes cuenta?{' '}
      <Link href="/register" variant="body2">
        Regístrate
      </Link>
    </Typography>
  );
}

const validateEmail = (email: string): boolean => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
};

export default function SignIn() {
  const { session, setSession, loading } = useSession();
  const navigate = useNavigate();
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  if (loading) {
    return (
      <Box sx={{ width: '100%', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <LinearProgress sx={{ width: '50%', maxWidth: '400px' }} />
      </Box>
    );
  }

  if (session) {
    return <Navigate to="/" />;
  }

  return (
    <SignInPage
      providers={[{ id: 'google', name: 'Google' }, { id: 'credentials', name: 'Credentials' }]}
      signIn={async (provider, formData, callbackUrl) => {
        setIsAuthenticating(true);
        setAuthError(null);
        let result;

        try {
          if (provider.id === 'google') {
            const redirectUrl = new URL(`${import.meta.env.VITE_API_URL}/auth/google`);
            if (callbackUrl) {
              redirectUrl.searchParams.append('callbackUrl', callbackUrl);
            }
            window.location.href = redirectUrl.toString();
            return {};
          }

          if (provider.id === 'credentials') {
            const email = formData?.get('email') as string;
            const password = formData?.get('password') as string;

            if (!email) {
              return { error: 'El correo electrónico es requerido', type: 'EmailRequired' };
            }
            if (!validateEmail(email)) {
              return { error: 'Formato de correo electrónico inválido', type: 'EmailInvalid' };
            }
            if (!password) {
              return { error: 'La contraseña es requerida', type: 'PasswordRequired' };
            }
            if (password.length < 6) {
              return { error: 'La contraseña debe tener al menos 6 caracteres', type: 'PasswordTooShort' };
            }

            result = await signInWithCredentials(email, password);
          }

          if (result?.success && result?.user) {
            const userSession: Session = {
              user: {
                name: result.user.name || '',
                email: result.user.email || '',
                image: result.user.image || '',
              },
            };
            setSession(userSession);
            navigate(callbackUrl || '/', { replace: true });
            return {};
          }

          if (result?.error) {
            if (result.error.includes('Credenciales inválidas')) {
              return { error: 'Credenciales incorrectas', type: 'CredentialsSignin' };
            }
          }

          return {
            error: result?.error || 'Error al iniciar sesión',
            type: 'UnknownError'
          };
        } catch (error) {
          console.error('Error de autenticación:', error);
          return {
            error: error instanceof Error ? error.message : 'Ocurrió un error inesperado',
            type: 'ServerError'
          };
        } finally {
          setIsAuthenticating(false);
        }
      }}
      slots={{
        rememberMe: RememberMeCheckbox,
        forgotPasswordLink: ForgotPasswordLink,
        signUpLink: SignUpLink,
      }}
      slotProps={{
        emailField: {
          autoFocus: true,
          autoComplete: "email",
          inputProps: { maxLength: 100 }
        },
        passwordField: {
          autoComplete: "current-password",
          inputProps: { minLength: 6, maxLength: 50 }
        },
        form: {
          noValidate: true
        },
        submitButton: {
          disabled: isAuthenticating,
          startIcon: isAuthenticating ?
            <CircularProgress size={16} color="inherit" /> :
            undefined,
          children: isAuthenticating ? 'Iniciando sesión...' : undefined
        }
      }}
      localeText={{
        signInTitle: (brandingTitle?: string) =>
          brandingTitle ? `Iniciar sesión en ${brandingTitle}` : 'Iniciar sesión',
        signInSubtitle: 'Por favor, inicie sesión para continuar',
        providerSignInTitle: (providerName: string) =>
          providerName === 'credentials' ? 'Iniciar sesión' : `Iniciar sesión con ${providerName}`,
        signInRememberMe: 'Recordarme',
        or: 'o',
        email: 'Correo electrónico',
        password: 'Contraseña',
      }}

    />
  );
}