import { db, products, users, blogPosts } from "./index";
import { PRODUCTS, POSTS } from "@/lib/site-data";
import bcrypt from "bcryptjs";
async function seed() {
  console.log("Debut du peuplement de la base de donnees...");
  try {
    const adminPassword = await bcrypt.hash("Admin123!", 10);
    const clientPassword = await bcrypt.hash("Client123!", 10);
    await db.insert(users).values([
      { email: "admin@damcosmetics.tg", password: adminPassword, nom: "Admin", prenom: "DAM", telephone: "+228 98 14 54 29", role: "admin" },
      { email: "client@example.com", password: clientPassword, nom: "Dupont", prenom: "Marie", telephone: "+228 90 12 34 56", role: "client" },
    ]);
    console.log("Admin et client crees.");
    for (const product of PRODUCTS) {
      await db.insert(products).values({ ...product, ingredients: JSON.stringify(product.ingredients), inStock: true });
    }
    console.log(PRODUCTS.length + " produits inseres.");
    for (const post of POSTS) {
      await db.insert(blogPosts).values({ ...post, publishedAt: new Date(post.date) });
    }
    console.log(POSTS.length + " articles de blog inseres.");
    console.log("Peuplement termine !");
  } catch (error) {
    console.error("Erreur lors du peuplement:", error);
    throw error;
  }
}
seed()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => { process.exit(0); });