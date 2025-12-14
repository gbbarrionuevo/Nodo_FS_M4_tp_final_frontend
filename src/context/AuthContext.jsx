/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import api from '../api/axios.js';
import { ENDPOINTS } from '../api/endpoints.js';

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const u = localStorage.getItem("user");
      return u ? JSON.parse(u) : null;
    } catch {
      localStorage.removeItem("user");
      return null;
    }
  });
  const [token, setToken] = useState(() => localStorage.getItem("token") || null);

  const login = async (data) => {
    const res = await api.post(ENDPOINTS.auth.login, data);
    const { user: userData, token: tokenData } = res.data;

    setUser(userData);
    setToken(tokenData);

    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", tokenData);

    return res.data;
  };

  const register = async (data) => {
    const res = await api.post(ENDPOINTS.auth.register, data);
    const { user: userData, token: tokenData } = res.data;

    setUser(userData);
    setToken(tokenData);

    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", tokenData);

    return res.data;
  };

  const logout = useCallback(() => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  }, []);

  const decodeToken = (token) => {
    if (!token || !token.includes(".")) {
      return null;
    }

    try {
      const payload = token.split(".")[1];
      return JSON.parse(atob(payload));
    } catch {
      return null;
    }
  };

  useEffect(() => {
    if (!token) {
      return;
    }

    const decoded = decodeToken(token);
    if (!decoded?.exp) {
      Promise.resolve().then(logout);
      return;
    }

    const now = Date.now() / 1000;
    if (decoded.exp < now) {
      Promise.resolve().then(logout);
      return;
    }

    const msToExpire = (decoded.exp - now) * 1000;
    const timer = setTimeout(logout, msToExpire);

    return () => clearTimeout(timer);
  }, [token, logout]);

  useEffect(() => {
    if (!token) {
      return;
    }

    const fetchRoles = async () => {
      try {
        const res = await api.get(ENDPOINTS.auth.roles);
        const updatedRoles = res.data.roles;

        setUser(prev => {
          if (!prev) {
            return null;
          }

          const newUser = { ...prev, roles: updatedRoles };
          localStorage.setItem("user", JSON.stringify(newUser));

          return newUser;
        });

      } catch {
        logout();
      }
    };

    fetchRoles();
  }, [token, logout]);

  const permissions = user?.roles?.flatMap(r => r.permissions?.map(p => p.name)) || [];
  const hasPermission = (perm) => permissions.includes(perm);

  return (
    <AuthContext.Provider value={{ user, setUser, token, login, register, hasPermission, logout }}>
      {children}
    </AuthContext.Provider>
  );
};