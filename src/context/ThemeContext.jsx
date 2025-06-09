import { createContext, useContext, useEffect, useState } from "react";

// Posibles valores de tema
export const THEMES = {
  LIGHT: "light",
  DARK: "dark",
  SYSTEM: "system",
};

// Crear el contexto
const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  // Estado para almacenar el tema actual
  const [theme, setTheme] = useState(() => {
    // Intentar recuperar el tema guardado en localStorage
    const savedTheme = localStorage.getItem("agendaProTheme");
    return savedTheme || THEMES.SYSTEM; // Por defecto, usar preferencia del sistema
  });

  // Estado para almacenar el tema actualmente aplicado (light/dark)
  const [currentTheme, setCurrentTheme] = useState(THEMES.LIGHT);

  // Función para cambiar el tema
  const changeTheme = (newTheme) => {
    setTheme(newTheme);
    localStorage.setItem("agendaProTheme", newTheme);
  };

  // Efecto para aplicar el tema basado en la selección y/o preferencia del sistema
  useEffect(() => {
    const applyTheme = (themeName) => {
      document.documentElement.setAttribute("data-theme", themeName);
      setCurrentTheme(themeName);
    };

    // Si el tema es "system", detectar preferencia del sistema
    if (theme === THEMES.SYSTEM) {
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      applyTheme(prefersDark ? THEMES.DARK : THEMES.LIGHT);

      // Escuchar cambios en la preferencia del sistema
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      const handleChange = (e) => {
        applyTheme(e.matches ? THEMES.DARK : THEMES.LIGHT);
      };

      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    } else {
      // Aplicar el tema seleccionado directamente
      applyTheme(theme);
    }
  }, [theme]);

  // Valores que expondremos en el contexto
  const contextValue = {
    theme,
    currentTheme,
    changeTheme,
    isSystemTheme: theme === THEMES.SYSTEM,
    isDarkTheme: currentTheme === THEMES.DARK,
    isLightTheme: currentTheme === THEMES.LIGHT,
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
}

// Hook personalizado para acceder al contexto del tema
export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme debe usarse dentro de un ThemeProvider");
  }
  return context;
}
