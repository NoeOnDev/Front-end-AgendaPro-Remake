import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import PanelPage from "./pages/PanelPage";
import NotasPage from "./pages/NotasPage";
import LibrosPage from "./pages/LibrosPage";
import DashboardLayout from "./DashboardLayout";

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
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<PanelPage />} />
            <Route path="notas" element={<NotasPage />} />
            <Route path="libros" element={<LibrosPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}