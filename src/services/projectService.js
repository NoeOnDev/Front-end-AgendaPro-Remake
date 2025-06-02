import { api } from "./api.js";

export const projectService = {
  getProjects: async () => {
    try {
      const response = await api.get("/projects");

      if (response.ok && response.data.success) {
        return {
          success: true,
          projects: response.data.data,
          meta: response.data.meta,
        };
      } else {
        return {
          success: false,
          message: response.data.message || "Error al cargar los proyectos",
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

  createProject: async (projectData) => {
    try {
      const response = await api.post("/projects", projectData);

      if (response.ok && response.data.success) {
        return {
          success: true,
          project: response.data.data,
          nextSteps: response.data.next_steps,
          message: response.data.message || "Proyecto creado exitosamente",
        };
      } else {
        return {
          success: false,
          message: response.data.message || "Error al crear el proyecto",
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

  getProject: async (projectId) => {
    try {
      const response = await api.get(`/projects/${projectId}`);

      if (response.ok && response.data.success) {
        return {
          success: true,
          project: response.data.data,
          userContext: response.data.user_context,
        };
      } else {
        return {
          success: false,
          message: response.data.message || "Error al cargar el proyecto",
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

  updateProject: async (projectId, projectData) => {
    try {
      const response = await api.put(`/projects/${projectId}`, projectData);

      if (response.ok && response.data.success) {
        return {
          success: true,
          project: response.data.data,
          message: response.data.message || "Proyecto actualizado exitosamente",
        };
      } else {
        return {
          success: false,
          message: response.data.message || "Error al actualizar el proyecto",
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

  deleteProject: async (projectId) => {
    try {
      const response = await api.delete(`/projects/${projectId}`);

      if (response.ok && response.data.success) {
        return {
          success: true,
          message: response.data.message || "Proyecto eliminado exitosamente",
        };
      } else {
        return {
          success: false,
          message: response.data.message || "Error al eliminar el proyecto",
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

  getProjectStats: async (projectId) => {
    try {
      const response = await api.get(`/projects/${projectId}/stats`);

      if (response.ok && response.data.success) {
        return {
          success: true,
          stats: response.data.data,
          period: response.data.period,
        };
      } else {
        return {
          success: false,
          message: response.data.message || "Error al cargar las estadísticas",
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

  updateProjectSettings: async (projectId, settingsData) => {
    try {
      console.log("Enviando datos:", settingsData);
      const response = await api.patch(`/projects/${projectId}/settings`, settingsData);
      
      if (response.ok && response.data.success) {
        return {
          success: true,
          settings: response.data.data.settings,
          message: response.data.message || "Configuraciones actualizadas exitosamente",
        };
      } else {
        return {
          success: false,
          message: response.data.message || "Error al actualizar configuraciones",
          errors: response.data.errors,
        };
      }
    } catch (error) {
      console.error("Error en updateProjectSettings:", error);
      return {
        success: false,
        message: "Error de conexión",
        error: error.message,
      };
    }
  },

  getBusinessTypes: async () => {
    try {
      const response = await api.get("/business-types");

      if (response.ok && response.data.success) {
        return {
          success: true,
          businessTypes: response.data.data,
          meta: response.data.meta,
        };
      } else {
        return {
          success: false,
          message:
            response.data.message || "Error al cargar los tipos de negocio",
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
