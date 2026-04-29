# Frontend Kasa (Next.js 14)

## 📌 Description du projet

Ce projet est le frontend de l'application Kasa, développé avec **Next.js 14** (App Router).

### Fonctionnalités principales :

- 🏠 Consulter la liste des logements
- 📋 Afficher la fiche détaillée d'un logement
- ❤️ Gérer leurs favoris
- 🔐 S'authentifier (inscription, connexion, déconnexion)
- 💬 Accéder à un module de messagerie (conversations + messages)
- ➕ Ajouter un logement via un formulaire complet
- 📱 Naviguer dans une interface responsive et moderne

Le frontend communique avec une API externe via la variable d'environnement `NEXT_PUBLIC_API_URL`.

**Déployé sur Vercel :** https://kasa-frontend-taupe.vercel.app/

## 🛠 Pré-requis pour l'installation

Avant d'installer le projet, assure-toi d'avoir :

- **Node.js** ≥ 18
- **npm**, yarn, pnpm ou bun
- Une API backend accessible (locale ou en ligne)

### Configuration de l'environnement

Crée un fichier `.env.local` à la racine du projet :

```env
# URL de l'API backend locale
NEXT_PUBLIC_API_URL=http://localhost:3001

# Mode de l'application
NEXT_PUBLIC_ENV=development
```
En production (Vercel), la variable est :

```env
NEXT_PUBLIC_API_URL=https://kasa-backend-2jkk.onrender.com
```
## 📥 Installation

1. **Cloner le projet :**

```bash
git clone https://github.com/Gyroubounce/kasa-frontend.git
cd kasa-frontend
```

2. **Installer les dépendances :**

```bash
npm install
```
## 🚀 Lancement du projet

Démarrer le serveur de développement :

```bash
npm run dev
```

Le frontend sera accessible sur : **http://localhost:3000**

> 💡 Ton backend local doit tourner sur **http://localhost:3001**