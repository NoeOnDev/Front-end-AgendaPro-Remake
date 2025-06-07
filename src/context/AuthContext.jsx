import { createContext, useState, useContext, useEffect } from "react";

// Usuario hardcodeado para pruebas
const demoUser = {
  email: "alxg5516@gmail.com",
  password: "password123",
  name: "Noé Alejandro Rodríguez Moto",
  avatar: "https://avatars.githubusercontent.com/u/105474616?v=4",
};

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Verificar si hay un usuario almacenado al cargar la aplicación
  useEffect(() => {
    const storedUser = localStorage.getItem("agendaProUser");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    setLoading(false);
  }, []);

  const login = (credentials) => {
    return new Promise((resolve, reject) => {
      // Simulamos un pequeño retraso como si fuera una llamada a API
      setTimeout(() => {
        if (
          credentials.email === demoUser.email &&
          credentials.password === demoUser.password
        ) {
          const userData = {
            name: demoUser.name,
            email: demoUser.email,
            avatar: demoUser.avatar,
            // No incluimos la contraseña en los datos del usuario
          };

          setUser(userData);
          localStorage.setItem("agendaProUser", JSON.stringify(userData));
          resolve(userData);
        } else {
          reject(new Error("Credenciales incorrectas"));
        }
      }, 800);
    });
  };

  const register = (userData) => {
    return new Promise((resolve, reject) => {
      // Simulamos un pequeño retraso como si fuera una llamada a API
      setTimeout(() => {
        if (userData.email === demoUser.email) {
          reject(new Error("El correo electrónico ya está registrado"));
        } else {
          // En una aplicación real, aquí se enviarían los datos al servidor
          // Como es demo, simplemente simulamos éxito
          const newUser = {
            name: userData.name,
            email: userData.email,
            avatar: userData.avatar,
          };

          setUser(newUser);
          localStorage.setItem("agendaProUser", JSON.stringify(newUser));
          resolve(newUser);
        }
      }, 800);
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("agendaProUser");
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
