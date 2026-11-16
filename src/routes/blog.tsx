import { createFileRoute, Link } from "@tanstack/react-router";
export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [{ title: "Journal — Conseils beauté DAM" }, { name: "description", content: "Le journal DAM : conseils capillaires, rituels visage, ingrédients et tendances beauté." }],
  }),
  component: BlogIndex,
});
function BlogIndex() {
  return (<div className="py-20 px-6 lg:px-10"><div className="container mx-auto max-w-4xl"><span className="eyebrow text-accent mb-6 block">Le Journal DAM</span><h1 className="font-serif text-5xl lg:text-7xl leading-[0.95]">Rituels, conseils <br /><span className="italic">& confidences beauté</span>.</h1></div></div>);
}