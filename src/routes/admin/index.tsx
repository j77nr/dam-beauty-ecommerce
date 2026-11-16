import { createFileRoute, Navigate } from "@tanstack/react-router";
import { useAuth } from "@/lib/auth-context";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatPrice } from "@/lib/site-data";
import { Package, ShoppingCart, Users, DollarSign, TrendingUp } from "lucide-react";

export const Route = createFileRoute("/admin/")({
  head: () => ({
    meta: [{ title: "Dashboard Admin — DAM Beauty & Cosmetics" }],
  }),
  component: AdminDashboard,
});

interface Stats {
  totalOrders: number;
  totalRevenue: number;
  pendingOrders: number;
  totalProducts: number;
  recentOrders: Array<{
    id: number;
    orderNumber: string;
    clientNom: string;
    clientPrenom: string;
    total: number;
    status: string;
    createdAt: string;
  }>;
}

function AdminDashboard() {
  const { user, loading } = useAuth();
  const [stats, setStats] = useState<Stats | null>(null);
  const [statsLoading, setStatsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch("/api/admin/stats");
        if (res.ok) {
          const data = await res.json();
          if (data.success) {
            setStats(data.stats);
          }
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des stats:", error);
      } finally {
        setStatsLoading(false);
      }
    };

    if (user?.role === "admin") {
      fetchStats();
    }
  }, [user]);

  if (loading) {
    return (
      <div className="py-24 px-6 lg:px-10">
        <div className="container mx-auto text-center">
          <p>Chargement...</p>
        </div>
      </div>
    );
  }

  if (!user || user.role !== "admin") {
    return <Navigate to="/" />;
  }

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

  return (
    <div className="py-24 px-6 lg:px-10">
      <div className="container mx-auto max-w-7xl">
        <div className="mb-12">
          <h1 className="font-serif text-4xl lg:text-5xl mb-4">Dashboard Admin</h1>
          <p className="text-muted-foreground">
            Vue d'ensemble de votre boutique en ligne
          </p>
        </div>

        {statsLoading ? (
          <p className="text-center">Chargement des statistiques...</p>
        ) : stats ? (
          <>
            {/* Cartes de statistiques */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Revenus totaux
                  </CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {formatPrice(stats.totalRevenue)}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Total des ventes
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Commandes totales
                  </CardTitle>
                  <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.totalOrders}</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Toutes les commandes
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    En attente
                  </CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.pendingOrders}</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    À traiter
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Produits
                  </CardTitle>
                  <Package className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.totalProducts}</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Au catalogue
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Commandes récentes */}
            <Card>
              <CardHeader>
                <CardTitle>Commandes récentes</CardTitle>
              </CardHeader>
              <CardContent>
                {stats.recentOrders.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-8">
                    Aucune commande pour le moment
                  </p>
                ) : (
                  <div className="space-y-4">
                    {stats.recentOrders.map((order) => (
                      <div
                        key={order.id}
                        className="flex items-center justify-between border-b border-border pb-4 last:border-0"
                      >
                        <div>
                          <p className="font-mono text-sm font-medium">
                            {order.orderNumber}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {order.clientPrenom} {order.clientNom}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(order.createdAt).toLocaleDateString("fr-FR", {
                              day: "numeric",
                              month: "long",
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">{formatPrice(order.total)}</p>
                          <p className="text-xs text-muted-foreground">
                            {getStatusLabel(order.status)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </>
        ) : (
          <p className="text-center text-muted-foreground">
            Impossible de charger les statistiques
          </p>
        )}
      </div>
    </div>
  );
}
