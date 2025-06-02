const API_BASE_URL = "http://localhost:8000/api/v1";

const defaultHeaders = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

const getAuthToken = () => {
  return localStorage.getItem("token");
};

export const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;

  const headers = {
    ...defaultHeaders,
    ...options.headers,
  };

  const token = getAuthToken();
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const config = {
    ...options,
    headers,
  };

  try {
    const response = await fetch(url, config);
    const data = await response.json();

    if (response.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
      throw new Error("Sesión expirada");
    }

    return {
      data,
      status: response.status,
      ok: response.ok,
    };
  } catch (error) {
    console.error("Error en petición API:", error);
    throw error;
  }
};

export const api = {
  get: (endpoint, options = {}) =>
    apiRequest(endpoint, { ...options, method: "GET" }),

  post: (endpoint, body, options = {}) =>
    apiRequest(endpoint, {
      ...options,
      method: "POST",
      body: JSON.stringify(body),
    }),

  put: (endpoint, body, options = {}) =>
    apiRequest(endpoint, {
      ...options,
      method: "PUT",
      body: JSON.stringify(body),
    }),

  patch: (endpoint, body, options = {}) =>
    apiRequest(endpoint, {
      ...options,
      method: "PATCH",
      body: JSON.stringify(body),
    }),

  delete: (endpoint, options = {}) =>
    apiRequest(endpoint, { ...options, method: "DELETE" }),

  postFormData: (endpoint, formData, options = {}) => {
    const headers = { ...options.headers };
    delete headers["Content-Type"];

    return apiRequest(endpoint, {
      ...options,
      method: "POST",
      body: formData,
      headers,
    });
  },
};
