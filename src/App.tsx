import { useState, useMemo, useEffect } from 'react';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import { Outlet } from 'react-router-dom';
import { ReactRouterAppProvider } from '@toolpad/core/react-router';
import type { Navigation, Authentication } from '@toolpad/core/AppProvider';
import { signOut, checkAuthStatus } from './api/auth';
import SessionContext, { type Session } from './SessionContext';

const NAVIGATION: Navigation = [
  {
    kind: 'header',
    title: 'Main items',
  },
  {
    title: 'Dashboard',
    icon: <DashboardIcon />,
  },
  {
    segment: 'employees',
    title: 'Employees',
    icon: <PersonIcon />,
    pattern: 'employees{/:employeeId}*',
  },
];

const BRANDING = {
  title: "Agenda Pro",
};

export default function App() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  const sessionContextValue = useMemo(
    () => ({
      session,
      setSession,
      loading,
    }),
    [session, loading],
  );

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        const userData = await checkAuthStatus();

        if (userData) {
          setSession({
            user: userData
          });
        } else {
          setSession(null);
        }
      } catch (error) {
        console.error("Error verificando autenticación:", error);
        setSession(null);
      } finally {
        setLoading(false);
      }
    };

    verifyAuth();
  }, []);

  const AUTHENTICATION: Authentication = useMemo(() => ({
    signIn: () => { },
    signOut: () => signOut(setSession),
  }), [setSession]);

  return (
    <ReactRouterAppProvider
      navigation={NAVIGATION}
      branding={BRANDING}
      session={session}
      authentication={AUTHENTICATION}
    >
      <SessionContext.Provider value={sessionContextValue}>
        <Outlet />
      </SessionContext.Provider>
    </ReactRouterAppProvider>
  );
}