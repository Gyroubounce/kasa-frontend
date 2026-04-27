📘 Documentation API — Version complète & réécrite
Cette documentation décrit tous les endpoints backend utilisés par ton frontend, ainsi que les comportements d’authentification, les erreurs, et les règles de sécurité.

Elle remplace entièrement ton ancien fichier.

0. 🔐 Principes généraux
✔ Cookies HTTP-only
Toutes les requêtes authentifiées utilisent un cookie :

Code
token=...; HttpOnly; Secure; SameSite=None
✔ Frontend → credentials: "include"
Toutes les fonctions API utilisent :

ts
credentials: "include"
✔ 401 → logout automatique
Si un endpoint renvoie 401 Unauthorized, alors :

AuthContext supprime l’utilisateur

l’app redirige vers /login via router.push()

✔ Pages protégées
Les pages protégées utilisent router.push(), jamais redirect().

1. 🔑 Authentification (auth.ts)
1.1 login(email, password)
Rôle
Connecte un utilisateur et récupère un cookie HTTP-only.

Paramètres
email (string)

password (string)

Retour
Promise<AuthResponse>  
→ { user }

Erreurs
400 : identifiants invalides

500 : erreur serveur

JSDoc
ts
/**
 * Connecte un utilisateur avec email et mot de passe.
 * Le backend renvoie un cookie HTTP-only automatiquement géré par le navigateur.
 *
 * @async
 * @function login
 * @param {string} email - Email de l'utilisateur
 * @param {string} password - Mot de passe de l'utilisateur
 * @returns {Promise<AuthResponse>} Données utilisateur renvoyées par le backend
 * @throws {Error} Si la connexion échoue
 */
1.2 register(name, email, password)
Rôle
Crée un utilisateur + renvoie un cookie de session.

Paramètres
name (string)

email (string)

password (string)

Retour
Promise<AuthResponse>

Erreurs
400 : email déjà utilisé

500 : erreur serveur

JSDoc
ts
/**
 * Inscrit un nouvel utilisateur et renvoie ses informations.
 *
 * @async
 * @function register
 * @param {string} name - Nom de l'utilisateur
 * @param {string} email - Email de l'utilisateur
 * @param {string} password - Mot de passe de l'utilisateur
 * @returns {Promise<AuthResponse>}
 * @throws {Error} Si l'inscription échoue
 */
1.3 logoutRequest()
Rôle
Supprime le cookie côté backend.

JSDoc
ts
/**
 * Déconnecte l'utilisateur en appelant /auth/logout.
 *
 * @async
 * @function logoutRequest
 * @returns {Promise<void>}
 * @throws {Error} Si la requête échoue
 */
1.4 /auth/me (appelé automatiquement)
Rôle
Récupère l’utilisateur connecté via cookie.

Retour
Promise<User>

Erreurs
401 : token invalide → logout automatique

2. 🏡 Propriétés (properties.ts)
2.1 getPropertyBase()
Rôle
Liste allégée des propriétés.

JSDoc
ts
/**
 * Récupère la liste des propriétés (version allégée).
 *
 * @async
 * @function getPropertyBase
 * @returns {Promise<PropertyBase[]>}
 * @throws {Error} Si la requête échoue
 */
2.2 getPropertyDetail(id)
Rôle
Détails complets d’une propriété.

JSDoc
ts
/**
 * Récupère les détails complets d'une propriété.
 *
 * @async
 * @function getPropertyDetail
 * @param {string} id - Identifiant de la propriété
 * @returns {Promise<PropertyDetail>}
 * @throws {Error} Si la requête échoue
 */
2.3 createProperty(data)
Rôle
Créer une propriété (réservé aux owners).

JSDoc
ts
/**
 * Crée une nouvelle propriété.
 *
 * @async
 * @function createProperty
 * @param {PropertyCreate} data - Données de création
 * @returns {Promise<PropertyDetail>}
 * @throws {Error} Si la requête échoue
 */
2.4 updateProperty(id, data)
Rôle
Mettre à jour une propriété existante.

JSDoc
ts
/**
 * Met à jour une propriété existante.
 *
 * @async
 * @function updateProperty
 * @param {string} id - Identifiant de la propriété
 * @param {PropertyUpdate} data - Données à mettre à jour
 * @returns {Promise<PropertyDetail>}
 * @throws {Error} Si la requête échoue
 */
3. ❤️ Favoris (favorites.ts)
3.1 getFavorites(userId)
Rôle
Récupère les favoris de l’utilisateur.

JSDoc
ts
/**
 * Récupère la liste des favoris d'un utilisateur.
 *
 * @async
 * @function getFavorites
 * @param {string} userId - Identifiant de l'utilisateur
 * @returns {Promise<Favorite[]>}
 * @throws {Error} Si la requête échoue
 */
3.2 toggleFavorite(propertyId, isFavorite)
Rôle
Ajoute ou supprime un favori.

Comportement important
Mise à jour optimiste côté client

Si 401 → logout → router.push("/login")

JSDoc
ts
/**
 * Ajoute ou supprime une propriété des favoris de l'utilisateur.
 *
 * @async
 * @function toggleFavorite
 * @param {string} propertyId - Identifiant de la propriété
 * @param {boolean} isFavorite - Indique si la propriété est déjà en favori
 * @returns {Promise<{ success: boolean }>}
 * @throws {Error} Si la requête échoue
 */
4. ⭐ Notes (ratings.ts)
4.1 rateProperty(propertyId, payload)
Rôle
Créer ou mettre à jour une note.

JSDoc
ts
/**
 * Crée ou met à jour une note pour une propriété.
 *
 * @async
 * @function rateProperty
 * @param {string} propertyId - Identifiant de la propriété
 * @param {RatingCreate} payload - Données de notation
 * @returns {Promise<Rating>}
 * @throws {Error} Si la requête échoue
 */
5. 🔒 fetchWithAuth
Rôle
Effectue une requête authentifiée.

JSDoc
ts
/**
 * Effectue une requête HTTP authentifiée en envoyant automatiquement
 * le cookie HTTP-only grâce à `credentials: "include"`.
 *
 * @async
 * @function fetchWithAuth
 * @param {string} endpoint - Chemin de l'endpoint API
 * @param {RequestInit} [options={}] - Options fetch supplémentaires
 * @returns {Promise<any>}
 * @throws {Error} Si la requête échoue
 */
6. 🌐 apiFetch
Rôle
Gestion avancée des erreurs + cookies.

JSDoc
ts
/**
 * Effectue une requête HTTP avec gestion avancée des erreurs.
 *
 * @async
 * @function apiFetch
 * @template T
 * @param {string} endpoint - URL complète de l'endpoint API
 * @param {RequestInit} [options={}] - Options fetch supplémentaires
 * @returns {Promise<T>}
 * @throws {ApiError} Si la requête échoue
 */
7. 💬 Messagerie (messaging.ts)
7.1 startConversation(otherUserId, content)
Rôle
Démarre une conversation + premier message.

JSDoc
ts
/**
 * Démarre une conversation avec un utilisateur.
 *
 * @async
 * @function startConversation
 * @param {string} otherUserId - Identifiant de l'autre utilisateur
 * @param {string} content - Message initial
 * @returns {Promise<{ threadId: string }>}
 * @throws {Error} Si la requête échoue
 */
7.2 getThreads()
Rôle
Liste des conversations.

JSDoc
ts
/**
 * Récupère la liste des threads de l'utilisateur.
 *
 * @async
 * @function getThreads
 * @returns {Promise<Thread[]>}
 * @throws {Error} Si la requête échoue
 */
7.3 getMessages(threadId)
Rôle
Messages d’un thread.

JSDoc
ts
/**
 * Récupère les messages d'un thread.
 *
 * @async
 * @function getMessages
 * @param {string} threadId - Identifiant du thread
 * @returns {Promise<Message[]>}
 * @throws {Error} Si la requête échoue
 */
7.4 sendMessage(threadId, content)
Rôle
Envoie un message dans un thread.

JSDoc
ts
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