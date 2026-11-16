import { json } from "@tanstack/react-start";
import { createAPIFileRoute } from "@tanstack/react-start/api";
import { db, orders, orderItems, products } from "@/db";
import { eq, desc } from "drizzle-orm";
import { parse } from "cookie";
import { validateSession } from "@/lib/auth";

export const APIRoute = createAPIFileRoute("/api/orders")({
  GET: async ({ request }) => {
    const cookieHeader = request.headers.get("Cookie");
    const cookies = parse(cookieHeader || "");
    const session = await validateSession(cookies.dam_session);

    if (!session) {
      return json({ success: false, error: "Non authentifié" }, { status: 401 });
    }

    // Récupérer les commandes de l'utilisateur
    const userOrders = await db
      .select()
      .from(orders)
      .where(eq(orders.userId, session.userId))
      .orderBy(desc(orders.createdAt));

    // Pour chaque commande, récupérer les articles
    const ordersWithItems = await Promise.all(
      userOrders.map(async (order) => {
        const items = await db
          .select({
            orderItem: orderItems,
            product: products,
          })
          .from(orderItems)
          .leftJoin(products, eq(orderItems.productId, products.id))
          .where(eq(orderItems.orderId, order.id));

        return {
          ...order,
          items: items.map((i) => ({
            ...i.orderItem,
            product: i.product,
          })),
        };
      })
    );

    return json({
      success: true,
      orders: ordersWithItems,
    });
  },
});
