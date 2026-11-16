import { createFileRoute, Link } from "@tanstack/react-router";
import { useCart } from "@/lib/cart-context";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/site-data";
import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react";

export const Route = createFileRoute("/panier")({
  head: () => ({
    meta: [
      { title: "Mon Panier — DAM Beauty & Cosmetics" },
      { name: "description", content: "Votre panier d'achat DAM" },
    ],
  }),
  component: PanierPage,
});

function PanierPage() {
  const { items, total, loading, removeFromCart, updateQuantity } = useCart();

  if (loading) {
    return (
      <div className="py-24 px-6 lg:px-10">
        <div className="container mx-auto max-w-4xl text-center">
          <p className="text-muted-foreground">Chargement du panier...</p>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="py-24 px-6 lg:px-10">
        <div className="container mx-auto max-w-2xl text-center">
          <ShoppingBag size={64} className="mx-auto mb-6 text-muted-foreground" />
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
      <div className="container mx-auto max-w-5xl">
        <h1 className="font-serif text-4xl lg:text-5xl mb-12">Mon panier</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Liste des produits */}
          <div className="lg:col-span-2 space-y-6">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex gap-6 border-b border-border pb-6 last:border-0"
              >
                <Link to="/catalogue/$slug"
                  params={{ slug: item.product.slug }} className="flex-shrink-0">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-24 h-24 object-cover"
                  />
                </Link>
                
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <Link
                      to="/catalogue/$slug"
                  params={{ slug: item.product.slug }}
                      className="font-serif text-xl hover:underline underline-offset-4"
                    >
                      {item.product.name}
                    </Link>
                    <p className="text-sm text-muted-foreground mt-1">
                      {formatPrice(item.product.price)} × {item.quantity}
                    </p>
                  </div>
                  
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center gap-2 border border-border">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                        className="p-2 hover:bg-accent disabled:opacity-30 transition-colors"
                        aria-label="Diminuer la quantité"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="w-12 text-center font-medium">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-2 hover:bg-accent transition-colors"
                        aria-label="Augmenter la quantité"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                    
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="p-2 hover:text-red-600 transition-colors"
                      aria-label="Supprimer du panier"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
                
                <div className="text-right font-serif text-xl">
                  {formatPrice(item.product.price * item.quantity)}
                </div>
              </div>
            ))}
          </div>

          {/* Récapitulatif */}
          <div className="lg:col-span-1">
            <div className="border border-border p-6 sticky top-24">
              <h2 className="font-serif text-2xl mb-6">Récapitulatif</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Sous-total</span>
                  <span className="font-medium">{formatPrice(total)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Livraison</span>
                  <span className="font-medium">Calculée à l'étape suivante</span>
                </div>
              </div>
              
              <div className="border-t border-border pt-4 mb-6">
                <div className="flex justify-between items-baseline">
                  <span className="font-serif text-xl">Total</span>
                  <span className="font-serif text-3xl">{formatPrice(total)}</span>
                </div>
              </div>
              
              <Link to="/commander">
                <Button className="w-full mb-4" size="lg">
                  Passer la commande
                </Button>
              </Link>
              
              <Link to="/catalogue">
                <Button variant="outline" className="w-full">
                  Continuer mes achats
                </Button>
              </Link>
              
              <p className="text-xs text-muted-foreground mt-4 text-center">
                Paiement sécurisé • Livraison à Lomé
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
