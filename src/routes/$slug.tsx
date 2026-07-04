import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { CalendarDays, User } from "lucide-react";
import { Layout } from "@/components/site/Layout";
import { CategoryBadge } from "@/components/site/CategoryBadge";
import { PostCard } from "@/components/site/PostCard";
import { Sidebar } from "@/components/site/Sidebar";
import { SectionHeading } from "@/components/site/SectionHeading";
import { formatDate, getPost, relatedPosts, type Post } from "@/lib/posts";

export const Route = createFileRoute("/post/$slug")({
  head: ({ params }) => {
    const post = getPost(params.slug);
    if (!post) return { meta: [{ title: "Article — Trust All America" }] };
    const desc = post.excerpt.slice(0, 155);
    const meta: Array<Record<string, string>> = [
      { title: `${post.title} — Trust All America` },
      { name: "description", content: desc },
      { property: "og:title", content: post.title },
      { property: "og:description", content: desc },
      { property: "og:type", content: "article" },
    ];
    if (post.thumb) {
      meta.push({ property: "og:image", content: post.thumb });
      meta.push({ name: "twitter:image", content: post.thumb });
    }
    return { meta };
  },
  loader: ({ params }) => {
    const post = getPost(params.slug);
    if (!post) throw notFound();
    return { post, related: relatedPosts(post, 4) };
  },
  component: PostPage,
  notFoundComponent: () => (
    <Layout>
      <div className="mx-auto max-w-3xl px-6 py-24 text-center">
        <h1 className="font-serif text-3xl font-black">Article not found</h1>
        <Link to="/" className="mt-4 inline-block text-primary hover:underline">← Back home</Link>
      </div>
    </Layout>
  ),
});

function PostPage() {
  const { post, related } = Route.useLoaderData();
  return (
    <Layout>
      <article>
        <header className="border-b border-border/60 bg-secondary/40">
          <div className="mx-auto max-w-4xl px-6 py-14 text-center">
            <div className="flex justify-center gap-2">{post.categories.map((c: string) => <CategoryBadge key={c} name={c} />)}</div>
            <h1 className="mx-auto mt-5 max-w-3xl font-serif text-3xl font-black leading-tight text-foreground md:text-5xl">{post.title}</h1>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-5 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5"><User className="h-3.5 w-3.5" />Editorial Team</span>
              <span className="flex items-center gap-1.5"><CalendarDays className="h-3.5 w-3.5" />{formatDate(post.date)}</span>
            </div>
          </div>
        </header>

        {post.thumb && (
          <div className="mx-auto max-w-5xl px-6 pt-10">
            <img src={post.thumb} alt={post.title} className="aspect-[16/9] w-full rounded-lg object-cover shadow-[var(--shadow-md)]" />
          </div>
        )}

        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-14 lg:grid-cols-[1fr_320px]">
          <div
            className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:font-black prose-headings:text-foreground prose-h2:mt-10 prose-h2:border-l-4 prose-h2:border-accent prose-h2:pl-4 prose-h3:mt-8 prose-p:text-foreground/85 prose-a:text-primary prose-strong:text-foreground prose-img:rounded-lg prose-table:text-sm prose-th:bg-secondary prose-th:text-foreground prose-hr:my-10 prose-hr:border-border"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
          <Sidebar />
        </div>

        {related.length > 0 && (
          <section className="border-t border-border/60 bg-secondary/40 py-14">
            <div className="mx-auto max-w-7xl px-6">
              <SectionHeading title="Related Articles" />
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {related.map((p: Post) => <PostCard key={p.slug} post={p} />)}
              </div>
            </div>
          </section>
        )}
      </article>
    </Layout>
  );
}