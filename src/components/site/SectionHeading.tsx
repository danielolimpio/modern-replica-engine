import { Link } from "@tanstack/react-router";

export function SectionHeading({ title, href, accent }: { title: string; href?: string; accent?: "primary" | "accent" }) {
  const bar = accent === "accent" ? "bg-accent" : "bg-primary";
  return (
    <div className="mb-6 flex items-end justify-between gap-4 border-b border-border/70 pb-3">
      <h2 className="relative flex items-center gap-3 font-serif text-2xl font-black text-foreground">
        <span className={`h-6 w-1.5 rounded-sm ${bar}`} />
        {title}
      </h2>
      {href && (
        <Link to={href} className="text-xs font-bold uppercase tracking-[0.14em] text-primary hover:underline">
          View all →
        </Link>
      )}
    </div>
  );
}