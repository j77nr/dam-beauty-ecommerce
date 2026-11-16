import { json } from "@tanstack/react-start";
import { createAPIFileRoute } from "@tanstack/react-start/api";
import { db, carts, cartItems, products } from "@/db";
import { eq, and } from "drizzle-orm";
import { parse } from "cookie";
import { validateSession } from "@/lib/auth";
import { nanoid } from "nanoid";
import { z } from "zod";

const addToCartSchema = z.object({
  productId: z.number(),
  quantity: z.number().min(1).default(1),
});

export const APIRoute = createAPIFileRoute("/api/cart/add")({
  POST: async ({ request }) => {
    try {
      const body = await request.json();
      const data = addToCartSchema.parse(body);

      const [product] = await db.select().from(products).where(eq(products.id, data.productId)).limit(1);
      if (!product) {
        return json({ success: false, error: "Produit introuvable" }, { status: 404 });
      }

      if (!product.inStock) {
        return json({ success: false, error: "Produit en rupture de stock" }, { status: 400 });
      }

      const cookieHeader = request.headers.get("Cookie");
      const cookies = parse(cookieHeader || "");
      const session = await validateSession(cookies.dam_session);

      let sessionId = cookies.dam_cart_session;
      if (!sessionId && !session) {
        sessionId = nanoid();
      }

      let cart;
      if (session) {
        [cart] = await db.select().from(carts).where(eq(carts.userId, session.userId)).limit(1);
        if (!cart) {
          [cart] = await db.insert(carts).values({ userId: session.userId }).returning();
        }
      } else if (sessionId) {
        [cart] = await db.select().from(carts).where(eq(carts.sessionId, sessionId)).limit(1);
        if (!cart) {
          [cart] = await db.insert(carts).values({ sessionId }).returning();
        }
      } else {
        return json({ success: false, error: "Erreur de session" }, { status: 500 });
      }

      const [existingItem] = await db
        .select()
        .from(cartItems)
        .where(and(eq(cartItems.cartId, cart.id), eq(cartItems.productId, data.productId)))
        .limit(1);

      if (existingItem) {
        await db
          .update(cartItems)
          .set({ quantity: existingItem.quantity + data.quantity })
          .where(eq(cartItems.id, existingItem.id));
      } else {
        await db.insert(cartItems).values({
          cartId: cart.id,
          productId: data.productId,
          quantity: data.quantity,
        });
      }

      return json(
        { success: true, message: "Produit ajouté au panier" },
        {
          headers: sessionId
            ? { "Set-Cookie": `dam_cart_session=${sessionId}; Path=/; HttpOnly; SameSite=Lax; Max-Age=2592000` }
            : {},
        }
      );
    } catch (error: any) {
      if (error.name === "ZodError") {
        return json({ success: false, error: error.errors[0].message }, { status: 400 });
      }
      return json({ success: false, error: "Erreur lors de l'ajout au panier" }, { status: 500 });
    }
  },
});
