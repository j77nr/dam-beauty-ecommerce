import { createFileRoute } from "@tanstack/react-router";
import hero from "@/assets/hero-portrait.jpg";
import oil from "@/assets/product-hair-oil.jpg";
import cream from "@/assets/product-cream.jpg";
import mask from "@/assets/product-mask.jpg";
import serum from "@/assets/product-serum.jpg";
import atelier from "@/assets/about-atelier.jpg";
import blogHair from "@/assets/blog-hair.jpg";
import blogSk from "@/assets/blog-skincare.jpg";
import blogKa from "@/assets/blog-karite.jpg";
import texture from "@/assets/texture-oil.jpg";

export const Route = createFileRoute("/galerie")({
  head: () => ({
    meta: [
      { title: "Galerie — DAM Beauty & Cosmetics" },
      { name: "description", content: "Photos et vidéos de l'univers DAM : produits, ateliers, clientes et inspirations beauté." },
      { property: "og:title", content: "Galerie DAM" },
      { property: "og:url", content: "/galerie" },
    ],
    links: [{ rel: "canonical", href: "/galerie" }],
  }),
  component: GalleryPage,
});

const IMAGES = [
  { src: hero, label: "Portrait Éclat" },
  { src: oil, label: "Élixir Capillaire" },
  { src: atelier, label: "L'atelier Lomé" },
  { src: cream, label: "Crème Éclat" },
  { src: blogHair, label: "Rituel Capillaire" },
  { src: mask, label: "Masque Karité" },
  { src: serum, label: "Sérum Visage" },
  { src: blogSk, label: "Routine Visage" },
  { src: texture, label: "Texture Or" },
  { src: blogKa, label: "Karité Brut" },
];

function GalleryPage() {
  return (
    <>
      <section className="py-20 lg:py-28 bg-beige-soft">
        <div className="container mx-auto px-6 lg:px-10 max-w-4xl">
          <span className="eyebrow text-accent mb-6 block">Galerie · Portfolio</span>
          <h1 className="font-serif text-5xl lg:text-7xl leading-[0.95]">
            L'univers <span className="italic">DAM</span> en images.
          </h1>
          <p className="mt-6 text-sm text-foreground/70 max-w-xl">
            Inspirations, coulisses et portraits — un journal visuel de notre maison.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-6">
            {IMAGES.map((img, i) => (
              <figure
                key={i}
                className={`group relative overflow-hidden bg-beige-soft ${
                  i % 5 === 0 ? "aspect-[3/4] md:row-span-2 md:aspect-[3/5]" : "aspect-square"
                }`}
              >
                <img
                  src={img.src}
                  alt={img.label}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                />
                <figcaption className="absolute bottom-3 left-3 text-[10px] uppercase tracking-[0.25em] text-ivory bg-ink/70 px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  {img.label}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
