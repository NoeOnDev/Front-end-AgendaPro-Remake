import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

function Dashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    if (!token || !userData) {
      navigate("/login");
      return;
    }

    navigate("/projects");
  }, [navigate]);

  return (
    <div className="auth-container">
      <div className="verification-card">
        <div className="verification-icon pulse">
          <Loader2 size={64} />
        </div>
        <h2 className="verification-title">Redirigiendo...</h2>
      </div>
    </div>
  );
}

export default Dashboard;
