import { createFileRoute } from "@tanstack/react-router";
export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [{ title: "FAQ — DAM Beauty & Cosmetics" }, { name: "description", content: "Reponses aux questions frequentes sur les produits et services DAM." }],
  }),
  component: FAQPage,
});
function FAQPage() {
  return (<div className="py-20 px-6 lg:px-10"><div className="container mx-auto max-w-4xl text-center"><span className="eyebrow text-accent mb-6 block">Foire aux questions</span><h1 className="font-serif text-5xl lg:text-7xl leading-[0.95]">Vos questions, nos reponses.</h1></div></div>);
}