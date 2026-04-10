"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { login as apiLogin, register as apiRegister } from "@/lib/api/auth";
import type { AuthUser, AuthResponse } from "@/types/auth";
import { useRouter } from "next/navigation";


interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  /* -------------------------------------------------------
     AUTO-LOGIN (CLIENT-ONLY)
     → Pas d'accès à localStorage côté serveur
     → Pas de warning ESLint
  -------------------------------------------------------- */
  useEffect(() => {
    if (typeof window === "undefined") return;

    const savedUser = localStorage.getItem("kasa_user");
    const savedToken = localStorage.getItem("kasa_token");

    if (savedUser && savedToken) {
      queueMicrotask(() => {
        setUser(JSON.parse(savedUser)); // ✔ ESLint OK
      });
    }

    queueMicrotask(() => setLoading(false));
  }, []);

  /* -------------------------------------------------------
     LOGIN
  -------------------------------------------------------- */
  async function login(email: string, password: string) {
    setError(null);

    try {
      const data: AuthResponse = await apiLogin(email, password);

      localStorage.setItem("kasa_user", JSON.stringify(data.user));
      localStorage.setItem("kasa_token", data.token);

      setUser(data.user);
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
      else setError("Erreur lors de la connexion");
      throw err;
    }
  }

  /* -------------------------------------------------------
     REGISTER
  -------------------------------------------------------- */
  async function register(name: string, email: string, password: string) {
    setError(null);

    try {
      const data: AuthResponse = await apiRegister(name, email, password);

      localStorage.setItem("kasa_user", JSON.stringify(data.user));
      localStorage.setItem("kasa_token", data.token);

      setUser(data.user);
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
      else setError("Erreur lors de l'inscription");
      throw err;
    }
  }

/* -------------------------------------------------------
   LOGOUT
-------------------------------------------------------- */
  function logout() {
    localStorage.removeItem("kasa_user");
    localStorage.removeItem("kasa_token");
    setUser(null);
    router.push("/login");
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
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuthContext must be used within AuthProvider");
  }
  return ctx;
}
