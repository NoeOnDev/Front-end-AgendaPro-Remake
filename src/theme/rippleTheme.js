export const getRippleColor = (variant) => {
  switch (variant) {
    case "primary":
      return "var(--ripple-primary)";
    case "secondary":
      return "var(--ripple-secondary)";
    case "light":
      return "var(--ripple-light)";
    case "dark":
      return "var(--ripple-dark)";
    case "success":
      return "var(--ripple-success)";
    case "error":
      return "var(--ripple-error)";
    case "warning":
      return "var(--ripple-warning)";
    case "info":
      return "var(--ripple-info)";
    default:
      return "var(--ripple-primary)";
  }
};
