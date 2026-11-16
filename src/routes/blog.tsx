import { createFileRoute, Link } from "@tanstack/react-router";
import { POSTS } from "@/lib/site-data";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Journal — Conseils beauté DAM" },
      { name: "description", content: "Le journal DAM : conseils capillaires, rituels visage, ingrédients et tendances beauté, par notre équipe d'experts." },
      { property: "og:title", content: "Journal DAM — Conseils beauté" },
      { property: "og:url", content: "/blog" },
    ],
    links: [{ rel: "canonical", href: "/blog" }],
  }),
  component: BlogIndex,
});

function BlogIndex() {
  const [hero, ...rest] = POSTS;
  return (
    <>
      <section className="py-20 lg:py-28 bg-beige-soft">
        <div className="container mx-auto px-6 lg:px-10 max-w-4xl">
          <span className="eyebrow text-accent mb-6 block">Le Journal DAM</span>
          <h1 className="font-serif text-5xl lg:text-7xl leading-[0.95]">
            Rituels, conseils <br />
            <span className="italic">& confidences beauté</span>.
          </h1>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-6 lg:px-10">
          <Link
            to="/blog/$slug"
            params={{ slug: hero.slug }}
            className="group grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24"
          >
            <div className="aspect-[4/5] overflow-hidden bg-beige-soft">
              <img
                src={hero.image}
                alt={hero.title}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
              />
            </div>
            <div>
              <span className="eyebrow text-accent mb-4 block">{hero.category}</span>
              <h2 className="font-serif text-4xl lg:text-5xl mb-6 leading-tight group-hover:italic transition">
                {hero.title}
              </h2>
              <p className="text-sm text-foreground/70 leading-relaxed max-w-md mb-8">
                {hero.excerpt}
              </p>
              <span className="link-underline">Lire l'article</span>
            </div>
          </Link>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {rest.map((p) => (
              <Link
                key={p.slug}
                to="/blog/$slug"
                params={{ slug: p.slug }}
                className="group block"
              >
                <div className="aspect-[4/5] mb-6 overflow-hidden bg-beige-soft">
                  <img
                    src={p.image}
                    alt={p.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                  />
                </div>
                <span className="eyebrow text-accent">{p.category}</span>
                <h3 className="font-serif text-2xl mt-3 mb-3 leading-tight">{p.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{p.excerpt}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
