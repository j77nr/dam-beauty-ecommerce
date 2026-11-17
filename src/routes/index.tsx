import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import heroPortrait from "@/assets/dam-hero-campaign.png";
import textureOil from "@/assets/texture-oil.jpg";
import { PRODUCTS, POSTS, SITE } from "@/lib/site-data";
import { ProductCard } from "@/components/product-card";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "DAM — Soins botaniques à Lomé, Togo" },
      { name: "description", content: "Découvrez les soins visage et cheveux DAM, inspirés des richesses botaniques ouest-africaines et imaginés à Lomé." },
      { property: "og:title", content: "DAM — Soins botaniques à Lomé" },
      { property: "og:description", content: "Des rituels visage et cheveux inspirés des richesses botaniques de l’Afrique de l’Ouest." },
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
      <section className="relative overflow-hidden bg-beige-soft">
        <div className="container mx-auto grid grid-cols-1 items-center gap-10 px-6 py-12 sm:py-16 lg:min-h-[calc(100svh-4rem)] lg:grid-cols-12 lg:gap-4 lg:px-10 lg:py-10">
          <div className="relative z-10 lg:col-span-5 lg:pr-4">
            <span className="mb-6 block text-[10px] font-medium uppercase tracking-[0.35em] text-accent">
              Maison de beauté · Lomé, Togo
            </span>
            <h1 className="mb-7 max-w-xl font-serif text-5xl leading-[0.94] tracking-tight sm:text-6xl lg:text-[5.5rem]">
              L’éclat vient <br />
              <span className="italic font-normal">de nos racines.</span>
            </h1>
            <p className="mb-9 max-w-sm text-sm leading-7 text-foreground/70">
              Des rituels visage et cheveux inspirés des richesses botaniques de l’Afrique de l’Ouest,
              imaginés à Lomé pour accompagner votre beauté au quotidien.
            </p>
            <div className="flex flex-wrap items-center gap-6">
              <Link
                to="/catalogue"
                className="inline-flex items-center gap-3 bg-ink px-8 py-4 text-[10px] uppercase tracking-[0.22em] text-ivory transition-colors hover:bg-accent"
              >
                Découvrir les soins <ArrowRight size={14} />
              </Link>
              <span className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                Le soin, à votre rythme
              </span>
            </div>
            <div className="mt-12 hidden items-center gap-4 border-t border-ink/15 pt-5 lg:flex">
              <span className="font-serif text-2xl italic">01</span>
              <span className="text-[9px] uppercase tracking-[0.2em] text-muted-foreground">
                Visage · Cheveux · Naturel
              </span>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 w-[68%] opacity-50 lg:relative lg:col-span-7 lg:w-auto lg:pl-5 lg:opacity-100">
            <div className="relative h-full w-full overflow-hidden bg-beige lg:ml-auto lg:aspect-[4/4.7] lg:h-auto lg:max-w-[660px]">
              <img
                src={heroPortrait}
                alt="Portrait éditorial d’une femme aux cheveux naturels, accompagné de soins botaniques DAM."
                width={1024}
                height={1280}
                fetchPriority="high"
                className="h-full w-full object-cover object-[58%_center]"
              />
              <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-beige-soft via-beige-soft/60 to-transparent lg:hidden" />
              <div className="absolute bottom-5 left-5 hidden bg-ivory/90 px-4 py-3 backdrop-blur-sm lg:block lg:bottom-7 lg:left-7 lg:px-5">
                <p className="text-[9px] uppercase tracking-[0.22em]">L’essentiel, naturellement</p>
                <p className="mt-1 font-serif text-lg italic">DAM · Lomé</p>
              </div>
            </div>
            <span aria-hidden="true" className="absolute -right-2 top-8 hidden font-serif text-sm italic text-muted-foreground [writing-mode:vertical-rl] lg:block">
              BEAUTÉ EN CONSCIENCE
            </span>
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

      {/* BRAND MANIFESTO */}
      <section className="bg-ink py-20 text-ivory sm:py-28">
        <div className="container mx-auto grid grid-cols-1 gap-10 px-6 lg:grid-cols-12 lg:items-end lg:px-10">
          <div className="lg:col-span-7">
            <span className="mb-6 block text-[10px] uppercase tracking-[0.3em] text-beige-deep">
              Une maison, une intention
            </span>
            <h2 className="max-w-3xl font-serif text-4xl leading-[1.05] sm:text-5xl lg:text-6xl">
              La beauté n’a pas besoin d’en faire trop.
            </h2>
          </div>
          <div className="lg:col-span-4 lg:col-start-9">
            <p className="mb-7 max-w-md text-sm leading-7 text-ivory/70">
              Choisir un soin, c’est prendre un instant pour soi. DAM vous aide à trouver les gestes
              et les textures qui s’accordent à vos envies, avec une maison ancrée à Lomé.
            </p>
            <Link to="/contact" className="link-underline text-ivory">
              Parlons de votre routine
            </Link>
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
