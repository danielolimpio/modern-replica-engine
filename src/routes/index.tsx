import { createFileRoute, Link } from "@tanstack/react-router";
import { Layout } from "@/components/site/Layout";
import { PostCard } from "@/components/site/PostCard";
import { SectionHeading } from "@/components/site/SectionHeading";
import { Sidebar } from "@/components/site/Sidebar";
import { categories, posts, postsByCategory } from "@/lib/posts";

export const Route = createFileRoute("/")({
  head: () => {
    const url = "https://modern-replica-engine.lovable.app/";
    return {
      meta: [
        { property: "og:url", content: url },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "Trust All America",
            url,
          }),
        },
      ],
    };
  },
  component: Home,
});

function Home() {
  const [featured, ...rest] = posts;
  const heroSide = rest.slice(0, 4);
  const trending = posts.slice(5, 11);
  const investigation = postsByCategory("Lawyers").slice(0, 5);
  const latestByCat = categories.slice(0, 3).map((c) => ({
    cat: c,
    items: postsByCategory(c.name).slice(0, 3),
  }));

  return (
    <Layout>
      <section className="border-b border-border/60 bg-secondary/40">
        <div className="mx-auto grid max-w-7xl gap-4 px-6 py-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            {featured && <PostCard post={featured} variant="featured" />}
          </div>
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-1">
            {heroSide.map((p) => (
              <Link
                key={p.slug}
                to="/$slug"
                params={{ slug: p.slug }}
                className="group relative block aspect-[16/10] overflow-hidden rounded-md bg-secondary lg:aspect-[16/9]"
              >
                {p.thumb && <img src={p.thumb} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105" />}
                <div className="absolute inset-0" style={{ background: "var(--gradient-overlay)" }} />
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <span className="mb-1 inline-block rounded-sm bg-accent px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest text-white">
                    {p.categories[0]}
                  </span>
                  <h3 className="line-clamp-2 font-serif text-sm font-bold leading-tight text-white">{p.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-14">
        <SectionHeading title="Trending News" />
        <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {trending.map((p) => <PostCard key={p.slug} post={p} />)}
          </div>
          <div className="hidden lg:block">
            <SectionHeading title="Latest" accent="accent" />
            <div className="space-y-4">
              {posts.slice(11, 17).map((p) => <PostCard key={p.slug} post={p} variant="compact" />)}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[oklch(0.16_0.05_260)] text-primary-foreground">
        <div className="mx-auto max-w-7xl px-6 py-14">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-4 border-b border-white/10 pb-3">
            <h2 className="flex items-center gap-3 font-serif text-2xl font-black">
              <span className="h-6 w-1.5 rounded-sm bg-accent" />
              Top Articles
            </h2>
            <div className="flex flex-wrap gap-2 text-xs">
              {categories.slice(0, 4).map((c) => (
                <Link key={c.slug} to="/category/$slug" params={{ slug: c.slug }} className="rounded-full border border-white/15 px-3 py-1 font-semibold text-primary-foreground/80 transition hover:bg-white/10">
                  {c.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            <Link to="/$slug" params={{ slug: posts[2]?.slug ?? posts[0].slug }} className="group relative block aspect-[16/10] overflow-hidden rounded-lg bg-black/20">
              {posts[2]?.thumb && <img src={posts[2].thumb} alt="" className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105" />}
              <div className="absolute inset-0" style={{ background: "var(--gradient-overlay)" }} />
              <div className="absolute bottom-0 p-6">
                <span className="mb-2 inline-block rounded-sm bg-accent px-2 py-1 text-[10px] font-bold uppercase tracking-widest">{posts[2]?.categories[0]}</span>
                <h3 className="font-serif text-2xl font-black leading-tight text-white">{posts[2]?.title}</h3>
              </div>
            </Link>
            <div className="grid gap-4">
              {posts.slice(3, 6).map((p) => (
                <Link key={p.slug} to="/$slug" params={{ slug: p.slug }} className="group grid grid-cols-[120px_1fr] gap-4 rounded-md p-2 transition hover:bg-white/5">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-md bg-black/30">
                    {p.thumb && <img src={p.thumb} alt="" loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />}
                  </div>
                  <div className="min-w-0">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-accent">{p.categories[0]}</span>
                    <h4 className="mt-1 line-clamp-3 font-serif text-base font-bold leading-snug text-white">{p.title}</h4>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {latestByCat.map(({ cat, items }) => (
            <div key={cat.slug}>
              <SectionHeading title={cat.name} href={`/category/${cat.slug}`} />
              <div className="space-y-5">
                {items[0] && (
                  <Link to="/$slug" params={{ slug: items[0].slug }} className="group block">
                    <div className="relative mb-3 aspect-[16/10] overflow-hidden rounded-md bg-secondary">
                      {items[0].thumb && <img src={items[0].thumb} alt="" loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />}
                    </div>
                    <h3 className="font-serif text-lg font-bold text-foreground transition group-hover:text-primary">{items[0].title}</h3>
                  </Link>
                )}
                {items.slice(1).map((p) => <PostCard key={p.slug} post={p} variant="compact" />)}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-secondary/40 py-14">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[1fr_320px]">
          <div>
            <SectionHeading title="Investigation" href="/category/lawyers" />
            <div className="divide-y divide-border/60">
              {investigation.map((p) => <PostCard key={p.slug} post={p} variant="list" />)}
            </div>
          </div>
          <Sidebar />
        </div>
      </section>
    </Layout>
  );
}
