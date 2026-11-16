# 🏗️ Architecture du Site E-Commerce DAM

## Vue d'Ensemble

```
┌─────────────────────────────────────────────────────────────┐
│                    UTILISATEURS                              │
├─────────────────────────────────────────────────────────────┤
│  👤 Client              |  👨‍💼 Admin                          │
│  - Catalogue            |  - Dashboard                       │
│  - Panier               |  - Gestion commandes               │
│  - Commandes            |  - Gestion produits                │
│  - Compte               |  - Statistiques                    │
└──────────────┬──────────────────────────┬───────────────────┘
               │                          │
               ▼                          ▼
┌─────────────────────────────────────────────────────────────┐
│              FRONTEND (React + TanStack Router)              │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  📄 Pages Publiques                                          │
│  ├─ / (Accueil)                                             │
│  ├─ /catalogue (Liste produits)                             │
│  ├─ /catalogue/:slug (Détail produit)                       │
│  ├─ /a-propos                                               │
│  ├─ /blog                                                   │
│  └─ /contact                                                │
│                                                              │
│  🛒 Pages E-Commerce                                         │
│  ├─ /panier (Panier d'achat)                                │
│  ├─ /commander (Checkout)                                   │
│  └─ /commande-confirmee (Confirmation)                      │
│                                                              │
│  👤 Pages Utilisateur                                        │
│  ├─ /connexion                                              │
│  ├─ /inscription                                            │
│  └─ /compte (Profil + Historique commandes)                │
│                                                              │
│  👨‍💼 Pages Admin (Protégées)                                 │
│  ├─ /admin (Dashboard + Stats)                             │
│  ├─ /admin/commandes (Gestion commandes)                   │
│  └─ /admin/produits (CRUD produits)                        │
│                                                              │
└──────────────┬──────────────────────────────────────────────┘
               │
               │ HTTP Requests (GET, POST, PUT, DELETE)
               │
               ▼
┌─────────────────────────────────────────────────────────────┐
│                    API ROUTES (REST)                         │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  🔐 Authentification (/api/auth)                             │
│  ├─ POST /api/auth/register    - Inscription                │
│  ├─ POST /api/auth/login       - Connexion                  │
│  ├─ POST /api/auth/logout      - Déconnexion                │
│  └─ GET  /api/auth/me          - Session utilisateur        │
│                                                              │
│  🛒 Panier (/api/cart)                                       │
│  ├─ GET    /api/cart           - Récupérer le panier        │
│  ├─ POST   /api/cart/add       - Ajouter un produit         │
│  ├─ PUT    /api/cart/update    - Modifier quantité          │
│  └─ DELETE /api/cart/remove    - Supprimer un article       │
│                                                              │
│  📦 Commandes (/api/orders)                                  │
│  ├─ GET  /api/orders           - Liste commandes user       │
│  ├─ GET  /api/orders/:id       - Détail commande            │
│  └─ POST /api/orders/create    - Créer une commande         │
│                                                              │
│  🏪 Produits (/api/products)                                 │
│  └─ GET  /api/products         - Liste tous les produits    │
│                                                              │
│  👨‍💼 Admin (/api/admin) - Protégées par rôle                 │
│  ├─ GET    /api/admin/stats                - Statistiques   │
│  ├─ GET    /api/admin/orders               - Toutes commandes│
│  ├─ PUT    /api/admin/orders/update-status - Changer statut │
│  ├─ POST   /api/admin/products/create      - Créer produit  │
│  ├─ PUT    /api/admin/products/update      - Modifier produit│
│  └─ DELETE /api/admin/products/delete      - Supprimer produit│
│                                                              │
└──────────────┬──────────────────────────────────────────────┘
               │
               │ SQL Queries (Drizzle ORM)
               │
               ▼
┌─────────────────────────────────────────────────────────────┐
│              BASE DE DONNÉES (SQLite + Drizzle)              │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  📊 Tables (8)                                               │
│                                                              │
│  👤 users                                                    │
│  ├─ id, email, password (hashed)                            │
│  ├─ nom, prenom, telephone                                  │
│  ├─ role (client | admin)                                   │
│  └─ createdAt                                               │
│                                                              │
│  🔐 sessions                                                 │
│  ├─ id, userId                                              │
│  └─ expiresAt                                               │
│                                                              │
│  🏪 products                                                 │
│  ├─ id, slug, name, subtitle                                │
│  ├─ price, category, image                                  │
│  ├─ short, description, ingredients (JSON)                  │
│  ├─ usage, inStock                                          │
│  └─ createdAt                                               │
│                                                              │
│  🛒 carts                                                    │
│  ├─ id, userId (nullable)                                   │
│  ├─ sessionId (pour invités)                                │
│  └─ createdAt                                               │
│                                                              │
│  📦 cart_items                                               │
│  ├─ id, cartId, productId                                   │
│  ├─ quantity                                                │
│  └─ createdAt                                               │
│                                                              │
│  📦 orders                                                   │
│  ├─ id, userId, orderNumber                                 │
│  ├─ Client: nom, prenom, email, telephone                   │
│  ├─ Adresse: rue, quartier, ville, pays                     │
│  ├─ Montants: subtotal, fraisLivraison, total               │
│  ├─ Statuts: status, paymentStatus, paymentMethod           │
│  ├─ notes                                                   │
│  └─ createdAt, updatedAt                                    │
│                                                              │
│  📦 order_items                                              │
│  ├─ id, orderId, productId                                  │
│  ├─ Snapshot: productName, productPrice                     │
│  ├─ quantity, subtotal                                      │
│  └─ (Preserve les prix au moment de la commande)            │
│                                                              │
│  📝 blog_posts                                               │
│  ├─ id, slug, title, excerpt                                │
│  ├─ category, image, content                                │
│  └─ publishedAt, createdAt                                  │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## 🔄 Flux de Données

### 1. Authentification

```
Client                  Frontend                API                 Database
  │                        │                     │                      │
  │─── Formulaire Login ──▶│                     │                      │
  │                        │─── POST /auth/login ▶│                      │
  │                        │                     │─── Vérifier user ───▶│
  │                        │                     │◀─── User data ───────│
  │                        │                     │─── Créer session ───▶│
  │                        │                     │◀─── SessionId ───────│
  │                        │◀─── Cookie + User ──│                      │
  │◀─── Redirection /compte │                     │                      │
```

### 2. Ajout au Panier

```
Client                  Frontend                API                 Database
  │                        │                     │                      │
  │─ Clic "Ajouter" ──────▶│                     │                      │
  │                        │─ POST /cart/add ───▶│                      │
  │                        │                     │─ Parse cookie ──────▶│
  │                        │                     │─ Get/Create cart ───▶│
  │                        │                     │─ Add item ──────────▶│
  │                        │◀─── Success ────────│                      │
  │◀─── Toast + Update ────│                     │                      │
  │    (compteur)          │                     │                      │
```

### 3. Processus de Commande

```
Client                  Frontend                API                 Database
  │                        │                     │                      │
  │─ Remplir formulaire ──▶│                     │                      │
  │─ Clic "Confirmer" ─────▶│                     │                      │
  │                        │─ POST /orders/create ▶│                      │
  │                        │                     │─ Validate data ─────▶│
  │                        │                     │─ Create order ──────▶│
  │                        │                     │─ Create order_items ▶│
  │                        │                     │─ Empty cart ────────▶│
  │                        │◀─ OrderNumber ──────│                      │
  │◀─ /commande-confirmee ─│                     │                      │
```

### 4. Changement de Statut (Admin)

```
Admin                   Frontend                API                 Database
  │                        │                     │                      │
  │─ Change dropdown ─────▶│                     │                      │
  │                        │─ PUT /admin/orders/ ▶│                      │
  │                        │   update-status     │                      │
  │                        │                     │─ Verify role ───────▶│
  │                        │                     │─ Update status ─────▶│
  │                        │◀─── Success ────────│                      │
  │◀─── Toast + Refresh ───│                     │                      │
```

---

## 🔐 Sécurité

### Niveau 1 : Frontend
```
┌─────────────────────────────┐
│  Protection des Routes      │
│  - Navigate si non auth     │
│  - Vérification rôle admin  │
└─────────────────────────────┘
```

### Niveau 2 : API
```
┌─────────────────────────────┐
│  Middleware Auth            │
│  - Parse cookie             │
│  - Validate session         │
│  - Vérifier userId/role     │
│  - Return 401/403 si refusé │
└─────────────────────────────┘
```

### Niveau 3 : Base de Données
```
┌─────────────────────────────┐
│  ORM Type-Safe              │
│  - Drizzle ORM              │
│  - Pas de raw SQL           │
│  - Prévention injections    │
└─────────────────────────────┘
```

### Niveau 4 : Validation
```
┌─────────────────────────────┐
│  Zod Schemas                │
│  - Validation toutes entrées│
│  - Types stricts            │
│  - Messages d'erreur clairs │
└─────────────────────────────┘
```

---

## 📦 Contextes React

```
App Root
  └─ AuthProvider (src/lib/auth-context.tsx)
      ├─ user: User | null
      ├─ loading: boolean
      ├─ logout()
      └─ refetch()
      │
      └─ CartProvider (src/lib/cart-context.tsx)
          ├─ items: CartItem[]
          ├─ itemCount: number
          ├─ total: number
          ├─ addToCart(productId, quantity)
          ├─ removeFromCart(itemId)
          ├─ updateQuantity(itemId, quantity)
          └─ refetch()
          │
          └─ Pages & Components
```

---

## 🎨 Composants UI

### shadcn/ui (50+ composants)
```
src/components/ui/
├── accordion.tsx        ├── alert-dialog.tsx      ├── alert.tsx
├── aspect-ratio.tsx     ├── avatar.tsx            ├── badge.tsx
├── breadcrumb.tsx       ├── button.tsx            ├── calendar.tsx
├── card.tsx             ├── carousel.tsx          ├── chart.tsx
├── checkbox.tsx         ├── collapsible.tsx       ├── command.tsx
├── context-menu.tsx     ├── dialog.tsx            ├── drawer.tsx
├── dropdown-menu.tsx    ├── form.tsx              ├── hover-card.tsx
├── input-otp.tsx        ├── input.tsx             ├── label.tsx
├── menubar.tsx          ├── navigation-menu.tsx   ├── pagination.tsx
├── popover.tsx          ├── progress.tsx          ├── radio-group.tsx
├── resizable.tsx        ├── scroll-area.tsx       ├── select.tsx
├── separator.tsx        ├── sheet.tsx             ├── sidebar.tsx
├── skeleton.tsx         ├── slider.tsx            ├── sonner.tsx
├── switch.tsx           ├── table.tsx             ├── tabs.tsx
├── textarea.tsx         ├── toggle-group.tsx      ├── toggle.tsx
└── tooltip.tsx
```

### Composants Personnalisés
```
src/components/
├── site-header.tsx      → Navigation principale
├── site-footer.tsx      → Pied de page
└── product-card.tsx     → Carte produit
```

---

## 🗂️ Routing File-Based

```
src/routes/
├── __root.tsx                  → Layout racine (Providers)
├── index.tsx                   → Page d'accueil
├── a-propos.tsx
├── blog.tsx
├── catalogue.tsx
├── catalogue.$slug.tsx         → Détail produit
├── contact.tsx
├── galerie.tsx
├── panier.tsx                  → Panier d'achat
├── commander.tsx               → Checkout
├── commande-confirmee.tsx      → Confirmation
├── connexion.tsx
├── inscription.tsx
├── compte.tsx                  → Compte utilisateur
└── admin/
    ├── index.tsx               → Dashboard
    ├── commandes.tsx           → Gestion commandes
    └── produits.tsx            → Gestion produits
```

---

## 🔄 États de Commande

```
┌─────────────┐
│ en_attente  │ ──┐
└─────────────┘   │
                  ▼
┌─────────────┐
│ confirmee   │ ──┐
└─────────────┘   │
                  ▼
┌─────────────┐
│ en_preparation│─┐
└─────────────┘ │
                ▼
┌─────────────┐
│ en_livraison│─┐
└─────────────┘ │
                ▼
┌─────────────┐
│   livree    │
└─────────────┘

      OU

┌─────────────┐
│  annulee    │
└─────────────┘
```

---

## 📊 Statistiques Admin

```
Dashboard
├─ Revenus totaux
│  └─ SUM(orders.total) WHERE status != 'annulee'
│
├─ Nombre de commandes
│  └─ COUNT(orders.id)
│
├─ Commandes en attente
│  └─ COUNT(orders.id) WHERE status = 'en_attente'
│
├─ Nombre de produits
│  └─ COUNT(products.id)
│
└─ Dernières commandes
   └─ SELECT * FROM orders ORDER BY createdAt DESC LIMIT 5
```

---

**Cette architecture garantit :**
- ✅ Scalabilité
- ✅ Maintenabilité
- ✅ Sécurité
- ✅ Performance
- ✅ Type-safety (TypeScript)
