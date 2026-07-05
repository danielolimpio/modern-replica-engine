import postsData from "@/data/posts.json";

export type Post = {
  title: string;
  slug: string;
  date: string;
  author: string;
  categories: string[];
  excerpt: string;
  content: string;
  thumb: string | null;
};

const CATEGORY_FALLBACK: Record<string, string> = {
  Insurance: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1600&q=80&auto=format&fit=crop",
  "Health Plans": "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=1600&q=80&auto=format&fit=crop",
  Automotive: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=1600&q=80&auto=format&fit=crop",
  "Real Estate": "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1600&q=80&auto=format&fit=crop",
  Lawyers: "https://images.unsplash.com/photo-1589994965851-a8f479c573a9?w=1600&q=80&auto=format&fit=crop",
  Education: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1600&q=80&auto=format&fit=crop",
};
const DEFAULT_FALLBACK =
  "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=1600&q=80&auto=format&fit=crop";

function resolveThumb(p: Post): string {
  const t = p.thumb ?? "";
  // Old WordPress uploads no longer exist on the domain — replace with a
  // stable per-category image so the layout keeps its imagery.
  if (!t || t.includes("trustallamerica.com/wp-content")) {
    const cat = p.categories?.[0];
    return (cat && CATEGORY_FALLBACK[cat]) || DEFAULT_FALLBACK;
  }
  return t;
}

export const posts: Post[] = (postsData as Post[])
  .slice()
  .map((p) => ({ ...p, thumb: resolveThumb(p) }))
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

export const categories = [
  { name: "Insurance", slug: "insurance", token: "cat-insurance" },
  { name: "Health Plans", slug: "health-plans", token: "cat-health" },
  { name: "Automotive", slug: "automotive", token: "cat-automotive" },
  { name: "Real Estate", slug: "real-estate", token: "cat-realestate" },
  { name: "Lawyers", slug: "lawyers", token: "cat-lawyers" },
  { name: "Education", slug: "education", token: "cat-education" },
] as const;

export function categoryBySlug(slug: string) {
  return categories.find((c) => c.slug === slug);
}

export function categoryTokenByName(name: string) {
  return categories.find((c) => c.name === name)?.token ?? "primary";
}

export function slugifyCategory(name: string) {
  return categories.find((c) => c.name === name)?.slug ?? name.toLowerCase().replace(/\s+/g, "-");
}

export function postsByCategory(name: string) {
  return posts.filter((p) => p.categories.includes(name));
}

export function getPost(slug: string) {
  return posts.find((p) => p.slug === slug);
}

export function formatDate(d: string) {
  const date = new Date(d);
  return date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

export function authorName(email: string) {
  if (!email) return "Editorial Team";
  if (email.includes("@")) return "Editorial Team";
  return email;
}

export function relatedPosts(current: Post, limit = 4) {
  return posts
    .filter((p) => p.slug !== current.slug && p.categories.some((c) => current.categories.includes(c)))
    .slice(0, limit);
}