import { Link } from "react-router-dom";
import Ripple from "../Ripple/Ripple";
import styles from "./Navigation.module.css";

function NavGroupItem({ to, icon, children, isActive, onClick }) {
  // Usamos variant en lugar de color directo
  const { handleRipple, ripples } = Ripple({
    variant: isActive ? "primary" : "dark",
  });

  return (
    <Link
      to={to}
      className={`${styles.navGroupItem} ${isActive ? styles.active : ""}`}
      onClick={(e) => {
        handleRipple(e);
        if (onClick) onClick(e);
      }}
      style={{ position: "relative", overflow: "hidden" }}
    >
      {icon && <span className={styles.navIcon}>{icon}</span>}
      <span className={styles.navText}>{children}</span>
      {ripples}
    </Link>
  );
}

export default NavGroupItem;