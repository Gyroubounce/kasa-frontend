"use client";

import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";

import type { AuthUser } from "@/types/auth";
import {
  getMe,
  login as apiLogin,
  register as apiRegister,
  logoutRequest,
} from "@/lib/api/auth";

interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);
export { AuthContext };

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  console.log("🔵 [AUTH] FILE LOADED");
  /* -------------------------------------------------------
     🔄 Récupère l'utilisateur via /auth/me (lib/api/auth.ts)
  -------------------------------------------------------- */
  const refreshUser = useCallback(async () => {
  console.log("REFRESH USER → start");
  console.log("REFRESH USER → cookies:", document.cookie);

  // 🚫 Si pas de cookie token → ne pas appeler /auth/me


  console.log("REFRESH USER → TOKEN TROUVÉ → appel getMe()");

  try {
    const data = await getMe();
    console.log("REFRESH USER → getMe() OK → user:", data.user);
    setUser(data.user);
  } catch (err) {
    console.log("REFRESH USER → ERREUR getMe() → setUser(null)", err);
    setUser(null);
  } finally {
    console.log("REFRESH USER → FIN → loading=false");
    setLoading(false);
  }
}, []);

/* -------------------------------------------------------
   🚀 Auto-login basé sur cookie HTTP-only
-------------------------------------------------------- */
useEffect(() => {
  console.log("AUTH USEEFFECT → refreshUser()");
  refreshUser();
}, [refreshUser]);

  /* -------------------------------------------------------
     🔐 LOGIN
  -------------------------------------------------------- */
  async function login(email: string, password: string) {
    setError(null);
    setLoading(true);

    try {
      const data = await apiLogin(email, password);
      setUser(data.user);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
        throw err;
      }
      setError("Erreur lors de la connexion");
      throw new Error("Erreur lors de la connexion");
    } finally {
      setLoading(false);
    }
  }

  /* -------------------------------------------------------
     📝 REGISTER
  -------------------------------------------------------- */
  async function register(name: string, email: string, password: string) {
    setError(null);
    setLoading(true);

    try {
      const data = await apiRegister(name, email, password);
      setUser(data.user);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
        throw err;
      }
      setError("Erreur lors de l'inscription");
      throw new Error("Erreur lors de l'inscription");
    } finally {
      setLoading(false);
    }
  }

  /* -------------------------------------------------------
     🚪 LOGOUT
  -------------------------------------------------------- */
  async function logout() {
    setLoading(true);

    try {
      await logoutRequest();
    } catch {
      // Même si le backend échoue, on force la déconnexion locale
    }

    // Nettoyage local
    localStorage.removeItem("auth_user");
    localStorage.removeItem("messages");
    localStorage.removeItem("threads");

    if (user?.id) {
      localStorage.removeItem(`messages_${user.id}`);
      localStorage.removeItem(`threads_${user.id}`);
    }

    setUser(null);

    // Redirection
    router.push("/login");

    queueMicrotask(() => setLoading(false));
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
