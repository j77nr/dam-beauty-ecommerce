import { createFileRoute, Navigate, Link } from "@tanstack/react-router";
import { useAuth } from "@/lib/auth-context";
import { Button } from "@/components/ui/button";
import { Package } from "lucide-react";
export const Route = createFileRoute("/compte")({
  component: ComptePage,
});
function ComptePage() {
  const { user, loading, logout } = useAuth();
  const handleLogout = async () => { await logout(); window.location.href = "/"; };
  if (loading) return (<div className="py-24 text-center">Chargement...</div>);
  if (!user) return <Navigate to="/connexion" />;
  return (<div className="py-24 px-6 lg:px-10"><div className="container mx-auto max-w-4xl"><div className="flex justify-between items-start mb-12"><div><h1 className="font-serif text-4xl mb-4">Mon compte</h1><p className="text-sm text-muted-foreground">Bienvenue {user.prenom} {user.nom}</p></div><Button variant="outline" onClick={handleLogout}>Déconnexion</Button></div><div className="grid grid-cols-1 lg:grid-cols-3 gap-8"><div className="border border-border p-6"><h2 className="font-serif text-2xl mb-6">Informations personnelles</h2><p><strong>Email :</strong> {user.email}</p><p><strong>Rôle :</strong> {user.role}</p></div><div className="lg:col-span-2"><div className="border border-border p-6"><h2 className="font-serif text-2xl mb-6">Mes commandes</h2><div className="text-center py-8"><Package size={48} className="mx-auto mb-4 text-muted-foreground" /><p className="text-sm text-muted-foreground mb-4">Vous n'avez pas encore passé de commande.</p><Link to="/catalogue"><Button>Découvrir nos produits</Button></Link></div></div></div></div>{user.role === "admin" && (<div className="mt-8 border border-accent bg-accent/5 p-6"><h2 className="font-serif text-2xl mb-4">Administration</h2><p className="text-sm mb-4">Accès aux fonctionnalités d'administration.</p><Link to="/admin"><Button variant="outline">Accéder au panel admin</Button></Link></div>)}</div></div>);
}