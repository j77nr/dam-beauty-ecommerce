import { Link } from "@tanstack/react-router";
import { SITE } from "@/lib/site-data";

export function SiteFooter() {
  return (
    <footer className="bg-ivory border-t border-border pt-20 pb-10">
      <div className="container mx-auto px-6 lg:px-10 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div>
          <h2 className="font-serif text-3xl font-semibold mb-6">DAM</h2>
          <p className="text-xs leading-relaxed text-muted-foreground max-w-[26ch]">
            Votre destination beauté premium à Lomé. Soins capillaires et cosmétiques pensés pour
            sublimer chaque peau, chaque chevelure.
          </p>
        </div>
        <div>
          <h6 className="text-[10px] uppercase tracking-[0.25em] font-semibold mb-6">Navigation</h6>
          <ul className="space-y-3 text-xs text-foreground/70">
            <li><Link to="/a-propos" className="hover:text-accent">À propos</Link></li>
            <li><Link to="/catalogue" className="hover:text-accent">Boutique</Link></li>
            <li><Link to="/blog" className="hover:text-accent">Blog</Link></li>
            <li><Link to="/galerie" className="hover:text-accent">Galerie</Link></li>
            <li><Link to="/temoignages" className="hover:text-accent">Témoignages</Link></li>
            <li><Link to="/faq" className="hover:text-accent">FAQ</Link></li>
          </ul>
        </div>
        <div>
          <h6 className="text-[10px] uppercase tracking-[0.25em] font-semibold mb-6">Contact</h6>
          <ul className="space-y-3 text-xs text-foreground/70">
            <li>{SITE.address}</li>
            <li>
              <a href={`tel:+${SITE.phoneRaw}`} className="hover:text-accent">{SITE.phone}</a>
            </li>
            <li>
              <a href={`mailto:${SITE.email}`} className="hover:text-accent break-all">{SITE.email}</a>
            </li>
            <li>
              <a href={SITE.whatsapp} target="_blank" rel="noopener" className="hover:text-accent">
                Commander via WhatsApp
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h6 className="text-[10px] uppercase tracking-[0.25em] font-semibold mb-6">Newsletter</h6>
          <p className="text-xs text-muted-foreground mb-4">
            Recevez nos conseils beauté et nouveautés.
          </p>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex border-b border-ink pb-2"
          >
            <input
              type="email"
              required
              placeholder="votre@email.com"
              className="bg-transparent text-xs w-full outline-none py-1"
            />
            <button className="text-[10px] uppercase tracking-[0.2em] font-medium">
              S'inscrire
            </button>
          </form>
        </div>
      </div>

      <div className="container mx-auto px-6 lg:px-10 mt-16 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-[10px] text-muted-foreground uppercase tracking-[0.2em]">
          © {new Date().getFullYear()} DAM Beauty & Cosmetics — Tous droits réservés.
        </p>
        <div className="flex gap-6">
          <a href={SITE.instagram} target="_blank" rel="noopener" className="text-[10px] uppercase tracking-[0.2em] hover:text-accent">Instagram</a>
          <a href={SITE.facebook} target="_blank" rel="noopener" className="text-[10px] uppercase tracking-[0.2em] hover:text-accent">Facebook</a>
          <a href={SITE.tiktok} target="_blank" rel="noopener" className="text-[10px] uppercase tracking-[0.2em] hover:text-accent">TikTok</a>
        </div>
      </div>
    </footer>
  );
}
