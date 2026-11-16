import { json } from "@tanstack/react-start";
import { createFileRoute } from "@tanstack/react-router";
import { db, cartItems } from "@/db";
import { and, eq } from "drizzle-orm";
import { getCartForRequest } from "@/lib/cart-session";
import { z } from "zod";

const updateCartSchema = z.object({
  itemId: z.number().int().positive(),
  quantity: z.number().int().min(1).max(99),
});

export const Route = createFileRoute("/api/cart/update")({
  server: { handlers: {
  PUT: async ({ request }) => {
    try {
      const body = await request.json();
      const data = updateCartSchema.parse(body);
      const cart = await getCartForRequest(request);
      if (!cart) {
        return json({ success: false, error: "Panier introuvable" }, { status: 404 });
      }

      const [item] = await db
        .select()
        .from(cartItems)
        .where(and(eq(cartItems.id, data.itemId), eq(cartItems.cartId, cart.id)))
        .limit(1);
      if (!item) {
        return json({ success: false, error: "Article introuvable" }, { status: 404 });
      }

      await db
        .update(cartItems)
        .set({ quantity: data.quantity })
        .where(and(eq(cartItems.id, data.itemId), eq(cartItems.cartId, cart.id)));

      return json({ success: true, message: "Quantité mise à jour" });
    } catch (error: any) {
      if (error.name === "ZodError") {
        return json({ success: false, error: error.errors[0].message }, { status: 400 });
      }
      return json({ success: false, error: "Erreur lors de la mise à jour" }, { status: 500 });
    }
  },
  } },
});
