
import { createContext, useContext, useState } from "react";

const Nis = createContext();

export const Auth = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [role, setRole] = useState(localStorage.getItem("role") || "");

  const login = (token, role) => {
    localStorage.setItem("token", token);
    localStorage.setItem("role", role);
    setToken(token);
    setRole(role);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setToken("");
    setRole("");
  };

  return (
    <Nis.Provider value={{ token, role, login, logout }}>
      {children}
    </Nis.Provider>
  );
};

export const useAuth = () => useContext(Nis);
