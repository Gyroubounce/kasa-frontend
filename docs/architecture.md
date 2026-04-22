# Architecture Technique du Projet

Ce document décrit l’architecture réelle du projet Kasa Frontend, basé sur Next.js (App Router), TypeScript, Auth.js, cookies HTTP-only, API internes, contextes React, hooks personnalisés et composants modulaires.

L’objectif est d’expliquer clairement :

- l’organisation du code
- le fonctionnement de l’authentification
- la communication frontend ↔ backend
- la gestion des API internes
- la structure des pages
- la logique des contextes
- la sécurité (middleware, cookies)
- les conventions techniques

---

# 1. Structure générale du projet

Voici l’arborescence réelle du dossier `/src` :

src/
├─ app/
├─ components/
├─ context/
├─ hooks/
├─ lib/
├─ mocks/
└─ types/

Code

Chaque dossier a un rôle précis.

---

# 2. Dossier `/app` — Pages Next.js (App Router)

Le dossier `app/` contient **toutes les pages** de l’application.

### Structure réelle

app/
├─ favicon.ico
├─ globals.css
├─ layout.tsx
├─ not-found.tsx
├─ page.tsx
├─ Providers.tsx
├─ robots.ts
├─ sitemap.ts
│
├─ about/
├─ add-property/
├─ favorites/
├─ forgot-password/
├─ login/
├─ logout/
├─ messaging/
├─ properties/
├─ register/
└─ unauthorized/

Code

### Points importants

- **layout.tsx** : layout global (Header, Footer, Providers)
- **Providers.tsx** : injection des contextes React
- **page.tsx** : page d’accueil
- **not-found.tsx** : page 404 personnalisée
- **robots.ts / sitemap.ts** : SEO automatisé

### Pages dynamiques

messaging/[id]/page.tsx
properties/[id]/page.tsx

Code

---

# 3. Dossier `/components` — Composants UI

Organisation réelle :

components/
├─ add-property/
├─ favorites/
├─ home/
├─ layout/
├─ login/
├─ messaging/
├─ properties/
├─ property/
├─ register/
└─ ui/

Code

### Rôle des sous-dossiers

| Dossier | Rôle |
|--------|------|
| add-property | Formulaires et sections du module d’ajout |
| favorites | Bouton et UI des favoris |
| home | Composants de la page d’accueil |
| layout | Header + Footer |
| login | Formulaire de connexion |
| messaging | UI du système de messagerie |
| properties | Composants génériques des propriétés |
| property | Composants spécifiques à la page détail |
| ui | Design system (Button, Card, Input, Spinner…) |

### Tests intégrés

Certains composants ont leurs tests dans :

components/properties/tests
components/property/tests
components/favorites/tests

Code

---

# 4. Dossier `/context` — Contextes React

Structure réelle :

context/
├─ AddPropertyContext.tsx
├─ AuthContext.tsx
├─ FavoritesContext.tsx
├─ MessagingContext.tsx
└─ tests/

Code

### Rôle des contextes

| Contexte | Rôle |
|----------|------|
| AuthContext | Gestion de l’utilisateur connecté (avant migration Auth.js) |
| FavoritesContext | Gestion locale des favoris |
| AddPropertyContext | Stockage temporaire du formulaire multi‑étapes |
| MessagingContext | Threads + messages en mémoire |

---

# 5. Dossier `/hooks` — Hooks personnalisés

Structure réelle :

hooks/
├─ useAuth.ts
├─ useFavorites.ts
├─ useIsMounted.ts
├─ useMediaQuery.ts
├─ useProperties.ts
├─ useProperty.ts
└─ useUpload.ts

Code

### Exemples de responsabilités

- `useAuth` → login/logout/register
- `useFavorites` → ajout/suppression favoris
- `useProperties` → liste des propriétés
- `useProperty` → détail d’une propriété
- `useUpload` → upload d’images
- `useMediaQuery` → responsive
- `useIsMounted` → éviter les erreurs SSR

---

# 6. Dossier `/lib` — Cœur logique du projet

Structure réelle :

lib/
├─ constants.ts
├─ env.ts
│
├─ api/
│   ├─ auth.ts
│   ├─ favorites.ts
│   ├─ fetchWithAuth.ts
│   ├─ properties.ts
│   └─ ratings.ts
│
├─ errors/
│   └─ ApiError.ts
│
└─ utils/
├─ fetcher.ts
├─ formatLocation.ts
└─ formatPrice.ts

Code

### Sous-dossiers

#### `/lib/api`
Contient **toutes les fonctions API frontend** :

- login / register / logout
- CRUD propriétés
- favoris
- notes
- fetchWithAuth
- apiFetch (fetcher générique)

#### `/lib/errors`
- `ApiError` : gestion centralisée des erreurs

#### `/lib/utils`
- `apiFetch` : fetch générique avec gestion avancée des erreurs
- formatteurs (prix, localisation)

---

# 7. Dossier `/types` — Types TypeScript

Structure réelle :

types/
├─ auth.ts
├─ favorites.ts
├─ message.ts
├─ property.ts
├─ Rating.ts
├─ UploadResponse.ts
└─ user.ts

Code

Chaque fichier définit les types utilisés dans les API et les composants.

---

# 8. Dossier `/mocks`

mocks/
└─ mockMessaging.ts

Code

Utilisé pour :

- tests
- développement local
- prévisualisation Storybook

---

# 9. Communication Frontend ↔ Backend

Le frontend utilise :

### ✔ `apiFetch<T>()`
- fetch générique
- typage strict
- gestion avancée des erreurs
- cookies HTTP-only envoyés automatiquement

### ✔ `fetchWithAuth()`
- version simplifiée
- pour les routes protégées

### Flux d’une requête

Composant → apiFetch() → fetch() → Backend → JSON → apiFetch() → Composant

Code

---

# 10. Authentification

Le projet utilise :

- cookies HTTP-only
- redirections via pages `/login` et `/unauthorized`
- gestion frontend via `useAuth` + `AuthContext`

---

# 11. Sécurité

- Cookies HTTP-only
- Pas de token dans localStorage
- Redirection automatique si non authentifié
- Gestion des erreurs API centralisée
- Pages protégées côté frontend

---

# 12. Résumé de l’architecture

Utilisateur
↓
Login → Cookie HTTP-only
↓
Pages Next.js (App Router)
↓
Contextes React (Auth, Favorites, Messaging)
↓
Hooks personnalisés
↓
apiFetch / fetchWithAuth
↓
Backend
↓
Base de données

Code

---

# 13. Conclusion

Cette architecture est :

- claire  
- modulaire  
- maintenable  
- sécurisée  
- adaptée à un projet professionnel  
- parfaitement documentée  
