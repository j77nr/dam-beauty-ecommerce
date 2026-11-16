import { createFileRoute } from "@tanstack/react-router";
export const Route = createFileRoute("/a-propos")({
  head: () => ({
    meta: [{ title: "À propos — DAM Beauty & Cosmetics" }, { name: "description", content: "Découvrez l'histoire de DAM, maison de beauté basée à Lomé." }],
  }),
  component: AboutPage,
});
function AboutPage() {
  return (<div className="py-24 px-6 lg:px-10"><div className="container mx-auto max-w-4xl text-center"><span className="eyebrow text-accent mb-6 block">La maison DAM</span><h1 className="font-serif text-5xl lg:text-7xl leading-[0.95] mb-8">Une vision de la beauté <span className="italic">née à Lomé</span>.</h1><p className="text-base text-foreground/70 leading-relaxed max-w-2xl mx-auto">DAM est une maison togolaise de soins capillaires et cosmétiques, fondée sur la conviction que la beauté authentique se cultive dans le geste juste, la matière noble et le temps offert à soi.</p></div></div>);
}