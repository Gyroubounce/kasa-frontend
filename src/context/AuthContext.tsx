"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { login as apiLogin, register as apiRegister } from "@/lib/api/auth";
import { User } from "@/types/user";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Auto-login au refresh
  useEffect(() => {
    const saved = localStorage.getItem("kasa_user");

    if (saved) {
      queueMicrotask(() => {
        setUser(JSON.parse(saved));
      });
    }

    queueMicrotask(() => {
      setLoading(false);
    });
  }, []);



  async function login(email: string, password: string) {
    setError(null);
    try {
      const data = await apiLogin(email, password);
      setUser(data);
      localStorage.setItem("kasa_user", JSON.stringify(data));
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Erreur lors de la connexion");
      }
      throw err;
    }

  }

  async function register(email: string, password: string) {
  setError(null);
  try {
    const data = await apiRegister(email, password);
    setUser(data);
    localStorage.setItem("kasa_user", JSON.stringify(data));
  } catch (err: unknown) {
    if (err instanceof Error) {
      setError(err.message);
    } else {
      setError("Erreur lors de l'inscription");
    }
    throw err;
  }
}


  function logout() {
    setUser(null);
    localStorage.removeItem("kasa_user");
  }

  return (
    <AuthContext.Provider
      value={{
        user,
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
