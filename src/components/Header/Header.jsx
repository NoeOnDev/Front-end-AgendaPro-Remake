import { MdMenu, MdMenuOpen } from "react-icons/md";
import { Link } from "react-router-dom";
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
