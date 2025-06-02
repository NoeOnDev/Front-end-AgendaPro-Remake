import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  BarChart2,
  ChevronLeft,
  Loader2,
  XCircle,
  Users,
  Calendar,
  MessageSquare,
  Clock,
  Award,
  TrendingUp,
  User,
  FileText,
  Briefcase,
} from "lucide-react";
import Header from "./Header";
import { projectService } from "../services";
import "../styles/projects/common.css";
import "../styles/projects/ProjectStats.css";

function ProjectStats() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [stats, setStats] = useState(null);
  const [period, setPeriod] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchProjectAndStats();
  }, [id]);

  const fetchProjectAndStats = async () => {
    setLoading(true);
    setError("");

    const projectResult = await projectService.getProject(id);

    if (projectResult.success) {
      setProject(projectResult.project);

      const statsResult = await projectService.getProjectStats(id);

      if (statsResult.success) {
        setStats(statsResult.stats);
        setPeriod(statsResult.period);
      } else {
        setError(statsResult.message);
      }
    } else {
      setError(projectResult.message);
    }

    setLoading(false);
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
            <h2 className="verification-title">Cargando estadísticas...</h2>
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
              onClick={() => navigate(`/projects/${id}`)}
              className="btn btn-primary"
            >
              <ChevronLeft size={18} />
              Volver al Proyecto
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!project || !stats) {
    return (
      <div className="dashboard">
        <Header user={JSON.parse(localStorage.getItem("user") || "{}")} />
        <div className="auth-container">
          <div className="verification-card">
            <div className="verification-icon">
              <XCircle size={64} color="var(--error-600)" />
            </div>
            <h2 className="verification-title">Información no disponible</h2>
            <button
              onClick={() => navigate(`/projects/${id}`)}
              className="btn btn-primary"
            >
              <ChevronLeft size={18} />
              Volver al Proyecto
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
                onClick={() => navigate(`/projects/${id}`)}
                className="btn btn-ghost"
              >
                <ChevronLeft size={16} />
                {project.name}
              </button>
              <span className="breadcrumb-separator">/</span>
              <span className="breadcrumb-current">Estadísticas</span>
            </div>
          </div>

          <div className="stats-header">
            <div className="stats-header-icon">
              <BarChart2 size={24} />
            </div>
            <div className="stats-header-title-container">
              <h1 className="stats-header-title">Estadísticas del Proyecto</h1>
              <div className="stats-header-subtitle">
                Periodo: {period?.current_month || "Mes actual"}
              </div>
            </div>
          </div>

          <div className="stats-summary">
            <div className="stats-card">
              <div className="stats-card-icon">
                <MessageSquare size={20} />
              </div>
              <div className="stats-card-content">
                <div className="stats-card-value">
                  {stats.contacts?.total || 0}
                </div>
                <div className="stats-card-label">Contactos totales</div>
              </div>
              <div className="stats-card-secondary">
                <span className="stats-card-secondary-value">
                  +{stats.contacts?.this_month || 0}
                </span>
                <span className="stats-card-secondary-label">este mes</span>
              </div>
            </div>

            <div className="stats-card">
              <div className="stats-card-icon">
                <Calendar size={20} />
              </div>
              <div className="stats-card-content">
                <div className="stats-card-value">
                  {stats.appointments?.total || 0}
                </div>
                <div className="stats-card-label">Citas totales</div>
              </div>
              <div className="stats-card-secondary">
                <span className="stats-card-secondary-value">
                  {stats.appointments?.upcoming || 0}
                </span>
                <span className="stats-card-secondary-label">próximas</span>
              </div>
            </div>

            <div className="stats-card">
              <div className="stats-card-icon">
                <Clock size={20} />
              </div>
              <div className="stats-card-content">
                <div className="stats-card-value">
                  {stats.appointments?.today || 0}
                </div>
                <div className="stats-card-label">Citas hoy</div>
              </div>
              <div className="stats-card-secondary">
                <span className="stats-card-secondary-value">
                  {stats.appointments?.this_week || 0}
                </span>
                <span className="stats-card-secondary-label">esta semana</span>
              </div>
            </div>

            <div className="stats-card">
              <div className="stats-card-icon">
                <Users size={20} />
              </div>
              <div className="stats-card-content">
                <div className="stats-card-value">
                  {stats.team?.total_members || 0}
                </div>
                <div className="stats-card-label">Miembros</div>
              </div>
              <div className="stats-card-secondary">
                <span className="stats-card-secondary-value">
                  {stats.team?.pending_invitations || 0}
                </span>
                <span className="stats-card-secondary-label">invitaciones</span>
              </div>
            </div>
          </div>

          <div className="stats-detailed-sections">
            <div className="stats-section">
              <div className="stats-section-header">
                <h3 className="stats-section-title">
                  <Award size={20} />
                  Servicio más popular
                </h3>
              </div>
              <div className="stats-section-content">
                {stats.services?.most_popular ? (
                  <div className="popular-service">
                    <div className="popular-service-name">
                      {stats.services.most_popular.name}
                    </div>
                    <div className="popular-service-meta">
                      <span className="popular-service-price">
                        ${stats.services.most_popular.price}
                      </span>
                      <span className="popular-service-count">
                        {stats.services.most_popular.appointments_count} citas
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="stats-empty">
                    <p>No hay servicios registrados</p>
                  </div>
                )}
              </div>
            </div>

            <div className="stats-section">
              <div className="stats-section-header">
                <h3 className="stats-section-title">
                  <TrendingUp size={20} />
                  Resumen de actividad
                </h3>
              </div>
              <div className="stats-section-content">
                <div className="stats-activity-list">
                  <div className="stats-activity-item">
                    <div className="stats-activity-icon">
                      <Calendar size={16} />
                    </div>
                    <div className="stats-activity-content">
                      <span className="stats-activity-label">
                        Citas completadas
                      </span>
                      <span className="stats-activity-value">
                        {stats.appointments?.completed || 0}
                      </span>
                    </div>
                  </div>
                  <div className="stats-activity-item">
                    <div className="stats-activity-icon">
                      <FileText size={16} />
                    </div>
                    <div className="stats-activity-content">
                      <span className="stats-activity-label">Formularios</span>
                      <span className="stats-activity-value">
                        {stats.forms?.total || 0}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="stats-section">
              <div className="stats-section-header">
                <h3 className="stats-section-title">
                  <Briefcase size={20} />
                  Información del proyecto
                </h3>
              </div>
              <div className="stats-section-content">
                <div className="stats-project-info">
                  <div className="stats-project-icon">
                    {typeof project.business_type.icon === "string" ? (
                      getBusinessTypeIcon(project.business_type.icon)
                    ) : (
                      <Briefcase size={24} />
                    )}
                  </div>
                  <div className="stats-project-details">
                    <h4 className="stats-project-name">{project.name}</h4>
                    <div className="stats-project-type">
                      {project.business_type.name}
                    </div>
                    <div className="stats-project-owner">
                      <User size={14} />
                      <span>{project.owner.name}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectStats;
