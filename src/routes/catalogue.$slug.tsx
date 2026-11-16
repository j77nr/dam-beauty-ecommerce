import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { PRODUCTS, SITE, formatPrice, categoryLabel } from "@/lib/site-data";
import { useCart } from "@/lib/cart-context";
import { Button } from "@/components/ui/button";
import { ShoppingBag, MessageCircle } from "lucide-react";

export const Route = createFileRoute("/catalogue/$slug")({
  loader: ({ params }) => {
    const product = PRODUCTS.find((p) => p.slug === params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => {
    const p = loaderData?.product;
    return {
      meta: [
        { title: p ? `${p.name} — DAM` : "Produit — DAM" },
        { name: "description", content: p?.short ?? "" },
        { property: "og:title", content: p?.name ?? "" },
        { property: "og:description", content: p?.short ?? "" },
        { property: "og:url", content: `/catalogue/${p?.slug ?? ""}` },
        { property: "og:type", content: "product" },
        { property: "og:image", content: p?.image ?? "" },
      ],
      links: [{ rel: "canonical", href: `/catalogue/${p?.slug ?? ""}` }],
    };
  },
  notFoundComponent: () => (
    <div className="py-32 text-center">
      <p className="font-serif italic text-3xl mb-4">Produit introuvable</p>
      <Link to="/catalogue" className="link-underline">Retour au catalogue</Link>
    </div>
  ),
  errorComponent: ({ error }) => (
    <div className="py-32 text-center">
      <p className="text-sm text-muted-foreground">{error.message}</p>
    </div>
  ),
  component: ProductPage,
});

function ProductPage() {
  const { product } = Route.useLoaderData();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [adding, setAdding] = useState(false);
  
  const related = PRODUCTS.filter((p) => p.slug !== product.slug && p.category === product.category).slice(0, 3);
  const message = `Bonjour DAM, je souhaite commander : ${product.name} (${formatPrice(product.price)}).`;
  const waUrl = `${SITE.whatsapp}?text=${encodeURIComponent(message)}`;

  const handleAddToCart = async () => {
    setAdding(true);
    try {
      // Trouver l'ID du produit dans la liste PRODUCTS
      const productIndex = PRODUCTS.findIndex(p => p.slug === product.slug);
      if (productIndex === -1) {
        throw new Error("Produit introuvable");
      }
      await addToCart(productIndex + 1, quantity); // IDs commencent à 1 dans la DB
    } catch (error) {
      console.error(error);
    } finally {
      setAdding(false);
    }
  };

  return (
    <>
      <section className="py-12 lg:py-16">
        <div className="container mx-auto px-6 lg:px-10">
          <nav className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground mb-8">
            <Link to="/catalogue" className="hover:text-ink">Boutique</Link>
            <span className="mx-3">/</span>
            <span>{categoryLabel(product.category)}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <div className="bg-beige-soft aspect-[4/5] overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="lg:sticky lg:top-24">
              <span className="eyebrow text-accent mb-4 block">{categoryLabel(product.category)}</span>
              <h1 className="font-serif text-4xl lg:text-5xl mb-2">{product.name}</h1>
              <p className="font-serif italic text-lg text-muted-foreground mb-8">
                {product.subtitle}
              </p>
              <p className="text-2xl mb-10">{formatPrice(product.price)}</p>

              <p className="text-sm leading-relaxed text-foreground/75 mb-10">
                {product.description}
              </p>

              {/* Sélection quantité */}
              <div className="mb-8">
                <label htmlFor="quantity" className="text-[11px] uppercase tracking-[0.25em] font-semibold mb-3 block">
                  Quantité
                </label>
                <div className="flex items-center gap-4">
                  <div className="flex items-center border border-border">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-3 hover:bg-accent transition-colors"
                      aria-label="Diminuer"
                    >
                      −
                    </button>
                    <input
                      id="quantity"
                      type="number"
                      min="1"
                      value={quantity}
                      onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-16 text-center border-x border-border focus:outline-none"
                    />
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-3 hover:bg-accent transition-colors"
                      aria-label="Augmenter"
                    >
                      +
                    </button>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {formatPrice(product.price * quantity)}
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-3 mb-12">
                <Button
                  onClick={handleAddToCart}
                  disabled={adding}
                  size="lg"
                  className="w-full gap-2"
                >
                  <ShoppingBag size={18} />
                  {adding ? "Ajout..." : "Ajouter au panier"}
                </Button>
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener"
                  className="w-full py-4 border border-ink text-[11px] uppercase tracking-[0.25em] hover:bg-ink hover:text-ivory transition-colors text-center flex items-center justify-center gap-2"
                >
                  <MessageCircle size={16} />
                  Commander sur WhatsApp
                </a>
                <Link
                  to="/contact"
                  className="w-full py-4 border border-border text-[11px] uppercase tracking-[0.25em] hover:bg-accent transition-colors text-center"
                >
                  Demander un conseil
                </Link>
              </div>

              <div className="border-t border-border pt-8 space-y-8">
                <div>
                  <h3 className="text-[11px] uppercase tracking-[0.25em] font-semibold mb-3">
                    Ingrédients clés
                  </h3>
                  <ul className="text-sm text-foreground/70 space-y-1">
                    {product.ingredients.map((i: string) => (
                      <li key={i}>— {i}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-[11px] uppercase tracking-[0.25em] font-semibold mb-3">
                    Utilisation
                  </h3>
                  <p className="text-sm text-foreground/70 leading-relaxed">{product.usage}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="py-24 bg-beige-soft">
          <div className="container mx-auto px-6 lg:px-10">
            <h2 className="font-serif text-3xl mb-12">Vous aimerez aussi</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {related.map((p) => (
                <Link
                  key={p.slug}
                  to="/catalogue/$slug"
                  params={{ slug: p.slug }}
                  className="group"
                >
                  <div className="aspect-[3/4] bg-ivory overflow-hidden mb-4">
                    <img
                      src={p.image}
                      alt={p.name}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                    />
                  </div>
                  <h3 className="text-sm font-medium">{p.name}</h3>
                  <p className="text-xs text-muted-foreground mt-1">{formatPrice(p.price)}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
