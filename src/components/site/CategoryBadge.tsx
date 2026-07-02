import { Link } from "@tanstack/react-router";
import { categoryTokenByName, slugifyCategory } from "@/lib/posts";

const tokenBg: Record<string, string> = {
  "cat-automotive": "bg-cat-automotive",
  "cat-education": "bg-cat-education",
  "cat-health": "bg-cat-health",
  "cat-insurance": "bg-cat-insurance",
  "cat-lawyers": "bg-cat-lawyers",
  "cat-realestate": "bg-cat-realestate",
};

export function CategoryBadge({ name, className = "" }: { name: string; className?: string }) {
  const token = categoryTokenByName(name);
  const bg = tokenBg[token] ?? "bg-primary";
  return (
    <Link
      to="/category/$slug"
      params={{ slug: slugifyCategory(name) }}
      className={`inline-flex items-center rounded-sm px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-white shadow-sm ${bg} ${className}`}
    >
      {name}
    </Link>
  );
}