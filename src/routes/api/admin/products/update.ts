import { json } from "@tanstack/react-start";
import { createAPIFileRoute } from "@tanstack/react-start/api";
import { db, products } from "@/db";
import { eq } from "drizzle-orm";
import { parse } from "cookie";
import { validateSession } from "@/lib/auth";
import { z } from "zod";

const updateProductSchema = z.object({
  id: z.number(),
  slug: z.string().min(3),
  name: z.string().min(3),
  subtitle: z.string().min(3),
  price: z.number().min(0),
  category: z.enum(["capillaire", "visage", "naturel"]),
  image: z.string().url(),
  short: z.string().min(10),
  description: z.string().min(20),
  ingredients: z.array(z.string()),
  usage: z.string().min(10),
  inStock: z.boolean(),
});

export const APIRoute = createAPIFileRoute("/api/admin/products/update")({
  PUT: async ({ request }) => {
    try {
      const cookieHeader = request.headers.get("Cookie");
      const cookies = parse(cookieHeader || "");
      const session = await validateSession(cookies.dam_session);

      if (!session || session.role !== "admin") {
        return json({ success: false, error: "Accès non autorisé" }, { status: 403 });
      }

      const body = await request.json();
      const { id, ...data } = updateProductSchema.parse(body);

      const [product] = await db
        .update(products)
        .set({
          ...data,
          ingredients: JSON.stringify(data.ingredients),
        })
        .where(eq(products.id, id))
        .returning();

      return json({
        success: true,
        product,
      });
    } catch (error: any) {
      console.error("Erreur lors de la mise à jour du produit:", error);
      if (error.name === "ZodError") {
        return json({ success: false, error: error.errors[0].message }, { status: 400 });
      }
      return json(
        { success: false, error: "Erreur lors de la mise à jour du produit" },
        { status: 500 }
      );
    }
  },
});
