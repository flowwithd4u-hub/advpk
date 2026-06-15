import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import { SITE } from "@/lib/site";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/practice", label: "Practice" },
  { to: "/blog", label: "Insights" },
  { to: "/contact", label: "Contact" },
] as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "py-2" : "py-4"
      }`}
    >
      <div className="mx-auto max-w-6xl px-4">
        <nav
          className={`glass-strong flex items-center justify-between rounded-2xl px-4 py-3 transition-all duration-500 ${
            scrolled ? "shadow-[0_10px_40px_-15px_rgba(0,0,0,0.6)]" : ""
          }`}
        >
          <Link to="/" className="flex items-center gap-2.5">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-gold text-[color:var(--primary-foreground)] font-display text-lg font-bold">
              P
            </span>
            <span className="hidden font-display text-base leading-tight sm:block">
              <span className="block text-foreground">Prabhat Kaushik</span>
              <span className="block text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                Advocate-on-Record · SCI
              </span>
            </span>
          </Link>

          <div className="hidden items-center gap-1 md:flex">
            {NAV.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                activeOptions={{ exact: n.to === "/" }}
                className="px-4 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground data-[status=active]:text-foreground bg-white/5 rounded-full"
                activeProps={{ className: "bg-white/10" }}
              >
                {n.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2">
            
            <a
              href={SITE.phoneHref}
              className="hidden gold-glow rounded-full bg-gold px-4 py-2 text-sm font-medium text-[color:var(--primary-foreground)] sm:inline-flex items-center gap-1.5"
            >
              <Phone className="h-3.5 w-3.5" /> Consult
            </a>
            <button
              type="button"
              aria-label="Toggle menu"
              onClick={() => setOpen((o) => !o)}
              className="grid h-10 w-10 place-items-center rounded-xl glass md:hidden"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile sheet */}
      <div
        className={`fixed inset-0 top-[72px] z-40 transition-all duration-500 md:hidden ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <div className="mx-4 mt-2 glass-strong rounded-3xl p-3">
          {NAV.map((n, i) => (
            <Link
              key={n.to}
              to={n.to}
              onClick={() => setOpen(false)}
              activeOptions={{ exact: n.to === "/" }}
              activeProps={{ className: "bg-white/5 text-foreground" }}
              className="block rounded-2xl px-4 py-3 text-base text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground animate-fade-up"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              {n.label}
            </Link>
          ))}
          <a
            href={SITE.phoneHref}
            onClick={() => setOpen(false)}
            className="mt-2 flex items-center justify-center gap-2 rounded-2xl bg-gold px-4 py-3 font-medium text-[color:var(--primary-foreground)]"
          >
            <Phone className="h-4 w-4" /> Call Chambers
          </a>
        </div>
      </div>
    </header>
  );
}
