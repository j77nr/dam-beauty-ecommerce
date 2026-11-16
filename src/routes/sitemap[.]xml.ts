import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { PRODUCTS, POSTS } from "@/lib/site-data";

const BASE_URL = "";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const staticPaths = [
          "/",
          "/a-propos",
          "/catalogue",
          "/blog",
          "/galerie",
          "/temoignages",
          "/faq",
          "/contact",
        ];
        const productPaths = PRODUCTS.map((p) => `/catalogue/${p.slug}`);
        const postPaths = POSTS.map((p) => `/blog/${p.slug}`);
        const all = [...staticPaths, ...productPaths, ...postPaths];

        const urls = all
          .map(
            (path) =>
              `  <url><loc>${BASE_URL}${path}</loc><changefreq>weekly</changefreq></url>`,
          )
          .join("\n");

        const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
