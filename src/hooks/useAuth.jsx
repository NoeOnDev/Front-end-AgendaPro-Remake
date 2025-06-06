import { Navigate, Outlet, useLocation } from "react-router-dom";

// Este hook simula autenticación - reemplazar con tu lógica real
const useAuth = () => {
  // Retorna true si el usuario está autenticado
  return { isAuthenticated: false };
};

function ProtectedRoute() {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    // Redirecciona a login y preserva la ubicación a la que el usuario intentaba acceder
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
