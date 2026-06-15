import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import ReactMarkdown from "react-markdown";
import {
  ArrowLeft, ArrowRight, Calendar, Clock, Link as LinkIcon,
  MessageCircle, Share2, Twitter, Linkedin, Check,
} from "lucide-react";
import { POSTS, getPost } from "@/data/posts";
import { SectionEyebrow } from "@/components/Section";
import { SITE, whatsappLink } from "@/lib/site";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = getPost(params.slug);
    if (!post) throw notFound();
    return { post };
  },
  head: ({ loaderData }) => {
    const post = loaderData?.post;
    if (!post) return { meta: [{ title: "Article not found" }] };
    return {
      meta: [
        { title: `${post.title} · Advocate Prabhat Kaushik` },
        { name: "description", content: post.excerpt },
        { property: "og:title", content: post.title },
        { property: "og:description", content: post.excerpt },
        { property: "og:type", content: "article" },
        { property: "article:section", content: post.category },
        { property: "article:author", content: SITE.name },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: post.title },
        { name: "twitter:description", content: post.excerpt },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="flex min-h-screen flex-col items-center justify-center px-4">
      <h1 className="font-display text-3xl">Article not found</h1>
      <Link to="/blog" className="mt-4 text-gold story-link">Back to all insights</Link>
    </div>
  ),
  component: PostPage,
});

const slugify = (s: string) =>
  s
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .slice(0, 80);

function extractHeadings(md: string) {
  const lines = md.split("\n");
  const out: { level: 2 | 3; text: string; id: string }[] = [];
  for (const ln of lines) {
    const m = /^(#{2,3})\s+(.+?)\s*$/.exec(ln);
    if (!m) continue;
    const level = (m[1].length === 2 ? 2 : 3) as 2 | 3;
    const text = m[2].replace(/[*_`]/g, "");
    out.push({ level, text, id: slugify(text) });
  }
  return out;
}

function PostPage() {
  const { post } = Route.useLoaderData();
  const idx = POSTS.findIndex((p) => p.slug === post.slug);
  const prev = idx > 0 ? POSTS[idx - 1] : null;
  const next = idx < POSTS.length - 1 ? POSTS[idx + 1] : null;
  const related = POSTS.filter((p) => p.category === post.category && p.slug !== post.slug).slice(0, 3);

  const headings = useMemo(() => extractHeadings(post.content), [post.content]);

  return (
    <article>
      {/* Hero */}
      <section className="relative overflow-hidden pt-32 pb-12 md:pt-40">
        <div className="bg-radial-gold absolute inset-0 -z-10" />
        <div className="mx-auto max-w-3xl px-4">
          <Link to="/blog" className="story-link inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.18em] text-muted-foreground">
            <ArrowLeft className="h-3 w-3" /> All insights
          </Link>
          <div className="reveal mt-6">
            <SectionEyebrow>{post.category}</SectionEyebrow>
          </div>
          <h1 className="reveal reveal-delay-1 mt-4 font-display text-4xl leading-tight md:text-5xl">
            {post.title}
          </h1>
          <div className="reveal reveal-delay-2 mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" /> Chambers Insights
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" /> {post.readMinutes} min read
            </span>
          </div>
          <ShareRow title={post.title} className="mt-6" />
        </div>
      </section>

      {/* Body + TOC */}
      <section className="pb-16">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 lg:grid-cols-[220px_1fr] xl:grid-cols-[240px_1fr_220px]">
          {/* TOC (left, sticky) */}
          {headings.length > 1 ? (
            <aside className="hidden lg:block">
              <div className="sticky top-28">
                <p className="mb-3 text-[11px] uppercase tracking-[0.22em] text-gold">On this page</p>
                <nav className="space-y-1.5 border-l border-white/10 pl-4 text-sm">
                  {headings.map((h) => (
                    <a
                      key={h.id}
                      href={`#${h.id}`}
                      className={`block text-muted-foreground transition-colors hover:text-gold ${
                        h.level === 3 ? "pl-3 text-[13px]" : ""
                      }`}
                    >
                      {h.text}
                    </a>
                  ))}
                </nav>
              </div>
            </aside>
          ) : (
            <div className="hidden lg:block" />
          )}

          {/* Article */}
          <div className="reveal prose-legal min-w-0">
            <ReactMarkdown
              components={{
                h2: ({ children }) => {
                  const text = String(children);
                  return <h2 id={slugify(text)}>{children}</h2>;
                },
                h3: ({ children }) => {
                  const text = String(children);
                  return <h3 id={slugify(text)}>{children}</h3>;
                },
              }}
            >
              {post.content}
            </ReactMarkdown>

            {/* Inline CTA */}
            <div className="not-prose glass-strong mt-12 rounded-3xl p-7 text-center">
              <p className="font-display text-2xl">Need advice on your specific matter?</p>
              <p className="mx-auto mt-2 max-w-lg text-sm text-muted-foreground">
                The chambers of Advocate Prabhat Kaushik offer a complimentary 20-minute consultation in Faridabad or via video call.
              </p>
              <div className="mt-5 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <a
                  href={SITE.phoneHref}
                  className="gold-glow rounded-full bg-gold px-6 py-3 text-sm font-semibold text-[color:var(--primary-foreground)]"
                >
                  Call {SITE.phone}
                </a>
                <a
                  href={whatsappLink(`Hello, I just read "${post.title}" and would like to discuss my matter.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-medium hover:border-[color:var(--gold)]/40"
                >
                  WhatsApp the chambers
                </a>
              </div>
            </div>

            <ShareRow title={post.title} className="mt-10" label="Share this article" />
          </div>

          {/* Right rail spacer for symmetry on xl */}
          <div className="hidden xl:block" />
        </div>
      </section>

      {/* Prev / Next */}
      <section className="pb-12">
        <div className="mx-auto grid max-w-3xl gap-3 px-4 md:grid-cols-2">
          {prev ? (
            <Link to="/blog/$slug" params={{ slug: prev.slug }} className="glass hover-lift rounded-2xl p-5">
              <p className="text-[10px] uppercase tracking-[0.22em] text-gold">← Previous</p>
              <p className="mt-1.5 line-clamp-2 font-display text-base">{prev.title}</p>
            </Link>
          ) : <div />}
          {next ? (
            <Link to="/blog/$slug" params={{ slug: next.slug }} className="glass hover-lift rounded-2xl p-5 md:text-right">
              <p className="text-[10px] uppercase tracking-[0.22em] text-gold">Next →</p>
              <p className="mt-1.5 line-clamp-2 font-display text-base">{next.title}</p>
            </Link>
          ) : <div />}
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="pb-32">
          <div className="mx-auto max-w-6xl px-4">
            <p className="font-display text-2xl">More in <span className="text-gold">{post.category}</span></p>
            <div className="mt-5 grid gap-4 md:grid-cols-3">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  to="/blog/$slug"
                  params={{ slug: r.slug }}
                  className="group glass hover-lift rounded-3xl p-5"
                >
                  <p className="font-display text-lg leading-snug transition-colors group-hover:text-gold">
                    {r.title}
                  </p>
                  <span className="mt-3 inline-flex items-center gap-1 text-xs text-gold">
                    Read <ArrowRight className="h-3 w-3" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </article>
  );
}

function ShareRow({
  title, className = "", label,
}: { title: string; className?: string; label?: string }) {
  const [copied, setCopied] = useState(false);
  const url = typeof window !== "undefined" ? window.location.href : "";
  const enc = encodeURIComponent;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* ignore */
    }
  };

  const btn =
    "inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-muted-foreground transition-colors hover:border-[color:var(--gold)]/40 hover:text-gold";

  return (
    <div className={`flex flex-wrap items-center gap-2 ${className}`}>
      {label && (
        <span className="mr-1 inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.18em] text-muted-foreground">
          <Share2 className="h-3 w-3" /> {label}
        </span>
      )}
      <a
        className={btn}
        aria-label="Share on WhatsApp"
        target="_blank"
        rel="noopener noreferrer"
        href={`https://wa.me/?text=${enc(`${title} — ${url}`)}`}
      >
        <MessageCircle className="h-4 w-4" />
      </a>
      <a
        className={btn}
        aria-label="Share on Twitter / X"
        target="_blank"
        rel="noopener noreferrer"
        href={`https://twitter.com/intent/tweet?text=${enc(title)}&url=${enc(url)}`}
      >
        <Twitter className="h-4 w-4" />
      </a>
      <a
        className={btn}
        aria-label="Share on LinkedIn"
        target="_blank"
        rel="noopener noreferrer"
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${enc(url)}`}
      >
        <Linkedin className="h-4 w-4" />
      </a>
      <button type="button" onClick={copy} className={btn} aria-label="Copy link">
        {copied ? <Check className="h-4 w-4 text-emerald-400" /> : <LinkIcon className="h-4 w-4" />}
      </button>
    </div>
  );
}
