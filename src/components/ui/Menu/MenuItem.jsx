import Ripple from "../Ripple/Ripple";
import styles from "./Menu.module.css";

function MenuItem({ icon, children, onClick, variant = "secondary" }) {
  const { handleRipple, ripples } = Ripple({
    variant,
    duration: 600,
  });

  const handleClick = (e) => {
    handleRipple(e);
    if (onClick) onClick(e);
  };

  // Determinar clases de estilo basadas en la variante
  const getClassName = () => {
    let className = styles.menuItem;

    // Si necesitas aplicar estilos específicos por variante a través de clases CSS
    if (variant === "error") {
      className += ` ${styles.menuItemError}`;
    } else if (variant === "success") {
      className += ` ${styles.menuItemSuccess}`;
    } else if (variant === "warning") {
      className += ` ${styles.menuItemWarning}`;
    }

    return className;
  };

  return (
    <button
      className={getClassName()}
      onClick={handleClick}
      style={{ position: "relative", overflow: "hidden" }}
      data-variant={variant}
    >
      {icon && <span className={styles.menuItemIcon}>{icon}</span>}
      <span className={styles.menuItemText}>{children}</span>
      {ripples}
    </button>
  );
}

export default MenuItem;
