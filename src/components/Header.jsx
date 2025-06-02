import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Calendar,
  ChevronDown,
  User,
  Settings,
  LogOut,
  CheckCircle,
  XCircle,
  Loader2,
  Sun,
  Moon,
} from "lucide-react";
import { authService } from "../services";

function Header({ user }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true"
  );
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

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

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark-mode");
    } else {
      document.documentElement.classList.remove("dark-mode");
    }
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    setIsDropdownOpen(false);

    const result = await authService.logout();

    navigate("/login");
  };

  const handleProfile = () => {
    navigate("/profile");
    setIsDropdownOpen(false);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const getInitials = (name) => {
    if (!name) return "";

    return name
      .split(" ")
      .map((word) => word.charAt(0))
      .join("")
      .substring(0, 2)
      .toUpperCase();
  };

  const getAvatarColor = (name) => {
    const colors = [
      "var(--primary-500)",
      "var(--success-500)",
      "var(--warning-500)",
      "#8b5cf6",
      "#ec4899",
      "#06b6d4",
      "#10b981",
      "#f59e0b",
    ];

    if (!name) return colors[0];

    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }

    return colors[Math.abs(hash) % colors.length];
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-brand">
          <div className="header-logo">
            <Calendar size={28} color="var(--primary-600)" />
          </div>
          <h1 className="header-title">Agenda Pro</h1>
        </div>

        <nav className="header-nav">
        </nav>

        <button
          onClick={toggleDarkMode}
          className="theme-toggle"
          title={darkMode ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
        >
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        <div className="header-user" ref={dropdownRef}>
          <button
            onClick={toggleDropdown}
            className="user-button"
            aria-expanded={isDropdownOpen}
            aria-haspopup="true"
            disabled={isLoggingOut}
          >
            <div className="user-avatar">
              {user.avatar ? (
                <img
                  src={user.avatar}
                  alt={`Avatar de ${user.name}`}
                  className="avatar-image"
                />
              ) : (
                <div
                  className="avatar-fallback"
                  style={{ backgroundColor: getAvatarColor(user.name) }}
                >
                  {getInitials(user.name)}
                </div>
              )}
            </div>

            <div className="user-info">
              <span className="user-name">{user.name}</span>
              <span className="user-email">{user.email}</span>
            </div>

            <div className={`dropdown-icon ${isDropdownOpen ? "open" : ""}`}>
              <ChevronDown size={16} />
            </div>
          </button>

          {isDropdownOpen && !isLoggingOut && (
            <div className="dropdown-menu">
              <div className="dropdown-header">
                <div className="dropdown-user-avatar">
                  {user.avatar ? (
                    <img
                      src={user.avatar}
                      alt={`Avatar de ${user.name}`}
                      className="dropdown-avatar-image"
                    />
                  ) : (
                    <div
                      className="dropdown-avatar-fallback"
                      style={{ backgroundColor: getAvatarColor(user.name) }}
                    >
                      {getInitials(user.name)}
                    </div>
                  )}
                </div>
                <div className="dropdown-user-info">
                  <span className="dropdown-user-name">{user.name}</span>
                  <span className="dropdown-user-email">{user.email}</span>
                  <span
                    className={`dropdown-user-status ${
                      user.email_verified_at ? "verified" : "unverified"
                    }`}
                  >
                    {user.email_verified_at ? (
                      <>
                        <CheckCircle size={12} />
                        Verificado
                      </>
                    ) : (
                      <>
                        <XCircle size={12} />
                        Sin verificar
                      </>
                    )}
                  </span>
                </div>
              </div>

              <div className="dropdown-divider"></div>

              <div className="dropdown-items">
                <button onClick={handleProfile} className="dropdown-item">
                  <User size={16} className="dropdown-item-icon" />
                  Ver Perfil
                </button>

                <button
                  onClick={() => setIsDropdownOpen(false)}
                  className="dropdown-item"
                >
                  <Settings size={16} className="dropdown-item-icon" />
                  Configuración
                </button>

                <div className="dropdown-divider"></div>

                <button
                  onClick={handleLogout}
                  className="dropdown-item danger"
                  disabled={isLoggingOut}
                >
                  <LogOut size={16} className="dropdown-item-icon" />
                  Cerrar Sesión
                </button>
              </div>
            </div>
          )}

          {isLoggingOut && (
            <div className="logout-overlay">
              <div className="logout-spinner">
                <Loader2 size={20} className="spin" />
                <span>Cerrando sesión...</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
