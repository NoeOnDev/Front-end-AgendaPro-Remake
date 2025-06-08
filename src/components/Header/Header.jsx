import { MdMenu, MdMenuOpen } from "react-icons/md";
import { Link } from "react-router-dom";
import styles from "./Header.module.css";
import UserMenu from "../UserMenu/UserMenu";
import Ripple from "../ui/Ripple/Ripple";

function Header({ toggleSidebar, isSidebarOpen }) {
  // Usamos variant en lugar de color directo
  const { handleRipple, ripples } = Ripple({
    variant: "dark", // Utilizamos la variante primary
    duration: 600, // Mantenemos la duración más corta para un botón pequeño
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

        <UserMenu />
      </div>
    </header>
  );
}

export default Header;
