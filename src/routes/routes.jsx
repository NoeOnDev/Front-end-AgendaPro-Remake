import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { lazy, Suspense } from "react";

// Layouts
import RootLayout from "../layouts/RootLayout/RootLayout";

// Componentes UI
import Loading from "../components/ui/Loading/Loading";
import ErrorBoundary from "../components/ui/ErrorBoundary/ErrorBoundary";

// Auth
import { ProtectedRoute, PublicRoute } from "../hooks/useAuth";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";

// Lazy-loaded components
const Home = lazy(() => import("../pages/Home/Home"));
const Dashboard = lazy(() => import("../pages/Dashboard/Dashboard"));
const Profile = lazy(() => import("../pages/Profile"));
const NotFound = lazy(() => import("../pages/NotFound"));

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route errorElement={<ErrorBoundary />}>
      {/* Rutas públicas de autenticación */}
      <Route element={<PublicRoute />}>
        <Route path="login" element={<Login />} />
        <Route path="registro" element={<Register />} />
      </Route>

      {/* Rutas protegidas que requieren autenticación */}
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<RootLayout />}>
          <Route
            index
            element={
              <Suspense fallback={<Loading />}>
                <Home />
              </Suspense>
            }
          />
          <Route
            path="dashboard/*"
            element={
              <Suspense fallback={<Loading />}>
                <Dashboard />
              </Suspense>
            }
          />
          <Route
            path="perfil"
            element={
              <Suspense fallback={<Loading />}>
                <Profile />
              </Suspense>
            }
          />
        </Route>
      </Route>

      {/* Ruta 404 para cualquier otra URL */}
      <Route
        path="*"
        element={
          <Suspense fallback={<Loading />}>
            <NotFound />
          </Suspense>
        }
      />
    </Route>
  )
);

export default router;
