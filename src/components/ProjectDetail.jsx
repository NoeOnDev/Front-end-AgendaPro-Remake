import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Briefcase,
  Users,
  Calendar,
  Edit3,
  Trash2,
  Save,
  X,
  ChevronLeft,
  ChevronRight,
  Loader2,
  CheckCircle,
  XCircle,
  AlertTriangle,
  BarChart2,
  Settings,
  Layout,
  Clock,
  UserPlus,
  FileText,
  MessageSquare,
  Plus,
} from "lucide-react";
import Header from "./Header";
import { projectService } from "../services";
import "../styles/projects/common.css";
import "../styles/projects/ProjectDetail.css";

function ProjectDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [userContext, setUserContext] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    status: "active",
  });

  useEffect(() => {
    fetchProject();
  }, [id]);

  useEffect(() => {
    if (project) {
      setFormData({
        name: project.name,
        description: project.description || "",
        status: project.status,
      });
    }
  }, [project]);

  const fetchProject = async () => {
    setLoading(true);
    setError("");

    const result = await projectService.getProject(id);

    if (result.success) {
      setProject(result.project);
      setUserContext(result.userContext);
    } else {
      setError(result.message);
    }

    setLoading(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSave = async () => {
    setSaving(true);
    setError("");
    setSuccessMessage("");

    const result = await projectService.updateProject(id, formData);

    if (result.success) {
      setProject(result.project);
      setSuccessMessage(result.message);
      setIsEditing(false);
    } else {
      setError(result.message);
    }

    setSaving(false);
  };

  const handleDelete = async () => {
    setDeleting(true);
    setError("");

    const result = await projectService.deleteProject(id);

    if (result.success) {
      navigate("/projects", {
        state: {
          successMessage: result.message,
        },
      });
    } else {
      setError(result.message);
      setDeleting(false);
      setShowDeleteConfirm(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    if (project) {
      setFormData({
        name: project.name,
        description: project.description || "",
        status: project.status,
      });
    }
    setError("");
    setSuccessMessage("");
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "active":
        return (
          <span className="project-status completed">
            <CheckCircle size={14} />
            Activo
          </span>
        );
      case "inactive":
        return (
          <span className="project-status pending">
            <AlertTriangle size={14} />
            Inactivo
          </span>
        );
      case "archived":
        return (
          <span
            className="project-status"
            style={{
              background: "var(--gray-100)",
              color: "var(--gray-700)",
            }}
          >
            <Layout size={14} />
            Archivado
          </span>
        );
      default:
        return null;
    }
  };

  const getBusinessTypeIcon = (icon) => {
    switch (icon) {
      case "scissors":
        return "✂️";
      case "utensils":
        return "🍽️";
      case "hammer":
        return "🔨";
      case "heart":
        return "❤️";
      case "car":
        return "🚗";
      case "store":
        return "🏪";
      case "spa":
        return "💆";
      case "gym":
        return "💪";
      case "school":
        return "🏫";
      default:
        return <Briefcase size={20} />;
    }
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
            <h2 className="verification-title">Cargando proyecto...</h2>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard">
        <Header user={JSON.parse(localStorage.getItem("user") || "{}")} />
        <div className="auth-container">
          <div className="verification-card">
            <div className="verification-icon">
              <XCircle size={64} color="var(--error-600)" />
            </div>
            <h2 className="verification-title">Error</h2>
            <p className="verification-message">{error}</p>
            <button
              onClick={() => navigate("/projects")}
              className="btn btn-primary"
            >
              <ChevronLeft size={18} />
              Volver a Proyectos
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="dashboard">
        <Header user={JSON.parse(localStorage.getItem("user") || "{}")} />
        <div className="auth-container">
          <div className="verification-card">
            <div className="verification-icon">
              <XCircle size={64} color="var(--error-600)" />
            </div>
            <h2 className="verification-title">Proyecto no encontrado</h2>
            <button
              onClick={() => navigate("/projects")}
              className="btn btn-primary"
            >
              <ChevronLeft size={18} />
              Volver a Proyectos
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <Header user={JSON.parse(localStorage.getItem("user") || "{}")} />

      <div className="dashboard-content fade-in">
        <div className="project-detail-container">
          <div className="project-detail-header">
            <div className="project-detail-breadcrumb">
              <button
                onClick={() => navigate("/projects")}
                className="btn btn-ghost"
              >
                <ChevronLeft size={16} />
                Proyectos
              </button>
            </div>

            <div className="project-detail-actions">
              {userContext?.can_edit && !isEditing && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="btn btn-secondary"
                >
                  <Edit3 size={16} />
                  Editar
                </button>
              )}

              <button
                onClick={() => navigate(`/projects/${id}/stats`)}
                className="btn btn-secondary"
              >
                <BarChart2 size={16} />
                Estadísticas
              </button>

              {userContext?.can_edit && (
                <button
                  onClick={() => navigate(`/projects/${id}/settings`)}
                  className="btn btn-secondary"
                >
                  <Settings size={16} />
                  Configuración
                </button>
              )}

              {userContext?.can_delete && !isEditing && (
                <button
                  onClick={() => setShowDeleteConfirm(true)}
                  className="btn btn-danger"
                >
                  <Trash2 size={16} />
                  Eliminar
                </button>
              )}
            </div>
          </div>

          {successMessage && (
            <div className="alert alert-success">
              <CheckCircle size={18} className="alert-icon" />
              <span>{successMessage}</span>
            </div>
          )}

          {error && (
            <div className="alert alert-error">
              <XCircle size={18} className="alert-icon" />
              <span>{error}</span>
            </div>
          )}

          <div className="project-detail-content">
            <div className="project-detail-main">
              <div className="project-detail-card">
                <div className="project-detail-card-header">
                  <div className="project-detail-info">
                    <div className="project-detail-icon">
                      {typeof project.business_type.icon === "string" ? (
                        getBusinessTypeIcon(project.business_type.icon)
                      ) : (
                        <Briefcase size={20} />
                      )}
                    </div>
                    <div className="project-detail-title-container">
                      {isEditing ? (
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className="form-input project-detail-title-input"
                          placeholder="Nombre del proyecto"
                        />
                      ) : (
                        <h1 className="project-detail-title">{project.name}</h1>
                      )}
                      <div className="project-detail-subtitle">
                        <span className="project-type">
                          {project.business_type.name}
                        </span>
                        {!isEditing && getStatusBadge(project.status)}
                      </div>
                    </div>
                  </div>

                  {isEditing && (
                    <div className="project-detail-status-selector">
                      <label className="form-label">Estado</label>
                      <select
                        name="status"
                        value={formData.status}
                        onChange={handleInputChange}
                        className="form-input"
                      >
                        <option value="active">Activo</option>
                        <option value="inactive">Inactivo</option>
                        <option value="archived">Archivado</option>
                      </select>
                    </div>
                  )}
                </div>

                <div className="project-detail-card-body">
                  <div className="project-detail-section">
                    <h3 className="project-detail-section-title">
                      Descripción
                    </h3>
                    {isEditing ? (
                      <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        className="form-input form-textarea"
                        placeholder="Describe tu proyecto brevemente..."
                        rows="4"
                      ></textarea>
                    ) : (
                      <p className="project-detail-description">
                        {project.description || "Sin descripción"}
                      </p>
                    )}
                  </div>

                  {isEditing && (
                    <div className="project-detail-actions-edit">
                      <button
                        onClick={handleCancel}
                        className="btn btn-secondary"
                        disabled={saving}
                      >
                        <X size={16} />
                        Cancelar
                      </button>
                      <button
                        onClick={handleSave}
                        className={`btn btn-primary ${
                          saving ? "btn-loading" : ""
                        }`}
                        disabled={saving}
                      >
                        <Save size={16} />
                        Guardar Cambios
                      </button>
                    </div>
                  )}

                  {!isEditing && (
                    <div className="project-detail-info-grid">
                      <div className="project-detail-info-item">
                        <div className="project-detail-info-icon">
                          <Users size={20} />
                        </div>
                        <div className="project-detail-info-content">
                          <span className="project-detail-info-label">
                            Propietario
                          </span>
                          <span className="project-detail-info-value">
                            {project.owner.name}
                          </span>
                        </div>
                      </div>

                      <div className="project-detail-info-item">
                        <div className="project-detail-info-icon">
                          <Calendar size={20} />
                        </div>
                        <div className="project-detail-info-content">
                          <span className="project-detail-info-label">
                            Citas
                          </span>
                          <span className="project-detail-info-value">
                            {project.appointments_count || 0} totales
                          </span>
                        </div>
                      </div>

                      <div className="project-detail-info-item">
                        <div className="project-detail-info-icon">
                          <MessageSquare size={20} />
                        </div>
                        <div className="project-detail-info-content">
                          <span className="project-detail-info-label">
                            Contactos
                          </span>
                          <span className="project-detail-info-value">
                            {project.contacts_count || 0} registrados
                          </span>
                        </div>
                      </div>

                      <div className="project-detail-info-item">
                        <div className="project-detail-info-icon">
                          <Clock size={20} />
                        </div>
                        <div className="project-detail-info-content">
                          <span className="project-detail-info-label">
                            Zona horaria
                          </span>
                          <span className="project-detail-info-value">
                            {project.settings?.timezone || "No configurada"}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {!isEditing && (
                <div className="project-detail-actions-container">
                  <div className="project-detail-quick-actions">
                    <button className="project-quick-action-btn">
                      <Calendar size={24} />
                      <span>Agendar Cita</span>
                    </button>

                    <button className="project-quick-action-btn">
                      <UserPlus size={24} />
                      <span>Agregar Contacto</span>
                    </button>

                    <button className="project-quick-action-btn">
                      <FileText size={24} />
                      <span>Formularios</span>
                    </button>

                    <button
                      className="project-quick-action-btn"
                      onClick={() => navigate(`/projects/${id}/stats`)}
                    >
                      <BarChart2 size={24} />
                      <span>Estadísticas</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="project-detail-sidebar">
              <div className="project-detail-card">
                <div className="project-detail-card-header">
                  <h3 className="project-detail-section-title">Equipo</h3>
                </div>
                <div className="project-detail-card-body">
                  <div className="project-team-list">
                    {project.team_members?.length > 0 ? (
                      project.team_members.map((member) => (
                        <div key={member.id} className="project-team-member">
                          <div className="project-team-member-avatar">
                            {member.avatar ? (
                              <img src={member.avatar} alt={member.name} />
                            ) : (
                              <div className="avatar-fallback">
                                {member.name.charAt(0).toUpperCase()}
                              </div>
                            )}
                          </div>
                          <div className="project-team-member-info">
                            <span className="project-team-member-name">
                              {member.name}
                            </span>
                            <span className="project-team-member-role">
                              {member.role.display_name}
                            </span>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="project-team-empty">
                        <p>No hay miembros en el equipo</p>
                        <button className="btn btn-secondary btn-sm">
                          <UserPlus size={14} />
                          Invitar Miembros
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {project.forms && (
                <div className="project-detail-card">
                  <div className="project-detail-card-header">
                    <h3 className="project-detail-section-title">
                      Formularios
                    </h3>
                  </div>
                  <div className="project-detail-card-body">
                    <div className="project-forms-list">
                      {project.forms.length > 0 ? (
                        project.forms.map((form) => (
                          <div key={form.id} className="project-form-item">
                            <div className="project-form-item-icon">
                              <FileText size={18} />
                            </div>
                            <div className="project-form-item-info">
                              <span className="project-form-item-name">
                                {form.name}
                              </span>
                              <span className="project-form-item-meta">
                                {form.fields_count}{" "}
                                {form.fields_count === 1 ? "campo" : "campos"}
                              </span>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="project-forms-empty">
                          <p>No hay formularios configurados</p>
                          <button className="btn btn-secondary btn-sm">
                            <FileText size={14} />
                            Crear Formulario
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {project.services && (
                <div className="project-detail-card">
                  <div className="project-detail-card-header">
                    <h3 className="project-detail-section-title">Servicios</h3>
                  </div>
                  <div className="project-detail-card-body">
                    <div className="project-services-list">
                      {project.services.length > 0 ? (
                        project.services.map((service) => (
                          <div
                            key={service.id}
                            className="project-service-item"
                          >
                            <div className="project-service-item-info">
                              <span className="project-service-item-name">
                                {service.name}
                              </span>
                              <span className="project-service-item-duration">
                                {service.duration_minutes} min
                              </span>
                            </div>
                            <div className="project-service-item-price">
                              ${service.price}
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="project-services-empty">
                          <p>No hay servicios configurados</p>
                          <button className="btn btn-secondary btn-sm">
                            <Plus size={14} />
                            Agregar Servicio
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {showDeleteConfirm && (
        <div className="modal-overlay">
          <div className="modal-container modal-sm">
            <div className="modal-header">
              <h2 className="modal-title">
                <AlertTriangle size={20} color="var(--error-600)" />
                Confirmar eliminación
              </h2>
              <button
                className="modal-close"
                onClick={() => setShowDeleteConfirm(false)}
                disabled={deleting}
              >
                <X size={24} />
              </button>
            </div>
            <div className="modal-form">
              <p className="confirm-message">
                ¿Estás seguro de que deseas eliminar el proyecto{" "}
                <strong>{project.name}</strong>? Esta acción no se puede
                deshacer.
              </p>
              <div className="modal-actions">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowDeleteConfirm(false)}
                  disabled={deleting}
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  className={`btn btn-danger ${deleting ? "btn-loading" : ""}`}
                  onClick={handleDelete}
                  disabled={deleting}
                >
                  {deleting ? "Eliminando..." : "Eliminar Proyecto"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProjectDetail;
