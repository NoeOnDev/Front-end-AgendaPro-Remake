import { useNavigate, useLocation } from "react-router-dom";

export function useAppNavigation() {
  const navigate = useNavigate();
  const location = useLocation();

  const goTo = (path) => {
    navigate(path);
  };

  const goBack = () => {
    navigate(-1);
  };

  const goHome = () => {
    navigate("/");
  };

  return {
    goTo,
    goBack,
    goHome,
    currentPath: location.pathname,
  };
}
