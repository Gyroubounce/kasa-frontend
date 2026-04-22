# Documentation API (JSDoc)

Ce document regroupe la documentation des fonctions API situées dans  
`/src/lib/api/`.

Chaque fonction est documentée avec :
- son rôle
- ses paramètres
- son retour
- les erreurs possibles
- le bloc JSDoc exact à placer dans le code

---

# 1. Authentification (`auth.ts`)

## 1.1 `login(email, password)`

### Rôle
Permet à un utilisateur de se connecter en envoyant son email et son mot de passe au backend.  
Le backend renvoie un cookie HTTP-only contenant le token de session.

### Paramètres
- **email** *(string)* — Email de l’utilisateur  
- **password** *(string)* — Mot de passe de l’utilisateur  

### Retour
- **Promise<AuthResponse>**  
  Contient :
  - `user` (id, name, email, role…)  
  - cookie HTTP-only automatiquement géré par le navigateur  

### Erreurs possibles
- 400 : email ou mot de passe incorrect  
- 500 : erreur serveur  
- JSON d’erreur absent → message générique “Erreur de connexion”

### Exemple JSDoc
```ts
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
1.2 register(name, email, password)
Rôle
Créer un nouvel utilisateur dans la base de données et renvoyer ses informations + cookie de session.

Paramètres
name (string) — Nom de l’utilisateur

email (string) — Email de l’utilisateur

password (string) — Mot de passe de l’utilisateur

Retour
Promise<AuthResponse>

Erreurs possibles
400 : email déjà utilisé

500 : erreur serveur

Exemple JSDoc
ts
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
1.3 logoutRequest()
Rôle
Déconnecte l’utilisateur en supprimant le cookie HTTP-only côté backend.

Exemple JSDoc
ts
/**
 * Déconnecte l'utilisateur en appelant l'endpoint backend /auth/logout.
 *
 * @async
 * @function logoutRequest
 * @returns {Promise<void>}
 * @throws {Error} Si la requête échoue
 */
2. Propriétés (properties.ts)
2.1 getPropertyBase()
Rôle
Récupère la liste des propriétés sous forme allégée (PropertyBase).

Paramètres
Aucun.

Retour
Promise<PropertyBase[]>

Erreurs possibles
500 : erreur serveur

Erreur réseau → exception Error

Exemple JSDoc
ts
/**
 * Récupère la liste des propriétés (version allégée).
 *
 * @async
 * @function getPropertyBase
 * @returns {Promise<PropertyBase[]>} Liste des propriétés
 * @throws {Error} Si la requête échoue
 */
2.2 getPropertyDetail(id)
Rôle
Récupère les détails complets d’une propriété.

Paramètres
id (string) — Identifiant de la propriété

Retour
Promise<PropertyDetail>

Erreurs possibles
404 : propriété introuvable

500 : erreur serveur

Exemple JSDoc
ts
/**
 * Récupère les détails complets d'une propriété.
 *
 * @async
 * @function getPropertyDetail
 * @param {string} id - Identifiant de la propriété
 * @returns {Promise<PropertyDetail>} Détails complets de la propriété
 * @throws {Error} Si la requête échoue
 */
2.3 createProperty(data)
Rôle
Crée une nouvelle propriété.

Paramètres
data (PropertyCreate) — Données de création

Retour
Promise<PropertyDetail>

Erreurs possibles
400 : données invalides

401 : utilisateur non autorisé

500 : erreur serveur

Exemple JSDoc
ts
/**
 * Crée une nouvelle propriété.
 *
 * @async
 * @function createProperty
 * @param {PropertyCreate} data - Données de création de la propriété
 * @returns {Promise<PropertyDetail>} Propriété créée
 * @throws {Error} Si la requête échoue
 */
2.4 updateProperty(id, data)
Rôle
Met à jour une propriété existante.

Paramètres
id (string) — Identifiant de la propriété

data (PropertyUpdate) — Données à mettre à jour

Retour
Promise<PropertyDetail>

Erreurs possibles
400 : données invalides

401 : utilisateur non autorisé

404 : propriété introuvable

500 : erreur serveur

Exemple JSDoc
ts
/**
 * Met à jour une propriété existante.
 *
 * @async
 * @function updateProperty
 * @param {string} id - Identifiant de la propriété
 * @param {PropertyUpdate} data - Données à mettre à jour
 * @returns {Promise<PropertyDetail>} Propriété mise à jour
 * @throws {Error} Si la requête échoue
 */
3. Favoris (favorites.ts)
3.1 getFavorites(userId)
Rôle
Récupère la liste des propriétés favorites d’un utilisateur.

Paramètres
userId (string) — Identifiant de l’utilisateur

Retour
Promise<Favorite[]>

Erreurs possibles
404 : utilisateur introuvable

500 : erreur serveur

Exemple JSDoc
ts
/**
 * Récupère la liste des favoris d'un utilisateur.
 *
 * @async
 * @function getFavorites
 * @param {string} userId - Identifiant de l'utilisateur
 * @returns {Promise<Favorite[]>} Liste des propriétés favorites
 * @throws {Error} Si la requête échoue
 */
3.2 toggleFavorite(propertyId, isFavorite)
Rôle
Ajoute ou supprime une propriété des favoris.

Paramètres
propertyId (string)

isFavorite (boolean) — indique si la propriété est déjà en favori

Retour
Promise<{ success: boolean }>

Erreurs possibles
401 : utilisateur non authentifié

404 : propriété introuvable

500 : erreur serveur

Exemple JSDoc
ts
/**
 * Ajoute ou supprime une propriété des favoris de l'utilisateur.
 *
 * @async
 * @function toggleFavorite
 * @param {string} propertyId - Identifiant de la propriété
 * @param {boolean} isFavorite - Indique si la propriété est déjà en favori
 * @returns {Promise<{ success: boolean }>} Résultat de l'opération
 * @throws {Error} Si la requête échoue
 */
4. Notes (ratings.ts)
4.1 rateProperty(propertyId, payload)
Rôle
Crée ou met à jour une note pour une propriété.

Paramètres
propertyId (string)

payload (RatingCreate) — { score: number, userId: string }

Retour
Promise<Rating>

Erreurs possibles
400 : score invalide

401 : utilisateur non authentifié

404 : propriété introuvable

500 : erreur serveur

Exemple JSDoc
ts
/**
 * Crée ou met à jour une note pour une propriété.
 *
 * @async
 * @function rateProperty
 * @param {string} propertyId - Identifiant de la propriété
 * @param {RatingCreate} payload - Données de notation (score, userId)
 * @returns {Promise<Rating>} Note créée ou mise à jour
 * @throws {Error} Si la requête échoue
 */
5. fetchWithAuth (fetchWithAuth.ts)
5.1 fetchWithAuth(endpoint, options)
Rôle
Effectue une requête HTTP authentifiée en envoyant automatiquement le cookie HTTP-only.

Paramètres
endpoint (string)

options (RequestInit)

Retour
Promise<any>

Erreurs possibles
401 : utilisateur non authentifié

403 : accès refusé

404 : endpoint introuvable

500 : erreur serveur

Exemple JSDoc
ts
/**
 * Effectue une requête HTTP authentifiée en envoyant automatiquement
 * le cookie HTTP-only grâce à `credentials: "include"`.
 *
 * @async
 * @function fetchWithAuth
 * @param {string} endpoint - Chemin de l'endpoint API
 * @param {RequestInit} [options={}] - Options fetch supplémentaires
 * @returns {Promise<any>} Réponse JSON du backend
 * @throws {Error} Si la requête échoue
 */
6. apiFetch (utils/fetcher.ts)
6.1 apiFetch(endpoint, options)
Rôle
Effectue une requête HTTP avec gestion avancée des erreurs.

Paramètres
endpoint (string)

options (RequestInit)

Retour
Promise<T>

Erreurs possibles
400 : données invalides

401 : utilisateur non authentifié

403 : accès refusé

404 : endpoint introuvable

500 : erreur serveur

erreur réseau → ApiError("Erreur réseau ou serveur", 500)

Exemple JSDoc
ts
/**
 * Effectue une requête HTTP avec gestion avancée des erreurs
 * et envoie automatiquement le cookie HTTP-only grâce à `credentials: "include"`.
 *
 * @async
 * @function apiFetch
 * @template T
 * @param {string} endpoint - URL complète de l'endpoint API
 * @param {RequestInit} [options={}] - Options fetch supplémentaires
 * @returns {Promise<T>} Réponse JSON typée
 * @throws {ApiError} Si la requête échoue ou si le backend renvoie une erreur
 */