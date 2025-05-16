import { useMemo } from 'react';
import { Box, LinearProgress, Button, Stack } from '@mui/material';
import { Outlet, useLocation, useParams, matchPath, Navigate, useNavigate } from 'react-router-dom';
import { DashboardLayout, PageContainer, Account, AccountPreview, SignOutButton, AccountPopoverHeader, AccountPopoverFooter } from '@toolpad/core';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import { useSession } from '../SessionContext';

function CustomPopoverContent() {
  const { session } = useSession();
  const navigate = useNavigate();

  return (
    <Stack spacing={0.5}>
      <AccountPopoverHeader>
        <AccountPreview
          name={session?.user?.name || ''}
          email={session?.user?.email || ''}
          avatar={session?.user?.image || ''}
          variant="expanded"
        />
      </AccountPopoverHeader>

      <Stack sx={{ px: 2 }}>
        <Button
          startIcon={<PersonIcon />}
          onClick={() => navigate('/')}
          sx={{ justifyContent: 'flex-start', textTransform: 'none' }}
        >
          Perfil
        </Button>

        <Button
          startIcon={<SettingsIcon />}
          onClick={() => navigate('/')}
          sx={{ justifyContent: 'flex-start', textTransform: 'none' }}
        >
          Configuración
        </Button>
      </Stack>

      <AccountPopoverFooter>
        <SignOutButton />
      </AccountPopoverFooter>
    </Stack>
  );
}

function CustomAccount() {
  return (
    <Account
      slots={{
        popoverContent: CustomPopoverContent,
      }}
      slotProps={{
        preview: {
          slotProps: { avatarIconButton: { sx: { border: '0' } } },
        },
      }}
      localeText={{
        accountSignInLabel: 'Iniciar sesión',
        accountSignOutLabel: 'Cerrar sesión',
      }}
    />
  );
}

export default function Layout() {
  const location = useLocation();
  const { employeeId } = useParams();

  const title = useMemo(() => {
    if (location.pathname === '/employees/new') {
      return 'New Employee';
    }
    if (matchPath('/employees/:employeeId/edit', location.pathname)) {
      return `Employee ${employeeId} - Edit`;
    }
    if (employeeId) {
      return `Employee ${employeeId}`;
    }
    return undefined;
  }, [location.pathname, employeeId]);

  const { session, loading } = useSession();

  if (loading) {
    return (
      <Box sx={{ width: '100%' }}>
        <LinearProgress />
      </Box>
    );
  }

  if (!session) {
    const redirectTo = `/sign-in?callbackUrl=${encodeURIComponent(location.pathname)}`;
    return <Navigate to={redirectTo} replace />;
  }

  return (
    <DashboardLayout title={title} slots={{ toolbarAccount: CustomAccount }}>
      <PageContainer maxWidth="xl">
        <Outlet />
      </PageContainer>
    </DashboardLayout>
  );
}