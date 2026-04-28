import { API_URL } from "@/lib/env";
import type { AuthResponse, MeResponse } from "@/types/auth";

/**
 * Récupère les informations de l'utilisateur connecté via cookie HTTP-only.
 *
 * @async
 * @function getMe
 * @returns {Promise<MeResponse>} Les données utilisateur ou null
 */
export async function getMe(): Promise<MeResponse> {


  const res = await fetch(`${API_URL}/auth/me`, {
    method: "GET",
    credentials: "include",
  });



  if (!res.ok) {
   
    return { user: null }; // IMPORTANT : pas d'exception ici
  }

  const data = await res.json();
 

  return data;
}

/**
 * Connecte un utilisateur avec email et mot de passe.
 *
 * @async
 * @function login
 * @param {string} email - Email de l'utilisateur
 * @param {string} password - Mot de passe
 * @returns {Promise<AuthResponse>} Token + utilisateur
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
 *
 * @async
 * @function register
 * @param {string} name - Nom de l'utilisateur
 * @param {string} email - Email
 * @param {string} password - Mot de passe
 * @returns {Promise<AuthResponse>} Token + utilisateur
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
 *
 * @async
 * @function logoutRequest
 * @returns {Promise<void>}
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
