import { useState, useRef, useEffect } from "react";
import {
  MdLogout,
  MdPerson,
  MdSettings,
  MdKeyboardArrowRight,
} from "react-icons/md";
import { useAuth } from "../../context/AuthContext";
import styles from "./UserMenu.module.css";
import Ripple from "../ui/Ripple/Ripple";
import MenuItem from "../ui/Menu/MenuItem";

// Componente para mostrar iniciales como avatar fallback
function AvatarFallback({ name }) {
  const initials = name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();

  return <div className={styles.avatarFallback}>{initials}</div>;
}

function UserMenu() {
  const { user, logout } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Ripple para el botón de toggle
  const { handleRipple, ripples } = Ripple({
    variant: "dark",
    duration: 550,
  });

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (!user) return null;

  return (
    <div className={styles.userControls}>
      <div className={styles.userDropdownContainer} ref={dropdownRef}>
        {/* Botón toggle con Ripple */}
        <div
          className={styles.userDropdownToggle}
          onClick={(e) => {
            handleRipple(e);
            toggleDropdown();
          }}
          style={{ position: "relative", overflow: "hidden" }}
        >
          <div className={styles.userInfo}>
            {user.avatar ? (
              <img
                src={user.avatar}
                alt={user.name}
                className={styles.userAvatar}
              />
            ) : (
              <AvatarFallback name={user.name} />
            )}
            <span className={styles.userName}>{user.name}</span>
          </div>
          <span
            className={`${styles.dropdownArrow} ${
              isDropdownOpen ? styles.dropdownArrowOpen : ""
            }`}
          >
            <MdKeyboardArrowRight />
          </span>
          {ripples}
        </div>

        {isDropdownOpen && (
          <div className={styles.userDropdownMenu}>
            <div className={styles.userDropdownHeader}>
              {user.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.name}
                  className={styles.userDropdownAvatar}
                />
              ) : (
                <div className={styles.userDropdownAvatarFallback}>
                  <AvatarFallback name={user.name} />
                </div>
              )}
              <div className={styles.userDropdownInfo}>
                <p className={styles.userDropdownName}>{user.name}</p>
                <p className={styles.userDropdownEmail}>{user.email}</p>
              </div>
            </div>

            <div className={styles.userDropdownLinks}>
              <MenuItem icon={<MdPerson />}>Mi perfil</MenuItem>
              <MenuItem icon={<MdSettings />}>Configuración</MenuItem>
            </div>

            <div className={styles.userDropdownFooter}>
              <MenuItem icon={<MdLogout />} onClick={logout} variant="error">
                Cerrar sesión
              </MenuItem>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserMenu;
