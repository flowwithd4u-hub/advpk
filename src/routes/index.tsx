import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  AlertTriangle,
  Award,
  BookOpen,
  Building2,
  CheckCircle2,
  Clock,
  Gavel,
  Quote,
  Scale,
  ShieldCheck,
  Sparkles,
  Star,
  Users,
} from "lucide-react";
import { SITE } from "@/lib/site";
import { SectionEyebrow } from "@/components/Section";
import { HeroStatue } from "@/components/HeroStatue";
import chambersImg1 from "@/assets/about-chamber.jpg";
import { ImageLightbox } from "@/components/ImageLightbox";
import { TeamSection } from "@/components/TeamSection";
import { POSTS } from "@/data/posts";
import { trackAttr } from "@/lib/analytics";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Advocate Prabhat Kaushik · Supreme Court Lawyer in Faridabad" },
      {
        name: "description",
        content:
          "Advocate-on-Record at the Supreme Court of India, based in Faridabad. Trusted counsel in criminal, family, property, commercial and constitutional matters across India.",
      },
      { property: "og:title", content: "Advocate Prabhat Kaushik · Supreme Court Lawyer in Faridabad" },
      {
        property: "og:description",
        content:
          "Advocate-on-Record, Supreme Court of India. Counsel of consequence — advocacy with integrity, based in Faridabad.",
      },
    ],
  }),
  component: HomePage,
});

const PRACTICE = [
  { icon: Gavel, title: "Supreme Court Litigation", desc: "SLPs under Article 136, writs under Article 32, transfer petitions and curative review at the apex court of India." },
  { icon: ShieldCheck, title: "Criminal Defence", desc: "Anticipatory bail (§438 CrPC), regular bail (§439), FIR quashing (§482), NDPS, PMLA and §138 NI Act matters." },
  { icon: Users, title: "Family & Matrimonial", desc: "Hindu Marriage Act, Special Marriage Act, custody under the Guardians and Wards Act, §125 CrPC maintenance and DV Act protection." },
  { icon: Building2, title: "Property & RERA", desc: "Title and partition suits, specific performance, RERA (Haryana) complaints and builder-buyer disputes under the 2016 Act." },
  { icon: Award, title: "Commercial & Arbitration", desc: "Arbitration & Conciliation Act 1996, IBC proceedings, recovery suits, §138 NI Act and contract enforcement." },
  { icon: Sparkles, title: "Constitutional & PIL", desc: "Article 32 / 226 writs, public interest litigation, service matters and challenges to executive action." },
];

const STATS = [
  { k: "20+", v: "Years Of Expertise" },
  { k: "A O R", v: "Supreme Court Of India" },
  { k: "1,000+", v: "Matters Represented" },
  { k: "98%", v: "Client Retention" },
];

function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden pt-28 pb-20 md:pt-36 md:pb-28">
        <div className="bg-radial-gold absolute inset-0 -z-10" />
        <div
          aria-hidden
          className="absolute -top-40 left-1/3 -z-10 h-[520px] w-[520px] rounded-full opacity-30 blur-3xl"
          style={{ background: "var(--gradient-gold)" }}
        />
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 md:grid-cols-[1.05fr_0.95fr] md:gap-10">
          {/* Copy */}
          <div className="text-center md:text-left">
            <div className="reveal">
              <SectionEyebrow>Councils of Prabhat Kaushik</SectionEyebrow>
            </div>

            <h1 className="reveal reveal-delay-1 mt-6 font-display text-5xl leading-[1.02] md:text-6xl lg:text-7xl">
              Prabhat <span className="text-gold animate-shimmer">Kaushik</span>
              <br />
              Advocate On Record
            </h1>

            <p className="reveal reveal-delay-2 mx-auto mt-6 max-w-xl text-base leading-relaxed text-muted-foreground md:mx-0 md:text-lg">
              Advocate Prabhat Kaushik is a distinguished, highly accomplished Advocate-on-Record at the Supreme Court of India. With over two decades of rigorous, multi-jurisdictional litigation experience, Mr. Kaushik operates at the absolute apex of the Indian legal ecosystem. Combining elite statutory expertise with robust trial and appellate advocacy, he provides strategic counsel to a prestigious clientele that spans sovereign political leaders, global multinational corporations (MNCs), international enterprises, and high-net-worth Non-Resident Indians (NRIs).
            </p>
            <p className="reveal reveal-delay-2 mx-auto mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground md:mx-0">
              The Chambers Is Grounded In The Constitutional Promise Of <span className="text-foreground">Article 14</span> (Equality Before The Law), <span className="text-foreground">Article 21</span> (Life & Personal Liberty) & <span className="text-foreground">Article 22</span> (Safeguards On Arrest) — The Bedrock Rights Every Indian Citizen is entitled to Invoke. From a Magistrate's Bail Order To A Supreme Court Write Under Article 32, Every Brief is Argued with the Same Constitutional Discipline.
            </p>
            <p className="reveal reveal-delay-2 mt-3 inline-flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-[11px] uppercase tracking-[0.18em] text-muted-foreground md:justify-start">
              <span className="inline-flex items-center gap-1.5"><CheckCircle2 className="h-3 w-3 icon-gold" />+91 9958560041</span>
              <span className="opacity-40">·</span>
              <span className="inline-flex items-center gap-1.5"><ShieldCheck className="h-3 w-3 icon-gold" />prabhatkaushikadv@gmail.com</span>
              <span className="opacity-40">·</span>
              <span className="inline-flex items-center gap-1.5"><Clock className="h-3 w-3 icon-gold" /> Replies Within 1 Day</span>
            </p>

            <div className="reveal reveal-delay-3 mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row md:justify-start">
              <a
                href={SITE.phoneHref}
                data-cursor="hover"
                {...trackAttr("hero_cta_call", { label: "Book a consultation" })}
                className="gold-glow inline-flex items-center gap-2 rounded-full bg-gold px-7 py-3.5 text-sm font-semibold text-[color:var(--primary-foreground)]"
              >
                Book A Consultation <ArrowRight className="h-4 w-4" />
              </a>
              <Link
                to="/practice"
                data-cursor="hover"
                {...trackAttr("hero_cta_practice", { label: "Explore practice areas" })}
                className="inline-flex items-center gap-2 rounded-full border border-[color:var(--hairline)] bg-[color:var(--surface-2)] px-7 py-3.5 text-sm font-medium text-foreground transition-colors hover:border-[color:var(--gold)]/40">
              
                Explore Practice Areas
              </Link>
            </div>

            <div className="reveal reveal-delay-4 mx-auto mt-12 grid max-w-xl grid-cols-2 gap-3 md:mx-0 md:grid-cols-4">
              {STATS.map((s) => (
                <div key={s.v} className="glass rounded-2xl px-4 py-5 text-left hover-lift">
                  <p className="font-display text-3xl text-gold">{s.k}</p>
                  <p className="mt-1 text-xs leading-snug text-muted-foreground">{s.v}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Nyaya Murti — responsive AVIF/WebP, parallax with reduced-motion fallback */}
          <div className="reveal reveal-delay-2">
            <HeroStatue />
          </div>
        </div>
      </section>

      {/* Authority strip */}
      <section className="border-y border-white/5 bg-[color:var(--surface)]/40 py-6">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-10 gap-y-3 px-4 text-xs uppercase tracking-[0.22em] text-muted-foreground">
          <span className="text-gold">Bar Councel Of India</span>
          <span>·</span>
          <span>Supreme Court Of India</span>
          <span>·</span>
          <span>Haryana High Court</span>
          <span>·</span>
          <span>Punjab High Court</span>
          <span>·</span>
          <span>Faridabad District Courts</span>
        </div>
      </section>

      {/* About — sits right after hero */}
      <section className="relative overflow-hidden py-24 md:py-32">
        <div className="bg-radial-gold absolute inset-0 -z-10 opacity-60" />
        <div className="mx-auto grid max-w-6xl gap-12 px-4 md:grid-cols-[0.9fr_1.1fr] md:items-center">
          <div className="reveal">
            <ImageLightbox
              src={chambersImg1}
              alt="Chambers of Advocate Prabhat Kaushik — antique brass scales of justice on a mahogany desk"
              caption={<>Chambers Of Advocate Prabhat Kaushik · {SITE.location}</>}
              className="glass overflow-hidden p-2"
            >
              <div className="relative overflow-hidden rounded-2xl">
                <img
                  src={chambersImg1}
                  alt="Chambers of Advocate Prabhat Kaushik — antique brass scales of justice on a mahogany desk"
                  width={1024}
                  height={1024}
                  loading="lazy"
                  decoding="async"
                  className="aspect-[4/5] w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                />
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(180deg, transparent 40%, color-mix(in oklab, var(--background) 90%, transparent) 100%)",
                  }}
                />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6">
                  <div>
                    <span className="grid h-14 w-14 place-items-center rounded-full bg-gold font-display text-2xl font-bold text-[color:var(--primary-foreground)] shadow-lg">
                      PK
                    </span>
                    <p className="mt-3 font-display text-2xl text-foreground">Prabhat Kaushik</p>
                    <p className="mt-1 text-[11px] uppercase tracking-[0.22em] text-gold">
                      Advocate-On-Records · 
                    </p>
                  </div>
                  <div className="hidden text-right text-xs text-muted-foreground sm:block">
                    <p>📍 {SITE.location}</p>
                    <p className="mt-1">⚖️ Supreme Court Of India</p>
                  </div>
                </div>
              </div>
            </ImageLightbox>
          </div>

          <div className="reveal reveal-delay-2">
            <SectionEyebrow>Supreme Court Relief Watch</SectionEyebrow>
            <h2 className="mt-4 font-display text-3xl leading-tight text-gray-900 sm:text-4xl dark:text-gray-50">
              ILLEGAL SUBVENTION SCHEME: A Nexus of Builders, Banks and NBFCs
            </h2>

            <div className="mt-6 space-y-5 rounded-[28px] border border-white/10 bg-white/80 p-5 shadow-[0_18px_70px_rgba(0,0,0,0.08)] backdrop-blur-sm sm:p-6 dark:bg-[color:var(--surface-2)]">
              <p className="text-base leading-relaxed text-muted-foreground">
                The Supreme Court of India has launched a massive crackdown on the predatory bank-builder nexus, delivering landmark relief to homebuyers trapped in stalled “No EMI Till Possession” subvention schemes.
              </p>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50">What is a Subvention Scheme?</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  Under a subvention scheme, a tripartite agreement is executed among the homebuyer, the bank/financial institution, and the builder/developer. Banks disburse the sanctioned loan amount directly to the builder’s account, and the builder undertakes to pay the EMIs or pre-EMIs until the flat is handed over to the homebuyer. The schemes are marketed with attractive promises of “No Pre-EMI till delivery of possession”.
                </p>
              </div>

              <div className="grid gap-4 lg:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-[color:var(--surface)]/70 p-4">
                  <h4 className="font-semibold text-gray-900 dark:text-gray-50">The Trap</h4>
                  <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                      <span>While projects were launched between 2010–2017, most builders started defaulting on EMI payments in 2018–2019.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                      <span>When builders defaulted, banks turned to homebuyers for recovery, demanding EMI payments for incomplete flats that were never delivered.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                      <span>Homebuyers’ accounts were reported as NPAs, and their CIBIL scores were adversely impacted.</span>
                    </li>
                  </ul>
                </div>

                <div className="rounded-2xl border border-white/10 bg-[color:var(--surface)]/70 p-4">
                  <h4 className="font-semibold text-gray-900 dark:text-gray-50">Critical Relief for Homebuyers</h4>
                  <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                      <span>Issued critical stays on coercive EMI recoveries.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                      <span>Protected buyers’ CIBIL scores from being tarnished by builder defaults.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                      <span>Ordered CBI and ED probes into financial collusion.</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="rounded-2xl border border-amber-300 bg-amber-50 p-4 text-sm text-amber-950 dark:border-amber-400/40 dark:bg-amber-500/10 dark:text-amber-200">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
                  <div>
                    <p className="font-semibold">The Urgent Caveat</p>
                    <p className="mt-1">These vital interim protections against loan recovery and credit downgrades are generally granted only to active petitioners before the Court. Sitting back leaves your savings and creditworthiness vulnerable.</p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-[color:var(--surface)]/70 p-4">
                <h4 className="font-semibold text-gray-900 dark:text-gray-50">How We Can Help</h4>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  As an <strong>Advocate-on-Record (AOR)</strong>—the only category of advocate authorized to file cases before the Supreme Court of India—I systematically navigate the Supreme Court’s strict documentation mandates.
                </p>
                <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <Scale className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                    <span>Seamlessly drafting your compliance disclosures.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Scale className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                    <span>Exposing bank deviations from RBI guidelines.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Scale className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                    <span>Reviewing your tripartite agreement for legal vulnerabilities.</span>
                  </li>
                </ul>
              </div>

              <div className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-[color:var(--surface)]/70 p-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm leading-relaxed text-muted-foreground">
                  <strong>Take Action</strong> Contact my chambers today to review your tripartite agreement and secure your financial future at the highest court of the land. The window for relief is open—but only for those who step forward.
                </p>
                <Link
                  to="/contact"
                  data-cursor="hover"
                  className="inline-flex items-center justify-center rounded-full bg-gold px-5 py-2.5 text-sm font-semibold text-[color:var(--primary-foreground)] transition-transform duration-200 hover:translate-y-[-1px]"
                >
                  Contact My Chambers Today
                </Link>
              </div>

              <p className="pt-2 text-sm text-gray-500">
                Disclaimer: This content is for informational purposes only and does not constitute legal advice. Every case is unique; consult a qualified legal professional for advice specific to your situation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 md:py-28">
        <div className="mx-auto max-w-6xl px-4">
          <div className="reveal mx-auto mb-14 max-w-2xl text-center">
            <SectionEyebrow>Why Choose Us</SectionEyebrow>
            <h2 className="mt-4 font-display text-4xl md:text-5xl">
              Counsel You Can <span className="text-gold">Stake Your Case On.</span>
            </h2>
            <p className="mt-4 text-muted-foreground">
              Six Reasons Clients Return — And Refer — Across Criminal, Family, Property And Constitutional Matters. Each Principle is rooted in the Duties an Advocate owes the Court under the Advocates Act, 1961 and the Bar Council Of India Rules.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: Scale, t: "Advocates On Records", d: "Every brief prepared to Supreme Court Standards — pleadings drafted to satisfy Order XXI of the Supreme Court Rules, even in trial courts." },
              { icon: ShieldCheck, t: "Confidential & Ethical", d: "Strict Client privilege under §126 of the Indian Evidence Act (now §132 BSA, 2023). No Case is ever Discussed Outside the Chambers." },
              { icon: CheckCircle2, t: "Transparent Fees", d: "Engagement letter issued upfront. Fees are quoted in Writing, Billed Against Milestones, and never Escalated Mid-Matter." },
              { icon: Sparkles, t: "Personal Attention", d: "The Advocate of Record is the Advocate who argues the Matter — No Hand-Off To Juniors At the Hearing." },
              { icon: Clock, t: "Responsive", d: "Status Updates in Plain English. Replies within one Working Days, Even during Court Vacations." },
              { icon: Award, t: "Track Record", d: "1,000+ matters Represented across Delhi-NCR, the Punjab & Haryana High Court and the Supreme Court of India." },
            ].map((p, i) => (
              <div
                key={p.t}
                className={`reveal reveal-delay-${(i % 4) + 1} glass hover-lift rounded-3xl p-6`}
                data-cursor="hover"
              >
                <div className="grid h-11 w-11 place-items-center rounded-2xl bg-[color:var(--gold)]/15 icon-gold">
                  <p.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 font-display text-xl">{p.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <TeamSection />

      {/* Blog preview */}
      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-6xl px-4">
          <div className="reveal mb-14 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <SectionEyebrow>From Our Councel</SectionEyebrow>
              <h2 className="mt-4 font-display text-4xl md:text-5xl">
                Notes On <span className="text-gold">Indian Law.</span>
              </h2>
              <p className="mt-4 text-muted-foreground">
                Plain-English Explainers On Bail, Divorce, FIRs, RERA and Supreme Court Procedure — Written From The Chambers.
              </p>
            </div>
            <Link
              to="/blog"
              data-cursor="hover"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-[color:var(--gold)]/40"
            >
              All Articles <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {POSTS.slice(0, 3).map((post, i) => (
              <Link
                key={post.slug}
                to="/blog/$slug"
                params={{ slug: post.slug }}
                data-cursor="hover"
                className={`reveal reveal-delay-${(i % 3) + 1} group glass hover-lift relative flex flex-col overflow-hidden rounded-3xl p-6`}
              >
                <div
                  aria-hidden
                  className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-60"
                  style={{ background: "var(--gradient-gold)" }}
                />
                <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-gold">
                  <BookOpen className="h-3.5 w-3.5" />
                  {post.category}
                </div>
                <h3 className="mt-4 font-display text-2xl leading-snug transition-colors duration-300 group-hover:text-gold">
                  {post.title}
                </h3>
                <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                  {post.excerpt}
                </p>
                <div className="mt-6 flex items-center justify-between border-t border-white/5 pt-4 text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1.5">
                    <Clock className="h-3 w-3" /> {post.readMinutes} min read
                  </span>
                  <span className="inline-flex items-center gap-1 text-gold opacity-0 -translate-x-1 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
                    Read <ArrowRight className="h-3 w-3" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Practice */}
      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-6xl px-4">
          <div className="reveal mb-14 max-w-3xl">
            <SectionEyebrow>Our Practice Areas</SectionEyebrow>
            <h2 className="mt-4 font-display text-4xl md:text-5xl">
              Comprehensive Counsel,<br />
              <span className="text-gold">Measured Execution.</span>
            </h2>
            <p className="mt-4 text-muted-foreground">
              From Bail Applications in the Magistrate's Court to Special Leave Petitions before the Supreme Court — the Chambers Handles a Full Spectrum of Matters with Disciplined Preparation & Trategic Clarity.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {PRACTICE.map((p, i) => (
              <Link
                key={p.title}
                to="/practice"
                className={`reveal reveal-delay-${(i % 4) + 1} group glass hover-lift rounded-3xl p-6`}
              >
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[color:var(--gold)]/10 text-gold">
                  <p.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 font-display text-xl">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.desc}</p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-xs text-gold opacity-0 transition-opacity group-hover:opacity-100">
                  Learn More <ArrowRight className="h-3 w-3" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>


      {/* Process timeline */}
      <section className="relative py-24 md:py-28">
        <div className="mx-auto max-w-6xl px-4">
          <div className="reveal mb-14 max-w-2xl">
            <SectionEyebrow>How We Work</SectionEyebrow>
            <h2 className="mt-4 font-display text-4xl md:text-5xl">
              A Disciplined <span className="text-gold">Four-step</span> Engagement.
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[
              { n: "01", t: "Confidential Consultation", d: "Complimentary 10-minutes call to understand your matter, risks and realistic outcomes." },
              { n: "02", t: "Engagement Letter", d: "Clear scope, timeline and fee structure — signed before any work begins." },
              { n: "03", t: "Preparation", d: "Research, drafting, evidence review and strategy — the work that wins cases." },
              { n: "04", t: "Representation", d: "Appearance before the relevant forum with disciplined, measured advocacy." },
            ].map((s, i) => (
              <div
                key={s.n}
                className={`reveal reveal-delay-${(i % 4) + 1} glass hover-lift relative rounded-3xl p-6`}
              >
                <span className="font-display text-5xl text-gold/80">{s.n}</span>
                <h3 className="mt-3 font-display text-xl">{s.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-6xl px-4">
          <div className="reveal mb-14 max-w-2xl">
            <SectionEyebrow>Client Trust</SectionEyebrow>
            <h2 className="mt-4 font-display text-4xl md:text-5xl">
              What Clients <span className="text-gold">Says.</span>
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {[
              { q: "Mr. Kaushik's preparation for Our SLP was extraordinary. He saw arguments we hadn't considered.", a: "Real-estate group · Gurgaon" },
              { q: "Quietly Persuasive in Court, Deeply Human in Chambers. Exactly the Counsel a family case deserves.", a: "Private client · Faridabad" },
              { q: "Strategic, Ethical, & Refreshingly Transparent on Fees and Timelines.", a: "MD, manufacturing firm · Delhi" },
            ].map((t, i) => (
              <div key={i} className={`reveal reveal-delay-${i + 1} glass hover-lift relative rounded-3xl p-6`}>
                <Quote className="absolute right-5 top-5 h-6 w-6 text-gold/30" />
                <div className="flex gap-0.5 text-gold">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star key={j} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <p className="mt-4 leading-relaxed text-foreground">"{t.q}"</p>
                <p className="mt-4 text-xs uppercase tracking-[0.18em] text-muted-foreground">{t.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* Final CTA */}
      <section className="relative overflow-hidden pb-32">
        <div className="mx-auto max-w-5xl px-4">
          <div className="reveal glass-strong relative overflow-hidden rounded-[2rem] p-10 text-center md:p-16">
            <div
              aria-hidden
              className="absolute -top-20 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full opacity-25 blur-3xl"
              style={{ background: "var(--gradient-gold)" }}
            />
            <SectionEyebrow>Speak To The Chambers</SectionEyebrow>
            <h2 className="mt-5 font-display text-4xl leading-tight md:text-5xl">
              Your Matter Deserves<br />
              <span className="text-gold">Considered Counsel.</span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
              The first 10-Mins Consultation is Complimentary — Confidential, Candid & Without Obligation.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href={SITE.phoneHref}
                className="gold-glow inline-flex items-center gap-2 rounded-full bg-gold px-7 py-3.5 text-sm font-semibold text-[color:var(--primary-foreground)]"
              >
                Call {SITE.phone}
              </a>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-7 py-3.5 text-sm font-medium text-foreground transition-colors hover:border-[color:var(--gold)]/40"
              >
                Send A Message
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
