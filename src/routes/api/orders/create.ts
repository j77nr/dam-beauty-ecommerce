import { json } from "@tanstack/react-start";
import { createFileRoute } from "@tanstack/react-router";
import { db, carts, cartItems, orders, orderItems, products } from "@/db";
import { eq } from "drizzle-orm";
import { parseCookieHeader } from "@/lib/cookies";
import { validateSession } from "@/lib/auth";
import { z } from "zod";
import { nanoid } from "nanoid";

const createOrderSchema = z.object({
  // Informations client
  clientNom: z.string().min(2, "Le nom est requis"),
  clientPrenom: z.string().min(2, "Le prénom est requis"),
  clientEmail: z.string().email("Email invalide"),
  clientTelephone: z.string().min(8, "Téléphone invalide"),
  
  // Adresse de livraison
  adresseRue: z.string().min(5, "Adresse complète requise"),
  adresseQuartier: z.string().optional(),
  adresseVille: z.string().default("Lomé"),
  adressePays: z.string().default("Togo"),
  
  // Mode de paiement
  paymentMethod: z.enum(["momo", "tmoney", "carte", "cash"], {
    errorMap: () => ({ message: "Mode de paiement invalide" }),
  }),
  
  // Notes optionnelles
  notes: z.string().optional(),
});

export const Route = createFileRoute("/api/orders/create")({
  server: { handlers: {
  POST: async ({ request }) => {
    try {
      const body = await request.json();
      const data = createOrderSchema.parse(body);

      const cookieHeader = request.headers.get("Cookie");
      const cookies = parseCookieHeader(cookieHeader);
      const session = await validateSession(cookies.dam_session);
      const sessionId = cookies.dam_cart_session;

      // Récupérer le panier
      let cart;
      if (session) {
        [cart] = await db.select().from(carts).where(eq(carts.userId, session.userId)).limit(1);
      } else if (sessionId) {
        [cart] = await db.select().from(carts).where(eq(carts.sessionId, sessionId)).limit(1);
      }

      if (!cart) {
        return json({ success: false, error: "Panier introuvable" }, { status: 404 });
      }

      // Récupérer les articles du panier avec les produits
      const items = await db
        .select({
          cartItem: cartItems,
          product: products,
        })
        .from(cartItems)
        .innerJoin(products, eq(cartItems.productId, products.id))
        .where(eq(cartItems.cartId, cart.id));

      if (items.length === 0) {
        return json({ success: false, error: "Votre panier est vide" }, { status: 400 });
      }

      // Calculer le total
      const subtotal = items.reduce(
        (sum, item) => sum + item.product.price * item.cartItem.quantity,
        0
      );

      // Frais de livraison (gratuit à Lomé, sinon 2000 FCFA)
      const fraisLivraison = data.adresseVille.toLowerCase() === "lomé" ? 0 : 2000;
      const total = subtotal + fraisLivraison;

      // Générer un numéro de commande unique
      const orderNumber = `DAM-${Date.now()}-${nanoid(6).toUpperCase()}`;

      // Créer la commande
      const [order] = await db
        .insert(orders)
        .values({
          userId: session?.userId || null,
          orderNumber,
          clientNom: data.clientNom,
          clientPrenom: data.clientPrenom,
          clientEmail: data.clientEmail,
          clientTelephone: data.clientTelephone,
          adresseRue: data.adresseRue,
          adresseQuartier: data.adresseQuartier,
          adresseVille: data.adresseVille,
          adressePays: data.adressePays,
          subtotal,
          fraisLivraison,
          total,
          status: "en_attente",
          paymentStatus: "en_attente",
          paymentMethod: data.paymentMethod,
          notes: data.notes,
        })
        .returning();

      // Créer les lignes de commande
      for (const item of items) {
        await db.insert(orderItems).values({
          orderId: order.id,
          productId: item.product.id,
          productName: item.product.name,
          productPrice: item.product.price,
          quantity: item.cartItem.quantity,
          subtotal: item.product.price * item.cartItem.quantity,
        });
      }

      // Vider le panier
      await db.delete(cartItems).where(eq(cartItems.cartId, cart.id));

      return json({
        success: true,
        order: {
          id: order.id,
          orderNumber: order.orderNumber,
          total: order.total,
        },
      });
    } catch (error: any) {
      console.error("Erreur création commande:", error);
      if (error.name === "ZodError") {
        return json({ success: false, error: error.errors[0].message }, { status: 400 });
      }
      return json({ success: false, error: "Erreur lors de la création de la commande" }, { status: 500 });
    }
  },
  } },
});
