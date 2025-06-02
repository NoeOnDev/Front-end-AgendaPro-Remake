import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { XCircle } from "lucide-react";
import { authService } from "../services";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

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

    const result = await authService.login(formData);

    if (result.success) {
      if (!result.user.email_verified) {
        setError("Por favor verifica tu email antes de continuar");
        setLoading(false);
        return;
      }
      navigate("/dashboard");
    } else {
      setError(result.message);
    }

    setLoading(false);
  };

  return (
    <div className="auth-container">
      <div className="auth-card fade-in">
        <div className="auth-header">
          <h1 className="auth-title">Bienvenido</h1>
          <p className="auth-subtitle">Accede a tu cuenta de Agenda Pro</p>
        </div>

        {error && (
          <div className="alert alert-error">
            <XCircle size={18} className="alert-icon" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="form">
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
              placeholder="Tu contraseña"
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
            {loading ? "Iniciando sesión..." : "Iniciar sesión"}
          </button>
        </form>

        <div className="auth-links">
          <p>
            ¿No tienes cuenta?{" "}
            <Link to="/register" className="link">
              Regístrate aquí
            </Link>
          </p>
          <p>
            <Link to="/forgot-password" className="link">
              ¿Olvidaste tu contraseña?
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
