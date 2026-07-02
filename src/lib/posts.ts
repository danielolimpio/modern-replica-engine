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

export const posts: Post[] = (postsData as Post[])
  .slice()
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