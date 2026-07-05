import { Link } from "@tanstack/react-router";
import { Menu, Search, X } from "lucide-react";
import { useState } from "react";
import { categories } from "@/lib/posts";
import logoAsset from "@/assets/trust-all-america-logo.png.asset.json";

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur-md">
      {/* Top strip */}
      <div className="hidden bg-primary text-primary-foreground md:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-1.5 text-xs">
          <span className="opacity-80">Your trusted source across the United States</span>
          <span className="flex items-center gap-4 opacity-80">
            <span>Insurance</span><span>·</span><span>Health</span><span>·</span><span>Finance</span>
          </span>
        </div>
      </div>

      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4">
        <Link to="/" className="flex items-center gap-3" aria-label="Trust All América — Home">
          <img
            src={logoAsset.url}
            alt="Trust All América"
            width={220}
            height={56}
            className="h-10 w-auto md:h-12"
            loading="eager"
            decoding="async"
          />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          <Link
            to="/"
            activeOptions={{ exact: true }}
            className="rounded-md px-3 py-2 text-sm font-semibold text-foreground/80 transition hover:bg-secondary hover:text-foreground"
            activeProps={{ className: "bg-secondary text-foreground" }}
          >
            Home
          </Link>
          {categories.map((c) => (
            <Link
              key={c.slug}
              to="/category/$slug"
              params={{ slug: c.slug }}
              className="rounded-md px-3 py-2 text-sm font-semibold text-foreground/80 transition hover:bg-secondary hover:text-foreground"
              activeProps={{ className: "bg-secondary text-foreground" }}
            >
              {c.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            aria-label="Search"
            className="grid h-10 w-10 place-items-center rounded-md text-muted-foreground transition hover:bg-secondary hover:text-foreground"
          >
            <Search className="h-4 w-4" />
          </button>
          <button
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
            className="grid h-10 w-10 place-items-center rounded-md text-foreground lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border bg-background lg:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col px-4 py-2">
            <Link
              to="/"
              onClick={() => setOpen(false)}
              className="rounded-md px-3 py-3 text-sm font-semibold text-foreground/80 hover:bg-secondary"
            >
              Home
            </Link>
            {categories.map((c) => (
              <Link
                key={c.slug}
                to="/category/$slug"
                params={{ slug: c.slug }}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-3 text-sm font-semibold text-foreground/80 hover:bg-secondary"
              >
                {c.name}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}