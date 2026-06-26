// src/context/AuthContext.jsx
// Provides a simple authentication context for the demo admin panel.
// Stores auth state in localStorage under the key 'kanishe_auth'.

import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null);

  // Load auth state from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("kanishe_auth");
    if (stored) {
      try {
        setAuth(JSON.parse(stored));
      } catch (_) {
        // ignore malformed data
        setAuth(null);
      }
    }
  }, []);

  const login = (username, password) => {
    // Hard‑coded demo credentials
    if (username === "admin" && password === "password123") {
      const user = { username };
      localStorage.setItem("kanishe_auth", JSON.stringify(user));
      setAuth(user);
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem("kanishe_auth");
    setAuth(null);
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
