import styles from "./ErrorBoundary.module.css";

function ErrorBoundary() {
  return (
    <div className={styles.error}>
      <h2>Ha ocurrido un error</h2>
      <button
        className={styles.retryButton}
        onClick={() => window.location.reload()}
      >
        Reintentar
      </button>
    </div>
  );
}

export default ErrorBoundary;
