import { api } from "./api.js";

export const authService = {
  register: async (userData) => {
    try {
      const response = await api.post("/register", userData);

      if (response.ok && response.data.success) {
        localStorage.setItem("token", response.data.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.data.user));

        return {
          success: true,
          message: response.data.message || "Usuario registrado exitosamente",
          user: response.data.data.user,
          token: response.data.data.token,
        };
      } else {
        return {
          success: false,
          message: response.data.message || "Error al registrar usuario",
          errors: response.data.errors,
        };
      }
    } catch (error) {
      return {
        success: false,
        message: "Error de conexión",
        error: error.message,
      };
    }
  },

  login: async (credentials) => {
    try {
      const response = await api.post("/login", credentials);

      if (response.ok && response.data.success) {
        localStorage.setItem("token", response.data.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.data.user));

        return {
          success: true,
          message: response.data.message || "Inicio de sesión exitoso",
          user: response.data.data.user,
          token: response.data.data.token,
        };
      } else {
        return {
          success: false,
          message: response.data.message || "Credenciales incorrectas",
          errors: response.data.errors,
        };
      }
    } catch (error) {
      return {
        success: false,
        message: "Error de conexión",
        error: error.message,
      };
    }
  },

  logout: async () => {
    try {
      const response = await api.post("/logout");

      localStorage.removeItem("token");
      localStorage.removeItem("user");

      return {
        success: true,
        message: response.data?.message || "Sesión cerrada exitosamente",
      };
    } catch (error) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      return {
        success: true,
        message: "Sesión cerrada",
      };
    }
  },

  verifyEmail: async (id, hash, signature, expires) => {
    try {
      const response = await api.get(
        `/email/verify/${id}/${hash}?signature=${signature}&expires=${expires}`
      );

      if (response.ok && response.data.success) {
        const user = JSON.parse(localStorage.getItem("user") || "{}");
        if (user) {
          user.email_verified = true;
          user.email_verified_at = new Date().toISOString();
          localStorage.setItem("user", JSON.stringify(user));
        }

        return {
          success: true,
          message: response.data.message || "Email verificado exitosamente",
        };
      } else {
        return {
          success: false,
          message: response.data.message || "Error al verificar el email",
        };
      }
    } catch (error) {
      return {
        success: false,
        message: "Error de conexión",
        error: error.message,
      };
    }
  },

  isAuthenticated: () => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    return !!(token && user);
  },

  getCurrentUser: () => {
    const userStr = localStorage.getItem("user");
    return userStr ? JSON.parse(userStr) : null;
  },

  getToken: () => {
    return localStorage.getItem("token");
  },
};
