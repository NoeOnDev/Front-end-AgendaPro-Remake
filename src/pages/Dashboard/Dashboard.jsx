import {
  Link,
  Route,
  Routes,
  useOutletContext,
  useLocation,
} from "react-router-dom";
import { lazy, Suspense, useState } from "react";
import {
  MdKeyboardArrowRight,
  MdDashboard,
  MdInsights,
  MdSettings,
  MdSpaceDashboard,
} from "react-icons/md";
import styles from "./Dashboard.module.css";
import LoadingComponent from "../../components/ui/Loading/Loading";

const Overview = lazy(() =>
  import("../../components/dashboard/Overview/Overview")
);
const Analytics = lazy(() =>
  import("../../components/dashboard/Analytics/Analytics")
);
const Settings = lazy(() =>
  import("../../components/dashboard/Settings/Settings")
);

const Loading = () => <LoadingComponent />;

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
          {expanded ? <MdKeyboardArrowRight /> : <MdKeyboardArrowRight />}
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

function Dashboard() {
  const { isSidebarOpen, sidebarRef } = useOutletContext() || {
    isSidebarOpen: true,
    sidebarRef: null,
  };
  const location = useLocation();

  const isActive = (path) => {
    if (path === "/dashboard") {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className={styles.dashboardContainer}>
      <aside
        ref={sidebarRef}
        className={`${styles.dashboardSidebar} ${
          !isSidebarOpen ? styles.collapsed : ""
        }`}
      >
        <nav>
          <NavGroup
            title="Dashboard"
            icon={<MdSpaceDashboard />}
            defaultExpanded={true}
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
        </nav>
      </aside>

      <div className={styles.dashboardContent}>
        <Routes>
          <Route
            index
            element={
              <Suspense fallback={<Loading />}>
                <Overview />
              </Suspense>
            }
          />
          <Route
            path="analytics"
            element={
              <Suspense fallback={<Loading />}>
                <Analytics />
              </Suspense>
            }
          />
          <Route
            path="settings"
            element={
              <Suspense fallback={<Loading />}>
                <Settings />
              </Suspense>
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default Dashboard;
