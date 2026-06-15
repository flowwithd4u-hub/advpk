import type { ReactNode } from "react";

export function SectionEyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-[color:var(--gold)]/30 bg-[color:var(--gold)]/5 px-3 py-1 text-[11px] uppercase tracking-[0.22em] text-gold">
      <span className="h-1 w-1 rounded-full bg-gold" />
      {children}
    </span>
  );
}

export function PageHero({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: ReactNode;
  subtitle: string;
}) {
  return (
    <section className="relative overflow-hidden pt-32 pb-16 md:pt-40 md:pb-20">
      <div className="bg-radial-gold absolute inset-0 -z-10" />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 left-1/2 -z-10 h-[420px] w-[420px] -translate-x-1/2 rounded-full opacity-25 blur-3xl"
        style={{ background: "var(--gradient-gold)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, oklch(0.82 0.14 85 / 0.4), transparent)",
        }}
      />
      <div className="mx-auto max-w-4xl px-4 text-center">
        <div className="reveal">
          <SectionEyebrow>{eyebrow}</SectionEyebrow>
        </div>
        <h1 className="reveal reveal-delay-1 mt-5 font-display text-4xl leading-[1.05] md:text-6xl">
          {title}
        </h1>
        <p className="reveal reveal-delay-2 mx-auto mt-5 max-w-2xl text-base text-muted-foreground md:text-lg">
          {subtitle}
        </p>
      </div>
    </section>
  );
}

