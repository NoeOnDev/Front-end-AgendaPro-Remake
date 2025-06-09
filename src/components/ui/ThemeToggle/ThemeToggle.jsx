import { MdLightMode, MdDarkMode, MdDevices } from "react-icons/md";
import { useTheme, THEMES } from "../../../context/ThemeContext";
import styles from "./ThemeToggle.module.css";
import Ripple from "../Ripple/Ripple";

function ThemeToggle() {
  const { theme, changeTheme, currentTheme } = useTheme();
  const { handleRipple, ripples } = Ripple({
    variant: "primary",
    duration: 600,
  });

  // Determinar qué icono mostrar
  const getIcon = () => {
    if (theme === THEMES.SYSTEM) {
      return <MdDevices />;
    } else if (theme === THEMES.DARK || currentTheme === THEMES.DARK) {
      return <MdDarkMode />;
    } else {
      return <MdLightMode />;
    }
  };

  // Rotar entre los temas disponibles
  const toggleTheme = (e) => {
    handleRipple(e);

    if (theme === THEMES.LIGHT) {
      changeTheme(THEMES.DARK);
    } else if (theme === THEMES.DARK) {
      changeTheme(THEMES.SYSTEM);
    } else {
      changeTheme(THEMES.LIGHT);
    }
  };

  return (
    <button
      className={styles.themeToggle}
      onClick={toggleTheme}
      aria-label="Cambiar tema"
      style={{ position: "relative", overflow: "hidden" }}
    >
      {getIcon()}
      {ripples}
    </button>
  );
}

export default ThemeToggle;
