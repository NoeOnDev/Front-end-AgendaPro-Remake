import { useState, useEffect } from "react";
import styles from "./Overview.module.css";

function Overview() {
  const [stats, setStats] = useState({
    citas: 0,
    clientes: 0,
    servicios: 0,
    ingresos: 0,
  });

  useEffect(() => {
    // Simulación de carga de datos
    const timer = setTimeout(() => {
      setStats({
        citas: 24,
        clientes: 156,
        servicios: 8,
        ingresos: 3250,
      });
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={styles.overviewContainer}>
      <h2>Resumen del Negocio</h2>

      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <h3>Citas Hoy</h3>
          <p className={styles.statValue}>{stats.citas}</p>
        </div>
        <div className={styles.statCard}>
          <h3>Clientes Totales</h3>
          <p className={styles.statValue}>{stats.clientes}</p>
        </div>
        <div className={styles.statCard}>
          <h3>Servicios Activos</h3>
          <p className={styles.statValue}>{stats.servicios}</p>
        </div>
        <div className={styles.statCard}>
          <h3>Ingresos del Día</h3>
          <p className={styles.statValue}>€{stats.ingresos}</p>
        </div>
      </div>

      <div className={styles.recentActivity}>
        <h3>Actividad Reciente</h3>
        <ul>
          <li>Lucía García agendó una cita para corte de cabello</li>
          <li>Carlos Martínez canceló su cita del jueves</li>
          <li>Nuevo cliente registrado: Elena Rodríguez</li>
          <li>Pago recibido: Tratamiento facial - €120</li>
        </ul>
      </div>
    </div>
  );
}

export default Overview;
