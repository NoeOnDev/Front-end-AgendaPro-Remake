import { useState } from "react";
import { Link } from "react-router-dom";
import { CheckCircle, XCircle } from "lucide-react";
import { authService } from "../services";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    const result = await authService.register(formData);

    if (result.success) {
      setMessage("Revisa tu email para verificar tu cuenta");
    } else {
      setError(result.message);
    }

    setLoading(false);
  };

  return (
    <div className="auth-container">
      <div className="auth-card fade-in">
        <div className="auth-header">
          <h1 className="auth-title">Crear Cuenta</h1>
          <p className="auth-subtitle">
            Únete a Agenda Pro y gestiona tu negocio de manera profesional
          </p>
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

        <form onSubmit={handleSubmit} className="form">
          <div className="form-group">
            <label htmlFor="name" className="form-label">
              Nombre completo
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="form-input"
              placeholder="Ingresa tu nombre completo"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Correo electrónico
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="form-input"
              placeholder="tu@empresa.com"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="form-input"
              placeholder="Mínimo 8 caracteres"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password_confirmation" className="form-label">
              Confirmar contraseña
            </label>
            <input
              type="password"
              id="password_confirmation"
              name="password_confirmation"
              value={formData.password_confirmation}
              onChange={handleChange}
              className="form-input"
              placeholder="Confirma tu contraseña"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`btn btn-primary btn-full ${
              loading ? "btn-loading" : ""
            }`}
          >
            {loading ? "Creando cuenta..." : "Crear cuenta"}
          </button>
        </form>

        <div className="auth-links">
          <p>
            ¿Ya tienes cuenta?{" "}
            <Link to="/login" className="link">
              Inicia sesión aquí
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
