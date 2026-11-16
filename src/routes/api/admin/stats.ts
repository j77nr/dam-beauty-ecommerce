import { json } from "@tanstack/react-start";
import { createFileRoute } from "@tanstack/react-router";
import { db, orders, products } from "@/db";
import { sql, desc, eq } from "drizzle-orm";
import { parseCookieHeader } from "@/lib/cookies";
import { validateSession } from "@/lib/auth";

export const Route = createFileRoute("/api/admin/stats")({
  server: { handlers: {
  GET: async ({ request }) => {
    try {
      const cookieHeader = request.headers.get("Cookie");
      const cookies = parseCookieHeader(cookieHeader);
      const session = await validateSession(cookies.dam_session);

      if (!session || session.role !== "admin") {
        return json({ success: false, error: "Accès non autorisé" }, { status: 403 });
      }

      // Total des commandes
      const [totalOrdersResult] = await db
        .select({ count: sql<number>`count(*)` })
        .from(orders);
      const totalOrders = Number(totalOrdersResult.count);

      // Revenus totaux
      const [totalRevenueResult] = await db
        .select({ total: sql<number>`sum(${orders.total})` })
        .from(orders)
        .where(sql`${orders.status} != 'annulee'`);
      const totalRevenue = Number(totalRevenueResult.total) || 0;

      // Commandes en attente
      const [pendingOrdersResult] = await db
        .select({ count: sql<number>`count(*)` })
        .from(orders)
        .where(eq(orders.status, "en_attente"));
      const pendingOrders = Number(pendingOrdersResult.count);

      // Total des produits
      const [totalProductsResult] = await db
        .select({ count: sql<number>`count(*)` })
        .from(products);
      const totalProducts = Number(totalProductsResult.count);

      // 5 dernières commandes
      const recentOrders = await db
        .select({
          id: orders.id,
          orderNumber: orders.orderNumber,
          clientNom: orders.clientNom,
          clientPrenom: orders.clientPrenom,
          total: orders.total,
          status: orders.status,
          createdAt: orders.createdAt,
        })
        .from(orders)
        .orderBy(desc(orders.createdAt))
        .limit(5);

      return json({
        success: true,
        stats: {
          totalOrders,
          totalRevenue,
          pendingOrders,
          totalProducts,
          recentOrders,
        },
      });
    } catch (error) {
      console.error("Erreur lors de la récupération des stats:", error);
      return json(
        { success: false, error: "Erreur lors de la récupération des statistiques" },
        { status: 500 }
      );
    }
  },
  } },
});
