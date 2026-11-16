# 🛒 Configuration E-Commerce DAM

## ✅ Fonctionnalités Implémentées

### 1. **Base de Données Complète** (SQLite + Drizzle ORM)
- ✅ Tables : users, sessions, products, carts, cart_items, orders, order_items, blog_posts
- ✅ Relations et contraintes intégrées
- ✅ Migration automatique avec Drizzle Kit

### 2. **Système d'Authentification**
- ✅ Inscription / Connexion / Déconnexion
- ✅ Hash des mots de passe (bcrypt)
- ✅ Sessions sécurisées avec cookies HttpOnly
- ✅ Context React pour gérer l'état d'authentification
- ✅ Protection des routes (redirection si non connecté)

### 3. **Pages Utilisateur**
- ✅ `/connexion` - Page de connexion
- ✅ `/inscription` - Page d'inscription
- ✅ `/compte` - Page du compte utilisateur
- ✅ Header mis à jour avec boutons connexion/compte

### 4. **Structure E-Commerce**
- ✅ Modèle de données pour le panier
- ✅ Modèle de données pour les commandes
- ✅ Support des guests (panier par session)
- ✅ Statuts de commande (en_attente, confirmee, en_livraison, livree, annulee)
- ✅ Méthodes de paiement (momo, tmoney, carte, cash)

---

## 🚀 Installation & Configuration

### Étape 1 : Installer les dépendances manquantes

**IMPORTANT** : `better-sqlite3` nécessite Visual Studio Build Tools sur Windows.

#### Option A : Installer Visual Studio Build Tools (Recommandé)
```bash
# Télécharger et installer depuis :
# https://visualstudio.microsoft.com/visual-cpp-build-tools/

# Puis installer les dépendances
npm install
```

#### Option B : Utiliser une alternative (Si problème avec better-sqlite3)
```bash
# Remplacer better-sqlite3 par libsql
npm uninstall better-sqlite3
npm install @libsql/client
```

Et modifier `src/db/index.ts` :
```typescript
import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import * as schema from "./schema";

const client = createClient({ url: "file:dam.db" });
export const db = drizzle(client, { schema });
```

### Étape 2 : Générer et Appliquer les Migrations

```bash
# Générer les migrations SQL
npx drizzle-kit generate

# Appliquer les migrations
npx drizzle-kit push
```

### Étape 3 : Peupler la Base de Données

```bash
# Ajouter ce script dans package.json
"scripts": {
  "db:seed": "tsx src/db/seed.ts"
}

# Exécuter le seed
npm run db:seed
```

Cela va créer :
- ✅ Un compte admin : `admin@dam.com` / `admin123`
- ✅ Tous les produits du catalogue
- ✅ Tous les articles de blog

### Étape 4 : Lancer le Serveur

```bash
npm run dev
```

Visitez : `http://localhost:3000`

---

## 📋 Prochaines Étapes (À Implémenter)

### Priorité HAUTE

#### 1. **API Panier** (30min)
- `POST /api/cart/add` - Ajouter un produit au panier
- `GET /api/cart` - Récupérer le panier
- `PUT /api/cart/update` - Mettre à jour une quantité
- `DELETE /api/cart/remove` - Retirer un produit

#### 2. **API Commandes** (45min)
- `POST /api/orders/create` - Créer une commande
- `GET /api/orders` - Liste des commandes (utilisateur)
- `GET /api/orders/:id` - Détails d'une commande
- `PUT /api/orders/:id/status` - Mettre à jour le statut (admin)

#### 3. **Interface Panier** (1h)
- Page `/panier` avec liste des produits
- Bouton "Ajouter au panier" sur les fiches produits
- Icône panier dans le header avec compteur
- Calcul automatique du total

#### 4. **Processus de Checkout** (1h30)
- Page `/commander` - Formulaire de commande
- Validation des données
- Sélection du mode de paiement
- Confirmation de commande
- Email de confirmation (optionnel)

#### 5. **Panel Admin** (2h)
- Page `/admin` protégée (role = admin)
- Dashboard : stats (commandes, revenus, produits)
- Gestion des commandes (liste, détails, changement de statut)
- Gestion des produits (CRUD)
- Liste des utilisateurs

### Priorité MOYENNE

#### 6. **Paiement Mobile Money** (2h)
- Intégration API Fedapay ou Kkiapay
- Redirection vers la plateforme de paiement
- Callback de confirmation
- Mise à jour automatique du statut

#### 7. **Gestion des Stocks** (1h)
- Champ `stock` dans la table products
- Décrémenter le stock après commande
- Afficher "Rupture de stock" si stock = 0
- Notification admin si stock faible

#### 8. **Système de Recherche** (45min)
- Recherche full-text dans les produits
- Filtres avancés (prix, catégorie, disponibilité)
- Tri (prix croissant/décroissant, nouveautés)

### Priorité BASSE (Optionnel)

#### 9. **Wishlist / Favoris**
- Table `wishlist` en BDD
- Bouton cœur sur les produits
- Page `/favoris`

#### 10. **Système de Points / Fidélité**
- Gagner des points à chaque commande
- Utiliser les points pour réduire le prix

#### 11. **Codes Promo**
- Table `promo_codes` en BDD
- Champ de saisie au checkout
- Application de la réduction

---

## 🗂️ Structure des Fichiers Créés

```
src/
├── db/
│   ├── index.ts              # Connexion DB
│   ├── schema.ts             # Schéma complet (users, products, orders, etc.)
│   └── seed.ts               # Script de peuplement
├── lib/
│   ├── auth.ts               # Utilitaires d'authentification
│   └── auth-context.tsx      # Context React pour l'auth
├── routes/
│   ├── connexion.tsx         # Page de connexion
│   ├── inscription.tsx       # Page d'inscription
│   ├── compte.tsx            # Page compte utilisateur
│   └── api/
│       └── auth/
│           ├── login.ts      # POST /api/auth/login
│           ├── register.ts   # POST /api/auth/register
│           ├── logout.ts     # POST /api/auth/logout
│           └── me.ts         # GET /api/auth/me
└── components/
    └── site-header.tsx       # Header mis à jour avec auth
```

---

## 🧪 Test Manuel

### 1. Inscription
1. Aller sur `/inscription`
2. Remplir le formulaire
3. Vérifier la redirection vers `/compte`

### 2. Connexion
1. Aller sur `/connexion`
2. Se connecter avec `admin@dam.com` / `admin123`
3. Vérifier la redirection vers `/compte`

### 3. Protection des Routes
1. Se déconnecter
2. Essayer d'accéder à `/compte`
3. Vérifier la redirection vers `/connexion`

---

## ❓ Questions Fréquentes

**Q : Pourquoi SQLite ?**
R : Simple à configurer, pas besoin de serveur DB séparé, parfait pour le développement et les petits projets.

**Q : Puis-je utiliser PostgreSQL/MySQL ?**
R : Oui ! Drizzle ORM supporte PostgreSQL et MySQL. Modifier `drizzle.config.ts` et `src/db/index.ts`.

**Q : Comment ajouter un nouvel admin ?**
R : Utiliser le script `seed.ts` ou créer manuellement un utilisateur avec `role = "admin"`.

**Q : Comment sécuriser davantage l'API ?**
R : Ajouter des rate limits, CSRF tokens, validation plus stricte, JWT au lieu de sessions.

---

## 📞 Support

Pour toute question ou problème :
- Email : akakpodeborah1@gmail.com
- Téléphone : +228 98 14 54 29

---

**Dernière mise à jour** : 18 juin 2026
**Version** : 1.0.0 - Phase 1 (Auth + Structure DB)
