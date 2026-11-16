import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ProductCard } from "@/components/product-card";
export const Route = createFileRoute("/catalogue")({
  head: () => ({
    meta: [
      { title: "Boutique — DAM Beauty & Cosmetics" },
      { name: "description", content: "Explorez le catalogue DAM : soins capillaires, cosmétiques visage et produits naturels." },
    ],
  }),
  component: CataloguePage,
});
function CataloguePage() {
  return (<div className="py-20 px-6 lg:px-10"><div className="container mx-auto max-w-7xl"><h1 className="font-serif text-5xl mb-12">Catalogue DAM</h1><p className="text-muted-foreground">Découvrez notre sélection de soins capillaires, cosmétiques visage et produits naturels.</p><div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">{["Elixir Capillaire", "Creme Hydratante", "Masque Karite", "Serum Visage", "Savon Noir"].map((n, i) => (<div key={i} className="p-6 border border-border rounded-lg hover:bg-accent/5 transition-colors"><h3 className="font-serif text-xl mb-2">{n}</h3><p className="text-sm text-muted-foreground mb-4">Produit de qualité DAM</p><p className="font-medium">À partir de 4500 FCFA</p></div>))}</div></div></div>);
}