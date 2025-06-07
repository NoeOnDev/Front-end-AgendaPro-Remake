import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import {
  MdKeyboardArrowRight,
  MdDashboard,
  MdInsights,
  MdSettings,
  MdSpaceDashboard,
  MdHome,
  MdCalendarToday,
  MdPeopleAlt,
  MdPerson,
} from "react-icons/md";
import styles from "./Sidebar.module.css";

function NavGroup({ title, icon, children, defaultExpanded = false }) {
  const [expanded, setExpanded] = useState(defaultExpanded);

  return (
    <div className={styles.navGroup}>
      <button
        className={styles.navGroupToggle}
        onClick={() => setExpanded(!expanded)}
      >
        <div className={styles.navGroupTitle}>
          <span className={styles.navGroupIcon}>{icon}</span>
          <span>{title}</span>
        </div>
        <span className={expanded ? styles.iconExpanded : styles.icon}>
          <MdKeyboardArrowRight />
        </span>
      </button>
      <div
        className={`${styles.navGroupItems} ${expanded ? styles.expanded : ""}`}
      >
        {children}
      </div>
    </div>
  );
}

function Sidebar({ isSidebarOpen }) {
  const location = useLocation();

  const isActive = (path) => {
    if (path === "/") {
      return location.pathname === path;
    }
    if (path === "/dashboard") {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <aside
      className={`${styles.sidebar} ${!isSidebarOpen ? styles.collapsed : ""}`}
    >
      <nav>
        {/* Opción Home independiente */}
        <Link
          to="/"
          className={`${styles.navItem} ${
            isActive("/") ? styles.active : ""
          }`}
        >
          <span className={styles.navIcon}>
            <MdHome />
          </span>
          <span className={styles.navText}>Inicio</span>
        </Link>

        {/* Grupo Dashboard */}
        <NavGroup
          title="Dashboard"
          icon={<MdSpaceDashboard />}
          defaultExpanded={location.pathname.startsWith("/dashboard")}
        >
          <Link
            to="/dashboard"
            className={`${styles.navGroupItem} ${
              isActive("/dashboard") ? styles.active : ""
            }`}
          >
            <span className={styles.navIcon}>
              <MdDashboard />
            </span>
            <span className={styles.navText}>Resumen</span>
          </Link>
          <Link
            to="/dashboard/analytics"
            className={`${styles.navGroupItem} ${
              isActive("/dashboard/analytics") ? styles.active : ""
            }`}
          >
            <span className={styles.navIcon}>
              <MdInsights />
            </span>
            <span className={styles.navText}>Analítica</span>
          </Link>
          <Link
            to="/dashboard/settings"
            className={`${styles.navGroupItem} ${
              isActive("/dashboard/settings") ? styles.active : ""
            }`}
          >
            <span className={styles.navIcon}>
              <MdSettings />
            </span>
            <span className={styles.navText}>Configuración</span>
          </Link>
        </NavGroup>

        {/* Otras secciones principales */}
        <Link
          to="/agenda"
          className={`${styles.navItem} ${
            isActive("/agenda") ? styles.active : ""
          }`}
        >
          <span className={styles.navIcon}>
            <MdCalendarToday />
          </span>
          <span className={styles.navText}>Agenda</span>
        </Link>
        
        <Link
          to="/clientes"
          className={`${styles.navItem} ${
            isActive("/clientes") ? styles.active : ""
          }`}
        >
          <span className={styles.navIcon}>
            <MdPeopleAlt />
          </span>
          <span className={styles.navText}>Clientes</span>
        </Link>
        
        <Link
          to="/perfil"
          className={`${styles.navItem} ${
            isActive("/perfil") ? styles.active : ""
          }`}
        >
          <span className={styles.navIcon}>
            <MdPerson />
          </span>
          <span className={styles.navText}>Mi Perfil</span>
        </Link>
      </nav>
    </aside>
  );
}

export default Sidebar;