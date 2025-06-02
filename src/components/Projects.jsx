import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Briefcase,
  Plus,
  Settings,
  Users,
  Calendar,
  Activity,
  Loader2,
  XCircle,
  ChevronRight,
  CheckCircle,
  AlertTriangle,
  X,
  Search,
} from "lucide-react";
import Header from "./Header";
import { projectService } from "../services";
import "../styles/projects/common.css";
import "../styles/projects/Projects.css";
import "../styles/projects/ProjectModal.css";

function Projects() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [meta, setMeta] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [businessTypes, setBusinessTypes] = useState([]);
  const [loadingBusinessTypes, setLoadingBusinessTypes] = useState(false);
  const [businessTypesError, setBusinessTypesError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredBusinessTypes, setFilteredBusinessTypes] = useState([]);
  const [creatingProject, setCreatingProject] = useState(false);
  const [projectFormData, setProjectFormData] = useState({
    name: "",
    description: "",
    business_type_id: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    fetchProjects();
  }, []);

  useEffect(() => {
    if (showCreateModal && businessTypes.length === 0) {
      fetchBusinessTypes();
    }
  }, [showCreateModal]);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredBusinessTypes(businessTypes);
    } else {
      const filtered = businessTypes.filter(
        (type) =>
          type.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          type.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredBusinessTypes(filtered);
    }
  }, [searchTerm, businessTypes]);

  const fetchProjects = async () => {
    setLoading(true);
    setError("");

    const result = await projectService.getProjects();

    if (result.success) {
      setProjects(result.projects);
      setMeta(result.meta);
    } else {
      setError(result.message);
    }

    setLoading(false);
  };

  const fetchBusinessTypes = async () => {
    setLoadingBusinessTypes(true);
    setBusinessTypesError("");

    const result = await projectService.getBusinessTypes();

    if (result.success) {
      setBusinessTypes(result.businessTypes);
      setFilteredBusinessTypes(result.businessTypes);
    } else {
      setBusinessTypesError(result.message);
    }

    setLoadingBusinessTypes(false);
  };

  const handleCreateProject = async (e) => {
    e.preventDefault();
    setFormErrors({});
    setCreatingProject(true);

    const errors = {};
    if (!projectFormData.name.trim()) {
      errors.name = "El nombre del proyecto es obligatorio";
    }
    if (!projectFormData.business_type_id) {
      errors.business_type_id = "Debes seleccionar un tipo de negocio";
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      setCreatingProject(false);
      return;
    }

    const result = await projectService.createProject(projectFormData);

    if (result.success) {
      setSuccessMessage(result.message);
      setProjectFormData({
        name: "",
        description: "",
        business_type_id: "",
      });
      setTimeout(() => {
        setShowCreateModal(false);
        setSuccessMessage("");
        fetchProjects();
      }, 2000);
    } else {
      if (result.errors) {
        setFormErrors(result.errors);
      } else {
        setFormErrors({ general: result.message });
      }
    }

    setCreatingProject(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProjectFormData({
      ...projectFormData,
      [name]: value,
    });
  };

  const selectBusinessType = (typeId) => {
    setProjectFormData({
      ...projectFormData,
      business_type_id: typeId,
    });
  };

  const getStatusBadge = (project) => {
    const isComplete = project.meta?.is_setup_complete;

    if (isComplete) {
      return (
        <span className="project-status completed">
          <CheckCircle size={14} />
          Configurado
        </span>
      );
    } else {
      return (
        <span className="project-status pending">
          <AlertTriangle size={14} />
          Configuración pendiente
        </span>
      );
    }
  };

  const getHealthScore = (score) => {
    if (score >= 80) return { label: "Excelente", color: "success" };
    if (score >= 60) return { label: "Bueno", color: "warning" };
    if (score >= 40) return { label: "Regular", color: "warning" };
    return { label: "Necesita atención", color: "error" };
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
            <h2 className="verification-title">Cargando proyectos...</h2>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <Header user={JSON.parse(localStorage.getItem("user") || "{}")} />

      <div className="dashboard-content fade-in">
        <div className="projects-container">
          <div className="projects-header">
            <div className="projects-header-content">
              <h1 className="projects-title">
                <Briefcase size={28} />
                Mis Proyectos
              </h1>
              <p className="projects-subtitle">
                Gestiona todos tus negocios desde un solo lugar
              </p>
            </div>
            <button
              className="btn btn-primary"
              onClick={() => setShowCreateModal(true)}
            >
              <Plus size={16} />
              Nuevo Proyecto
            </button>
          </div>

          {error && (
            <div className="alert alert-error">
              <XCircle size={18} className="alert-icon" />
              <span>{error}</span>
            </div>
          )}

          {meta && (
            <div className="projects-stats">
              <div className="stat-card">
                <div className="stat-icon">
                  <Briefcase size={20} />
                </div>
                <div className="stat-content">
                  <span className="stat-value">{meta.total_projects}</span>
                  <span className="stat-label">Total Proyectos</span>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon">
                  <Users size={20} />
                </div>
                <div className="stat-content">
                  <span className="stat-value">{meta.owned_projects}</span>
                  <span className="stat-label">Propios</span>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon">
                  <Activity size={20} />
                </div>
                <div className="stat-content">
                  <span className="stat-value">{meta.member_projects}</span>
                  <span className="stat-label">Como Miembro</span>
                </div>
              </div>
            </div>
          )}

          {projects.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-icon">
                <Briefcase size={64} />
              </div>
              <h3 className="empty-state-title">No tienes proyectos aún</h3>
              <p className="empty-state-description">
                Crea tu primer proyecto para comenzar a gestionar tu negocio
              </p>
              <button
                className="btn btn-primary"
                onClick={() => setShowCreateModal(true)}
              >
                <Plus size={16} />
                Crear Primer Proyecto
              </button>
            </div>
          ) : (
            <div className="projects-grid">
              {projects.map((project) => (
                <div key={project.id} className="project-card">
                  <div className="project-card-header">
                    <div className="project-info">
                      <div className="project-icon">
                        {typeof project.business_type.icon === "string" ? (
                          getBusinessTypeIcon(project.business_type.icon)
                        ) : (
                          <Briefcase size={20} />
                        )}
                      </div>
                      <div className="project-details">
                        <h3 className="project-name">{project.name}</h3>
                        <span className="project-type">
                          {project.business_type.name}
                        </span>
                      </div>
                    </div>
                    {getStatusBadge(project)}
                  </div>

                  <div className="project-card-body">
                    <p className="project-description">
                      {project.description || "Sin descripción"}
                    </p>

                    <div className="project-metrics">
                      <div className="metric">
                        <span className="metric-label">
                          Estado de configuración
                        </span>
                        <div className="health-score">
                          <div className="health-bar">
                            <div
                              className={`health-fill ${
                                getHealthScore(project.meta?.health_score || 0)
                                  .color
                              }`}
                              style={{
                                width: `${project.meta?.health_score || 0}%`,
                              }}
                            ></div>
                          </div>
                          <span className="health-text">
                            {project.meta?.health_score || 0}% -{" "}
                            {
                              getHealthScore(project.meta?.health_score || 0)
                                .label
                            }
                          </span>
                        </div>
                      </div>

                      {project.meta?.next_steps &&
                        project.meta.next_steps.length > 0 && (
                          <div className="metric">
                            <span className="metric-label">Próximos pasos</span>
                            <span className="metric-value">
                              {project.meta.next_steps.length} pendientes
                            </span>
                          </div>
                        )}
                    </div>
                  </div>

                  <div className="project-card-footer">
                    <div className="project-actions">
                      <button
                        className="btn btn-secondary"
                        onClick={() =>
                          navigate(`/projects/${project.id}/settings`)
                        }
                      >
                        <Settings size={14} />
                        Configurar
                      </button>
                      <button
                        className="btn btn-primary"
                        onClick={() => navigate(`/projects/${project.id}`)}
                      >
                        <Calendar size={14} />
                        Abrir
                        <ChevronRight size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {showCreateModal && (
        <div className="modal-overlay">
          <div className="modal-container">
            <div className="modal-header">
              <h2 className="modal-title">
                <Plus size={20} />
                Crear Nuevo Proyecto
              </h2>
              <button
                className="modal-close"
                onClick={() => {
                  setShowCreateModal(false);
                  setProjectFormData({
                    name: "",
                    description: "",
                    business_type_id: "",
                  });
                  setFormErrors({});
                  setSuccessMessage("");
                }}
              >
                <X size={24} />
              </button>
            </div>

            {successMessage && (
              <div className="alert alert-success">
                <CheckCircle size={18} className="alert-icon" />
                <span>{successMessage}</span>
              </div>
            )}

            {formErrors.general && (
              <div className="alert alert-error">
                <XCircle size={18} className="alert-icon" />
                <span>{formErrors.general}</span>
              </div>
            )}

            <form onSubmit={handleCreateProject} className="modal-form">
              <div className="form-group">
                <label htmlFor="name" className="form-label">
                  Nombre del proyecto *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={projectFormData.name}
                  onChange={handleInputChange}
                  className={`form-input ${formErrors.name ? "error" : ""}`}
                  placeholder="Ej: Mi Barbería"
                  disabled={creatingProject}
                />
                {formErrors.name && (
                  <p className="form-error">{formErrors.name}</p>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="description" className="form-label">
                  Descripción (opcional)
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={projectFormData.description}
                  onChange={handleInputChange}
                  className="form-input form-textarea"
                  placeholder="Describe tu proyecto brevemente..."
                  rows="3"
                  disabled={creatingProject}
                ></textarea>
              </div>

              <div className="form-group business-type-group">
                <label className="form-label">Tipo de negocio *</label>

                {formErrors.business_type_id && (
                  <p className="form-error">{formErrors.business_type_id}</p>
                )}

                <div className="business-type-search">
                  <div className="search-input-container">
                    <Search size={18} className="search-icon" />
                    <input
                      type="text"
                      placeholder="Buscar tipo de negocio..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="search-input"
                      disabled={loadingBusinessTypes || creatingProject}
                    />
                  </div>
                </div>

                {loadingBusinessTypes ? (
                  <div className="business-types-loading">
                    <Loader2 size={24} className="spin" />
                    <span>Cargando tipos de negocio...</span>
                  </div>
                ) : businessTypesError ? (
                  <div className="alert alert-error">
                    <XCircle size={18} className="alert-icon" />
                    <span>{businessTypesError}</span>
                  </div>
                ) : (
                  <div className="business-types-grid">
                    {filteredBusinessTypes.map((type) => (
                      <div
                        key={type.id}
                        className={`business-type-card ${
                          projectFormData.business_type_id === type.id
                            ? "selected"
                            : ""
                        }`}
                        onClick={() =>
                          !creatingProject && selectBusinessType(type.id)
                        }
                      >
                        <div className="business-type-icon">
                          {getBusinessTypeIcon(type.icon)}
                        </div>
                        <div className="business-type-info">
                          <h4 className="business-type-name">{type.name}</h4>
                          <p className="business-type-description">
                            {type.description}
                          </p>
                        </div>
                        {projectFormData.business_type_id === type.id && (
                          <div className="business-type-selected">
                            <CheckCircle size={18} />
                          </div>
                        )}
                      </div>
                    ))}

                    {filteredBusinessTypes.length === 0 && (
                      <div className="business-types-empty">
                        <p>
                          No se encontraron tipos de negocio con "{searchTerm}"
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className="modal-actions">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowCreateModal(false)}
                  disabled={creatingProject}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className={`btn btn-primary ${
                    creatingProject ? "btn-loading" : ""
                  }`}
                  disabled={creatingProject}
                >
                  {creatingProject ? "Creando..." : "Crear Proyecto"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Projects;
