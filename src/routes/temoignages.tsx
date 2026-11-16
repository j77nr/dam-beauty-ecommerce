import { createFileRoute } from "@tanstack/react-router";
import { TESTIMONIALS } from "@/lib/site-data";

export const Route = createFileRoute("/temoignages")({
  head: () => ({
    meta: [
      { title: "Témoignages clients — DAM" },
      { name: "description", content: "Les avis et témoignages de nos clientes et clients sur les soins capillaires et cosmétiques DAM." },
      { property: "og:title", content: "Témoignages — DAM" },
      { property: "og:url", content: "/temoignages" },
    ],
    links: [{ rel: "canonical", href: "/temoignages" }],
  }),
  component: TestimonialsPage,
});

function TestimonialsPage() {
  return (
    <>
      <section className="py-20 lg:py-28 bg-beige-soft">
        <div className="container mx-auto px-6 lg:px-10 max-w-4xl text-center">
          <span className="eyebrow text-accent mb-6 block">Témoignages</span>
          <h1 className="font-serif text-5xl lg:text-7xl leading-[0.95]">
            Elles et ils <span className="italic">parlent de DAM</span>.
          </h1>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-6 lg:px-10 max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
            {TESTIMONIALS.map((t, i) => (
              <figure key={i} className="border-l border-ink/15 pl-8">
                <span className="font-serif text-5xl text-accent leading-none block mb-4">"</span>
                <blockquote className="font-serif italic text-2xl leading-snug mb-6">
                  {t.quote}
                </blockquote>
                <figcaption className="text-[11px] uppercase tracking-[0.25em] font-medium">
                  {t.author} <span className="text-muted-foreground">— {t.role}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
