import { API_URL } from "@/lib/env";
import type { AuthResponse } from "@/types/auth";

/**
 * Connecte un utilisateur avec email et mot de passe.
 * Envoie automatiquement les cookies HTTP-only grâce à `credentials: "include"`.
 *
 * @async
 * @function login
 * @param {string} email - Email de l'utilisateur
 * @param {string} password - Mot de passe de l'utilisateur
 * @returns {Promise<AuthResponse>} Les données utilisateur renvoyées par le backend
 * @throws {Error} Si la connexion échoue ou si le backend renvoie une erreur
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
 * Inscrit un nouvel utilisateur et renvoie ses informations.
 * Envoie automatiquement les cookies HTTP-only grâce à `credentials: "include"`.
 *
 * @async
 * @function register
 * @param {string} name - Nom de l'utilisateur
 * @param {string} email - Email de l'utilisateur
 * @param {string} password - Mot de passe de l'utilisateur
 * @returns {Promise<AuthResponse>} Les données utilisateur renvoyées par le backend
 * @throws {Error} Si l'inscription échoue ou si le backend renvoie une erreur
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
 * Déconnecte l'utilisateur en appelant l'endpoint backend /auth/logout.
 * Le backend supprime le cookie HTTP-only contenant le token.
 *
 * @async
 * @function logoutRequest
 * @returns {Promise<void>}
 * @throws {Error} Si la requête échoue
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
