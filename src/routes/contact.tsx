import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { SITE } from "@/lib/site-data";
import { MapPin, Phone, Mail, MessageCircle } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — DAM Beauty & Cosmetics" },
      { name: "description", content: "Contactez DAM à Lomé : formulaire, téléphone, WhatsApp et adresses. Notre équipe vous répond sous 24 h." },
      { property: "og:title", content: "Contact — DAM" },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

const schema = z.object({
  name: z.string().trim().min(2, "Nom trop court").max(80),
  email: z.string().trim().email("Email invalide").max(160),
  subject: z.string().trim().min(2).max(120),
  message: z.string().trim().min(10, "Message trop court").max(2000),
});

function ContactPage() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    const r = schema.safeParse(data);
    if (!r.success) {
      const errs: Record<string, string> = {};
      for (const i of r.error.issues) errs[i.path[0] as string] = i.message;
      setErrors(errs);
      return;
    }
    setErrors({});
    const body = `Bonjour DAM,\n\nNom : ${r.data.name}\nEmail : ${r.data.email}\nSujet : ${r.data.subject}\n\n${r.data.message}`;
    window.location.href = `mailto:${SITE.email}?subject=${encodeURIComponent(r.data.subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  }

  return (
    <>
      <section className="py-20 lg:py-28 bg-beige-soft">
        <div className="container mx-auto px-6 lg:px-10 max-w-4xl">
          <span className="eyebrow text-accent mb-6 block">Contact</span>
          <h1 className="font-serif text-5xl lg:text-7xl leading-[0.95]">
            Parlons <span className="italic">beauté</span>.
          </h1>
          <p className="mt-6 max-w-xl text-sm text-foreground/70">
            Une question, un conseil personnalisé, une commande spéciale ? Notre équipe vous
            répond sous 24 h.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-5 gap-16">
          <aside className="lg:col-span-2 space-y-10">
            <div>
              <h2 className="font-serif text-2xl mb-6">Maison DAM</h2>
              <ul className="space-y-5 text-sm">
                <li className="flex gap-4">
                  <MapPin size={18} className="text-accent mt-0.5 flex-shrink-0" />
                  <span>{SITE.address}</span>
                </li>
                <li className="flex gap-4">
                  <Phone size={18} className="text-accent mt-0.5 flex-shrink-0" />
                  <a href={`tel:+${SITE.phoneRaw}`} className="hover:underline">{SITE.phone}</a>
                </li>
                <li className="flex gap-4">
                  <Mail size={18} className="text-accent mt-0.5 flex-shrink-0" />
                  <a href={`mailto:${SITE.email}`} className="hover:underline break-all">{SITE.email}</a>
                </li>
                <li className="flex gap-4">
                  <MessageCircle size={18} className="text-accent mt-0.5 flex-shrink-0" />
                  <a href={SITE.whatsapp} target="_blank" rel="noopener" className="hover:underline">
                    WhatsApp directement
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-[11px] uppercase tracking-[0.25em] font-semibold mb-4">
                Horaires
              </h3>
              <p className="text-sm text-foreground/70 leading-relaxed">
                Lundi — Samedi<br />
                9 h 00 — 19 h 00
              </p>
            </div>
            <div>
              <h3 className="text-[11px] uppercase tracking-[0.25em] font-semibold mb-4">
                Suivez-nous
              </h3>
              <div className="flex gap-6">
                <a href={SITE.instagram} target="_blank" rel="noopener" className="link-underline">Instagram</a>
                <a href={SITE.facebook} target="_blank" rel="noopener" className="link-underline">Facebook</a>
                <a href={SITE.tiktok} target="_blank" rel="noopener" className="link-underline">TikTok</a>
              </div>
            </div>
          </aside>

          <form onSubmit={onSubmit} className="lg:col-span-3 space-y-6" noValidate>
            <div>
              <label className="text-[11px] uppercase tracking-[0.2em] block mb-2">Nom</label>
              <input
                name="name"
                className="w-full bg-transparent border-b border-ink/30 focus:border-ink outline-none py-3 text-sm"
              />
              {errors.name && <p className="text-xs text-destructive mt-1">{errors.name}</p>}
            </div>
            <div>
              <label className="text-[11px] uppercase tracking-[0.2em] block mb-2">Email</label>
              <input
                name="email"
                type="email"
                className="w-full bg-transparent border-b border-ink/30 focus:border-ink outline-none py-3 text-sm"
              />
              {errors.email && <p className="text-xs text-destructive mt-1">{errors.email}</p>}
            </div>
            <div>
              <label className="text-[11px] uppercase tracking-[0.2em] block mb-2">Sujet</label>
              <input
                name="subject"
                className="w-full bg-transparent border-b border-ink/30 focus:border-ink outline-none py-3 text-sm"
              />
              {errors.subject && <p className="text-xs text-destructive mt-1">{errors.subject}</p>}
            </div>
            <div>
              <label className="text-[11px] uppercase tracking-[0.2em] block mb-2">Message</label>
              <textarea
                name="message"
                rows={6}
                className="w-full bg-transparent border-b border-ink/30 focus:border-ink outline-none py-3 text-sm resize-none"
              />
              {errors.message && <p className="text-xs text-destructive mt-1">{errors.message}</p>}
            </div>
            <button
              type="submit"
              className="bg-ink text-ivory px-12 py-4 text-[11px] uppercase tracking-[0.25em] hover:bg-accent transition-colors"
            >
              Envoyer le message
            </button>
            {sent && (
              <p className="text-sm text-foreground/70">
                Merci. Votre client mail s'ouvre — nous revenons vers vous très vite.
              </p>
            )}
          </form>
        </div>
      </section>
    </>
  );
}
