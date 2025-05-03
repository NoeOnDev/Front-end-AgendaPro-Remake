import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MiniDrawer from "./MiniDrawer";
import NotasPage from "./NotasPage";
import LibrosPage from "./LibrosPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rutas públicas aquí, por ejemplo: login */}
        {/* Rutas protegidas con MiniDrawer */}
        <Route
          path="/dashboard"
          element={<MiniDrawer />}
        >
          <Route path="notas" element={<NotasPage />} />
          <Route path="libros" element={<LibrosPage />} />
          <Route index element={<Navigate to="notas" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
