import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, Search, User, ShoppingBag } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { useCart } from "@/lib/cart-context";

const NAV = [
  { to: "/catalogue", label: "Boutique" },
  { to: "/a-propos", label: "À propos" },
  { to: "/blog", label: "Conseils" },
  { to: "/galerie", label: "Galerie" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const { user, loading } = useAuth();
  const { itemCount } = useCart();
  
  return (
    <header className="sticky top-0 z-50 bg-ivory/80 backdrop-blur-md border-b border-border">
      <nav className="relative flex items-center justify-between px-6 lg:px-10 h-16">
        <div className="hidden md:flex gap-8 items-center">
          {NAV.slice(0, 3).map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="text-[11px] uppercase tracking-[0.2em] font-medium hover:opacity-60 transition-opacity"
              activeProps={{ className: "opacity-100 underline underline-offset-8" }}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <button
          className="md:hidden text-ink"
          onClick={() => setOpen((s) => !s)}
          aria-label="Menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>

        <Link
          to="/"
          className="absolute left-1/2 -translate-x-1/2 font-serif text-3xl tracking-tight font-semibold"
        >
          DAM
        </Link>

        <div className="hidden md:flex gap-6 items-center">
          {NAV.slice(3).map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="text-[11px] uppercase tracking-[0.2em] font-medium hover:opacity-60 transition-opacity"
              activeProps={{ className: "opacity-100 underline underline-offset-8" }}
            >
              {item.label}
            </Link>
          ))}
          <button aria-label="Recherche" className="opacity-70 hover:opacity-100">
            <Search size={16} />
          </button>
          
          {/* Panier */}
          <Link
            to="/panier"
            className="relative opacity-70 hover:opacity-100 transition-opacity"
            aria-label="Panier"
          >
            <ShoppingBag size={18} />
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-accent text-ivory text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </Link>
          
          {/* Auth buttons */}
          {!loading && (
            user ? (
              <Link
                to="/compte"
                className="flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] font-medium hover:opacity-60 transition-opacity"
                activeProps={{ className: "opacity-100" }}
              >
                <User size={16} />
                <span className="hidden lg:inline">Compte</span>
              </Link>
            ) : (
              <Link
                to="/connexion"
                className="text-[11px] uppercase tracking-[0.2em] font-medium hover:opacity-60 transition-opacity"
              >
                Connexion
              </Link>
            )
          )}
        </div>

        <div className="md:hidden w-6" />
      </nav>

      {open && (
        <div className="md:hidden border-t border-border bg-ivory">
          <div className="flex flex-col px-6 py-4 gap-4">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="text-[11px] uppercase tracking-[0.2em] font-medium"
              >
                {item.label}
              </Link>
            ))}
            <Link
              to="/panier"
              onClick={() => setOpen(false)}
              className="text-[11px] uppercase tracking-[0.2em] font-medium flex items-center gap-2"
            >
              Panier {itemCount > 0 && `(${itemCount})`}
            </Link>
            {!loading && (
              user ? (
                <Link
                  to="/compte"
                  onClick={() => setOpen(false)}
                  className="text-[11px] uppercase tracking-[0.2em] font-medium"
                >
                  Mon compte
                </Link>
              ) : (
                <Link
                  to="/connexion"
                  onClick={() => setOpen(false)}
                  className="text-[11px] uppercase tracking-[0.2em] font-medium"
                >
                  Connexion
                </Link>
              )
            )}
          </div>
        </div>
      )}
    </header>
  );
}
