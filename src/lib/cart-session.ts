import { and, eq, isNull } from "drizzle-orm";
import { db, carts } from "@/db";
import { parseCookieHeader } from "@/lib/cookies";
import { validateSession } from "@/lib/auth";

export async function getCartForRequest(request: Request) {
  const cookies = parseCookieHeader(request.headers.get("Cookie"));
  const session = await validateSession(cookies.dam_session);

  if (session) {
    const [cart] = await db
      .select()
      .from(carts)
      .where(eq(carts.userId, session.userId))
      .limit(1);
    return cart ?? null;
  }

  if (!cookies.dam_cart_session) return null;

  const [cart] = await db
    .select()
    .from(carts)
    .where(and(eq(carts.sessionId, cookies.dam_cart_session), isNull(carts.userId)))
    .limit(1);

  return cart ?? null;
}
