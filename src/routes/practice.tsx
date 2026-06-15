import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight, Award, Building2, Gavel, ScrollText, ShieldCheck, Sparkles, Users,
  Banknote, Globe2, Briefcase, Computer,
} from "lucide-react";
import { PageHero, SectionEyebrow } from "@/components/Section";
import { SITE } from "@/lib/site";
import imgSupreme from "@/assets/practice-supreme.jpg";
import imgCriminal from "@/assets/practice-criminal.jpg";
import imgFamily from "@/assets/practice-family.jpg";
import imgProperty from "@/assets/practice-property.jpg";
import imgCommercial from "@/assets/practice-commercial.jpg";
import imgConstitutional from "@/assets/practice-constitutional.jpg";
import imgConsumer from "@/assets/practice-consumer.jpg";
import imgCyber from "@/assets/practice-cyber.jpg";
import imgNri from "@/assets/practice-nri.jpg";

export const Route = createFileRoute("/practice")({
  head: () => ({
    meta: [
      { title: "Practice Areas · Advocate Prabhat Kaushik · Faridabad & Supreme Court" },
      {
        name: "description",
        content:
          "Practice areas: Supreme Court litigation, criminal defence, family law, property & RERA, commercial disputes, constitutional & PIL, consumer and cyber matters.",
      },
      { property: "og:title", content: "Practice Areas · Advocate Prabhat Kaushik" },
      {
        property: "og:description",
        content:
          "Comprehensive legal counsel from a Faridabad-based Supreme Court Advocate-on-Record.",
      },
      { property: "og:image", content: imgSupreme },
      { name: "twitter:image", content: imgSupreme },
    ],
  }),
  component: PracticePage,
});

const AREAS = [
  {
    icon: Gavel,
    img: imgSupreme,
    title: "Supreme Court Litigation",
    desc: "As an Advocate-on-Record, Mr. Kaushik possesses the exclusive constitutional mandate to file, appear, and plead before the Supreme Court of India. His appellate mastery includes:",
    points: ["SLPs (Civil & Criminal)", "Article 32 writs", "Transfer petitions", "Interstate Transfer of Cases"],
  },
  {
    icon: ShieldCheck,
    img: imgCriminal,
    title: "Criminal Defence",
    desc: "Securing liberty for corporate executives and individuals through highly strategic Regular, Anticipatory, and Interim Bail applications across various levels of the judiciary.",
    points: ["Anticipatory & regular bail", "FIR quashing (§482 CrPC)", "Corporate Cheating & Anti-Fraud Mandates", "Cheque bounce (§138 NI Act)"],
  },
  {
    icon: Users,
    img: imgFamily,
    title: "Family & Matrimonial",
    desc: "•	Handling complex divorce proceedings, alimony disputes, restitution of conjugal rights, and child custody battles with a blend of absolute confidentiality, emotional intelligence, and rigorous strategic asset tracking.",
    points: ["Mutual & contested divorce", "Child custody & guardianship", "Maintenance (§125 CrPC)", "Domestic Violence Act"],
  },
  {
    icon: Building2,
    img: imgProperty,
    title: "Property & Real Estate",
    desc: "Representing mega-corporations and financial institutions in complex insolvencies, restructuring, and shareholder oppression disputes before the National Company Law Tribunal (NCLT) and NCLAT.",
    points: ["Title & possession suits", "Partition of ancestral property", "RERA Haryana complaints", "Builder-buyer disputes"],
  },
  {
    icon: Briefcase,
    img: imgCommercial,
    title: "Commercial & Arbitration",
    desc: "Contract enforcement, recovery suits, arbitration proceedings and insolvency matters under the IBC.",
    points: ["Domestic & international arbitration", "Recovery & summary suits", "IBC matters", "Contract disputes"],
  },
  {
    icon: ScrollText,
    img: imgConstitutional,
    title: "Constitutional & PIL",
    desc: "Writ petitions, public interest litigation and challenges to administrative action.",
    points: ["Article 226 writs", "Public Interest Litigation", "Service matters", "Administrative challenges"],
  },
  {
    icon: Banknote,
    img: imgConsumer,
    title: "Consumer Protection",
    desc: "Complaints under the Consumer Protection Act, 2019 — from district commissions to the NCDRC.",
    points: ["District / State / NCDRC", "Service deficiency", "Unfair trade practices", "Product liability"],
  },
  {
    icon: Computer,
    img: imgCyber,
    title: "Cyber & IT Law",
    desc: "Cyber crime complaints, data breach matters and IT Act prosecutions/defence.",
    points: ["Cyber-crime complaints", "Online fraud recovery", "IT Act §66 / §67", "Reputation defence"],
  },
  {
    icon: Globe2,
    img: imgNri,
    title: "NRI Legal Services",
    desc: "End-to-end representation for NRIs in property, family and inheritance matters across India.",
    points: ["NRI divorce", "Property management & disputes", "PoA & inheritance", "Cross-border representation"],
  },
];

function PracticePage() {
  return (
    <>
      <PageHero
        eyebrow="Practice areas"
        title={
          <>
            A full-spectrum practice,<br />
            <span className="text-gold">disciplined to the brief.</span>
          </>
        }
        subtitle="From bail applications to Supreme Court appeals, the chambers handles every matter with apex-court preparation and personal client engagement."
      />

      <section className="relative pb-24">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 opacity-50"
          style={{
            background:
              "radial-gradient(ellipse at 80% 10%, oklch(0.82 0.14 85 / 0.1), transparent 60%)",
          }}
        />
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {AREAS.map((a, i) => (
              <article
                key={a.title}
                className={`reveal reveal-delay-${(i % 4) + 1} practice-card group`}
                data-cursor="hover"
              >
                <div className="practice-media">
                  <img
                    src={a.img}
                    alt={a.title}
                    loading="lazy"
                    width={1024}
                    height={768}
                    className="practice-img"
                  />
                  <div className="practice-media-overlay" aria-hidden />
                  <div className="practice-icon-badge" aria-hidden>
                    <a.icon className="h-5 w-5" />
                  </div>
                </div>
                <div className="practice-body">
                  <h2 className="font-display text-2xl">{a.title}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {a.desc}
                  </p>
                  <ul className="mt-4 space-y-1.5 text-sm">
                    {a.points.map((p) => (
                      <li key={p} className="flex items-start gap-2 text-muted-foreground">
                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-gold" />
                        {p}
                      </li>
                    ))}
                  </ul>
                  <Link
                    to="/contact"
                    className="practice-arrow mt-5 font-semibold"
                    data-cursor="hover"
                  >
                    Discuss matter <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
                <span className="practice-shine" aria-hidden />
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-24">
        <div className="mx-auto max-w-6xl px-4">
          <div className="reveal mb-14 max-w-2xl">
            <SectionEyebrow>Engagement process</SectionEyebrow>
            <h2 className="mt-4 font-display text-4xl md:text-5xl">
              Clarity from the <span className="text-gold">first call.</span>
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-4">
            {[
              { n: "01", t: "Initial consultation", d: "Confidential 10-minute discussion of the facts and likely options." },
              { n: "02", t: "Strategy & estimate", d: "Written outline of approach, timelines and a transparent fee estimate." },
              { n: "03", t: "Drafting & filing", d: "Pleadings prepared with apex-court rigour; filings tracked end-to-end." },
              { n: "04", t: "Courtroom advocacy", d: "Personal appearance and arguments before the appropriate forum." },
            ].map((s, i) => (
              <div key={s.n} className={`reveal reveal-delay-${i + 1} glass hover-lift rounded-3xl p-6`}>
                <p className="font-display text-4xl text-gold">{s.n}</p>
                <p className="mt-3 font-display text-lg">{s.t}</p>
                <p className="mt-2 text-sm text-muted-foreground">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-32">
        <div className="mx-auto max-w-5xl px-4">
          <div className="reveal glass-strong rounded-[2rem] p-10 text-center md:p-14">
            <Sparkles className="mx-auto h-9 w-9 text-gold" />
            <h2 className="mt-4 font-display text-3xl md:text-4xl">Not sure which area applies to your matter?</h2>
            <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
              Speak with the chambers — we'll help you understand the forum, the timeline and the realistic outcomes before you commit.
            </p>
            <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href={SITE.phoneHref}
                className="gold-glow inline-flex items-center gap-2 rounded-full bg-gold px-7 py-3.5 text-sm font-semibold text-[color:var(--primary-foreground)]"
              >
                <Award className="h-4 w-4" /> Call {SITE.phone}
              </a>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-7 py-3.5 text-sm font-medium text-foreground transition-colors hover:border-[color:var(--gold)]/40"
              >
                Send enquiry <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
