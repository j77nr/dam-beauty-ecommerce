import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle, Package } from "lucide-react";
import { formatPrice } from "@/lib/site-data";
export const Route = createFileRoute("/commande-confirmee")({
  head: () => ({
    meta: [{ title: "Commande confirmée — DAM Beauty & Cosmetics" }],
  }),
  component: CommandeConfirmeePage,
});
function CommandeConfirmeePage() {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => { setTimeout(() => { setOrder({ orderNumber: "DAM-001", total: 15000, clientEmail: "client@example.com", clientTelephone: "+228 98 14 54 29", adresseVille: "Lomé", createdAt: new Date().toISOString(), items: [{ productName: "Elixir Capillaire", quantity: 1, productPrice: 15000, subtotal: 15000 }] }); setLoading(false); }, 500); }, []);
  if (loading) return (<div className="py-24 text-center">Chargement...</div>);
  if (!order) return null;
  return (<div className="py-24 px-6 lg:px-10"><div className="container mx-auto max-w-3xl"><div className="text-center mb-12"><CheckCircle className="mx-auto mb-6 text-green-600" size={64} /><h1 className="font-serif text-4xl mb-4">Commande confirmée !</h1><p className="text-lg text-muted-foreground">Merci pour votre confiance. Votre commande a bien été enregistrée.</p></div><div className="border border-border p-8 mb-8"><div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"><div><div className="flex items-center gap-2 mb-2"><Package size={20} className="text-muted-foreground" /><span className="font-medium">Numéro de commande</span></div><p className="text-2xl font-mono">{order.orderNumber}</p></div><div><div className="flex items-center gap-2 mb-2"><span className="font-medium">Total payé</span></div><p className="text-2xl font-serif">{formatPrice(order.total)}</p></div></div><div className="border-t border-border pt-6"><h2 className="font-serif text-xl mb-4">Détails de la commande</h2><div className="space-y-3">{order.items.map((item: any, index: number) => (<div key={index} className="flex justify-between text-sm"><span>{item.productName} × {item.quantity}</span><span className="font-medium">{formatPrice(item.subtotal)}</span></div>))}</div></div></div><div className="bg-accent/10 border border-accent/20 p-6 mb-8"><h2 className="font-serif text-2xl mb-4">Prochaines étapes</h2><ol className="space-y-3 text-sm"><li className="flex items-start gap-3"><div><strong>Confirmation par email</strong><p className="text-muted-foreground">Un email de confirmation a été envoyé à {order.clientEmail}.</p></div></li><li className="flex items-start gap-3"><div><strong>Contact par téléphone</strong><p className="text-muted-foreground">Notre équipe vous contactera au {order.clientTelephone} pour confirmer la livraison.</p></div></li><li className="flex items-start gap-3"><div><strong>Livraison à {order.adresseVille}</strong><p className="text-muted-foreground">Votre commande sera préparée et livrée sous 24-48h.</p></div></li></ol></div><div className="flex flex-col sm:flex-row gap-4 justify-center"><Link to="/catalogue"><Button variant="outline" className="w-full sm:w-auto">Continuer mes achats</Button></Link><Link to="/compte"><Button className="w-full sm:w-auto">Voir mes commandes</Button></Link></div></div></div>);
}