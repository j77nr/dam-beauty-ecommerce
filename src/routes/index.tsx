import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import heroPortrait from "@/assets/hero-portrait.jpg";
import { ProductCard } from "@/components/product-card";
export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "DAM — Beauty & Cosmetics | Lomé, Togo" },
      { name: "description", content: "Soins capillaires, cosmétiques visage et produits naturels conçus à Lomé." },
    ],
  }),
  component: HomePage,
});
function HomePage() {
  return (<>
    <section className="relative min-h-[88vh] flex items-center overflow-hidden bg-beige-soft">
      <div className="container mx-auto px-6 lg:px-10 grid grid-cols-12 items-center gap-8 py-16 lg:py-0">
        <div className="col-span-12 lg:col-span-5 z-10">
          <span className="text-[10px] uppercase tracking-[0.35em] text-accent mb-6 block font-medium">Essence de Lomé · Édition 2026</span>
          <h1 className="font-serif text-5xl sm:text-6xl lg:text-8xl leading-[0.9] mb-8">La Beauté <br /><span className="italic font-normal">Sublimée</span></h1>
          <p className="max-w-sm text-sm leading-relaxed mb-10 text-foreground/70">Une sélection exclusive de soins capillaires et cosmétiques pensés pour magnifier votre éclat naturel, chaque jour, partout au Togo.</p>
          <div className="flex flex-wrap gap-4">
            <Link to="/catalogue" className="bg-ink text-ivory px-10 py-4 text-[11px] uppercase tracking-[0.25em] hover:bg-accent transition-colors inline-flex items-center gap-3">Explorer la collection <ArrowRight size={14} /></Link>
            <Link to="/a-propos" className="link-underline self-center">Notre histoire</Link>
          </div>
        </div>
        <div className="col-span-12 lg:col-span-7 relative h-full flex justify-end"><img src={heroPortrait} alt="Portrait éditorial DAM" width={1024} height={1280} className="w-full lg:w-[88%] aspect-[4/5] object-cover shadow-soft" /></div>
      </div>
    </section>
  </>);
}