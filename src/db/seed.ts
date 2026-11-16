/**
 * Script pour remplir la base de données avec les données initiales
 * Exécuter avec: npm run db:seed
 */
import { db, products, users, blogPosts } from "./index";
import { PRODUCTS, POSTS } from "@/lib/site-data";
import bcrypt from "bcryptjs";

async function seed() {
  console.log("🌱 Début du peuplement de la base de données...\n");

  try {
    // 1. Créer un utilisateur admin
    console.log("👤 Création des utilisateurs de test...");
    const adminPasswordValue = process.env.ADMIN_SEED_PASSWORD;
    if (!adminPasswordValue || adminPasswordValue.length < 12) {
      throw new Error("ADMIN_SEED_PASSWORD doit être défini et contenir au moins 12 caractères.");
    }

    const adminPassword = await bcrypt.hash(adminPasswordValue, 10);
    const clientPassword = await bcrypt.hash("Client123!", 10);
    
    await db.insert(users).values([
      {
        email: "admin@damcosmetics.tg",
        password: adminPassword,
        nom: "Admin",
        prenom: "DAM",
        telephone: "+228 98 14 54 29",
        role: "admin",
      },
      {
        email: "client@example.com",
        password: clientPassword,
        nom: "Dupont",
        prenom: "Marie",
        telephone: "+228 90 12 34 56",
        role: "client",
      },
    ]);
    console.log("✅ Admin créé: admin@damcosmetics.tg");
    console.log("✅ Client créé: client@example.com / Client123!\n");

    // 2. Insérer les produits
    console.log("📦 Insertion des produits...");
    for (const product of PRODUCTS) {
      await db.insert(products).values({
        slug: product.slug,
        name: product.name,
        subtitle: product.subtitle,
        price: product.price,
        category: product.category,
        image: product.image,
        short: product.short,
        description: product.description,
        ingredients: JSON.stringify(product.ingredients),
        usage: product.usage,
        inStock: true,
      });
    }
    console.log(`✅ ${PRODUCTS.length} produits insérés\n`);

    // 3. Insérer les articles de blog
    console.log("📝 Insertion des articles de blog...");
    for (const post of POSTS) {
      await db.insert(blogPosts).values({
        slug: post.slug,
        title: post.title,
        excerpt: post.excerpt,
        category: post.category,
        image: post.image,
        content: post.content,
        publishedAt: new Date(post.date),
      });
    }
    console.log(`✅ ${POSTS.length} articles de blog insérés\n`);

    console.log("🎉 Peuplement terminé avec succès!");
    console.log("\n📌 Comptes de test créés:");
    console.log("\n   👨‍💼 Admin:");
    console.log("      Email: admin@damcosmetics.tg");
    console.log("      Mot de passe: valeur fournie via ADMIN_SEED_PASSWORD");
    console.log("\n   👤 Client:");
    console.log("      Email: client@example.com");
    console.log("      Mot de passe: Client123!");
    
  } catch (error) {
    console.error("❌ Erreur lors du peuplement:", error);
    throw error;
  }
}

seed()
  .catch((e) => {
    console.error(e);
    process.exitCode = 1;
  });
