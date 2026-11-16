import { createFileRoute, useNavigate, Navigate } from "@tanstack/react-router";
import { useState } from "react";
import { useCart } from "@/lib/cart-context";
import { useAuth } from "@/lib/auth-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { formatPrice } from "@/lib/site-data";
import { CreditCard, Smartphone } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/commander")({
  head: () => ({
    meta: [{ title: "Passer commande — DAM Beauty & Cosmetics" }],
  }),
  component: CommanderPage,
});

function CommanderPage() {
  const { items, total, loading: cartLoading } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    clientNom: user?.nom || "",
    clientPrenom: user?.prenom || "",
    clientEmail: user?.email || "",
    clientTelephone: "",
    adresseRue: "",
    adresseQuartier: "",
    adresseVille: "Lomé",
    paymentMethod: "cash" as "momo" | "tmoney" | "carte" | "cash",
    notes: "",
  });

  const fraisLivraison = formData.adresseVille.toLowerCase() === "lomé" ? 0 : 2000;
  const totalFinal = total + fraisLivraison;

  if (cartLoading) {
    return <div className="py-24 text-center">Chargement...</div>;
  }

  if (items.length === 0) {
    return <Navigate to="/panier" />;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const res = await fetch("/api/orders/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!data.success) {
        throw new Error(data.error || "Erreur lors de la commande");
      }

      toast.success("Commande créée avec succès !");
      navigate({ to: "/commande-confirmee", search: { orderNumber: data.order.orderNumber } });
    } catch (error: any) {
      toast.error(error.message || "Erreur lors de la commande");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="py-24 px-6 lg:px-10">
      <div className="container mx-auto max-w-6xl">
        <h1 className="font-serif text-4xl lg:text-5xl mb-12">Finaliser la commande</h1>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Formulaire */}
          <div className="lg:col-span-2 space-y-8">
            {/* Informations personnelles */}
            <div>
              <h2 className="font-serif text-2xl mb-6">Informations personnelles</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="clientNom">Nom *</Label>
                  <Input
                    id="clientNom"
                    name="clientNom"
                    value={formData.clientNom}
                    onChange={handleChange}
                    required
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="clientPrenom">Prénom *</Label>
                  <Input
                    id="clientPrenom"
                    name="clientPrenom"
                    value={formData.clientPrenom}
                    onChange={handleChange}
                    required
                    className="mt-2"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div>
                  <Label htmlFor="clientEmail">Email *</Label>
                  <Input
                    id="clientEmail"
                    name="clientEmail"
                    type="email"
                    value={formData.clientEmail}
                    onChange={handleChange}
                    required
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="clientTelephone">Téléphone *</Label>
                  <Input
                    id="clientTelephone"
                    name="clientTelephone"
                    type="tel"
                    placeholder="+228 98 14 54 29"
                    value={formData.clientTelephone}
                    onChange={handleChange}
                    required
                    className="mt-2"
                  />
                </div>
              </div>
            </div>

            {/* Adresse de livraison */}
            <div>
              <h2 className="font-serif text-2xl mb-6">Adresse de livraison</h2>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="adresseRue">Adresse complète *</Label>
                  <Input
                    id="adresseRue"
                    name="adresseRue"
                    placeholder="Ex: Rue 123, Maison bleue"
                    value={formData.adresseRue}
                    onChange={handleChange}
                    required
                    className="mt-2"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="adresseQuartier">Quartier</Label>
                    <Input
                      id="adresseQuartier"
                      name="adresseQuartier"
                      placeholder="Ex: Bè"
                      value={formData.adresseQuartier}
                      onChange={handleChange}
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="adresseVille">Ville *</Label>
                    <select
                      id="adresseVille"
                      name="adresseVille"
                      value={formData.adresseVille}
                      onChange={handleChange}
                      required
                      className="mt-2 w-full border border-border rounded-md px-3 py-2 text-sm"
                    >
                      <option value="Lomé">Lomé</option>
                      <option value="Kara">Kara</option>
                      <option value="Sokodé">Sokodé</option>
                      <option value="Atakpamé">Atakpamé</option>
                      <option value="Autre">Autre ville</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Mode de paiement */}
            <div>
              <h2 className="font-serif text-2xl mb-6">Mode de paiement</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setFormData((prev) => ({ ...prev, paymentMethod: "momo" }))}
                  className={`p-4 border-2 rounded transition-colors ${
                    formData.paymentMethod === "momo"
                      ? "border-accent bg-accent/10"
                      : "border-border hover:border-accent/50"
                  }`}
                >
                  <Smartphone className="mx-auto mb-2" size={24} />
                  <div className="font-medium">Mobile Money (Momo)</div>
                  <div className="text-xs text-muted-foreground">Paiement en ligne</div>
                </button>

                <button
                  type="button"
                  onClick={() => setFormData((prev) => ({ ...prev, paymentMethod: "tmoney" }))}
                  className={`p-4 border-2 rounded transition-colors ${
                    formData.paymentMethod === "tmoney"
                      ? "border-accent bg-accent/10"
                      : "border-border hover:border-accent/50"
                  }`}
                >
                  <Smartphone className="mx-auto mb-2" size={24} />
                  <div className="font-medium">Tmoney</div>
                  <div className="text-xs text-muted-foreground">Paiement en ligne</div>
                </button>

                <button
                  type="button"
                  onClick={() => setFormData((prev) => ({ ...prev, paymentMethod: "carte" }))}
                  className={`p-4 border-2 rounded transition-colors ${
                    formData.paymentMethod === "carte"
                      ? "border-accent bg-accent/10"
                      : "border-border hover:border-accent/50"
                  }`}
                >
                  <CreditCard className="mx-auto mb-2" size={24} />
                  <div className="font-medium">Carte bancaire</div>
                  <div className="text-xs text-muted-foreground">Paiement sécurisé</div>
                </button>

                <button
                  type="button"
                  onClick={() => setFormData((prev) => ({ ...prev, paymentMethod: "cash" }))}
                  className={`p-4 border-2 rounded transition-colors ${
                    formData.paymentMethod === "cash"
                      ? "border-accent bg-accent/10"
                      : "border-border hover:border-accent/50"
                  }`}
                >
                  <div className="text-2xl mb-2">💵</div>
                  <div className="font-medium">Paiement à la livraison</div>
                  <div className="text-xs text-muted-foreground">En espèces</div>
                </button>
              </div>
            </div>

            {/* Notes */}
            <div>
              <Label htmlFor="notes">Notes (optionnel)</Label>
              <Textarea
                id="notes"
                name="notes"
                placeholder="Instructions de livraison, commentaires..."
                value={formData.notes}
                onChange={handleChange}
                className="mt-2"
                rows={3}
              />
            </div>
          </div>

          {/* Récapitulatif */}
          <div className="lg:col-span-1">
            <div className="border border-border p-6 sticky top-24">
              <h2 className="font-serif text-2xl mb-6">Récapitulatif</h2>

              <div className="space-y-3 mb-6 max-h-64 overflow-y-auto">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span>
                      {item.product.name} × {item.quantity}
                    </span>
                    <span className="font-medium">
                      {formatPrice(item.product.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t border-border pt-4 space-y-2 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Sous-total</span>
                  <span className="font-medium">{formatPrice(total)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Livraison</span>
                  <span className="font-medium">
                    {fraisLivraison === 0 ? "Gratuit" : formatPrice(fraisLivraison)}
                  </span>
                </div>
              </div>

              <div className="border-t border-border pt-4 mb-6">
                <div className="flex justify-between items-baseline">
                  <span className="font-serif text-xl">Total</span>
                  <span className="font-serif text-3xl">{formatPrice(totalFinal)}</span>
                </div>
              </div>

              <Button type="submit" disabled={submitting} className="w-full" size="lg">
                {submitting ? "Traitement..." : "Confirmer la commande"}
              </Button>

              <p className="text-xs text-muted-foreground mt-4 text-center">
                En passant commande, vous acceptez nos{" "}
                <a href="#" className="underline">
                  conditions générales de vente
                </a>
                .
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
