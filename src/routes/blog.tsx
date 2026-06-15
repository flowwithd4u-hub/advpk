import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Search, Clock, ArrowRight } from "lucide-react";
import { PageHero } from "@/components/Section";
import { CATEGORIES, POSTS } from "@/data/posts";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Legal Insights · Advocate Prabhat Kaushik" },
      {
        name: "description",
        content:
          "Plain-language guides to Indian law: bail, divorce, property, RERA, Supreme Court procedure, consumer protection and more — from the chambers of Advocate Prabhat Kaushik.",
      },
      { property: "og:title", content: "Legal Insights · Advocate Prabhat Kaushik" },
      {
        property: "og:description",
        content: "Practical articles on Indian law from a Supreme Court Advocate-on-Record.",
      },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Legal Insights · Advocate Prabhat Kaushik" },
      {
        name: "twitter:description",
        content: "Practical articles on Indian law from a Supreme Court Advocate-on-Record.",
      },
    ],
  }),
  component: BlogPage,
});

function BlogPage() {
  const [cat, setCat] = useState<string>("All");
  const [q, setQ] = useState("");
  const [pending, setPending] = useState(false);

  // Briefly show skeletons while filters change — gives UI feedback without delaying typing.
  useEffect(() => {
    setPending(true);
    const t = setTimeout(() => setPending(false), 180);
    return () => clearTimeout(t);
  }, [cat, q]);

  const filtered = useMemo(() => {
    const ql = q.trim().toLowerCase();
    return POSTS.filter((p) => {
      if (cat !== "All" && p.category !== cat) return false;
      if (!ql) return true;
      return (
        p.title.toLowerCase().includes(ql) ||
        p.excerpt.toLowerCase().includes(ql) ||
        p.category.toLowerCase().includes(ql)
      );
    });
  }, [cat, q]);

  return (
    <>
      <PageHero
        eyebrow="Insights"
        title={
          <>
            Legal Clarity, <span className="text-gold">Plainly Written.</span>
          </>
        }
        subtitle="Practical, jargon-free guides to Indian law — written by the chambers for clients, students and curious citizens."
      />

      {/* Filters */}
      <section className="pb-8">
        <div className="mx-auto max-w-6xl px-4">
          <div className="reveal glass rounded-3xl p-4">
            <div className="flex flex-col gap-4 md:flex-row md:items-center">
              <div className="relative flex-1">
                <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Search articles…"
                  className="w-full rounded-full bg-white/5 py-2.5 pl-11 pr-4 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[color:var(--ring)]"
                />
              </div>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {["All", ...CATEGORIES].map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setCat(c)}
                  className={`rounded-full border px-3.5 py-1.5 text-xs transition-all ${
                    cat === c
                      ? "border-[color:var(--gold)]/60 bg-[color:var(--gold)]/15 text-gold"
                      : "border-white/10 bg-white/5 text-muted-foreground hover:border-white/20 hover:text-foreground"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="pb-32">
        <div className="mx-auto max-w-6xl px-4">
          {pending ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3" aria-busy="true" aria-live="polite">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="glass flex animate-pulse flex-col rounded-3xl p-6">
                  <div className="h-4 w-20 rounded-full bg-white/10" />
                  <div className="mt-4 h-5 w-11/12 rounded bg-white/10" />
                  <div className="mt-2 h-5 w-9/12 rounded bg-white/10" />
                  <div className="mt-4 space-y-2">
                    <div className="h-3 w-full rounded bg-white/5" />
                    <div className="h-3 w-10/12 rounded bg-white/5" />
                    <div className="h-3 w-8/12 rounded bg-white/5" />
                  </div>
                  <div className="mt-5 h-3 w-24 rounded bg-white/5" />
                </div>
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="glass rounded-3xl py-16 text-center text-muted-foreground">
              No articles found. Try a different search or category.
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filtered.map((p, i) => (
                <Link
                  key={p.slug}
                  to="/blog/$slug"
                  params={{ slug: p.slug }}
                  className={`reveal reveal-delay-${(i % 4) + 1} group glass hover-lift flex flex-col rounded-3xl p-6`}
                >
                  <span className="inline-flex w-fit rounded-full bg-[color:var(--gold)]/10 px-2.5 py-0.5 text-[10px] uppercase tracking-[0.18em] text-gold">
                    {p.category}
                  </span>
                  <h2 className="mt-4 font-display text-xl leading-snug transition-colors group-hover:text-gold">
                    {p.title}
                  </h2>
                  <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                    {p.excerpt}
                  </p>
                  <div className="mt-5 flex items-center justify-between border-t border-white/5 pt-4 text-xs text-muted-foreground">
                    <span className="inline-flex items-center gap-1.5">
                      <Clock className="h-3 w-3" /> {p.readMinutes} min read
                    </span>
                    <span className="inline-flex items-center gap-1 text-gold opacity-0 transition-opacity group-hover:opacity-100">
                      Read <ArrowRight className="h-3 w-3" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
