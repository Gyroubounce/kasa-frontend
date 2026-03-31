"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { login as apiLogin, register as apiRegister } from "@/lib/api/auth";
import type { AuthUser, AuthResponse } from "@/types/auth";

interface AuthContextType {
  user: AuthUser | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Auto-login au refresh
  useEffect(() => {
    const savedUser = localStorage.getItem("kasa_user");
    const savedToken = localStorage.getItem("kasa_token");

    if (savedUser && savedToken) {
      queueMicrotask(() => {
        setUser(JSON.parse(savedUser));
        setToken(savedToken);
      });
    }

    queueMicrotask(() => setLoading(false));
  }, []);

  // LOGIN
  async function login(email: string, password: string) {
    setError(null);

    try {
      const data: AuthResponse = await apiLogin(email, password);

      setUser(data.user);
      setToken(data.token);

      localStorage.setItem("kasa_user", JSON.stringify(data.user));
      localStorage.setItem("kasa_token", data.token);

    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
      else setError("Erreur lors de la connexion");
      throw err;
    }
  }

  // REGISTER
  async function register(name: string, email: string, password: string) {
    setError(null);

    try {
      const data: AuthResponse = await apiRegister(name, email, password);

      setUser(data.user);
      setToken(data.token);

      localStorage.setItem("kasa_user", JSON.stringify(data.user));
      localStorage.setItem("kasa_token", data.token);

    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
      else setError("Erreur lors de l'inscription");
      throw err;
    }
  }

  // LOGOUT
  function logout() {
    setUser(null);
    setToken(null);
    localStorage.removeItem("kasa_user");
    localStorage.removeItem("kasa_token");
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        error,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  return useContext(AuthContext);
}
