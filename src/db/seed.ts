import { db, blogPosts, pool, products } from "./index";
import { POSTS, PRODUCTS } from "@/lib/site-data";

async function seedCatalog() {
  await db
    .insert(products)
    .values(
      PRODUCTS.map((product) => ({
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
      })),
    )
    .onConflictDoNothing({ target: products.slug });

  await db
    .insert(blogPosts)
    .values(
      POSTS.map((post) => ({
        slug: post.slug,
        title: post.title,
        excerpt: post.excerpt,
        category: post.category,
        image: post.image,
        content: post.content,
        publishedAt: new Date(post.date),
      })),
    )
    .onConflictDoNothing({ target: blogPosts.slug });
}

seedCatalog()
  .then(async () => {
    console.info("Catalog seed completed.");
    await pool.end();
  })
  .catch(async (error) => {
    console.error("Catalog seed failed:", error);
    await pool.end();
    process.exitCode = 1;
  });
