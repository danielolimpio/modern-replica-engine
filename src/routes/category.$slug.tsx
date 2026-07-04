import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { Layout } from "@/components/site/Layout";
import { PostCard } from "@/components/site/PostCard";
import { Sidebar } from "@/components/site/Sidebar";
import { categoryBySlug, postsByCategory, type Post } from "@/lib/posts";

export const Route = createFileRoute("/category/$slug")({
  head: ({ params }) => {
    const cat = categoryBySlug(params.slug);
    const title = cat ? `${cat.name} — Trust All America` : "Category — Trust All America";
    const desc = cat ? `Latest ${cat.name} articles, guides and insights.` : "Browse articles by category.";
    const url = `https://modern-replica-engine.lovable.app/category/${params.slug}`;
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:type", content: "website" },
        { property: "og:url", content: url },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: desc },
      ],
      links: [{ rel: "canonical", href: url }],
    };
  },
  loader: ({ params }) => {
    const cat = categoryBySlug(params.slug);
    if (!cat) throw notFound();
    return { cat, items: postsByCategory(cat.name) };
  },
  component: CategoryPage,
  notFoundComponent: () => (
    <Layout>
      <div className="mx-auto max-w-3xl px-6 py-24 text-center">
        <h1 className="font-serif text-3xl font-black">Category not found</h1>
        <Link to="/" className="mt-4 inline-block text-primary hover:underline">← Back home</Link>
      </div>
    </Layout>
  ),
});

function CategoryPage() {
  const { cat, items } = Route.useLoaderData();
  const [featured, ...rest] = items;
  return (
    <Layout>
      <section className="border-b border-border/60 bg-gradient-to-br from-primary to-[oklch(0.22_0.1_265)] text-primary-foreground">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">Category</p>
          <h1 className="mt-2 font-serif text-4xl font-black md:text-5xl">{cat.name}</h1>
          <p className="mt-3 max-w-2xl text-sm text-primary-foreground/70">{items.length} articles covering everything you need to know about {cat.name.toLowerCase()}.</p>
        </div>
      </section>
      <section className="mx-auto grid max-w-7xl gap-10 px-6 py-14 lg:grid-cols-[1fr_320px]">
        <div>
          {featured && <div className="mb-8"><PostCard post={featured} variant="featured" /></div>}
          <div className="grid gap-6 sm:grid-cols-2">
            {rest.map((p: Post) => <PostCard key={p.slug} post={p} />)}
          </div>
        </div>
        <Sidebar />
      </section>
    </Layout>
  );
}