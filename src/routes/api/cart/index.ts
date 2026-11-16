import { json } from "@tanstack/react-start";
import { createAPIFileRoute } from "@tanstack/react-start/api";
import { db, carts, cartItems, products } from "@/db";
import { eq, and } from "drizzle-orm";
import { parse } from "cookie";
import { validateSession } from "@/lib/auth";
import { nanoid } from "nanoid";

export const APIRoute = createAPIFileRoute("/api/cart")({
  // GET - Récupérer le panier
  GET: async ({ request }) => {
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
      return json({
        success: true,
        cart: { id: null, items: [], itemCount: 0, total: 0 },
      });
    }

    const items = await db
      .select({
        id: cartItems.id,
        quantity: cartItems.quantity,
        product: products,
      })
      .from(cartItems)
      .innerJoin(products, eq(cartItems.productId, products.id))
      .where(eq(cartItems.cartId, cart.id));

    const total = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
    const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

    return json(
      {
        success: true,
        cart: { id: cart.id, items, itemCount, total },
      },
      {
        headers: sessionId
          ? { "Set-Cookie": `dam_cart_session=${sessionId}; Path=/; HttpOnly; SameSite=Lax; Max-Age=2592000` }
          : {},
      }
    );
  },
});
