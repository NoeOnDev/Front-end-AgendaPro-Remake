import { useState, useRef, useEffect } from "react";
import { MdLogout, MdPerson, MdSettings } from "react-icons/md";
import { useAuth } from "../../context/AuthContext";
import styles from "./UserMenu.module.css";

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
        <div className={styles.userDropdownToggle} onClick={toggleDropdown}>
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
              <button className={styles.userDropdownLink}>
                <MdPerson /> Mi perfil
              </button>
              <button className={styles.userDropdownLink}>
                <MdSettings /> Configuración
              </button>
            </div>

            <div className={styles.userDropdownFooter}>
              <button
                className={styles.logoutButton}
                onClick={logout}
                aria-label="Cerrar sesión"
              >
                <MdLogout /> Cerrar sesión
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserMenu;