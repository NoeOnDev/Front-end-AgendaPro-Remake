import { useState, useEffect, useRef } from "react";
import { Outlet, useNavigation } from "react-router-dom";
import Header from "../../components/Header/Header";
import styles from "./RootLayout.module.css";

function RootLayout() {
  // Determinar el estado inicial del sidebar basado en el tamaño de pantalla
  const [isSidebarOpen, setIsSidebarOpen] = useState(() => {
    return window.innerWidth >= 768; // True para desktop, false para móviles
  });

  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";
  const sidebarRef = useRef(null);
  const overlayRef = useRef(null);
  const isMobile = window.innerWidth < 768;

  // Cierra el sidebar cuando se hace clic fuera de él en dispositivos móviles
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isMobile &&
        isSidebarOpen &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target) &&
        event.target.closest('[aria-label="Cerrar menú"]') === null
      ) {
        setIsSidebarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSidebarOpen, isMobile]);

  // Actualiza el estado del sidebar si cambia el tamaño de la ventana
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      if (mobile !== isMobile && mobile === true) {
        // Si cambia de desktop a móvil, cierra el sidebar
        setIsSidebarOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isMobile]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className={styles.rootLayout}>
      <Header toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />

      <div className={styles.contentWrapper}>
        {/* Overlay oscuro que aparece detrás del sidebar en móviles */}
        {isMobile && isSidebarOpen && (
          <div
            className={styles.overlay}
            onClick={() => setIsSidebarOpen(false)}
            ref={overlayRef}
          />
        )}

        <main className={`${styles.main} ${isLoading ? styles.loading : ""}`}>
          <Outlet
            context={{
              isSidebarOpen,
              sidebarRef,
            }}
          />
        </main>
      </div>
    </div>
  );
}

export default RootLayout;
