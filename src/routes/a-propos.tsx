import { createFileRoute } from "@tanstack/react-router";
import aboutAtelier from "@/assets/about-atelier.jpg";
import heroPortrait from "@/assets/hero-portrait.jpg";

export const Route = createFileRoute("/a-propos")({
  head: () => ({
    meta: [
      { title: "À propos — DAM Beauty & Cosmetics" },
      { name: "description", content: "Découvrez l'histoire, l'équipe et les valeurs de DAM, maison de beauté basée à Lomé." },
      { property: "og:title", content: "À propos — DAM" },
      { property: "og:description", content: "L'histoire et les valeurs de la maison DAM à Lomé." },
      { property: "og:url", content: "/a-propos" },
    ],
    links: [{ rel: "canonical", href: "/a-propos" }],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <>
      <section className="py-24 lg:py-32 bg-beige-soft">
        <div className="container mx-auto px-6 lg:px-10 max-w-4xl text-center">
          <span className="eyebrow text-accent mb-6 block">La maison DAM</span>
          <h1 className="font-serif text-5xl lg:text-7xl leading-[0.95] mb-8">
            Une vision de la beauté <span className="italic">née à Lomé</span>.
          </h1>
          <p className="text-base text-foreground/70 leading-relaxed max-w-2xl mx-auto">
            DAM est une maison togolaise de soins capillaires et cosmétiques, fondée sur la
            conviction que la beauté authentique se cultive dans le geste juste, la matière noble
            et le temps offert à soi.
          </p>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <img
            src={aboutAtelier}
            alt="L'atelier DAM à Lomé"
            loading="lazy"
            className="w-full aspect-[4/5] object-cover"
          />
          <div>
            <span className="eyebrow text-accent mb-6 block">Notre histoire</span>
            <h2 className="font-serif text-4xl mb-8 leading-tight">
              Une marque pensée par <span className="italic">les femmes d'ici</span>, pour celles
              d'ailleurs.
            </h2>
            <div className="space-y-6 text-sm leading-relaxed text-foreground/75">
              <p>
                DAM est née de l'envie de répondre à un constat simple : les peaux et chevelures
                africaines méritaient une marque qui leur ressemble. Pensée à Lomé, formulée avec
                les actifs précieux du Togo, la maison s'inspire des rituels transmis de génération
                en génération.
              </p>
              <p>
                Aujourd'hui, DAM rassemble une communauté de femmes et d'hommes qui partagent un
                même goût du soin, du beau et du vrai.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-beige-soft">
        <div className="container mx-auto px-6 lg:px-10">
          <span className="eyebrow text-accent mb-6 block">Nos valeurs</span>
          <h2 className="font-serif text-4xl mb-16 max-w-2xl">
            Trois engagements qui guident chacun de nos gestes.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                n: "01",
                title: "Authenticité",
                body: "Des formules sincères, fondées sur des actifs vérifiés et des compositions transparentes.",
              },
              {
                n: "02",
                title: "Excellence",
                body: "La rigueur cosmétique au service de résultats visibles, dès les premières applications.",
              },
              {
                n: "03",
                title: "Proximité",
                body: "Un accompagnement personnalisé, parce que chaque peau et chaque chevelure raconte une histoire.",
              },
            ].map((v) => (
              <div key={v.n}>
                <span className="text-[10px] text-muted-foreground tracking-[0.25em]">{v.n}</span>
                <h3 className="font-serif text-3xl my-4 italic">{v.title}</h3>
                <p className="text-sm text-foreground/70 leading-relaxed">{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="lg:order-2">
            <img
              src={heroPortrait}
              alt="Équipe DAM"
              loading="lazy"
              className="w-full aspect-[4/5] object-cover"
            />
          </div>
          <div className="lg:order-1">
            <span className="eyebrow text-accent mb-6 block">L'équipe</span>
            <h2 className="font-serif text-4xl mb-8 leading-tight">
              Conduit avec passion par <span className="italic">Mawulawoe Debora Akakpo</span>.
            </h2>
            <p className="text-sm leading-relaxed text-foreground/75 mb-6">
              Fondatrice et directrice créative, Debora pilote chaque collection avec un même cap :
              élever la beauté togolaise au rang d'expérience sensorielle complète.
            </p>
            <p className="text-sm leading-relaxed text-foreground/75">
              Entourée d'une équipe d'experts en cosmétologie, marketing et relation client, elle
              fait grandir DAM avec rigueur, humilité et exigence.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
