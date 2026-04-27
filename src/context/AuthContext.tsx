"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { AuthUser } from "@/types/auth";
import { logoutRequest } from "@/lib/api/auth";

interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

/* -------------------------------------------------------
   🔥 Vérifie si un cookie de session existe
-------------------------------------------------------- */
function hasSessionCookie() {
  return (
    document.cookie.includes("authjs.session-token") ||
    document.cookie.includes("session") ||
    document.cookie.includes("auth_token") ||
    document.cookie.includes("token")
  );
}

const AuthContext = createContext<AuthContextType | null>(null);
export { AuthContext };

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  /* -------------------------------------------------------
     🔄 Récupère l'utilisateur via /auth/me
  -------------------------------------------------------- */
  async function refreshUser() {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, {
        credentials: "include",
      });

      if (!res.ok) {
        setUser(null);
        return;
      }

      const data = await res.json();
      setUser(data.user);
    } catch {
      setUser(null);
    }
  }

  /* -------------------------------------------------------
     🚀 Auto-login si cookie présent
  -------------------------------------------------------- */
  useEffect(() => {
    (async () => {
      if (!hasSessionCookie()) {
        setUser(null);
        setLoading(false);
        return;
      }

      await refreshUser();
      setLoading(false);
    })();
  }, []);

  /* -------------------------------------------------------
     🔐 LOGIN
  -------------------------------------------------------- */
  async function login(email: string, password: string) {
    setError(null);

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      const err = await res.json();
      setError(err.error || "Erreur lors de la connexion");
      throw new Error(err.error);
    }

    await refreshUser();
  }

  /* -------------------------------------------------------
     📝 REGISTER
     (gère aussi les erreurs de mot de passe sécurisé)
  -------------------------------------------------------- */
  async function register(name: string, email: string, password: string) {
    setError(null);

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    if (!res.ok) {
      const err = await res.json();
      setError(err.error || "Erreur lors de l'inscription");
      throw new Error(err.error);
    }

    await refreshUser();
  }

  /* -------------------------------------------------------
     🚪 LOGOUT
  -------------------------------------------------------- */
  async function logout() {
    await logoutRequest();

    localStorage.removeItem("auth_user");
    localStorage.removeItem("messages");
    localStorage.removeItem("threads");

    const userId = user?.id;
    if (userId) {
      localStorage.removeItem(`messages_${userId}`);
      localStorage.removeItem(`threads_${userId}`);
    }

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
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuthContext must be used within AuthProvider");
  return ctx;
}
