import { json } from "@tanstack/react-start";
import { createFileRoute } from "@tanstack/react-router";
import { db, products } from "@/db";
import { parseCookieHeader } from "@/lib/cookies";
import { validateSession } from "@/lib/auth";
import { z } from "zod";

const createProductSchema = z.object({
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
  inStock: z.boolean().default(true),
});

export const Route = createFileRoute("/api/admin/products/create")({
  server: { handlers: {
  POST: async ({ request }) => {
    try {
      const cookieHeader = request.headers.get("Cookie");
      const cookies = parseCookieHeader(cookieHeader);
      const session = await validateSession(cookies.dam_session);

      if (!session || session.role !== "admin") {
        return json({ success: false, error: "Accès non autorisé" }, { status: 403 });
      }

      const body = await request.json();
      const data = createProductSchema.parse(body);

      const [product] = await db
        .insert(products)
        .values({
          ...data,
          ingredients: JSON.stringify(data.ingredients),
        })
        .returning();

      return json({
        success: true,
        product,
      });
    } catch (error: any) {
      console.error("Erreur lors de la création du produit:", error);
      if (error.name === "ZodError") {
        return json({ success: false, error: error.errors[0].message }, { status: 400 });
      }
      return json(
        { success: false, error: "Erreur lors de la création du produit" },
        { status: 500 }
      );
    }
  },
  } },
});
