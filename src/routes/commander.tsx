import { createFileRoute, Navigate } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { formatPrice } from "@/lib/site-data";
import { toast } from "sonner";
export const Route = createFileRoute("/commander")({
  head: () => ({
    meta: [{ title: "Passer commande — DAM Beauty & Cosmetics" }],
  }),
  component: CommanderPage,
});
function CommanderPage() {
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({ clientNom: "", clientPrenom: "", clientEmail: "", clientTelephone: "", adresseRue: "", adresseQuartier: "", adresseVille: "Lomé", paymentMethod: "cash", notes: "" });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => { setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value })); };
  const handleSubmit = async (e: React.FormEvent) => { e.preventDefault(); setSubmitting(true); try { const res = await fetch("/api/orders/create", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(formData) }); const data = await res.json(); if (!data.success) throw new Error(data.error || "Erreur"); toast.success("Commande créée !"); } catch (err: any) { toast.error(err.message || "Erreur"); } finally { setSubmitting(false); } };
  return (<div className="py-24 px-6 lg:px-10"><div className="container mx-auto max-w-4xl"><h1 className="font-serif text-4xl mb-12">Finaliser la commande</h1><form onSubmit={handleSubmit} className="space-y-8"><div className="grid grid-cols-1 md:grid-cols-2 gap-6"><div><Label htmlFor="clientNom">Nom *</Label><Input id="clientNom" name="clientNom" value={formData.clientNom} onChange={handleChange} required className="mt-2" /></div><div><Label htmlFor="clientPrenom">Prénom *</Label><Input id="clientPrenom" name="clientPrenom" value={formData.clientPrenom} onChange={handleChange} required className="mt-2" /></div><div><Label htmlFor="clientEmail">Email *</Label><Input id="clientEmail" name="clientEmail" type="email" value={formData.clientEmail} onChange={handleChange} required className="mt-2" /></div><div><Label htmlFor="clientTelephone">Téléphone *</Label><Input id="clientTelephone" name="clientTelephone" type="tel" value={formData.clientTelephone} onChange={handleChange} required className="mt-2" /></div><div><Label htmlFor="adresseRue">Adresse *</Label><Input id="adresseRue" name="adresseRue" value={formData.adresseRue} onChange={handleChange} required className="mt-2" /></div><div><Label htmlFor="adresseVille">Ville</Label><Input id="adresseVille" name="adresseVille" value={formData.adresseVille} onChange={handleChange} className="mt-2" /></div></div><div><Label htmlFor="paymentMethod">Mode de paiement</Label><select id="paymentMethod" name="paymentMethod" value={formData.paymentMethod} onChange={handleChange} className="mt-2 w-full border border-border p-2 rounded"><option value="cash">Espèces à la livraison</option><option value="momo">MoMo</option><option value="tmoney">T-Money</option><option value="carte">Carte bancaire</option></select></div><div><Label htmlFor="notes">Notes (optionnel)</Label><textarea id="notes" name="notes" value={formData.notes} onChange={handleChange} rows={3} className="mt-2 w-full border border-border p-2 rounded" /></div><Button type="submit" disabled={submitting} className="w-full bg-ink text-ivory" size="lg">{submitting ? "Traitement..." : "Confirmer la commande"}</Button></form></div></div>);
}