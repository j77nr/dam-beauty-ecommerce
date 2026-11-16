import { createFileRoute, Navigate, Link } from "@tanstack/react-router";
import { useAuth } from "@/lib/auth-context";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formatPrice } from "@/lib/site-data";
import { Eye, Filter } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/commandes")({
  head: () => ({
    meta: [{ title: "Gestion des commandes — Admin" }],
  }),
  component: AdminCommandesPage,
});

interface Order {
  id: number;
  orderNumber: string;
  clientNom: string;
  clientPrenom: string;
  clientEmail: string;
  clientTelephone: string;
  adresseVille: string;
  total: number;
  status: string;
  paymentStatus: string;
  paymentMethod: string;
  createdAt: string;
  items: Array<{
    productName: string;
    quantity: number;
    productPrice: number;
  }>;
}

function AdminCommandesPage() {
  const { user, loading } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const fetchOrders = async () => {
    try {
      const res = await fetch("/api/admin/orders");
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

  useEffect(() => {
    if (user?.role === "admin") {
      fetchOrders();
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

  const getStatusVariant = (
    status: string
  ): "default" | "secondary" | "destructive" | "outline" => {
    if (status === "livree") return "default";
    if (status === "annulee") return "destructive";
    if (status === "en_livraison") return "secondary";
    return "outline";
  };

  const handleStatusChange = async (orderId: number, newStatus: string) => {
    try {
      const res = await fetch("/api/admin/orders/update-status", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId, status: newStatus }),
      });

      const data = await res.json();

      if (!data.success) {
        throw new Error(data.error || "Erreur lors de la mise à jour");
      }

      toast.success("Statut mis à jour");
      fetchOrders();
    } catch (error: any) {
      toast.error(error.message || "Erreur lors de la mise à jour");
    }
  };

  const filteredOrders =
    statusFilter === "all"
      ? orders
      : orders.filter((order) => order.status === statusFilter);

  return (
    <div className="py-24 px-6 lg:px-10">
      <div className="container mx-auto max-w-7xl">
        <div className="flex justify-between items-start mb-12">
          <div>
            <h1 className="font-serif text-4xl lg:text-5xl mb-4">
              Gestion des commandes
            </h1>
            <p className="text-muted-foreground">
              {orders.length} commande{orders.length > 1 ? "s" : ""} au total
            </p>
          </div>
          <Link to="/admin">
            <Button variant="outline">Retour au dashboard</Button>
          </Link>
        </div>

        {/* Filtres */}
        <div className="mb-8 flex items-center gap-4">
          <Filter size={18} className="text-muted-foreground" />
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-64">
              <SelectValue placeholder="Filtrer par statut" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toutes les commandes</SelectItem>
              <SelectItem value="en_attente">En attente</SelectItem>
              <SelectItem value="confirmee">Confirmées</SelectItem>
              <SelectItem value="en_preparation">En préparation</SelectItem>
              <SelectItem value="en_livraison">En livraison</SelectItem>
              <SelectItem value="livree">Livrées</SelectItem>
              <SelectItem value="annulee">Annulées</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {ordersLoading ? (
          <p className="text-center">Chargement...</p>
        ) : filteredOrders.length === 0 ? (
          <div className="text-center py-12 border border-border">
            <p className="text-muted-foreground">Aucune commande trouvée</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredOrders.map((order) => (
              <div
                key={order.id}
                className="border border-border p-6 hover:bg-accent/5 transition-colors"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  {/* Informations commande */}
                  <div className="lg:col-span-3">
                    <p className="font-mono text-sm font-medium mb-2">
                      {order.orderNumber}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(order.createdAt).toLocaleDateString("fr-FR", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>

                  {/* Client */}
                  <div className="lg:col-span-3">
                    <p className="font-medium text-sm">
                      {order.clientPrenom} {order.clientNom}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {order.clientEmail}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {order.clientTelephone}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      📍 {order.adresseVille}
                    </p>
                  </div>

                  {/* Produits */}
                  <div className="lg:col-span-3">
                    <p className="text-sm font-medium mb-1">
                      {order.items.length} article{order.items.length > 1 ? "s" : ""}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {order.items
                        .map((item) => `${item.productName} (×${item.quantity})`)
                        .join(", ")}
                    </p>
                    <p className="text-sm font-semibold mt-2">
                      {formatPrice(order.total)}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="lg:col-span-3 flex flex-col gap-3">
                    <Select
                      value={order.status}
                      onValueChange={(value) => handleStatusChange(order.id, value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en_attente">En attente</SelectItem>
                        <SelectItem value="confirmee">Confirmée</SelectItem>
                        <SelectItem value="en_preparation">
                          En préparation
                        </SelectItem>
                        <SelectItem value="en_livraison">En livraison</SelectItem>
                        <SelectItem value="livree">Livrée</SelectItem>
                        <SelectItem value="annulee">Annulée</SelectItem>
                      </SelectContent>
                    </Select>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedOrder(order)}
                    >
                      <Eye size={16} className="mr-2" />
                      Détails
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Modal détails (simple) */}
        {selectedOrder && (
          <div
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-6 z-50"
            onClick={() => setSelectedOrder(null)}
          >
            <div
              className="bg-background border border-border p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="font-serif text-2xl mb-6">
                Commande {selectedOrder.orderNumber}
              </h2>

              <div className="space-y-6">
                <div>
                  <h3 className="font-medium mb-2">Client</h3>
                  <p className="text-sm">
                    {selectedOrder.clientPrenom} {selectedOrder.clientNom}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {selectedOrder.clientEmail}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {selectedOrder.clientTelephone}
                  </p>
                </div>

                <div>
                  <h3 className="font-medium mb-2">Articles</h3>
                  <div className="space-y-2">
                    {selectedOrder.items.map((item, index) => (
                      <div key={index} className="flex justify-between text-sm">
                        <span>
                          {item.productName} × {item.quantity}
                        </span>
                        <span>
                          {formatPrice(item.productPrice * item.quantity)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between font-semibold">
                    <span>Total</span>
                    <span>{formatPrice(selectedOrder.total)}</span>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-2">Statut</h3>
                  <Badge variant={getStatusVariant(selectedOrder.status)}>
                    {getStatusLabel(selectedOrder.status)}
                  </Badge>
                </div>
              </div>

              <Button
                className="w-full mt-8"
                onClick={() => setSelectedOrder(null)}
              >
                Fermer
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
