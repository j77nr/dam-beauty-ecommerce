import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { POSTS } from "@/lib/site-data";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = POSTS.find((p) => p.slug === params.slug);
    if (!post) throw notFound();
    return { post };
  },
  head: ({ loaderData }) => {
    const p = loaderData?.post;
    return {
      meta: [
        { title: p ? `${p.title} — Journal DAM` : "Article — DAM" },
        { name: "description", content: p?.excerpt ?? "" },
        { property: "og:title", content: p?.title ?? "" },
        { property: "og:description", content: p?.excerpt ?? "" },
        { property: "og:image", content: p?.image ?? "" },
        { property: "og:type", content: "article" },
        { property: "og:url", content: `/blog/${p?.slug ?? ""}` },
      ],
      links: [{ rel: "canonical", href: `/blog/${p?.slug ?? ""}` }],
    };
  },
  notFoundComponent: () => (
    <div className="py-32 text-center">
      <p className="font-serif italic text-3xl mb-4">Article introuvable</p>
      <Link to="/blog" className="link-underline">Retour au journal</Link>
    </div>
  ),
  errorComponent: ({ error }) => (
    <div className="py-32 text-center"><p className="text-sm">{error.message}</p></div>
  ),
  component: PostPage,
});

function PostPage() {
  const { post } = Route.useLoaderData();
  const date = new Date(post.date).toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
  return (
    <>
      <article>
        <header className="pt-20 pb-12 bg-beige-soft">
          <div className="container mx-auto px-6 lg:px-10 max-w-3xl text-center">
            <span className="eyebrow text-accent mb-4 block">{post.category}</span>
            <h1 className="font-serif text-4xl lg:text-6xl leading-[1.05] mb-6">{post.title}</h1>
            <time className="text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
              {date}
            </time>
          </div>
        </header>

        <div className="container mx-auto px-6 lg:px-10 max-w-4xl -mt-12">
          <img
            src={post.image}
            alt={post.title}
            className="w-full aspect-[16/10] object-cover"
          />
        </div>

        <div className="container mx-auto px-6 lg:px-10 max-w-2xl py-16">
          <p className="font-serif italic text-2xl leading-snug mb-10">{post.excerpt}</p>
          <div className="text-base leading-loose text-foreground/80 space-y-6 whitespace-pre-line">
            {post.content}
          </div>
        </div>

        <div className="container mx-auto px-6 lg:px-10 max-w-2xl pb-24 text-center">
          <Link to="/blog" className="link-underline">Retour au journal</Link>
        </div>
      </article>
    </>
  );
}
