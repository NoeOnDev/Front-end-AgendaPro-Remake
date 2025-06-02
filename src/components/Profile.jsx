import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  User,
  Mail,
  Calendar,
  Camera,
  Save,
  X,
  Edit3,
  Loader2,
  CheckCircle,
  XCircle,
  AlertTriangle,
} from "lucide-react";
import Header from "./Header";
import { userService } from "../services/userService";

function Profile() {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [previewAvatar, setPreviewAvatar] = useState(null);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    avatar: null,
    remove_avatar: false,
  });

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      const result = await userService.getProfile();

      if (result.success) {
        setUser(result.user);
        setFormData({
          name: result.user.name,
          email: result.user.email,
          avatar: null,
          remove_avatar: false,
        });
      } else {
        setError(result.message);

        if (
          result.message.includes("Sesión expirada") ||
          result.message.includes("401")
        ) {
          navigate("/login");
        }
      }
    } catch (err) {
      setError("Error de conexión");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, avatar: file, remove_avatar: false }));

      const reader = new FileReader();
      reader.onload = (e) => setPreviewAvatar(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveAvatar = () => {
    setFormData((prev) => ({ ...prev, avatar: null, remove_avatar: true }));
    setPreviewAvatar(null);
  };

  const handleSave = async () => {
    setSaving(true);
    setError("");
    setMessage("");

    try {
      const hasFiles = formData.avatar || formData.remove_avatar;

      const profileData = {};

      if (formData.name !== user.name) {
        profileData.name = formData.name;
      }
      if (formData.email !== user.email) {
        profileData.email = formData.email;
      }
      if (formData.avatar) {
        profileData.avatar = formData.avatar;
      }
      if (formData.remove_avatar) {
        profileData.remove_avatar = true;
      }

      const result = await userService.updateProfile(profileData, hasFiles);

      if (result.success) {
        setUser(result.user);
        setMessage(result.message);
        setIsEditing(false);
        setPreviewAvatar(null);
        setFormData((prev) => ({
          ...prev,
          avatar: null,
          remove_avatar: false,
        }));
      } else {
        if (result.errors) {
          const errorMessages = Object.values(result.errors).flat().join(". ");
          setError(errorMessages);
        } else {
          setError(result.message);
        }
      }
    } catch (err) {
      setError("Error de conexión");
      console.error("Error:", err);
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFormData({
      name: user.name,
      email: user.email,
      password: "",
      password_confirmation: "",
      avatar: null,
      remove_avatar: false,
    });
    setPreviewAvatar(null);
    setError("");
    setMessage("");
  };

  const getInitials = (name) => {
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

    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }

    return colors[Math.abs(hash) % colors.length];
  };

  if (loading) {
    return (
      <div className="dashboard">
        <Header user={JSON.parse(localStorage.getItem("user") || "{}")} />
        <div className="auth-container">
          <div className="verification-card">
            <div className="verification-icon pulse">
              <Loader2 size={64} />
            </div>
            <h2 className="verification-title">Cargando perfil...</h2>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="dashboard">
        <Header user={JSON.parse(localStorage.getItem("user") || "{}")} />
        <div className="auth-container">
          <div className="verification-card">
            <div className="verification-icon">
              <XCircle size={64} color="var(--error-600)" />
            </div>
            <h2 className="verification-title">Error al cargar el perfil</h2>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <Header user={user} />

      <div className="dashboard-content fade-in">
        <div className="profile-card">
          <div className="profile-header">
            <h1 className="profile-title">Mi Perfil</h1>
            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="btn btn-secondary"
              >
                <Edit3 size={16} />
                Editar Perfil
              </button>
            )}
          </div>

          {message && (
            <div className="alert alert-success">
              <CheckCircle size={18} className="alert-icon" />
              <span>{message}</span>
            </div>
          )}

          {error && (
            <div className="alert alert-error">
              <XCircle size={18} className="alert-icon" />
              <span>{error}</span>
            </div>
          )}

          <div className="profile-content">
            <div className="profile-avatar-section">
              <div className="profile-avatar-container">
                {previewAvatar ? (
                  <img
                    src={previewAvatar}
                    alt="Preview"
                    className="profile-avatar-image"
                  />
                ) : user.avatar && !formData.remove_avatar ? (
                  <img
                    src={user.avatar}
                    alt={`Avatar de ${user.name}`}
                    className="profile-avatar-image"
                  />
                ) : (
                  <div
                    className="profile-avatar-fallback"
                    style={{ backgroundColor: getAvatarColor(user.name) }}
                  >
                    {getInitials(user.name)}
                  </div>
                )}

                {isEditing && (
                  <div className="profile-avatar-overlay">
                    <input
                      type="file"
                      id="avatar-upload"
                      accept="image/*"
                      onChange={handleAvatarChange}
                      className="profile-avatar-input"
                    />
                    <label
                      htmlFor="avatar-upload"
                      className="profile-avatar-button"
                    >
                      <Camera size={24} />
                    </label>
                    {(user.avatar || previewAvatar) && (
                      <button
                        type="button"
                        onClick={handleRemoveAvatar}
                        className="profile-avatar-remove"
                      >
                        <X size={20} />
                      </button>
                    )}
                  </div>
                )}
              </div>

              <div className="profile-avatar-info">
                <h2 className="profile-name">{user.name}</h2>
                <p className="profile-email">{user.email}</p>
                <span
                  className={`profile-status ${
                    user.email_verified_at ? "verified" : "unverified"
                  }`}
                >
                  {user.email_verified_at ? (
                    <>
                      <CheckCircle size={16} />
                      Email verificado
                    </>
                  ) : (
                    <>
                      <AlertTriangle size={16} />
                      Email sin verificar
                    </>
                  )}
                </span>

                <div className="profile-stats">
                  <div className="profile-stat">
                    <span className="profile-stat-label">Miembro desde</span>
                    <span className="profile-stat-value">
                      {new Date(user.created_at).toLocaleDateString("es-ES", {
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                  <div className="profile-stat">
                    <span className="profile-stat-label">Último acceso</span>
                    <span className="profile-stat-value">Hoy</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="profile-form">
              <div className="profile-form-section">
                <h3 className="profile-form-section-title">
                  <User size={20} />
                  Información Personal
                </h3>
                <div className="profile-form-grid">
                  <div className="form-group">
                    <label htmlFor="name" className="form-label">
                      <User size={16} />
                      Nombre completo
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="form-input"
                        placeholder="Tu nombre completo"
                      />
                    ) : (
                      <div className="form-value">{user.name}</div>
                    )}
                  </div>

                  <div className="form-group">
                    <label htmlFor="email" className="form-label">
                      <Mail size={16} />
                      Correo electrónico
                    </label>
                    {isEditing ? (
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="form-input"
                        placeholder="tu@empresa.com"
                      />
                    ) : (
                      <div className="form-value">{user.email}</div>
                    )}
                  </div>

                  <div className="form-group profile-form-grid-full">
                    <label className="form-label">
                      <Calendar size={16} />
                      Fecha de registro
                    </label>
                    <div className="form-value">
                      {new Date(user.created_at).toLocaleDateString("es-ES", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                  </div>
                </div>
              </div>
              {isEditing && (
                <div className="profile-actions">
                  <button
                    onClick={handleCancel}
                    disabled={saving}
                    className="btn btn-secondary"
                  >
                    <X size={16} />
                    Cancelar
                  </button>
                  <button
                    onClick={handleSave}
                    disabled={saving}
                    className={`btn btn-primary ${saving ? "btn-loading" : ""}`}
                  >
                    <Save size={16} />
                    {saving ? "Guardando..." : "Guardar Cambios"}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
