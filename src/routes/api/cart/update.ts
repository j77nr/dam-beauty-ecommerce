import { json } from "@tanstack/react-start";
import { createAPIFileRoute } from "@tanstack/react-start/api";
import { db, cartItems } from "@/db";
import { eq } from "drizzle-orm";
import { z } from "zod";

const updateCartSchema = z.object({
  itemId: z.number(),
  quantity: z.number().min(1),
});

export const APIRoute = createAPIFileRoute("/api/cart/update")({
  PUT: async ({ request }) => {
    try {
      const body = await request.json();
      const data = updateCartSchema.parse(body);

      const [item] = await db.select().from(cartItems).where(eq(cartItems.id, data.itemId)).limit(1);
      if (!item) {
        return json({ success: false, error: "Article introuvable" }, { status: 404 });
      }

      await db.update(cartItems).set({ quantity: data.quantity }).where(eq(cartItems.id, data.itemId));

      return json({ success: true, message: "Quantité mise à jour" });
    } catch (error: any) {
      if (error.name === "ZodError") {
        return json({ success: false, error: error.errors[0].message }, { status: 400 });
      }
      return json({ success: false, error: "Erreur lors de la mise à jour" }, { status: 500 });
    }
  },
});
