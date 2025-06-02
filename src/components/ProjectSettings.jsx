import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Settings,
  ChevronLeft,
  Loader2,
  XCircle,
  CheckCircle,
  Clock,
  Bell,
  Globe,
  Save,
  Mail,
  Calendar,
  MessageSquare,
} from "lucide-react";
import Header from "./Header";
import { projectService } from "../services";
import "../styles/projects/common.css";
import "../styles/projects/ProjectSettings.css";

function ProjectSettings() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [formData, setFormData] = useState({
    timezone: "",
    default_appointment_duration: 30,
    allow_online_booking: true,
    require_appointment_confirmation: false,
    send_reminders: true,
    reminder_hours_before: 24,
    notification_preferences: {
      email_notifications: true,
      appointment_created: true,
      appointment_cancelled: true,
      daily_summary: false,
    },
  });

  useEffect(() => {
    fetchProject();
  }, [id]);

  useEffect(() => {
    if (project && project.settings) {
      setFormData({
        timezone: project.settings.timezone || "America/Mexico_City",
        default_appointment_duration:
          project.settings.default_appointment_duration || 30,
        allow_online_booking: project.settings.allow_online_booking ?? true,
        require_appointment_confirmation:
          project.settings.require_appointment_confirmation ?? false,
        send_reminders: project.settings.send_reminders ?? true,
        reminder_hours_before: project.settings.reminder_hours_before || 24,
        notification_preferences: {
          email_notifications:
            project.settings.notification_preferences?.email_notifications ??
            true,
          appointment_created:
            project.settings.notification_preferences?.appointment_created ??
            true,
          appointment_cancelled:
            project.settings.notification_preferences?.appointment_cancelled ??
            true,
          daily_summary:
            project.settings.notification_preferences?.daily_summary ?? false,
        },
      });
    }
  }, [project]);

  const fetchProject = async () => {
    setLoading(true);
    setError("");

    const result = await projectService.getProject(id);

    if (result.success) {
      setProject(result.project);
    } else {
      setError(result.message);
    }

    setLoading(false);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setFormData({
        ...formData,
        [name]: checked,
      });
    } else {
      setFormData({
        ...formData,
        [name]: type === "number" ? parseInt(value, 10) : value,
      });
    }
  };

  const handleNotificationChange = (e) => {
    const { name, checked } = e.target;

    setFormData({
      ...formData,
      notification_preferences: {
        ...formData.notification_preferences,
        [name]: checked,
      },
    });
  };

  const handleSubmit = async (e) => {
    console.log("handleSubmit ejecutado");
    e.preventDefault();
    setSaving(true);
    setError("");
    setSuccessMessage("");

    console.log("Datos a enviar:", formData);

    if (formData.default_appointment_duration < 15 || formData.default_appointment_duration > 480) {
      setError("La duración de cita debe estar entre 15 y 480 minutos");
      setSaving(false);
      return;
    }

    if (formData.send_reminders && (formData.reminder_hours_before < 1 || formData.reminder_hours_before > 168)) {
      setError("El tiempo de recordatorio debe estar entre 1 y 168 horas");
      setSaving(false);
      return;
    }

    console.log("Llamando a updateProjectSettings...");
    const result = await projectService.updateProjectSettings(id, formData);
    console.log("Resultado:", result);

    if (result.success) {
      setSuccessMessage(result.message);

      const updatedProject = { ...project };
      updatedProject.settings = { ...result.settings };
      setProject(updatedProject);

      setTimeout(() => {
        setSuccessMessage("");
      }, 5000);
    } else {
      setError(result.message || "Error al actualizar la configuración");

      if (result.errors) {
        console.error("Errores de validación:", result.errors);
      }
    }

    setSaving(false);
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
            <h2 className="verification-title">Cargando configuración...</h2>
          </div>
        </div>
      </div>
    );
  }

  if (error && !project) {
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
                onClick={() => navigate(`/projects/${id}`)}
                className="btn btn-ghost"
              >
                <ChevronLeft size={16} />
                {project.name}
              </button>
              <span className="breadcrumb-separator">/</span>
              <span className="breadcrumb-current">Configuración</span>
            </div>
          </div>

          <div className="settings-header">
            <div className="settings-header-icon">
              <Settings size={24} />
            </div>
            <div className="settings-header-title-container">
              <h1 className="settings-header-title">
                Configuración del Proyecto
              </h1>
              <div className="settings-header-subtitle">
                Personaliza las opciones de tu proyecto
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="settings-form">
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

            <div className="settings-grid">
              <div className="settings-section">
                <div className="settings-section-header">
                  <h3 className="settings-section-title">
                    <Globe size={20} />
                    Configuración General
                  </h3>
                </div>
                <div className="settings-section-content">
                  <div className="form-group">
                    <label htmlFor="timezone" className="form-label">
                      Zona horaria
                    </label>
                    <select
                      id="timezone"
                      name="timezone"
                      value={formData.timezone}
                      onChange={handleInputChange}
                      className="form-input"
                    >
                      <option value="America/Mexico_City">
                        Ciudad de México (GMT-6)
                      </option>
                      <option value="America/Bogota">Bogotá (GMT-5)</option>
                      <option value="America/Lima">Lima (GMT-5)</option>
                      <option value="America/Santiago">Santiago (GMT-4)</option>
                      <option value="America/Argentina/Buenos_Aires">
                        Buenos Aires (GMT-3)
                      </option>
                      <option value="America/Sao_Paulo">
                        São Paulo (GMT-3)
                      </option>
                      <option value="Europe/Madrid">Madrid (GMT+1)</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="settings-section">
                <div className="settings-section-header">
                  <h3 className="settings-section-title">
                    <Calendar size={20} />
                    Configuración de Citas
                  </h3>
                </div>
                <div className="settings-section-content">
                  <div className="form-group">
                    <label
                      htmlFor="default_appointment_duration"
                      className="form-label"
                    >
                      Duración predeterminada de citas (minutos)
                    </label>
                    <input
                      type="number"
                      id="default_appointment_duration"
                      name="default_appointment_duration"
                      value={formData.default_appointment_duration}
                      onChange={handleInputChange}
                      min="15"
                      max="480"
                      step="5"
                      className="form-input"
                    />
                  </div>

                  <div className="form-check">
                    <input
                      type="checkbox"
                      id="allow_online_booking"
                      name="allow_online_booking"
                      checked={formData.allow_online_booking}
                      onChange={handleInputChange}
                      className="form-check-input"
                    />
                    <label
                      htmlFor="allow_online_booking"
                      className="form-check-label"
                    >
                      Permitir reservas online
                    </label>
                  </div>

                  <div className="form-check">
                    <input
                      type="checkbox"
                      id="require_appointment_confirmation"
                      name="require_appointment_confirmation"
                      checked={formData.require_appointment_confirmation}
                      onChange={handleInputChange}
                      className="form-check-input"
                    />
                    <label
                      htmlFor="require_appointment_confirmation"
                      className="form-check-label"
                    >
                      Requerir confirmación de citas
                    </label>
                  </div>
                </div>
              </div>

              <div className="settings-section">
                <div className="settings-section-header">
                  <h3 className="settings-section-title">
                    <Bell size={20} />
                    Recordatorios
                  </h3>
                </div>
                <div className="settings-section-content">
                  <div className="form-check">
                    <input
                      type="checkbox"
                      id="send_reminders"
                      name="send_reminders"
                      checked={formData.send_reminders}
                      onChange={handleInputChange}
                      className="form-check-input"
                    />
                    <label
                      htmlFor="send_reminders"
                      className="form-check-label"
                    >
                      Enviar recordatorios automáticos
                    </label>
                  </div>

                  {formData.send_reminders && (
                    <div className="form-group">
                      <label
                        htmlFor="reminder_hours_before"
                        className="form-label"
                      >
                        Horas antes para enviar recordatorio
                      </label>
                      <select
                        id="reminder_hours_before"
                        name="reminder_hours_before"
                        value={formData.reminder_hours_before}
                        onChange={handleInputChange}
                        className="form-input"
                      >
                        <option value="1">1 hora antes</option>
                        <option value="2">2 horas antes</option>
                        <option value="4">4 horas antes</option>
                        <option value="12">12 horas antes</option>
                        <option value="24">24 horas antes (1 día)</option>
                        <option value="48">48 horas antes (2 días)</option>
                        <option value="72">72 horas antes (3 días)</option>
                        <option value="168">1 semana antes</option>
                      </select>
                    </div>
                  )}
                </div>
              </div>

              <div className="settings-section">
                <div className="settings-section-header">
                  <h3 className="settings-section-title">
                    <Mail size={20} />
                    Notificaciones
                  </h3>
                </div>
                <div className="settings-section-content">
                  <div className="form-check">
                    <input
                      type="checkbox"
                      id="email_notifications"
                      name="email_notifications"
                      checked={
                        formData.notification_preferences.email_notifications
                      }
                      onChange={handleNotificationChange}
                      className="form-check-input"
                    />
                    <label
                      htmlFor="email_notifications"
                      className="form-check-label"
                    >
                      Recibir notificaciones por correo electrónico
                    </label>
                  </div>

                  {formData.notification_preferences.email_notifications && (
                    <div className="nested-settings">
                      <div className="form-check">
                        <input
                          type="checkbox"
                          id="appointment_created"
                          name="appointment_created"
                          checked={
                            formData.notification_preferences
                              .appointment_created
                          }
                          onChange={handleNotificationChange}
                          className="form-check-input"
                        />
                        <label
                          htmlFor="appointment_created"
                          className="form-check-label"
                        >
                          Notificar cuando se crea una cita
                        </label>
                      </div>

                      <div className="form-check">
                        <input
                          type="checkbox"
                          id="appointment_cancelled"
                          name="appointment_cancelled"
                          checked={
                            formData.notification_preferences
                              .appointment_cancelled
                          }
                          onChange={handleNotificationChange}
                          className="form-check-input"
                        />
                        <label
                          htmlFor="appointment_cancelled"
                          className="form-check-label"
                        >
                          Notificar cuando se cancela una cita
                        </label>
                      </div>

                      <div className="form-check">
                        <input
                          type="checkbox"
                          id="daily_summary"
                          name="daily_summary"
                          checked={
                            formData.notification_preferences.daily_summary
                          }
                          onChange={handleNotificationChange}
                          className="form-check-input"
                        />
                        <label
                          htmlFor="daily_summary"
                          className="form-check-label"
                        >
                          Recibir resumen diario de actividad
                        </label>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="settings-actions">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => navigate(`/projects/${id}`)}
                disabled={saving}
              >
                <ChevronLeft size={16} />
                Volver
              </button>
              <button
                type="submit"
                className={`btn btn-primary ${saving ? "btn-loading" : ""}`}
                disabled={saving}
              >
                <Save size={16} />
                {saving ? "Guardando..." : "Guardar Cambios"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ProjectSettings;
