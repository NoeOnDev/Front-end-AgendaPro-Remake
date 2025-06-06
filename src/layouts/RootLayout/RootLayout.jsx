import { useState } from "react";
import { Outlet, useNavigation } from "react-router-dom";
import Header from "../../components/Header/Header";
import styles from "./RootLayout.module.css";

function RootLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className={styles.rootLayout}>
      <Header toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />

      <main className={`${styles.main} ${isLoading ? styles.loading : ""}`}>
        <Outlet context={{ isSidebarOpen }} />
      </main>

      {/* Footer está comentado según tu requerimiento */}
      {/* <footer className={styles.footer}>
        <p>&copy; 2025 Agenda Pro</p>
      </footer> */}
    </div>
  );
}

export default RootLayout;
