import { json } from "@tanstack/react-start";
import { createAPIFileRoute } from "@tanstack/react-start/api";
import { db, orders } from "@/db";
import { eq } from "drizzle-orm";
import { parse } from "cookie";
import { validateSession } from "@/lib/auth";
import { z } from "zod";

const updateStatusSchema = z.object({
  orderId: z.number(),
  status: z.enum([
    "en_attente",
    "confirmee",
    "en_preparation",
    "en_livraison",
    "livree",
    "annulee",
  ]),
});

export const APIRoute = createAPIFileRoute("/api/admin/orders/update-status")({
  PUT: async ({ request }) => {
    try {
      const cookieHeader = request.headers.get("Cookie");
      const cookies = parse(cookieHeader || "");
      const session = await validateSession(cookies.dam_session);

      if (!session || session.role !== "admin") {
        return json({ success: false, error: "Accès non autorisé" }, { status: 403 });
      }

      const body = await request.json();
      const data = updateStatusSchema.parse(body);

      // Mettre à jour le statut
      await db
        .update(orders)
        .set({ status: data.status })
        .where(eq(orders.id, data.orderId));

      return json({
        success: true,
        message: "Statut mis à jour avec succès",
      });
    } catch (error: any) {
      console.error("Erreur lors de la mise à jour du statut:", error);
      if (error.name === "ZodError") {
        return json({ success: false, error: error.errors[0].message }, { status: 400 });
      }
      return json(
        { success: false, error: "Erreur lors de la mise à jour du statut" },
        { status: 500 }
      );
    }
  },
});
