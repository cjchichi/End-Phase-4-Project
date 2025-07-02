import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [userId, setUserId] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    setUserId(localStorage.getItem("user_id"));
    setToken(localStorage.getItem("token"));
  }, []);

  const login = (id, token) => {
    localStorage.setItem("user_id", id);
    localStorage.setItem("token", token);
    setUserId(id);
    setToken(token);
  };

  const logout = () => {
    localStorage.removeItem("user_id");
    localStorage.removeItem("token");
    setUserId(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ userId, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
