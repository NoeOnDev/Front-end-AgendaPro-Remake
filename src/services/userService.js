import { api } from "./api.js";

export const userService = {
  getProfile: async () => {
    try {
      const response = await api.get("/me");

      if (response.ok && response.data.success) {
        localStorage.setItem("user", JSON.stringify(response.data.data));

        return {
          success: true,
          user: response.data.data,
        };
      } else {
        return {
          success: false,
          message: response.data.message || "Error al cargar el perfil",
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

  updateProfile: async (profileData, hasFiles = false) => {
    try {
      let response;

      if (hasFiles) {
        const formData = new FormData();
        formData.append("_method", "PUT");

        Object.keys(profileData).forEach((key) => {
          if (profileData[key] !== null && profileData[key] !== undefined) {
            if (key === "remove_avatar" && profileData[key]) {
              formData.append(key, "true");
            } else {
              formData.append(key, profileData[key]);
            }
          }
        });

        response = await api.postFormData("/profile", formData);
      } else {
        response = await api.put("/profile", profileData);
      }

      if (response.ok && response.data.success) {
        localStorage.setItem("user", JSON.stringify(response.data.data));

        return {
          success: true,
          message: response.data.message || "Perfil actualizado exitosamente",
          user: response.data.data,
        };
      } else {
        return {
          success: false,
          message: response.data.message || "Error al actualizar el perfil",
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

  changePassword: async (passwordData) => {
    try {
      const response = await api.put("/profile/password", passwordData);

      if (response.ok && response.data.success) {
        return {
          success: true,
          message:
            response.data.message || "Contraseña actualizada exitosamente",
        };
      } else {
        return {
          success: false,
          message: response.data.message || "Error al cambiar la contraseña",
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
};
