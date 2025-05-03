import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import MiniDrawer from "./MiniDrawer";
import NotasPage from "./NotasPage";
import LibrosPage from "./LibrosPage";

const theme = createTheme({
  colorSchemes: {
    light: true,
    dark: true,
  },
});

export default function App() {
  return (
    <ThemeProvider theme={theme} defaultMode="system">
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/dashboard" element={<MiniDrawer />}>
            <Route path="notas" element={<NotasPage />} />
            <Route path="libros" element={<LibrosPage />} />
            <Route index element={<Navigate to="notas" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}