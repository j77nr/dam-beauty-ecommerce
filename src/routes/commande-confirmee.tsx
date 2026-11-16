import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle, Package, Mail, Phone } from "lucide-react";
import { formatPrice } from "@/lib/site-data";
import { z } from "zod";

const searchSchema = z.object({
  orderNumber: z.string().optional(),
});

export const Route = createFileRoute("/commande-confirmee")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [{ title: "Commande confirmée — DAM Beauty & Cosmetics" }],
  }),
  component: CommandeConfirmeePage,
});

interface Order {
  id: number;
  orderNumber: string;
  total: number;
  clientEmail: string;
  clientTelephone: string;
  adresseVille: string;
  createdAt: string;
  items: Array<{
    productName: string;
    quantity: number;
    productPrice: number;
    subtotal: number;
  }>;
}

function CommandeConfirmeePage() {
  const { orderNumber } = Route.useSearch();
  const navigate = useNavigate();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!orderNumber) {
      navigate({ to: "/catalogue" });
      return;
    }

    const fetchOrder = async () => {
      try {
        const res = await fetch(`/api/orders/${orderNumber}`);
        if (res.ok) {
          const data = await res.json();
          if (data.success) {
            setOrder(data.order);
          } else {
            navigate({ to: "/catalogue" });
          }
        }
      } catch (error) {
        console.error("Erreur lors de la récupération de la commande:", error);
        navigate({ to: "/catalogue" });
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderNumber, navigate]);

  if (loading) {
    return (
      <div className="py-24 px-6 lg:px-10">
        <div className="container mx-auto max-w-3xl text-center">
          <p>Chargement...</p>
        </div>
      </div>
    );
  }

  if (!order) {
    return null;
  }

  return (
    <div className="py-24 px-6 lg:px-10">
      <div className="container mx-auto max-w-3xl">
        {/* En-tête de confirmation */}
        <div className="text-center mb-12">
          <CheckCircle className="mx-auto mb-6 text-green-600" size={64} />
          <h1 className="font-serif text-4xl lg:text-5xl mb-4">
            Commande confirmée !
          </h1>
          <p className="text-lg text-muted-foreground">
            Merci pour votre confiance. Votre commande a bien été enregistrée.
          </p>
        </div>

        {/* Informations de commande */}
        <div className="border border-border p-8 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Package size={20} className="text-muted-foreground" />
                <span className="font-medium">Numéro de commande</span>
              </div>
              <p className="text-2xl font-mono">{order.orderNumber}</p>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="font-medium">Total payé</span>
              </div>
              <p className="text-2xl font-serif">{formatPrice(order.total)}</p>
            </div>
          </div>

          <div className="border-t border-border pt-6">
            <h2 className="font-serif text-xl mb-4">Détails de la commande</h2>
            <div className="space-y-3">
              {order.items.map((item, index) => (
                <div key={index} className="flex justify-between text-sm">
                  <span>
                    {item.productName} × {item.quantity}
                  </span>
                  <span className="font-medium">{formatPrice(item.subtotal)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Prochaines étapes */}
        <div className="bg-accent/10 border border-accent/20 p-6 mb-8">
          <h2 className="font-serif text-2xl mb-4">Prochaines étapes</h2>
          <ol className="space-y-3 text-sm">
            <li className="flex items-start gap-3">
              <Mail className="mt-1 text-accent flex-shrink-0" size={18} />
              <div>
                <strong>Confirmation par email</strong>
                <p className="text-muted-foreground">
                  Un email de confirmation a été envoyé à{" "}
                  <span className="font-medium">{order.clientEmail}</span>
                </p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <Phone className="mt-1 text-accent flex-shrink-0" size={18} />
              <div>
                <strong>Contact par téléphone</strong>
                <p className="text-muted-foreground">
                  Notre équipe vous contactera au{" "}
                  <span className="font-medium">{order.clientTelephone}</span> pour
                  confirmer la livraison.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <Package className="mt-1 text-accent flex-shrink-0" size={18} />
              <div>
                <strong>Livraison à {order.adresseVille}</strong>
                <p className="text-muted-foreground">
                  Votre commande sera préparée et livrée sous 24-48h.
                </p>
              </div>
            </li>
          </ol>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/catalogue">
            <Button variant="outline" className="w-full sm:w-auto">
              Continuer mes achats
            </Button>
          </Link>
          <Link to="/compte">
            <Button className="w-full sm:w-auto">Voir mes commandes</Button>
          </Link>
        </div>

        {/* Informations de contact */}
        <div className="text-center mt-12 pt-8 border-t border-border">
          <p className="text-sm text-muted-foreground">
            Une question sur votre commande ?
          </p>
          <p className="text-sm mt-2">
            Contactez-nous au{" "}
            <a href="tel:+22898145429" className="font-medium hover:underline">
              +228 98 14 54 29
            </a>{" "}
            ou par email à{" "}
            <a
              href="mailto:contact@damcosmetics.tg"
              className="font-medium hover:underline"
            >
              contact@damcosmetics.tg
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
