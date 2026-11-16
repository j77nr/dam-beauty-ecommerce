# 🚀 Guide Pas-à-Pas : Compléter le Site E-Commerce DAM

## 📌 Avant de Commencer

**Temps total estimé** : 6-8 heures pour un site e-commerce 100% fonctionnel

**Prérequis** :
- Node.js installé
- Dépendances installées (`npm install`)
- Base de données initialisée (voir `ECOMMERCE_SETUP.md`)

---

## 🎯 ÉTAPE 1 : API du Panier (30 minutes)

### Fichiers à créer :

#### 1.1 - `/src/routes/api/cart/index.ts`
```typescript
import { json } from "@tanstack/react-start";
import { createAPIFileRoute } from "@tanstack/react-start/api";
import { db, carts, cartItems, products } from "@/db";
import { eq, and } from "drizzle-orm";
import { parse } from "cookie";
import { validateSession } from "@/lib/auth";
import { nanoid } from "nanoid";

export const APIRoute = createAPIFileRoute("/api/cart")({
  // GET - Récupérer le panier
  GET: async ({ request }) => {
    const cookieHeader = request.headers.get("Cookie");
    const cookies = parse(cookieHeader || "");
    
    // Essayer de récupérer l'utilisateur connecté
    const session = await validateSession(cookies.dam_session);
    
    // Sinon utiliser une session anonyme
    let sessionId = cookies.dam_cart_session;
    if (!sessionId) {
      sessionId = nanoid();
    }

    // Récupérer ou créer le panier
    let cart;
    if (session) {
      [cart] = await db.select().from(carts).where(eq(carts.userId, session.userId)).limit(1);
      if (!cart) {
        [cart] = await db.insert(carts).values({ userId: session.userId }).returning();
      }
    } else {
      [cart] = await db.select().from(carts).where(eq(carts.sessionId, sessionId)).limit(1);
      if (!cart) {
        [cart] = await db.insert(carts).values({ sessionId }).returning();
      }
    }

    // Récupérer les articles du panier avec les infos produits
    const items = await db
      .select({
        id: cartItems.id,
        quantity: cartItems.quantity,
        product: products,
      })
      .from(cartItems)
      .innerJoin(products, eq(cartItems.productId, products.id))
      .where(eq(cartItems.cartId, cart.id));

    const total = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

    return json(
      {
        success: true,
        cart: {
          id: cart.id,
          items,
          itemCount: items.reduce((sum, item) => sum + item.quantity, 0),
          total,
        },
      },
      {
        headers: {
          "Set-Cookie": `dam_cart_session=${sessionId}; Path=/; HttpOnly; SameSite=Lax; Max-Age=2592000`, // 30 jours
        },
      }
    );
  },
});
```

#### 1.2 - `/src/routes/api/cart/add.ts`
```typescript
import { json } from "@tanstack/react-start";
import { createAPIFileRoute } from "@tanstack/react-start/api";
import { db, carts, cartItems, products } from "@/db";
import { eq, and } from "drizzle-orm";
import { parse } from "cookie";
import { validateSession } from "@/lib/auth";
import { nanoid } from "nanoid";
import { z } from "zod";

const addToCartSchema = z.object({
  productId: z.number(),
  quantity: z.number().min(1).default(1),
});

export const APIRoute = createAPIFileRoute("/api/cart/add")({
  POST: async ({ request }) => {
    try {
      const body = await request.json();
      const data = addToCartSchema.parse(body);

      // Vérifier que le produit existe
      const [product] = await db.select().from(products).where(eq(products.id, data.productId)).limit(1);
      if (!product) {
        return json({ success: false, error: "Produit introuvable" }, { status: 404 });
      }

      if (!product.inStock) {
        return json({ success: false, error: "Produit en rupture de stock" }, { status: 400 });
      }

      const cookieHeader = request.headers.get("Cookie");
      const cookies = parse(cookieHeader || "");
      const session = await validateSession(cookies.dam_session);

      let sessionId = cookies.dam_cart_session;
      if (!sessionId) {
        sessionId = nanoid();
      }

      // Récupérer ou créer le panier
      let cart;
      if (session) {
        [cart] = await db.select().from(carts).where(eq(carts.userId, session.userId)).limit(1);
        if (!cart) {
          [cart] = await db.insert(carts).values({ userId: session.userId }).returning();
        }
      } else {
        [cart] = await db.select().from(carts).where(eq(carts.sessionId, sessionId)).limit(1);
        if (!cart) {
          [cart] = await db.insert(carts).values({ sessionId }).returning();
        }
      }

      // Vérifier si le produit est déjà dans le panier
      const [existingItem] = await db
        .select()
        .from(cartItems)
        .where(and(eq(cartItems.cartId, cart.id), eq(cartItems.productId, data.productId)))
        .limit(1);

      if (existingItem) {
        // Mettre à jour la quantité
        await db
          .update(cartItems)
          .set({ quantity: existingItem.quantity + data.quantity })
          .where(eq(cartItems.id, existingItem.id));
      } else {
        // Ajouter un nouvel article
        await db.insert(cartItems).values({
          cartId: cart.id,
          productId: data.productId,
          quantity: data.quantity,
        });
      }

      return json(
        { success: true, message: "Produit ajouté au panier" },
        {
          headers: {
            "Set-Cookie": `dam_cart_session=${sessionId}; Path=/; HttpOnly; SameSite=Lax; Max-Age=2592000`,
          },
        }
      );
    } catch (error: any) {
      if (error.name === "ZodError") {
        return json({ success: false, error: error.errors[0].message }, { status: 400 });
      }
      return json({ success: false, error: "Erreur lors de l'ajout au panier" }, { status: 500 });
    }
  },
});
```

**✅ Test** : Utiliser Postman ou curl pour tester les endpoints

---

## 🎯 ÉTAPE 2 : Interface Panier (1 heure)

### 2.1 - Context Panier (`/src/lib/cart-context.tsx`)
```typescript
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface CartItem {
  id: number;
  quantity: number;
  product: {
    id: number;
    name: string;
    price: number;
    image: string;
    slug: string;
  };
}

interface CartContextType {
  items: CartItem[];
  itemCount: number;
  total: number;
  loading: boolean;
  addToCart: (productId: number, quantity?: number) => Promise<void>;
  removeFromCart: (itemId: number) => Promise<void>;
  updateQuantity: (itemId: number, quantity: number) => Promise<void>;
  refetch: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [itemCount, setItemCount] = useState(0);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchCart = async () => {
    try {
      const res = await fetch("/api/cart");
      if (res.ok) {
        const data = await res.json();
        if (data.success) {
          setItems(data.cart.items);
          setItemCount(data.cart.itemCount);
          setTotal(data.cart.total);
        }
      }
    } catch (error) {
      console.error("Erreur lors de la récupération du panier:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const addToCart = async (productId: number, quantity = 1) => {
    const res = await fetch("/api/cart/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId, quantity }),
    });

    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.error || "Erreur lors de l'ajout au panier");
    }

    await fetchCart();
  };

  const removeFromCart = async (itemId: number) => {
    await fetch(`/api/cart/remove`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ itemId }),
    });
    await fetchCart();
  };

  const updateQuantity = async (itemId: number, quantity: number) => {
    await fetch("/api/cart/update", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ itemId, quantity }),
    });
    await fetchCart();
  };

  return (
    <CartContext.Provider
      value={{
        items,
        itemCount,
        total,
        loading,
        addToCart,
        removeFromCart,
        updateQuantity,
        refetch: fetchCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart doit être utilisé à l'intérieur de CartProvider");
  }
  return context;
}
```

### 2.2 - Ajouter CartProvider dans `__root.tsx`
```typescript
// Importer
import { CartProvider } from "@/lib/cart-context";

// Envelopper dans RootComponent :
<AuthProvider>
  <CartProvider>
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      {/* ... */}
    </div>
  </CartProvider>
</AuthProvider>
```

### 2.3 - Page Panier (`/src/routes/panier.tsx`)
```typescript
import { createFileRoute, Link } from "@tanstack/react-router";
import { useCart } from "@/lib/cart-context";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/site-data";
import { Trash2, Plus, Minus } from "lucide-react";

export const Route = createFileRoute("/panier")({
  component: PanierPage,
});

function PanierPage() {
  const { items, total, loading, removeFromCart, updateQuantity } = useCart();

  if (loading) {
    return <div className="py-24 text-center">Chargement...</div>;
  }

  if (items.length === 0) {
    return (
      <div className="py-24 px-6 lg:px-10">
        <div className="container mx-auto max-w-2xl text-center">
          <h1 className="font-serif text-4xl mb-6">Votre panier est vide</h1>
          <p className="text-muted-foreground mb-8">
            Découvrez nos produits et ajoutez-les à votre panier.
          </p>
          <Link to="/catalogue">
            <Button>Voir le catalogue</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="py-24 px-6 lg:px-10">
      <div className="container mx-auto max-w-4xl">
        <h1 className="font-serif text-4xl lg:text-5xl mb-12">Mon panier</h1>

        <div className="space-y-6 mb-12">
          {items.map((item) => (
            <div key={item.id} className="flex gap-6 border-b border-border pb-6">
              <img
                src={item.product.image}
                alt={item.product.name}
                className="w-24 h-24 object-cover"
              />
              <div className="flex-1">
                <Link to={`/catalogue/${item.product.slug}`} className="font-serif text-xl hover:underline">
                  {item.product.name}
                </Link>
                <p className="text-sm text-muted-foreground mt-1">{formatPrice(item.product.price)}</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 border border-border">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                    className="p-2 hover:bg-accent disabled:opacity-30"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="w-12 text-center">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="p-2 hover:bg-accent"
                  >
                    <Plus size={16} />
                  </button>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="p-2 hover:text-red-600"
                  aria-label="Supprimer"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="border-t border-border pt-8">
          <div className="flex justify-between items-center mb-8">
            <span className="font-serif text-2xl">Total</span>
            <span className="font-serif text-3xl">{formatPrice(total)}</span>
          </div>
          <Link to="/commander">
            <Button className="w-full" size="lg">
              Passer la commande
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
```

**✅ Test** : Ajouter des produits au panier et vérifier l'affichage

---

## 🎯 ÉTAPE 3 : Checkout (1h30)

### 3.1 - Page Commander (`/src/routes/commander.tsx`)
Créer le formulaire de commande complet avec :
- Informations client (si non connecté)
- Adresse de livraison
- Choix du mode de paiement
- Récapitulatif
- Validation

### 3.2 - API Création de Commande (`/src/routes/api/orders/create.ts`)
- Valider les données
- Créer la commande en BDD
- Vider le panier
- Retourner le numéro de commande

**✅ Test** : Passer une commande de bout en bout

---

## 🎯 ÉTAPE 4 : Panel Admin (2 heures)

### 4.1 - Page Admin (`/src/routes/admin/index.tsx`)
Dashboard avec :
- Statistiques (commandes, revenus, produits)
- Graphiques

### 4.2 - Gestion Commandes (`/src/routes/admin/commandes.tsx`)
- Liste des commandes
- Changement de statut
- Détails

### 4.3 - Gestion Produits (`/src/routes/admin/produits.tsx`)
- CRUD complet
- Upload d'images

**✅ Test** : Se connecter en admin et tester toutes les fonctions

---

## 📦 Fichiers Utiles Déjà Créés

```
✅ src/db/schema.ts              - Schéma complet
✅ src/db/index.ts               - Connexion DB
✅ src/db/seed.ts                - Peuplement
✅ src/lib/auth.ts               - Authentification
✅ src/lib/auth-context.tsx      - Context Auth
✅ src/routes/api/auth/*.ts      - API Auth
✅ ECOMMERCE_SETUP.md            - Doc configuration
✅ ANALYSE_CAHIER_DES_CHARGES.md - Comparaison CDC
```

---

## 🎯 Checklist de Progression

### Phase 1 : E-Commerce de Base
- [ ] API Panier (GET, POST add, PUT update, DELETE remove)
- [ ] Context Panier (CartProvider)
- [ ] Page Panier avec gestion quantités
- [ ] Bouton "Ajouter au panier" sur fiches produits
- [ ] Icône panier dans header avec compteur
- [ ] Page Commander (formulaire)
- [ ] API Création de commande
- [ ] Page Confirmation de commande
- [ ] Page Mes Commandes (utilisateur)

### Phase 2 : Administration
- [ ] Route protégée `/admin`
- [ ] Dashboard avec stats
- [ ] Liste des commandes avec filtres
- [ ] Changement de statut des commandes
- [ ] CRUD Produits
- [ ] Liste des utilisateurs

### Phase 3 : Paiement
- [ ] Intégration Fedapay ou Kkiapay
- [ ] Callback de paiement
- [ ] Mise à jour automatique du statut

---

## 💡 Conseils

1. **Tester régulièrement** après chaque fonctionnalité
2. **Commiter souvent** pour garder un historique propre
3. **Utiliser Postman** pour tester les API
4. **Console du navigateur** pour débugger le frontend
5. **Créer des fixtures** pour tester (utilisateurs, produits, commandes)

---

## 🆘 En Cas de Problème

### Base de données verrouillée
```bash
# Fermer tous les processus Node
# Relancer le serveur
npm run dev
```

### Erreurs TypeScript
```bash
# Régénérer le routeTree
npm run build
```

### Dépendances manquantes
```bash
npm install
```

---

**Bon courage ! 🚀**

Une fois les 3 premières étapes terminées, vous aurez un site e-commerce **100% fonctionnel** !
