import { API_URL } from "@/lib/env";
import type { AuthResponse } from "@/types/auth";

/* -------------------------------------------------------
   🔥 LOGIN
------------------------------------------------------- */
export async function login(email: string, password: string): Promise<AuthResponse> {
  console.log("🔵 FRONT → login() → body envoyé :", { email, password });

  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include", // ⭐ OBLIGATOIRE POUR LES COOKIES
    body: JSON.stringify({ email, password }),
  });

  console.log("🔵 FRONT → login() → status :", res.status);

  if (!res.ok) {
    let errorMessage = "Erreur de connexion";

    try {
      const error = await res.json();
      console.log("🔴 FRONT → login() → erreur JSON :", error);
      errorMessage = error.message || errorMessage;
    } catch {
      console.log("🔴 FRONT → login() → erreur sans JSON");
    }

    throw new Error(errorMessage);
  }

  const data = await res.json();
  console.log("🟢 FRONT → login() → JSON :", data);

  return data;
}

/* -------------------------------------------------------
   🔥 REGISTER
------------------------------------------------------- */
export async function register(
  name: string,
  email: string,
  password: string
): Promise<AuthResponse> {
  console.log("🔵 FRONT → register() → body envoyé :", { name, email, password });

  const res = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include", // ⭐ OBLIGATOIRE AUSSI
    body: JSON.stringify({ name, email, password }),
  });

  console.log("🔵 FRONT → register() → status :", res.status);

  if (!res.ok) {
    let errorMessage = "Erreur lors de l'inscription";

    try {
      const error = await res.json();
      console.log("🔴 FRONT → register() → erreur JSON :", error);
      errorMessage = error.message || errorMessage;
    } catch {
      console.log("🔴 FRONT → register() → erreur sans JSON");
    }

    throw new Error(errorMessage);
  }

  const data = await res.json();
  console.log("🟢 FRONT → register() → JSON :", data);

  return data;
}
