import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import heroPortrait from "@/assets/hero-portrait.jpg";
import textureOil from "@/assets/texture-oil.jpg";
import { PRODUCTS, POSTS, TESTIMONIALS, SITE, formatPrice } from "@/lib/site-data";
import { ProductCard } from "@/components/product-card";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "DAM — Beauty & Cosmetics | Lomé, Togo" },
      { name: "description", content: "Soins capillaires, cosmétiques visage et produits naturels conçus à Lomé. Découvrez la maison DAM, beauté premium pour tous." },
      { property: "og:title", content: "DAM — Beauty & Cosmetics" },
      { property: "og:description", content: "Soins capillaires et cosmétiques premium, conçus à Lomé." },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: HomePage,
});

function HomePage() {
  const featured = PRODUCTS.slice(0, 4);
  const latestPosts = POSTS.slice(0, 2);

  return (
    <>
      {/* HERO */}
      <section className="relative min-h-[88vh] flex items-center overflow-hidden bg-beige-soft">
        <div className="container mx-auto px-6 lg:px-10 grid grid-cols-12 items-center gap-8 py-16 lg:py-0">
          <div className="col-span-12 lg:col-span-5 z-10">
            <span className="text-[10px] uppercase tracking-[0.35em] text-accent mb-6 block font-medium">
              Essence de Lomé · Édition 2026
            </span>
            <h1 className="font-serif text-5xl sm:text-6xl lg:text-8xl leading-[0.9] mb-8">
              La Beauté <br />
              <span className="italic font-normal">Sublimée</span>
            </h1>
            <p className="max-w-sm text-sm leading-relaxed mb-10 text-foreground/70">
              Une sélection exclusive de soins capillaires et cosmétiques pensés pour magnifier
              votre éclat naturel, chaque jour, partout au Togo.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/catalogue"
                className="bg-ink text-ivory px-10 py-4 text-[11px] uppercase tracking-[0.25em] hover:bg-accent transition-colors inline-flex items-center gap-3"
              >
                Explorer la collection <ArrowRight size={14} />
              </Link>
              <Link to="/a-propos" className="link-underline self-center">
                Notre histoire
              </Link>
            </div>
          </div>
          <div className="col-span-12 lg:col-span-7 relative h-full flex justify-end">
            <img
              src={heroPortrait}
              alt="Portrait éditorial DAM"
              width={1024}
              height={1280}
              className="w-full lg:w-[88%] aspect-[4/5] object-cover shadow-soft"
            />
          </div>
        </div>
      </section>

      {/* CATEGORIES STRIP */}
      <section className="border-y border-border py-10 bg-ivory">
        <div className="container mx-auto px-6 lg:px-10 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-16">
          {[
            { n: "01", label: "Soins Capillaires", to: "/catalogue", hash: "capillaire" },
            { n: "02", label: "Cosmétiques Visage", to: "/catalogue", hash: "visage" },
            { n: "03", label: "Produits Naturels", to: "/catalogue", hash: "naturel" },
          ].map((c) => (
            <Link
              key={c.n}
              to={c.to}
              search={{ cat: c.hash as "capillaire" | "visage" | "naturel" }}
              className="flex items-baseline gap-4 group"
            >
              <span className="text-[10px] text-muted-foreground">{c.n}</span>
              <span className="font-serif italic text-2xl group-hover:underline underline-offset-4">
                {c.label}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* CATALOG */}
      <section className="py-24 px-6 lg:px-10">
        <div className="container mx-auto">
          <div className="flex justify-between items-end mb-16 flex-wrap gap-6">
            <div>
              <h2 className="font-serif text-4xl mb-2">Le Catalogue</h2>
              <p className="text-[10px] uppercase tracking-[0.3em] text-accent">
                Nos Incontournables
              </p>
            </div>
            <Link to="/catalogue" className="link-underline">Voir tout</Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featured.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* STORY BAND */}
      <section className="relative overflow-hidden">
        <div className="container mx-auto px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-2 gap-0">
          <div className="relative aspect-square lg:aspect-auto">
            <img
              src={textureOil}
              alt="Texture huile précieuse"
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
          <div className="bg-beige-soft py-20 lg:py-32 px-8 lg:px-20 flex flex-col justify-center">
            <span className="text-[10px] uppercase tracking-[0.35em] text-accent mb-6">
              Notre signature
            </span>
            <h2 className="font-serif text-4xl lg:text-5xl leading-tight mb-8">
              Une beauté <span className="italic">ancrée à Lomé</span>, formulée pour le monde.
            </h2>
            <p className="text-sm leading-relaxed text-foreground/70 mb-8 max-w-md">
              DAM réunit les rituels de beauté ouest-africains et les avancées de la cosmétique
              moderne. Chaque formule est pensée comme une réponse précise à un besoin, avec
              des actifs sélectionnés pour leur pureté et leur efficacité.
            </p>
            <Link to="/a-propos" className="link-underline self-start">
              Découvrir la maison
            </Link>
          </div>
        </div>
      </section>

      {/* BLOG TEASER */}
      <section className="bg-ink text-ivory py-24">
        <div className="container mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-12 gap-10 lg:gap-12 items-start">
            <div className="col-span-12 lg:col-span-4">
              <h2 className="font-serif text-5xl mb-6 leading-tight">
                Conseils <br />
                <span className="italic">& Rituels</span>
              </h2>
              <p className="text-ivory/60 text-sm leading-relaxed mb-8 max-w-sm">
                Le journal DAM vous accompagne dans votre routine beauté avec des conseils
                d'experts, de Lomé au reste du monde.
              </p>
              <Link
                to="/blog"
                className="border border-ivory/20 px-8 py-3 text-[10px] uppercase tracking-[0.25em] hover:bg-ivory hover:text-ink transition-colors inline-block"
              >
                Lire le journal
              </Link>
            </div>
            <div className="col-span-12 lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-8">
              {latestPosts.map((post) => (
                <Link
                  key={post.slug}
                  to="/blog/$slug"
                  params={{ slug: post.slug }}
                  className="group block"
                >
                  <div className="aspect-[4/5] bg-ivory/5 mb-4 overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                    />
                  </div>
                  <span className="text-[10px] uppercase text-accent tracking-[0.25em]">
                    {post.category}
                  </span>
                  <h3 className="text-xl font-serif mt-2 group-hover:opacity-70 transition">
                    {post.title}
                  </h3>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIAL */}
      <section className="py-32 bg-beige-soft">
        <div className="container mx-auto px-6 lg:px-10 max-w-3xl text-center">
          <span className="text-[10px] uppercase tracking-[0.35em] text-accent mb-10 block">
            Voix de nos clientes
          </span>
          <blockquote className="font-serif italic text-3xl md:text-4xl leading-snug mb-8">
            “{TESTIMONIALS[0].quote}”
          </blockquote>
          <p className="text-[11px] uppercase tracking-[0.25em] font-medium">
            {TESTIMONIALS[0].author} — {TESTIMONIALS[0].role}
          </p>
          <div className="mt-10">
            <Link to="/temoignages" className="link-underline">Lire les avis</Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-ivory">
        <div className="container mx-auto px-6 lg:px-10 text-center max-w-2xl">
          <h2 className="font-serif text-4xl mb-6">Une question, un conseil ?</h2>
          <p className="text-sm text-muted-foreground mb-10">
            Notre équipe vous accompagne, par WhatsApp ou en boutique à Lomé.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href={SITE.whatsapp}
              target="_blank"
              rel="noopener"
              className="bg-ink text-ivory px-10 py-4 text-[11px] uppercase tracking-[0.25em] hover:bg-accent transition-colors"
            >
              Commander sur WhatsApp
            </a>
            <Link
              to="/contact"
              className="border border-ink px-10 py-4 text-[11px] uppercase tracking-[0.25em] hover:bg-ink hover:text-ivory transition-colors"
            >
              Nous écrire
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

void formatPrice;
