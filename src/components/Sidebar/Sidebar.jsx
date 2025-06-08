import { useLocation } from "react-router-dom";
import {
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

// Importar los componentes de navegación reutilizables
import NavItem from "../ui/Navigation/NavItem";
import NavGroupItem from "../ui/Navigation/NavGroupItem";
import NavGroup from "../ui/Navigation/NavGroup";

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
      <nav className={styles.sidebarNav}>
        {/* Opción Home independiente */}
        <NavItem to="/" icon={<MdHome />} isActive={isActive("/")}>
          Inicio
        </NavItem>

        {/* Grupo Dashboard */}
        <NavGroup
          title="Dashboard"
          icon={<MdSpaceDashboard />}
          defaultExpanded={location.pathname.startsWith("/dashboard")}
        >
          <NavGroupItem
            to="/dashboard"
            icon={<MdDashboard />}
            isActive={isActive("/dashboard")}
          >
            Resumen
          </NavGroupItem>

          <NavGroupItem
            to="/dashboard/analytics"
            icon={<MdInsights />}
            isActive={isActive("/dashboard/analytics")}
          >
            Analítica
          </NavGroupItem>

          <NavGroupItem
            to="/dashboard/settings"
            icon={<MdSettings />}
            isActive={isActive("/dashboard/settings")}
          >
            Configuración
          </NavGroupItem>
        </NavGroup>

        {/* Otras secciones principales */}
        <NavItem
          to="/agenda"
          icon={<MdCalendarToday />}
          isActive={isActive("/agenda")}
        >
          Agenda
        </NavItem>

        <NavItem
          to="/clientes"
          icon={<MdPeopleAlt />}
          isActive={isActive("/clientes")}
        >
          Clientes
        </NavItem>

        <NavItem
          to="/perfil"
          icon={<MdPerson />}
          isActive={isActive("/perfil")}
        >
          Mi Perfil
        </NavItem>
      </nav>
    </aside>
  );
}

export default Sidebar;
