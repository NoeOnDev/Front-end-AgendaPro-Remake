import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { MdDashboard, MdPerson, MdCalendarToday, MdPeopleAlt, MdInsights } from "react-icons/md";
import styles from "./Home.module.css";

function Home() {
  const { user } = useAuth();
  
  return (
    <div className={styles.homeContainer}>
      <section className={styles.welcomeSection}>
        <div className={styles.welcomeContent}>
          <h1>Bienvenido, {user.name.split(" ")[0]}</h1>
          <p>¿Qué te gustaría hacer hoy?</p>
        </div>
      </section>

      <section className={styles.quickActions}>
        <div className={styles.actionGrid}>
          <Link to="/dashboard" className={styles.actionCard}>
            <div className={styles.actionIcon}><MdDashboard /></div>
            <h3>Dashboard</h3>
            <p>Vista general del negocio</p>
          </Link>
          
          <Link to="/dashboard/analytics" className={styles.actionCard}>
            <div className={styles.actionIcon}><MdInsights /></div>
            <h3>Análisis</h3>
            <p>Estadísticas y métricas</p>
          </Link>

          <Link to="/agenda" className={styles.actionCard}>
            <div className={styles.actionIcon}><MdCalendarToday /></div>
            <h3>Agenda</h3>
            <p>Gestionar citas</p>
          </Link>

          <Link to="/clientes" className={styles.actionCard}>
            <div className={styles.actionIcon}><MdPeopleAlt /></div>
            <h3>Clientes</h3>
            <p>Base de datos de clientes</p>
          </Link>

          <Link to="/perfil" className={styles.actionCard}>
            <div className={styles.actionIcon}><MdPerson /></div>
            <h3>Mi Perfil</h3>
            <p>Gestionar tu cuenta</p>
          </Link>
        </div>
      </section>

      <section className={styles.statsOverview}>
        <h2>Resumen Rápido</h2>
        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <h3>Citas Hoy</h3>
            <p className={styles.statValue}>8</p>
          </div>
          <div className={styles.statCard}>
            <h3>Clientes Nuevos</h3>
            <p className={styles.statValue}>3</p>
          </div>
          <div className={styles.statCard}>
            <h3>Ingresos</h3>
            <p className={styles.statValue}>€580</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
