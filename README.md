Frontend Kasa (Next.js 14)
📌 Description du projet
Ce projet est le frontend de l’application Kasa, développé avec Next.js 14 (App Router).
Il permet aux utilisateurs de :

consulter la liste des logements

afficher la fiche détaillée d’un logement

gérer leurs favoris

s’authentifier (inscription, connexion, déconnexion)

accéder à un module de messagerie (conversations + messages)

ajouter un logement via un formulaire complet

naviguer dans une interface responsive et moderne

Le frontend communique avec une API externe via la variable d’environnement NEXT_PUBLIC_API_URL.

Le projet est déployé sur Vercel :
👉 https://kasa-frontend-taupe.vercel.app/

🛠 Pré‑requis pour l’installation
Avant d’installer le projet, assure‑toi d’avoir :

Node.js ≥ 18

npm, yarn, pnpm ou bun

Une API backend accessible (locale ou en ligne)

Créer un fichier .env.local à la racine du projet :

Code
# URL de l’API backend locale
NEXT_PUBLIC_API_URL=http://localhost:3001

# Mode de l'application
NEXT_PUBLIC_ENV=development
En production (Vercel), la variable est :

Code
NEXT_PUBLIC_API_URL=https://kasa-backend-production-1060.up.railway.app
📥 Installation
Cloner le projet :

bash
git clone https://github.com/Gyroubounce/kasa-frontend.git
cd kasa-frontend
Installer les dépendances :

bash
npm install
🚀 Lancement du projet
Démarrer le serveur de développement :

bash
npm run dev
Le frontend sera accessible sur :

👉 http://localhost:3000

(Ton backend local tourne sur http://localhost:3001)