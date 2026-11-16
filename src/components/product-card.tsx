import { Link } from "@tanstack/react-router";
import { type Product, formatPrice } from "@/lib/site-data";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      to="/catalogue/$slug"
      params={{ slug: product.slug }}
      className="group block"
    >
      <div className="relative overflow-hidden mb-4 bg-beige-soft aspect-[3/4]">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-[1200ms] ease-out"
        />
        <div className="absolute bottom-0 left-0 w-full bg-ink text-ivory py-3 text-[10px] uppercase tracking-[0.2em] text-center opacity-0 group-hover:opacity-100 transition-opacity">
          Découvrir
        </div>
      </div>
      <h3 className="text-sm font-medium mb-1">{product.name}</h3>
      <p className="text-xs text-foreground/50 mb-2 font-serif italic">{product.subtitle}</p>
      <p className="text-sm">{formatPrice(product.price)}</p>
    </Link>
  );
}
