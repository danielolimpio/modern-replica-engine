import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { posts, categories } from "@/lib/posts";

const BASE_URL = "https://modern-replica-engine.lovable.app";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const urls: string[] = [];
        const push = (path: string, lastmod?: string, priority = "0.7", changefreq = "weekly") => {
          urls.push(
            [
              "  <url>",
              `    <loc>${BASE_URL}${path}</loc>`,
              lastmod ? `    <lastmod>${new Date(lastmod).toISOString()}</lastmod>` : null,
              `    <changefreq>${changefreq}</changefreq>`,
              `    <priority>${priority}</priority>`,
              "  </url>",
            ]
              .filter(Boolean)
              .join("\n"),
          );
        };

        push("/", posts[0]?.date, "1.0", "daily");
        for (const c of categories) push(`/category/${c.slug}`, undefined, "0.8");
        for (const p of posts) push(`/${p.slug}`, p.date, "0.9", "monthly");

        const xml = [
          '<?xml version="1.0" encoding="UTF-8"?>',
          '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
          ...urls,
          "</urlset>",
        ].join("\n");

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