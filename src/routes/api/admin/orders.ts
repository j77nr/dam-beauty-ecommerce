import { json } from "@tanstack/react-start";
import { createAPIFileRoute } from "@tanstack/react-start/api";
import { db, orders, orderItems } from "@/db";
import { desc, eq } from "drizzle-orm";
import { parse } from "cookie";
import { validateSession } from "@/lib/auth";

export const APIRoute = createAPIFileRoute("/api/admin/orders")({
  GET: async ({ request }) => {
    try {
      const cookieHeader = request.headers.get("Cookie");
      const cookies = parse(cookieHeader || "");
      const session = await validateSession(cookies.dam_session);

      if (!session || session.role !== "admin") {
        return json({ success: false, error: "Accès non autorisé" }, { status: 403 });
      }

      // Récupérer toutes les commandes
      const allOrders = await db
        .select()
        .from(orders)
        .orderBy(desc(orders.createdAt));

      // Pour chaque commande, récupérer les articles
      const ordersWithItems = await Promise.all(
        allOrders.map(async (order) => {
          const items = await db
            .select()
            .from(orderItems)
            .where(eq(orderItems.orderId, order.id));

          return {
            ...order,
            items,
          };
        })
      );

      return json({
        success: true,
        orders: ordersWithItems,
      });
    } catch (error) {
      console.error("Erreur lors de la récupération des commandes:", error);
      return json(
        { success: false, error: "Erreur lors de la récupération des commandes" },
        { status: 500 }
      );
    }
  },
});
