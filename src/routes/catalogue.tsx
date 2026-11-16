import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { PRODUCTS, type Category, categoryLabel } from "@/lib/site-data";
import { ProductCard } from "@/components/product-card";
import { z } from "zod";

const searchSchema = z.object({
  cat: z.enum(["all", "capillaire", "visage", "naturel"]).optional(),
  q: z.string().optional(),
});

export const Route = createFileRoute("/catalogue")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "Boutique — DAM Beauty & Cosmetics" },
      { name: "description", content: "Explorez le catalogue DAM : soins capillaires, cosmétiques visage et produits naturels, avec leurs tarifs en FCFA." },
      { property: "og:title", content: "Boutique DAM" },
      { property: "og:url", content: "/catalogue" },
    ],
    links: [{ rel: "canonical", href: "/catalogue" }],
  }),
  component: CataloguePage,
});

const CATS: { id: "all" | Category; label: string }[] = [
  { id: "all", label: "Tout voir" },
  { id: "capillaire", label: "Soins capillaires" },
  { id: "visage", label: "Cosmétiques visage" },
  { id: "naturel", label: "Produits naturels" },
];

function CataloguePage() {
  const search = Route.useSearch();
  const navigate = Route.useNavigate();
  const [query, setQuery] = useState(search.q ?? "");
  const active = search.cat ?? "all";

  const filtered = useMemo(() => {
    return PRODUCTS.filter((p) => {
      const matchCat = active === "all" || p.category === active;
      const q = query.trim().toLowerCase();
      const matchQ =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.subtitle.toLowerCase().includes(q) ||
        p.short.toLowerCase().includes(q);
      return matchCat && matchQ;
    });
  }, [active, query]);

  return (
    <>
      <section className="py-20 lg:py-28 bg-beige-soft">
        <div className="container mx-auto px-6 lg:px-10">
          <span className="eyebrow text-accent mb-6 block">Catalogue · {filtered.length} pièces</span>
          <h1 className="font-serif text-5xl lg:text-7xl leading-[0.95] max-w-3xl">
            Le rituel beauté <span className="italic">DAM</span>.
          </h1>
          <p className="mt-6 max-w-xl text-sm text-foreground/70 leading-relaxed">
            Une sélection rigoureuse de soins capillaires, cosmétiques visage et produits naturels,
            pensés pour toutes les peaux et toutes les chevelures.
          </p>
        </div>
      </section>

      <section className="border-y border-border bg-ivory sticky top-16 z-30 backdrop-blur-md bg-ivory/90">
        <div className="container mx-auto px-6 lg:px-10 py-5 flex flex-wrap items-center gap-6 justify-between">
          <div className="flex flex-wrap gap-2">
            {CATS.map((c) => (
              <button
                key={c.id}
                onClick={() => navigate({ search: { cat: c.id, q: query || undefined } })}
                className={`px-4 py-2 text-[11px] uppercase tracking-[0.2em] border transition-colors ${
                  active === c.id
                    ? "bg-ink text-ivory border-ink"
                    : "border-border hover:border-ink"
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
          <input
            type="search"
            placeholder="Rechercher un produit…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="bg-transparent border-b border-ink/30 focus:border-ink outline-none text-sm py-2 px-2 w-full sm:w-64"
          />
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-6 lg:px-10">
          {filtered.length === 0 ? (
            <div className="py-32 text-center">
              <p className="font-serif italic text-2xl mb-4">Aucun produit ne correspond.</p>
              <button
                onClick={() => {
                  setQuery("");
                  navigate({ search: {} });
                }}
                className="link-underline"
              >
                Réinitialiser
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
              {filtered.map((p) => (
                <ProductCard key={p.slug} product={p} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

void Link;
void categoryLabel;
