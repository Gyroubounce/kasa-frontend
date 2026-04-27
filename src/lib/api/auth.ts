import { API_URL } from "@/lib/env";
import type { AuthResponse } from "@/types/auth";

/**
 * Récupère les informations de l'utilisateur connecté via cookie HTTP-only.
 *
 * @async
 * @function getMe
 * @returns {Promise<AuthResponse>} Les données utilisateur
 * @throws {Error} Si l'utilisateur n'est pas authentifié
 */
export async function getMe(): Promise<AuthResponse> {
  const res = await fetch(`${API_URL}/auth/me`, {
    method: "GET",
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Non authentifié");
  }

  return res.json();
}

/**
 * Connecte un utilisateur avec email et mot de passe.
 */
export async function login(email: string, password: string): Promise<AuthResponse> {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    let errorMessage = "Erreur de connexion";
    try {
      const error = await res.json();
      errorMessage = error.message || errorMessage;
    } catch {}
    throw new Error(errorMessage);
  }

  return res.json();
}

/**
 * Inscrit un nouvel utilisateur.
 */
export async function register(
  name: string,
  email: string,
  password: string
): Promise<AuthResponse> {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ name, email, password }),
  });

  if (!res.ok) {
    let errorMessage = "Erreur lors de l'inscription";
    try {
      const error = await res.json();
      errorMessage = error.message || errorMessage;
    } catch {}
    throw new Error(errorMessage);
  }

  return res.json();
}

/**
 * Déconnecte l'utilisateur.
 */
export async function logoutRequest(): Promise<void> {
  const res = await fetch(`${API_URL}/auth/logout`, {
    method: "POST",
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Erreur lors de la déconnexion");
  }
}
