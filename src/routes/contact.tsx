import { createFileRoute } from "@tanstack/react-router";
export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [{ title: "Contact — DAM Beauty & Cosmetics" }, { name: "description", content: "Contactez DAM à Lomé : formulaire, téléphone, WhatsApp et adresses." }],
  }),
  component: ContactPage,
});
function ContactPage() {
  return (<div className="py-20 px-6 lg:px-10"><div className="container mx-auto max-w-4xl"><span className="eyebrow text-accent mb-6 block">Contact</span><h1 className="font-serif text-5xl lg:text-7xl leading-[0.95]">Parlons <span className="italic">beauté</span>.</h1><p className="mt-6 max-w-xl text-sm text-foreground/70">Une question, un conseil personnalisé, une commande spéciale ? Notre équipe vous répond sous 24 h.</p></div></div>);
}