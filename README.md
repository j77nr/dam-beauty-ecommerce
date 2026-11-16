# 🌿 DAM Beauty & Cosmetics - E-Commerce Platform

> Site e-commerce de cosmétiques naturels togolais

[![Production Ready](https://img.shields.io/badge/status-production%20ready-success)](https://github.com)
[![React](https://img.shields.io/badge/React-18-blue)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
[![TanStack Start](https://img.shields.io/badge/TanStack-Start-orange)](https://tanstack.com/start)

---

## ✨ Fonctionnalités

### 🛒 E-Commerce Complet
- ✅ Catalogue de produits avec filtres
- ✅ Panier d'achat (utilisateurs et invités)
- ✅ Processus de commande complet
- ✅ Gestion des frais de livraison
- ✅ Multiples modes de paiement

### 👤 Gestion Utilisateurs
- ✅ Inscription et connexion
- ✅ Compte utilisateur avec historique des commandes
- ✅ Sessions sécurisées (cookies HttpOnly)
- ✅ Rôles : Client et Administrateur

### 👨‍💼 Panel Administrateur
- ✅ Dashboard avec statistiques en temps réel
- ✅ Gestion complète des commandes
- ✅ CRUD produits
- ✅ Changement de statuts des commandes

### 🎨 Interface Utilisateur
- ✅ Design moderne et épuré
- ✅ 100% responsive (mobile, tablette, desktop)
- ✅ 50+ composants UI (shadcn/ui)
- ✅ Thème personnalisé
- ✅ Toasts et notifications

---

## 🚀 Démarrage Rapide

### Prérequis
- Node.js 18+ 
- npm ou yarn

### Installation

```bash
# Cloner le projet
git clone <repo-url>
cd dev-server

# Installer les dépendances
npm install

# Initialiser la base de données
npm run db:push

# Définir un mot de passe admin unique d'au moins 12 caractères avant le seed
# PowerShell
$env:ADMIN_SEED_PASSWORD = "votre-mot-de-passe-unique-de-12-caracteres-minimum"
npm run db:seed

# Lancer le serveur de développement
npm run dev
```

Sur macOS ou Linux, définissez la variable avec `export ADMIN_SEED_PASSWORD="votre-mot-de-passe-unique-de-12-caracteres-minimum"` avant `npm run db:seed`.

Le site sera accessible sur **http://localhost:3000**

---

## 🔑 Comptes de Test

### Administrateur
```
Email: admin@damcosmetics.tg
Mot de passe: valeur configurée via ADMIN_SEED_PASSWORD
```
→ Accès panel admin : `/admin`

### Client
```
Email: client@example.com
Mot de passe: Client123!
```
→ Accès compte : `/compte`

---

## 📁 Structure du Projet

```
dev-server/
├── src/
│   ├── routes/              # Pages et API routes (file-based routing)
│   │   ├── api/            # Endpoints API REST
│   │   │   ├── auth/       # Authentification
│   │   │   ├── cart/       # Panier
│   │   │   ├── orders/     # Commandes
│   │   │   └── admin/      # Admin API
│   │   ├── admin/          # Pages admin
│   │   ├── index.tsx       # Page d'accueil
│   │   ├── catalogue/      # Catalogue produits
│   │   ├── panier.tsx      # Page panier
│   │   ├── commander.tsx   # Page checkout
│   │   └── compte.tsx      # Page compte utilisateur
│   ├── components/         # Composants React
│   │   ├── ui/            # Composants shadcn/ui
│   │   ├── site-header.tsx
│   │   ├── site-footer.tsx
│   │   └── product-card.tsx
│   ├── lib/               # Utilitaires et contexts
│   │   ├── auth.ts        # Fonctions d'authentification
│   │   ├── auth-context.tsx
│   │   ├── cart-context.tsx
│   │   ├── site-data.ts
│   │   └── utils.ts
│   ├── db/                # Base de données
│   │   ├── schema.ts      # Schéma Drizzle (8 tables)
│   │   ├── index.ts       # Connexion DB
│   │   └── seed.ts        # Données de test
│   ├── assets/            # Images et médias
│   └── router.tsx         # Configuration du routeur
├── public/                # Fichiers statiques
├── drizzle.config.ts     # Configuration Drizzle ORM
├── package.json
└── README.md
```

---

## 🛠️ Stack Technique

### Frontend
- **React 18** - Framework UI
- **TypeScript** - Typage statique
- **TanStack Start** - Framework full-stack React
- **TanStack Router** - Routing file-based
- **Tailwind CSS** - Framework CSS utility-first
- **shadcn/ui** - Composants UI
- **Lucide React** - Icônes
- **Sonner** - Toast notifications

### Backend
- **TanStack Start API** - API Routes file-based
- **Drizzle ORM** - ORM TypeScript-first
- **SQLite** - Base de données (dev)
- **bcryptjs** - Hashage de mots de passe
- **Zod** - Validation de schémas
- **nanoid** - Génération d'IDs uniques

### DevOps
- **Vite** - Build tool ultra-rapide
- **Node.js** - Runtime JavaScript
- **npm** - Package manager

---

## 📊 Base de Données

### Schéma (8 tables)

#### Tables Principales
- **users** - Utilisateurs (clients et admins)
- **sessions** - Sessions d'authentification
- **products** - Catalogue de produits
- **carts** - Paniers d'achat
- **cart_items** - Articles dans les paniers
- **orders** - Commandes clients
- **order_items** - Détails des commandes
- **blog_posts** - Articles de blog

Voir le schéma complet dans `src/db/schema.ts`

---

## 🔐 Sécurité

- ✅ Mots de passe hashés avec bcrypt (10 rounds)
- ✅ Sessions sécurisées avec cookies HttpOnly
- ✅ Validation des données avec Zod
- ✅ Protection des routes admin
- ✅ Requêtes SQL sécurisées via ORM
- ✅ Prévention des injections

---

## 🚚 Livraison & Paiement

### Livraison
- **Gratuite** à Lomé
- **2000 FCFA** hors de Lomé
- Calcul automatique selon la ville

### Modes de Paiement
1. **Mobile Money (Momo)** - Paiement en ligne
2. **Tmoney** - Paiement en ligne
3. **Carte bancaire** - Paiement sécurisé
4. **Cash** - Paiement à la livraison

> Note : L'intégration des passerelles de paiement (Fedapay/Kkiapay) est préparée mais nécessite les clés API.

---

## 📝 Scripts Disponibles

```bash
# Développement
npm run dev              # Lancer le serveur de développement

# Build
npm run build            # Build pour la production
npm run start            # Lancer en production

# Base de données
npm run db:push          # Créer/mettre à jour les tables
npm run db:seed          # Peupler avec des données de test
npx drizzle-kit studio   # Interface graphique pour la DB

# Code Quality
npm run lint             # Linter le code
npm run type-check       # Vérifier les types TypeScript
```

---

## 📚 Documentation

- 📖 **[DEMARRAGE_RAPIDE.md](./DEMARRAGE_RAPIDE.md)** - Guide de démarrage en 5 minutes
- 📖 **[IMPLEMENTATION_COMPLETE.md](./IMPLEMENTATION_COMPLETE.md)** - Documentation complète des fonctionnalités
- 📖 **[CHECKLIST_TESTS.md](./CHECKLIST_TESTS.md)** - Checklist de tests complets
- 📖 **[ECOMMERCE_SETUP.md](./ECOMMERCE_SETUP.md)** - Guide de configuration technique
- 📖 **[GUIDE_PROCHAINES_ETAPES.md](./GUIDE_PROCHAINES_ETAPES.md)** - Guide de développement pas-à-pas
- 📖 **[ANALYSE_CAHIER_DES_CHARGES.md](./ANALYSE_CAHIER_DES_CHARGES.md)** - Analyse vs cahier des charges

---

## 🧪 Tests

Suivez la checklist complète dans **[CHECKLIST_TESTS.md](./CHECKLIST_TESTS.md)** pour tester :

- ✅ Authentification (inscription, connexion, déconnexion)
- ✅ Panier (ajout, modification, suppression)
- ✅ Commandes (checkout, confirmation, historique)
- ✅ Panel admin (dashboard, gestion commandes, gestion produits)
- ✅ Sécurité (protection des routes, API)
- ✅ Interface (responsive, navigation, toasts)

---

## 🚀 Déploiement

### Recommandations

**Frontend**
- Vercel (recommandé pour TanStack Start)
- Netlify
- Cloudflare Pages

**Base de Données**
- PostgreSQL (Supabase, Neon, Railway)
- Migrer de SQLite à PostgreSQL en production

**Médias**
- Cloudinary (images)
- S3 / R2 (stockage)

### Variables d'Environnement

```env
# Base de données
DATABASE_URL=postgresql://...

# Paiement (optionnel)
FEDAPAY_PUBLIC_KEY=pk_...
FEDAPAY_SECRET_KEY=sk_...

# Email (optionnel)
SMTP_HOST=...
SMTP_PORT=...
SMTP_USER=...
SMTP_PASS=...
```

---

## 🎯 Roadmap

### ✅ Phase 1 - MVP (Terminé)
- [x] Authentification complète
- [x] Gestion du panier
- [x] Processus de commande
- [x] Panel admin
- [x] Interface responsive

### 🔜 Phase 2 - Améliorations
- [ ] Intégration Fedapay/Kkiapay
- [ ] Envoi d'emails automatiques
- [ ] Recherche et filtres avancés
- [ ] Upload d'images dans l'admin
- [ ] Statistiques détaillées

### 🔮 Phase 3 - Features Avancées
- [ ] Wishlist
- [ ] Codes promo
- [ ] Programme de fidélité
- [ ] Multi-langue (FR/EN)
- [ ] Chat support
- [ ] Mobile app (React Native)

---

## 🤝 Contribution

Les contributions sont les bienvenues !

1. Fork le projet
2. Créer une branche (`git checkout -b feature/AmazingFeature`)
3. Commit les changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

---

## 📄 Licence

Ce projet est privé et appartient à **DAM Beauty & Cosmetics**.

---

## 👥 Contact

**DAM Beauty & Cosmetics**
- Email: contact@damcosmetics.tg
- Téléphone: +228 98 14 54 29
- Responsable: AKAKPO Mawulawoe Debora

---

## 🙏 Remerciements

- [TanStack](https://tanstack.com/) pour leur excellent framework
- [shadcn](https://ui.shadcn.com/) pour les composants UI
- [Drizzle](https://orm.drizzle.team/) pour l'ORM moderne
- La communauté open-source

---

**Fait avec ❤️ au Togo 🇹🇬**

---

_Dernière mise à jour : 27 juin 2026_
