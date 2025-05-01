import { createContext, useState, useEffect } from "react";
import {jwtDecode} from "jwt-decode";

// Create AuthContext for user state management
export const AuthContext = createContext();

// AuthProvider component to wrap around the app
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  // Check for existing token on mount
  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token);
        console.log(decoded);
        setUser(decoded);
        localStorage.setItem("token", token);
      } catch (error) {
        setUser(null);
        setToken("");
        localStorage.removeItem("token");
      }
    }
  }, [token]);
  
  // Login user and store token
  const login = (token) => {
    localStorage.setItem("token", token);
    const decoded = jwtDecode(token);
    setUser({ id: decoded.id,
      username: decoded.username });
  };

  // Logout user
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}