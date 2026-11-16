import { json } from "@tanstack/react-start";
import { createFileRoute } from "@tanstack/react-router";
import { db, products } from "@/db";
import { eq } from "drizzle-orm";
import { parseCookieHeader } from "@/lib/cookies";
import { validateSession } from "@/lib/auth";
import { z } from "zod";

const deleteProductSchema = z.object({
  id: z.number(),
});

export const Route = createFileRoute("/api/admin/products/delete")({
  server: { handlers: {
  DELETE: async ({ request }) => {
    try {
      const cookieHeader = request.headers.get("Cookie");
      const cookies = parseCookieHeader(cookieHeader);
      const session = await validateSession(cookies.dam_session);

      if (!session || session.role !== "admin") {
        return json({ success: false, error: "Accès non autorisé" }, { status: 403 });
      }

      const body = await request.json();
      const data = deleteProductSchema.parse(body);

      await db.delete(products).where(eq(products.id, data.id));

      return json({
        success: true,
        message: "Produit supprimé avec succès",
      });
    } catch (error: any) {
      console.error("Erreur lors de la suppression du produit:", error);
      if (error.name === "ZodError") {
        return json({ success: false, error: error.errors[0].message }, { status: 400 });
      }
      return json(
        { success: false, error: "Erreur lors de la suppression du produit" },
        { status: 500 }
      );
    }
  },
  } },
});
