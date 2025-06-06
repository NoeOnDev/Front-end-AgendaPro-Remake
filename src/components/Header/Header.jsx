import { MdMenu, MdMenuOpen } from "react-icons/md";
import styles from "./Header.module.css";

function Header({ toggleSidebar, isSidebarOpen }) {
  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <div className={styles.logoContainer}>
          <button
            className={styles.menuToggle}
            onClick={toggleSidebar}
            aria-label={isSidebarOpen ? "Cerrar menú" : "Abrir menú"}
          >
            {isSidebarOpen ? <MdMenuOpen /> : <MdMenu />}
          </button>
          <h1 className={styles.logo}>Agenda Pro</h1>
        </div>

        {/* Se ha eliminado la navegación del header según lo solicitado */}

        <div className={styles.userControls}>
          <button className={styles.userButton}>Usuario</button>
        </div>
      </div>
    </header>
  );
}

export default Header;
