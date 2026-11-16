import { json } from "@tanstack/react-start";
import { createFileRoute } from "@tanstack/react-router";
import { db, orders, orderItems } from "@/db";
import { eq } from "drizzle-orm";

export const Route = createFileRoute("/api/orders/$id")({
  server: { handlers: {
  GET: async ({ request, params }) => {
    try {
      const orderId = params.id;

      // Récupérer la commande par orderNumber ou par id
      const [order] = await db
        .select()
        .from(orders)
        .where(eq(orders.orderNumber, orderId))
        .limit(1);

      if (!order) {
        return json({ success: false, error: "Commande introuvable" }, { status: 404 });
      }

      // Récupérer les articles de la commande
      const items = await db
        .select()
        .from(orderItems)
        .where(eq(orderItems.orderId, order.id));

      return json({
        success: true,
        order: {
          ...order,
          items,
        },
      });
    } catch (error) {
      console.error("Erreur lors de la récupération de la commande:", error);
      return json(
        { success: false, error: "Erreur lors de la récupération de la commande" },
        { status: 500 }
      );
    }
  },
  } },
});
