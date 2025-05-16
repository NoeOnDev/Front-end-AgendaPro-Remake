/**
 * Servicio de autenticación personalizado que se comunica con tu API
 */
export interface UserData {
  name?: string;
  email?: string;
  image?: string;
}

export interface AuthResponse {
  success: boolean;
  user?: UserData;
  error?: string;
}

// URL base de la API
const API_URL = import.meta.env.VITE_API_URL;

/**
 * Iniciar sesión con Google (redirige a tu endpoint de autenticación)
 */
export const signInWithGoogle = async (): Promise<AuthResponse> => {
  try {
    window.location.href = `${API_URL}/auth/google`;

    return {
      success: false,
      error: "Redirigiendo a Google para autenticación...",
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.message || "Error al iniciar sesión con Google",
    };
  }
};

/**
 * Iniciar sesión con credenciales (email/password)
 */
export const signInWithCredentials = async (
  email: string,
  password: string
): Promise<AuthResponse> => {
  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
      credentials: "include",
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Error al iniciar sesión");
    }

    return {
      success: true,
      user: data.user,
      error: undefined,
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.message || "Error al iniciar sesión",
    };
  }
};

/**
 * Cerrar sesión
 */
export const signOut = async (): Promise<AuthResponse> => {
  try {
    const response = await fetch(`${API_URL}/auth/logout`, {
      method: "POST",
      credentials: "include",
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message || "Error al cerrar sesión");
    }

    return {
      success: true,
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.message || "Error al cerrar sesión",
    };
  }
};

/**
 * Verificar el estado de autenticación del usuario
 */
export const checkAuthStatus = async (): Promise<UserData | null> => {
  try {
    const response = await fetch(`${API_URL}/auth/me`, {
      credentials: "include",
    });

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    return data.user;
  } catch (error) {
    console.error("Error verificando estado de autenticación:", error);
    return null;
  }
};
