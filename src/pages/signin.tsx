'use client';
import { Typography, LinearProgress, Checkbox, FormControlLabel, useTheme, Link } from '@mui/material';
import { SignInPage } from '@toolpad/core/SignInPage';
import { Navigate, useNavigate } from 'react-router-dom';
import { useSession, type Session } from '../SessionContext';
import { signInWithGoogle, signInWithCredentials } from '../api/auth';

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
    <Link href="/" variant="body2">
      Olvidaste tu contraseña?
    </Link>
  );
}

function SignUpLink() {
  return (
    <Typography variant="body2" color="textSecondary">
      No tienes cuenta?{' '}
      <Link href="/" variant="body2">
        Regístrate
      </Link>
    </Typography>
  );
}

export default function SignIn() {
  const { session, setSession, loading } = useSession();
  const navigate = useNavigate();

  if (loading) {
    return <LinearProgress />;
  }

  if (session) {
    return <Navigate to="/" />;
  }

  return (
    <SignInPage
      providers={[{ id: 'google', name: 'Google' }, { id: 'credentials', name: 'Credentials' }]}
      signIn={async (provider, formData, callbackUrl) => {
        let result;
        try {
          if (provider.id === 'google') {
            result = await signInWithGoogle();
          }

          if (provider.id === 'credentials') {
            const email = formData?.get('email') as string;
            const password = formData?.get('password') as string;

            if (!email || !password) {
              return { error: 'Email y contraseña son requeridos' };
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
          return { error: result?.error || 'Error al iniciar sesión' };
        } catch (error) {
          return { error: error instanceof Error ? error.message : 'Ocurrió un error' };
        }
      }}
      slots={{
        rememberMe: RememberMeCheckbox,
        forgotPasswordLink: ForgotPasswordLink,
        signUpLink: SignUpLink,
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