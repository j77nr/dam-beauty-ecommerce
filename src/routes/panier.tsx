import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/site-data";
import { ShoppingBag, Trash2, Plus, Minus } from "lucide-react";
export const Route = createFileRoute("/panier")({
  head: () => ({
    meta: [{ title: "Mon Panier — DAM Beauty & Cosmetics" }],
  }),
  component: PanierPage,
});
function PanierPage() {
  return (<div className="py-24 px-6 lg:px-10"><div className="container mx-auto max-w-5xl"><h1 className="font-serif text-4xl lg:text-5xl mb-12">Mon panier</h1><div className="text-center py-24"><ShoppingBag size={64} className="mx-auto mb-6 text-muted-foreground" /><h1 className="font-serif text-4xl mb-6">Votre panier est vide</h1><p className="text-muted-foreground mb-8">Découvrez nos produits et ajoutez-les à votre panier.</p><Link to="/catalogue"><Button>Voir le catalogue</Button></Link></div></div></div>);
}