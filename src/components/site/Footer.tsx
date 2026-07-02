import { Link } from "@tanstack/react-router";
import { Mail, MapPin, Phone } from "lucide-react";
import { categories } from "@/lib/posts";

export function Footer() {
  return (
    <footer className="mt-24 bg-[oklch(0.14_0.04_260)] text-primary-foreground">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="grid h-10 w-10 place-items-center rounded-md bg-accent font-serif text-xl font-black">T</span>
            <span className="font-serif text-xl font-black">
              Trust <span className="text-accent">All</span> America
            </span>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-primary-foreground/70">
            Your trusted source for insurance, health plans, and financial security across the United States.
          </p>
        </div>
        <div>
          <h4 className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-primary-foreground/60">Categories</h4>
          <ul className="space-y-2 text-sm">
            {categories.map((c) => (
              <li key={c.slug}>
                <Link to="/category/$slug" params={{ slug: c.slug }} className="text-primary-foreground/80 transition hover:text-accent">
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-primary-foreground/60">Contact</h4>
          <ul className="space-y-3 text-sm text-primary-foreground/80">
            <li className="flex items-start gap-2"><Mail className="mt-0.5 h-4 w-4 text-accent" /> contact@trustallamerica.com</li>
            <li className="flex items-start gap-2"><Phone className="mt-0.5 h-4 w-4 text-accent" /> +1 (800) 000-0000</li>
            <li className="flex items-start gap-2"><MapPin className="mt-0.5 h-4 w-4 text-accent" /> United States</li>
          </ul>
        </div>
        <div>
          <h4 className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-primary-foreground/60">Newsletter</h4>
          <p className="mb-3 text-sm text-primary-foreground/70">Get weekly insights on insurance, health, and finance.</p>
          <form className="flex flex-col gap-2">
            <input type="email" required placeholder="you@email.com" className="rounded-md border border-white/10 bg-white/5 px-3 py-2.5 text-sm placeholder:text-primary-foreground/40 focus:border-accent focus:outline-none" />
            <button type="submit" className="rounded-md bg-accent px-4 py-2.5 text-sm font-semibold text-accent-foreground transition hover:opacity-90">Subscribe</button>
          </form>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-6 py-6 text-xs text-primary-foreground/60 md:flex-row">
          <span>© {new Date().getFullYear()} Trust All America. All rights reserved.</span>
          <span>Privacy · Terms · Disclaimer</span>
        </div>
      </div>
    </footer>
  );
}