import { useState } from "react";
import styles from "./Settings.module.css"; // Importar el módulo CSS

function Settings() {
  const [settings, setSettings] = useState({
    businessName: "Agenda Pro",
    businessEmail: "contacto@agendapro.com",
    notificationsEnabled: true,
    reminderTime: 24,
    theme: "light",
    language: "es",
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings({
      ...settings,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí iría la lógica para guardar la configuración
    alert("Configuración guardada correctamente");
  };

  return (
    <div className={styles.settingsContainer}>
      <h2>Configuración</h2>

      <form onSubmit={handleSubmit}>
        <div className={styles.settingsSection}>
          <h3>Información del Negocio</h3>

          <div className={styles.formGroup}>
            <label htmlFor="businessName">Nombre del Negocio</label>
            <input
              type="text"
              id="businessName"
              name="businessName"
              value={settings.businessName}
              onChange={handleInputChange}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="businessEmail">Correo Electrónico</label>
            <input
              type="email"
              id="businessEmail"
              name="businessEmail"
              value={settings.businessEmail}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className={styles.settingsSection}>
          <h3>Notificaciones</h3>

          <div className={`${styles.formGroup} ${styles.checkbox}`}>
            <input
              type="checkbox"
              id="notificationsEnabled"
              name="notificationsEnabled"
              checked={settings.notificationsEnabled}
              onChange={handleInputChange}
            />
            <label htmlFor="notificationsEnabled">
              Habilitar Notificaciones
            </label>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="reminderTime">Tiempo de Recordatorio (horas)</label>
            <select
              id="reminderTime"
              name="reminderTime"
              value={settings.reminderTime}
              onChange={handleInputChange}
            >
              <option value="1">1 hora</option>
              <option value="2">2 horas</option>
              <option value="12">12 horas</option>
              <option value="24">24 horas</option>
              <option value="48">48 horas</option>
            </select>
          </div>
        </div>

        <div className={styles.settingsSection}>
          <h3>Apariencia</h3>

          <div className={styles.formGroup}>
            <label htmlFor="theme">Tema</label>
            <select
              id="theme"
              name="theme"
              value={settings.theme}
              onChange={handleInputChange}
            >
              <option value="light">Claro</option>
              <option value="dark">Oscuro</option>
              <option value="system">Sistema</option>
            </select>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="language">Idioma</label>
            <select
              id="language"
              name="language"
              value={settings.language}
              onChange={handleInputChange}
            >
              <option value="es">Español</option>
              <option value="en">Inglés</option>
              <option value="pt">Portugués</option>
            </select>
          </div>
        </div>

        <div className={styles.formActions}>
          <button type="submit" className={styles.saveButton}>
            Guardar Cambios
          </button>
          <button type="button" className={styles.cancelButton}>
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}

export default Settings;
