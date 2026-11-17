import { createFileRoute } from "@tanstack/react-router";
import { MessageCircle } from "lucide-react";
import { SITE } from "@/lib/site-data";

export const Route = createFileRoute("/temoignages")({
  head: () => ({
    meta: [
      { title: "Votre avis — DAM Beauty" },
      { name: "description", content: "Vous avez essayé un soin DAM ? Partagez votre expérience directement avec notre maison à Lomé." },
      { property: "og:title", content: "Votre avis — DAM Beauty" },
      { property: "og:url", content: "/temoignages" },
    ],
    links: [{ rel: "canonical", href: "/temoignages" }],
  }),
  component: TestimonialsPage,
});

function TestimonialsPage() {
  const message = encodeURIComponent("Bonjour DAM, je souhaite partager mon expérience avec vos soins.");

  return (
    <div>
      <section className="bg-beige-soft py-20 lg:py-28">
        <div className="container mx-auto max-w-4xl px-6 text-center lg:px-10">
          <span className="eyebrow mb-6 block text-accent">La parole est à vous</span>
          <h1 className="font-serif text-5xl leading-[0.95] lg:text-7xl">
            Votre expérience <span className="italic">compte.</span>
          </h1>
          <p className="mx-auto mt-7 max-w-xl text-sm leading-7 text-foreground/70">
            Nous préférons partager de vrais retours, avec l’accord des personnes qui les ont écrits.
            Vous avez déjà découvert un soin DAM ? Racontez-nous ce qui vous a plu — ou ce que nous
            pouvons améliorer.
          </p>
          <a
            href={`${SITE.whatsapp}?text=${message}`}
            target="_blank"
            rel="noreferrer"
            className="mt-9 inline-flex items-center gap-3 bg-ink px-8 py-4 text-[10px] uppercase tracking-[0.2em] text-ivory transition-colors hover:bg-accent"
          >
            <MessageCircle size={16} aria-hidden="true" />
            Partager mon retour
          </a>
        </div>
      </section>
      <section className="py-16 lg:py-24">
        <div className="container mx-auto max-w-3xl px-6 text-center lg:px-10">
          <p className="font-serif text-2xl italic leading-relaxed sm:text-3xl">
            « Chaque rituel est personnel. Vos mots aideront d’autres personnes à choisir le leur. »
          </p>
          <p className="mt-5 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            La maison DAM · Lomé, Togo
          </p>
        </div>
      </section>
    </div>
  );
}
