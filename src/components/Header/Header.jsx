import { MdMenu, MdMenuOpen } from "react-icons/md";
import styles from "./Header.module.css";
import UserMenu from "../UserMenu/UserMenu";

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

        <UserMenu />
      </div>
    </header>
  );
}

export default Header;
