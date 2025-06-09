import { MdMenu, MdMenuOpen } from "react-icons/md";
import { Link } from "react-router-dom";
import styles from "./Header.module.css";
import UserMenu from "../UserMenu/UserMenu";
import Ripple from "../ui/Ripple/Ripple";
import ThemeSelector from "../ui/ThemeSelectorItem/ThemeSelectorItem";

function Header({ toggleSidebar, isSidebarOpen }) {
  // Usamos variant en lugar de color directo
  const { handleRipple, ripples } = Ripple({
    variant: "dark",
    duration: 600,
  });

  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <div className={styles.logoContainer}>
          <button
            className={styles.menuToggle}
            onClick={(e) => {
              handleRipple(e);
              toggleSidebar();
            }}
            aria-label={isSidebarOpen ? "Cerrar menú" : "Abrir menú"}
            style={{ position: "relative", overflow: "hidden" }}
          >
            {isSidebarOpen ? <MdMenuOpen /> : <MdMenu />}
            {ripples}
          </button>
          <Link to="/" className={styles.logoLink}>
            <h1 className={styles.logo}>Agenda Pro</h1>
          </Link>
        </div>

        <div className={styles.headerActions}>
          <ThemeSelector />
          <UserMenu />
        </div>
      </div>
    </header>
  );
}

export default Header;
