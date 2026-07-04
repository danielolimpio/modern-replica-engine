import { Link } from "@tanstack/react-router";
import { CalendarDays, User } from "lucide-react";
import { CategoryBadge } from "./CategoryBadge";
import { formatDate, type Post } from "@/lib/posts";

export function PostCard({ post, variant = "default" }: { post: Post; variant?: "default" | "compact" | "list" | "featured" }) {
  if (variant === "compact") {
    return (
      <Link to="/$slug" params={{ slug: post.slug }} className="group flex min-w-0 flex-1 gap-3">
        <div className="relative h-16 w-20 shrink-0 overflow-hidden rounded-md bg-secondary">
          {post.thumb && <img src={post.thumb} alt="" loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />}
        </div>
        <div className="min-w-0 flex-1">
          <h4 className="line-clamp-2 text-sm font-semibold leading-snug text-foreground group-hover:text-primary">{post.title}</h4>
          <p className="mt-1 text-[11px] text-muted-foreground">{formatDate(post.date)}</p>
        </div>
      </Link>
    );
  }

  if (variant === "list") {
    return (
      <article className="group grid grid-cols-[minmax(0,1fr)_auto] gap-4 border-b border-border/60 py-5 sm:grid-cols-[1fr_180px]">
        <div className="min-w-0">
          <div className="mb-2 flex items-center gap-2">{post.categories.slice(0, 1).map((c) => <CategoryBadge key={c} name={c} />)}</div>
          <Link to="/$slug" params={{ slug: post.slug }}>
            <h3 className="font-serif text-xl font-bold leading-snug text-foreground transition group-hover:text-primary">{post.title}</h3>
          </Link>
          <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{post.excerpt}</p>
          <div className="mt-3 flex items-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1"><CalendarDays className="h-3 w-3" />{formatDate(post.date)}</span>
            <span className="flex items-center gap-1"><User className="h-3 w-3" />Editorial Team</span>
          </div>
        </div>
        <Link to="/$slug" params={{ slug: post.slug }} className="relative aspect-[4/3] w-32 shrink-0 overflow-hidden rounded-md bg-secondary sm:w-[180px]">
          {post.thumb && <img src={post.thumb} alt="" loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />}
        </Link>
      </article>
    );
  }

  if (variant === "featured") {
    return (
      <Link to="/$slug" params={{ slug: post.slug }} className="group relative block h-full min-h-[380px] overflow-hidden rounded-lg bg-secondary">
        {post.thumb && <img src={post.thumb} alt="" className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105" />}
        <div className="absolute inset-0" style={{ background: "var(--gradient-overlay)" }} />
        <div className="relative flex h-full flex-col justify-end p-6">
          <div className="mb-3 flex flex-wrap gap-2">{post.categories.slice(0, 1).map((c) => <CategoryBadge key={c} name={c} />)}</div>
          <h2 className="font-serif text-2xl font-black leading-tight text-white md:text-3xl">{post.title}</h2>
          <p className="mt-2 hidden text-sm text-white/80 md:line-clamp-2">{post.excerpt}</p>
          <p className="mt-3 text-xs text-white/70">{formatDate(post.date)}</p>
        </div>
      </Link>
    );
  }

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-lg border border-border/60 bg-card transition hover:-translate-y-0.5 hover:shadow-[var(--shadow-md)]">
      <Link to="/$slug" params={{ slug: post.slug }} className="relative block aspect-[16/10] overflow-hidden bg-secondary">
        {post.thumb && <img src={post.thumb} alt="" loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />}
        <div className="absolute left-3 top-3">{post.categories.slice(0, 1).map((c) => <CategoryBadge key={c} name={c} />)}</div>
      </Link>
      <div className="flex flex-1 flex-col p-5">
        <Link to="/$slug" params={{ slug: post.slug }}>
          <h3 className="font-serif text-lg font-bold leading-snug text-foreground transition group-hover:text-primary">{post.title}</h3>
        </Link>
        <p className="mt-2 line-clamp-2 flex-1 text-sm text-muted-foreground">{post.excerpt}</p>
        <div className="mt-4 flex items-center gap-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1"><CalendarDays className="h-3 w-3" />{formatDate(post.date)}</span>
        </div>
      </div>
    </article>
  );
}