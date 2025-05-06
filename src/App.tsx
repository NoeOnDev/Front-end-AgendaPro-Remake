import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import DashboardContainer from "./components/containers/DashboardContainer";

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
          <Route path="/dashboard/*" element={<DashboardContainer />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
