import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import styles from "./Dashboard.module.css";
import LoadingComponent from "../../components/ui/Loading/Loading";

// Importaciones lazy
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

function Dashboard() {
  return (
    <div className={styles.dashboardContainer}>
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
