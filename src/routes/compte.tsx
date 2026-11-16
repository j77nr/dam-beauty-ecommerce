import { createFileRoute, Navigate, Link } from "@tanstack/react-router";
import { useAuth } from "@/lib/auth-context";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";
import { formatPrice } from "@/lib/site-data";
import { Package, ChevronRight } from "lucide-react";

export const Route = createFileRoute("/compte")({
  component: ComptePage,
});

interface Order {
  id: number;
  orderNumber: string;
  total: number;
  status: string;
  paymentStatus: string;
  createdAt: string;
  items: Array<{
    productName: string;
    quantity: number;
  }>;
}

function ComptePage() {
  const { user, loading, logout } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch("/api/orders");
        if (res.ok) {
          const data = await res.json();
          if (data.success) {
            setOrders(data.orders);
          }
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des commandes:", error);
      } finally {
        setOrdersLoading(false);
      }
    };

    if (user) {
      fetchOrders();
    }
  }, [user]);

  if (loading) {
    return (
      <div className="py-24 px-6 lg:px-10">
        <div className="container mx-auto max-w-4xl text-center">
          <p>Chargement...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/connexion" />;
  }

  const handleLogout = async () => {
    await logout();
    window.location.href = "/";
  };

  const getStatusLabel = (status: string) => {
    const labels: Record<string, string> = {
      en_attente: "En attente",
      confirmee: "Confirmée",
      en_preparation: "En préparation",
      en_livraison: "En livraison",
      livree: "Livrée",
      annulee: "Annulée",
    };
    return labels[status] || status;
  };

  const getStatusVariant = (status: string): "default" | "secondary" | "destructive" | "outline" => {
    if (status === "livree") return "default";
    if (status === "annulee") return "destructive";
    if (status === "en_livraison") return "secondary";
    return "outline";
  };

  return (
    <div className="py-24 px-6 lg:px-10">
      <div className="container mx-auto max-w-6xl">
        <div className="flex justify-between items-start mb-12">
          <div>
            <h1 className="font-serif text-4xl lg:text-5xl mb-4">Mon compte</h1>
            <p className="text-sm text-muted-foreground">
              Bienvenue {user.prenom} {user.nom}
            </p>
          </div>
          <Button variant="outline" onClick={handleLogout}>
            Déconnexion
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Informations personnelles */}
          <div className="border border-border p-6">
            <h2 className="font-serif text-2xl mb-6">Informations personnelles</h2>
            <dl className="space-y-4 text-sm">
              <div>
                <dt className="text-muted-foreground">Nom complet</dt>
                <dd className="font-medium mt-1">
                  {user.prenom} {user.nom}
                </dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Email</dt>
                <dd className="font-medium mt-1">{user.email}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Rôle</dt>
                <dd className="font-medium mt-1 capitalize">{user.role}</dd>
              </div>
            </dl>
          </div>

          {/* Mes commandes */}
          <div className="lg:col-span-2">
            <div className="border border-border p-6">
              <h2 className="font-serif text-2xl mb-6">Mes commandes</h2>
              
              {ordersLoading ? (
                <p className="text-sm text-muted-foreground">Chargement...</p>
              ) : orders.length === 0 ? (
                <div className="text-center py-8">
                  <Package className="mx-auto mb-4 text-muted-foreground" size={48} />
                  <p className="text-sm text-muted-foreground mb-4">
                    Vous n'avez pas encore passé de commande.
                  </p>
                  <Link to="/catalogue">
                    <Button>Découvrir nos produits</Button>
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div
                      key={order.id}
                      className="border border-border p-4 hover:bg-accent/5 transition-colors"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <p className="font-mono text-sm font-medium">
                            {order.orderNumber}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {new Date(order.createdAt).toLocaleDateString("fr-FR", {
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                            })}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-serif text-lg">{formatPrice(order.total)}</p>
                          <Badge variant={getStatusVariant(order.status)} className="mt-1">
                            {getStatusLabel(order.status)}
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="text-sm text-muted-foreground mb-3">
                        {order.items.length} article{order.items.length > 1 ? "s" : ""} :{" "}
                        {order.items.map((item) => item.productName).join(", ")}
                      </div>

                      <Link
                        to="/commande-confirmee"
                        search={{ orderNumber: order.orderNumber }}
                        className="text-sm font-medium hover:underline inline-flex items-center gap-1"
                      >
                        Voir les détails
                        <ChevronRight size={16} />
                      </Link>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Section Admin */}
        {user.role === "admin" && (
          <div className="mt-8 border border-accent bg-accent/5 p-6">
            <h2 className="font-serif text-2xl mb-4">Administration</h2>
            <p className="text-sm mb-4">Accès aux fonctionnalités d'administration.</p>
            <Link to="/admin">
              <Button variant="outline">Accéder au panel admin</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
