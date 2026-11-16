# 🚀 Démarrage Rapide - DAM Beauty & Cosmetics

## Installation et Lancement en 5 Minutes

### Étape 1 : Installation des dépendances
```bash
npm install
```

### Étape 2 : Configuration de la base de données
```bash
# Créer les tables
npm run db:push

# Définir ADMIN_SEED_PASSWORD (au moins 12 caractères), puis peupler
$env:ADMIN_SEED_PASSWORD = "votre-mot-de-passe-unique-de-12-caracteres-minimum"
npm run db:seed
```

### Étape 3 : Lancer le serveur de développement
```bash
npm run dev
```

Le site sera accessible sur **http://localhost:3000**

---

## 🔑 Comptes de Test

Une fois la base de données peuplée, utilisez ces comptes :

### Administrateur
```
Email: admin@damcosmetics.tg
Mot de passe: valeur configurée via ADMIN_SEED_PASSWORD
```
→ Accès : `/admin`

### Client
```
Email: client@example.com
Mot de passe: Client123!
```
→ Accès : `/compte`

---

## 📍 Pages Principales

### Pages Publiques
- **Accueil** : http://localhost:3000/
- **Catalogue** : http://localhost:3000/catalogue
- **Panier** : http://localhost:3000/panier
- **À propos** : http://localhost:3000/a-propos
- **Blog** : http://localhost:3000/blog
- **Contact** : http://localhost:3000/contact

### Authentification
- **Connexion** : http://localhost:3000/connexion
- **Inscription** : http://localhost:3000/inscription
- **Mon compte** : http://localhost:3000/compte

### Admin (nécessite connexion admin)
- **Dashboard** : http://localhost:3000/admin
- **Commandes** : http://localhost:3000/admin/commandes
- **Produits** : http://localhost:3000/admin/produits

---

## ✅ Test Rapide du Workflow

### 1. Tester le Panier (Utilisateur Invité)
1. Aller sur http://localhost:3000/catalogue
2. Cliquer sur un produit
3. Cliquer sur "Ajouter au panier"
4. Voir l'icône panier (en haut à droite) afficher le nombre d'articles
5. Cliquer sur l'icône panier
6. Modifier les quantités
7. Cliquer sur "Passer la commande"

### 2. Tester le Checkout
1. Remplir le formulaire de commande
2. Choisir un mode de paiement
3. Confirmer la commande
4. Voir la page de confirmation avec le numéro de commande

### 3. Tester le Compte Client
1. Se connecter avec : `client@example.com` / `Client123!`
2. Aller sur `/compte`
3. Voir la liste de vos commandes
4. Cliquer sur "Voir les détails" d'une commande

### 4. Tester l'Admin
1. Se connecter avec `admin@damcosmetics.tg` et le mot de passe configuré via `ADMIN_SEED_PASSWORD`
2. Aller sur `/admin`
3. Voir le dashboard avec les statistiques
4. Aller sur `/admin/commandes`
5. Changer le statut d'une commande
6. Aller sur `/admin/produits`
7. Créer un nouveau produit
8. Modifier un produit existant

---

## 🗂️ Structure du Projet

```
dev-server/
├── src/
│   ├── routes/              # Pages et API routes
│   │   ├── api/            # Endpoints API
│   │   │   ├── auth/       # Authentification
│   │   │   ├── cart/       # Panier
│   │   │   ├── orders/     # Commandes
│   │   │   └── admin/      # Admin API
│   │   ├── admin/          # Pages admin
│   │   ├── catalogue/      # Pages produits
│   │   ├── index.tsx       # Page d'accueil
│   │   ├── panier.tsx      # Page panier
│   │   ├── commander.tsx   # Page checkout
│   │   └── compte.tsx      # Page compte
│   ├── components/         # Composants React
│   │   ├── ui/            # Composants shadcn/ui
│   │   ├── site-header.tsx
│   │   └── site-footer.tsx
│   ├── lib/               # Utilitaires
│   │   ├── auth.ts        # Fonctions auth
│   │   ├── auth-context.tsx
│   │   └── cart-context.tsx
│   ├── db/                # Base de données
│   │   ├── schema.ts      # Schéma Drizzle
│   │   ├── index.ts       # Connexion
│   │   └── seed.ts        # Données de test
│   └── assets/            # Images
├── drizzle.config.ts      # Config Drizzle
├── package.json
└── README.md
```

---

## 🐛 Résolution de Problèmes

### La base de données est verrouillée
```bash
# Fermer tous les processus Node.js
# Puis relancer :
npm run dev
```

### Erreur "Module not found"
```bash
npm install
```

### Les routes ne se chargent pas
```bash
npm run build
```

### Réinitialiser complètement la base de données
```bash
# Supprimer le fichier SQLite
rm sqlite.db  # (Linux/Mac)
del sqlite.db  # (Windows)

# Recréer les tables et peupler
npm run db:push
npm run db:seed
```

---

## 📚 Ressources

- **Documentation TanStack Start** : https://tanstack.com/start
- **Documentation Drizzle** : https://orm.drizzle.team
- **Documentation shadcn/ui** : https://ui.shadcn.com
- **Documentation Tailwind CSS** : https://tailwindcss.com

---

## 🎯 Prochaines Actions

1. ✅ Tester toutes les fonctionnalités
2. ✅ Personnaliser les données de test dans `src/db/seed.ts`
3. ✅ Ajouter vos propres produits via l'admin
4. ✅ Configurer l'intégration de paiement (Fedapay/Kkiapay)
5. ✅ Configurer l'envoi d'emails
6. ✅ Déployer en production

---

## 💡 Astuce Pro

Ouvrez deux onglets de navigateur :
1. **Onglet 1** : Mode Client (navigation normale)
2. **Onglet 2** : Mode Admin (connecté en tant qu'admin)

Ainsi, vous pouvez passer une commande en tant que client dans l'onglet 1, puis la gérer immédiatement dans l'onglet 2 en tant qu'admin !

---

**Bon développement ! 🚀**
