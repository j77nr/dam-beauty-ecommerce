import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { FAQS } from "@/lib/site-data";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — DAM Beauty & Cosmetics" },
      { name: "description", content: "Réponses aux questions fréquentes sur les produits, livraisons, conseils beauté et services DAM." },
      { property: "og:title", content: "FAQ — DAM" },
      { property: "og:url", content: "/faq" },
    ],
    links: [{ rel: "canonical", href: "/faq" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: FAQS.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }),
      },
    ],
  }),
  component: FAQPage,
});

function FAQPage() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <>
      <section className="py-20 lg:py-28 bg-beige-soft">
        <div className="container mx-auto px-6 lg:px-10 max-w-4xl text-center">
          <span className="eyebrow text-accent mb-6 block">Foire aux questions</span>
          <h1 className="font-serif text-5xl lg:text-7xl leading-[0.95]">
            Vos questions, <span className="italic">nos réponses</span>.
          </h1>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-6 lg:px-10 max-w-3xl">
          <div className="divide-y divide-border border-y border-border">
            {FAQS.map((f, i) => {
              const isOpen = open === i;
              return (
                <div key={i}>
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="w-full py-6 flex items-center justify-between text-left gap-6"
                  >
                    <span className="font-serif text-xl md:text-2xl">{f.q}</span>
                    <ChevronDown
                      size={20}
                      className={`flex-shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`}
                    />
                  </button>
                  {isOpen && (
                    <div className="pb-8 pr-10">
                      <p className="text-sm leading-relaxed text-foreground/75">{f.a}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-16 text-center">
            <p className="text-sm text-muted-foreground mb-4">
              Vous ne trouvez pas votre réponse ?
            </p>
            <Link to="/contact" className="link-underline">Contactez-nous</Link>
          </div>
        </div>
      </section>
    </>
  );
}
