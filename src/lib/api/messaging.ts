// FRONTEND — lib/api/messaging.ts

import { API_URL } from "@/lib/env";
import { apiFetch } from "@/lib/utils/fetcher";
import { Thread, Message } from "@/types/message";

/**
 * Démarre une conversation avec un utilisateur (HostCard).
 * Le backend vérifie automatiquement l'authentification via cookie HttpOnly.
 *
 * @async
 * @function startConversation
 * @param {string} otherUserId - Identifiant de l'autre utilisateur
 * @param {string} content - Message initial
 * @returns {Promise<{ threadId: string }>} Identifiant du thread créé
 * @throws {Error} Si la requête échoue (401 si non authentifié)
 */
export async function startConversation(
  otherUserId: string,
  content: string
): Promise<{ threadId: string }> {
  return apiFetch(`${API_URL}/api/messaging/start`, {
    method: "POST",
    body: JSON.stringify({ otherUserId, content }),
  });
}

/**
 * Récupère la liste des threads de l'utilisateur connecté.
 * Le backend renvoie 401 si l'utilisateur n'est pas authentifié.
 *
 * @async
 * @function getThreads
 * @returns {Promise<Thread[]>} Liste des threads
 * @throws {Error} Si la requête échoue
 */
export async function getThreads(): Promise<Thread[]> {
  return apiFetch<Thread[]>(`${API_URL}/api/messaging/threads`);
}

/**
 * Récupère tous les messages d'un thread.
 * Le backend vérifie automatiquement l'authentification.
 *
 * @async
 * @function getMessages
 * @param {string} threadId - Identifiant du thread
 * @returns {Promise<Message[]>} Liste des messages
 * @throws {Error} Si la requête échoue
 */
export async function getMessages(threadId: string): Promise<Message[]> {
  return apiFetch<Message[]>(
    `${API_URL}/api/messaging/threads/${threadId}/messages`
  );
}

/**
 * Envoie un message dans un thread existant.
 * Le backend renvoie 401 si l'utilisateur n'est pas authentifié.
 *
 * @async
 * @function sendMessage
 * @param {string} threadId - Identifiant du thread
 * @param {string} content - Contenu du message
 * @returns {Promise<{ ok: boolean }>} Résultat de l'opération
 * @throws {Error} Si la requête échoue
 */
export async function sendMessage(
  threadId: string,
  content: string
): Promise<{ ok: boolean }> {
  return apiFetch(`${API_URL}/api/messaging/threads/${threadId}/messages`, {
    method: "POST",
    body: JSON.stringify({ content }),
  });
}
