import { MdErrorOutline, MdHome, MdDashboard } from "react-icons/md";
import { Link } from "react-router-dom";
import styles from "./NotFound.module.css";

function NotFound() {
  return (
    <div className={styles.notFoundContainer}>
      <div className={styles.notFoundContent}>
        <div className={styles.errorIcon}>
          <MdErrorOutline />
        </div>

        <h1 className={styles.errorTitle}>404</h1>
        <h2 className={styles.errorSubtitle}>Página no encontrada</h2>

        <p className={styles.errorMessage}>
          Lo sentimos, la página que estás buscando no existe o ha sido movida.
        </p>

        <div className={styles.actions}>
          <Link to="/" className={styles.primaryButton}>
            <MdHome /> Ir al inicio
          </Link>
          <Link to="/dashboard" className={styles.secondaryButton}>
            <MdDashboard /> Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
