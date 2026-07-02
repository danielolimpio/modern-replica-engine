import { Link } from "@tanstack/react-router";
import { Mail } from "lucide-react";
import { categories, posts } from "@/lib/posts";
import { PostCard } from "./PostCard";
import { SectionHeading } from "./SectionHeading";

const tokenBg: Record<string, string> = {
  "cat-automotive": "bg-cat-automotive",
  "cat-education": "bg-cat-education",
  "cat-health": "bg-cat-health",
  "cat-insurance": "bg-cat-insurance",
  "cat-lawyers": "bg-cat-lawyers",
  "cat-realestate": "bg-cat-realestate",
};

export function Sidebar() {
  const popular = posts.slice(0, 5);
  return (
    <aside className="space-y-10">
      <div>
        <SectionHeading title="Most Viewed" accent="accent" />
        <ol className="space-y-4">
          {popular.map((p, i) => (
            <li key={p.slug} className="flex items-start gap-3">
              <span className="font-serif text-3xl font-black leading-none text-primary/30">{String(i + 1).padStart(2, "0")}</span>
              <PostCard post={p} variant="compact" />
            </li>
          ))}
        </ol>
      </div>

      <div className="rounded-lg border border-border/70 bg-card p-6">
        <div className="mb-3 grid h-11 w-11 place-items-center rounded-full bg-accent/10 text-accent">
          <Mail className="h-5 w-5" />
        </div>
        <h3 className="font-serif text-lg font-bold text-foreground">Sign up for our email</h3>
        <p className="mt-1 text-sm text-muted-foreground">Subscribe to our mailing list to get the new updates!</p>
        <form className="mt-4 space-y-2">
          <input type="email" required placeholder="Enter your email" className="w-full rounded-md border border-border bg-background px-3 py-2.5 text-sm focus:border-primary focus:outline-none" />
          <button className="w-full rounded-md bg-primary py-2.5 text-sm font-semibold text-primary-foreground transition hover:opacity-90">Subscribe</button>
        </form>
      </div>

      <div>
        <SectionHeading title="Categories" />
        <ul className="divide-y divide-border/70 overflow-hidden rounded-lg border border-border/70 bg-card">
          {categories.map((c) => {
            const count = posts.filter((p) => p.categories.includes(c.name)).length;
            const dot = tokenBg[c.token] ?? "bg-primary";
            return (
              <li key={c.slug}>
                <Link to="/category/$slug" params={{ slug: c.slug }} className="flex items-center justify-between px-4 py-3 text-sm font-semibold text-foreground transition hover:bg-secondary">
                  <span className="flex items-center gap-2">
                    <span className={`h-2.5 w-2.5 rounded-sm ${dot}`} />
                    {c.name}
                  </span>
                  <span className="rounded-md bg-primary px-2 py-0.5 text-xs font-bold text-primary-foreground">{count}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </aside>
  );
}