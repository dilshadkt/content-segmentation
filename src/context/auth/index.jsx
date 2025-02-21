import { createContext, useContext, useEffect, useState } from "react";
import API from "../../api/httpService";
import { USER_LOGIN } from "../../api/endpoint";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  // useEffect(() => {
  //   checkAuth();
  // }, []);

  const checkAuth = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const response = await API.get("/auth/verify");
        const userData = response.data;
        setUser(userData);
        setIsAuthenticated(true);
      } catch (error) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
        setIsAuthenticated(false);
      }
    }
    setIsLoading(false);
  };

  const login = async (credentials) => {
    try {
      const response = await API.post(
        USER_LOGIN,
        {},
        {
          headers: { ...credentials },
        }
      );
      const { data: userData } = response.data;

      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("token", userData);

      setUser(userData);
      setIsAuthenticated(true);
      return true;
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setIsAuthenticated(false);
    window.location.href = "/auth/login";
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, login, logout, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};
