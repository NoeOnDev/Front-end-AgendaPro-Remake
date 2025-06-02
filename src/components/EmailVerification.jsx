import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";
import { authService } from "../services/authService";

function EmailVerification() {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState("verifying");
  const [message, setMessage] = useState("Verificando tu email...");

  useEffect(() => {
    const verifyEmail = async () => {
      const id = searchParams.get("id");
      const hash = searchParams.get("hash");
      const signature = searchParams.get("signature");
      const expires = searchParams.get("expires");

      if (!id || !hash || !signature || !expires) {
        setStatus("error");
        setMessage("Link de verificación inválido");
        return;
      }

      try {
        const result = await authService.verifyEmail(
          id,
          hash,
          signature,
          expires
        );

        if (result.success) {
          setStatus("success");
          setMessage(
            "¡Email verificado exitosamente! Ya puedes acceder a tu cuenta."
          );
        } else {
          setStatus("error");
          setMessage(result.message);
        }
      } catch (err) {
        setStatus("error");
        setMessage("Error de conexión");
      }
    };

    verifyEmail();
  }, [searchParams]);

  const getStatusIcon = () => {
    switch (status) {
      case "verifying":
        return (
          <div className="verification-icon pulse">
            <Loader2 size={64} />
          </div>
        );
      case "success":
        return (
          <div className="verification-icon">
            <CheckCircle size={64} color="var(--success-600)" />
          </div>
        );
      case "error":
        return (
          <div className="verification-icon">
            <XCircle size={64} color="var(--error-600)" />
          </div>
        );
      default:
        return null;
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case "success":
        return "alert-success";
      case "error":
        return "alert-error";
      default:
        return "alert-warning";
    }
  };

  return (
    <div className="verification-container">
      <div className="verification-card fade-in">
        <h2 className="verification-title">Verificación de Email</h2>

        {getStatusIcon()}

        <div className={`alert ${getStatusColor()}`}>
          <p className="verification-message">{message}</p>
        </div>

        <div
          style={{
            display: "flex",
            gap: "var(--space-md)",
            justifyContent: "center",
          }}
        >
          {status === "success" && (
            <button
              onClick={() => (window.location.href = "/dashboard")}
              className="btn btn-primary"
            >
              Ir al Dashboard
            </button>
          )}

          {status === "error" && (
            <button
              onClick={() => (window.location.href = "/register")}
              className="btn btn-secondary"
            >
              Volver al Registro
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default EmailVerification;
