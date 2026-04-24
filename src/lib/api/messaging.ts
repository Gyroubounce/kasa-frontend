// FRONTEND — lib/api/messaging.ts

import { API_URL } from "@/lib/env";
import { apiFetch } from "@/lib/utils/fetcher";
import { Thread, Message } from "@/types/message";

/**
 * Démarre une conversation avec un utilisateur (HostCard).
 *
 * @async
 * @function startConversation
 * @param {string} otherUserId - Identifiant de l'autre utilisateur
 * @param {string} content - Message initial
 * @returns {Promise<{ threadId: string }>}
 * @throws {Error} Si la requête échoue
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
 * Récupère la liste des threads de l'utilisateur.
 *
 * @async
 * @function getThreads
 * @returns {Promise<Thread[]>}
 * @throws {Error} Si la requête échoue
 */
export async function getThreads(): Promise<Thread[]> {
  return apiFetch<Thread[]>(`${API_URL}/api/messaging/threads`);
}

/**
 * Récupère les messages d'un thread.
 *
 * @async
 * @function getMessages
 * @param {string} threadId - Identifiant du thread
 * @returns {Promise<Message[]>}
 * @throws {Error} Si la requête échoue
 */
export async function getMessages(threadId: string): Promise<Message[]> {
  return apiFetch<Message[]>(
    `${API_URL}/api/messaging/threads/${threadId}/messages`
  );
}

/**
 * Envoie un message dans un thread.
 *
 * @async
 * @function sendMessage
 * @param {string} threadId - Identifiant du thread
 * @param {string} content - Contenu du message
 * @returns {Promise<{ ok: boolean }>}
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

