import { useState, useRef, useEffect } from "react";
import { MdLightMode, MdDarkMode, MdDevices, MdCheck } from "react-icons/md";
import { useTheme, THEMES } from "../../../context/ThemeContext";
import styles from "./ThemeSelector.module.css";
import Ripple from "../Ripple/Ripple";

function ThemeSelectorItem({ icon, label, value, active, onClick }) {
  const { handleRipple, ripples } = Ripple({
    variant: active ? "primary" : "dark",
    duration: 600,
  });

  return (
    <button
      className={`${styles.themeItem} ${active ? styles.activeTheme : ""}`}
      onClick={(e) => {
        handleRipple(e);
        onClick(value);
      }}
      style={{ position: "relative", overflow: "hidden" }}
    >
      <span className={styles.themeIcon}>{icon}</span>
      <span className={styles.themeLabel}>{label}</span>
      {active && (
        <span className={styles.checkIcon}>
          <MdCheck />
        </span>
      )}
      {ripples}
    </button>
  );
}

function ThemeSelector() {
  const { theme, changeTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const selectorRef = useRef(null);

  // Icono principal basado en el tema actual
  const getMainIcon = () => {
    switch (theme) {
      case THEMES.LIGHT:
        return <MdLightMode />;
      case THEMES.DARK:
        return <MdDarkMode />;
      case THEMES.SYSTEM:
        return <MdDevices />;
      default:
        return <MdLightMode />;
    }
  };

  // Cerrar el menú al hacer clic fuera
  useEffect(() => {
    function handleClickOutside(event) {
      if (selectorRef.current && !selectorRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Manejar la selección de un tema
  const handleThemeChange = (newTheme) => {
    changeTheme(newTheme);
    setIsOpen(false);
  };

  return (
    <div className={styles.themeSelector} ref={selectorRef}>
      <button
        className={styles.themeToggle}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Seleccionar tema"
      >
        {getMainIcon()}
      </button>

      {isOpen && (
        <div className={styles.themeMenu}>
          <ThemeSelectorItem
            icon={<MdLightMode />}
            label="Claro"
            value={THEMES.LIGHT}
            active={theme === THEMES.LIGHT}
            onClick={handleThemeChange}
          />
          <ThemeSelectorItem
            icon={<MdDarkMode />}
            label="Oscuro"
            value={THEMES.DARK}
            active={theme === THEMES.DARK}
            onClick={handleThemeChange}
          />
          <ThemeSelectorItem
            icon={<MdDevices />}
            label="Sistema"
            value={THEMES.SYSTEM}
            active={theme === THEMES.SYSTEM}
            onClick={handleThemeChange}
          />
        </div>
      )}
    </div>
  );
}

export default ThemeSelector;
