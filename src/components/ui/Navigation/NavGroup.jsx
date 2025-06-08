import { useState } from "react";
import NavGroupToggle from "./NavGroupToggle";
import styles from "./Navigation.module.css";

function NavGroup({ title, icon, children, defaultExpanded = false }) {
  const [expanded, setExpanded] = useState(defaultExpanded);

  const handleToggle = () => {
    setExpanded(!expanded);
  };

  return (
    <div className={styles.navGroup}>
      <NavGroupToggle
        title={title}
        icon={icon}
        expanded={expanded}
        onClick={handleToggle}
      />
      <div
        className={`${styles.navGroupItems} ${expanded ? styles.expanded : ""}`}
      >
        {children}
      </div>
    </div>
  );
}

export default NavGroup;
