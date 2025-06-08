import { MdKeyboardArrowRight } from "react-icons/md";
import Ripple from "../Ripple/Ripple";
import styles from "./Navigation.module.css";

function NavGroupToggle({ title, icon, expanded, onClick }) {
  // Usamos variant en lugar de color directo
  const { handleRipple, ripples } = Ripple({
    variant: "dark", // Efecto sutil para el toggle
  });

  return (
    <button
      className={styles.navGroupToggle}
      onClick={(e) => {
        handleRipple(e);
        onClick();
      }}
      style={{ position: "relative", overflow: "hidden" }}
    >
      <div className={styles.navGroupTitle}>
        <span className={styles.navGroupIcon}>{icon}</span>
        <span>{title}</span>
      </div>
      <span className={expanded ? styles.iconExpanded : styles.icon}>
        <MdKeyboardArrowRight />
      </span>
      {ripples}
    </button>
  );
}

export default NavGroupToggle;
