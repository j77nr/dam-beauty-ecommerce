import { json } from "@tanstack/react-start";
import { createAPIFileRoute } from "@tanstack/react-start/api";
import { db, products } from "@/db";
import { desc } from "drizzle-orm";

export const APIRoute = createAPIFileRoute("/api/products")({
  GET: async () => {
    try {
      const allProducts = await db.select().from(products).orderBy(desc(products.createdAt));

      return json({
        success: true,
        products: allProducts,
      });
    } catch (error) {
      console.error("Erreur lors de la récupération des produits:", error);
      return json(
        { success: false, error: "Erreur lors de la récupération des produits" },
        { status: 500 }
      );
    }
  },
});
