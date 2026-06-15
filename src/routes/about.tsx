import { createFileRoute, Link } from "@tanstack/react-router";
import { Award, BookOpen, Gavel, GraduationCap, MapPin, Scale, ShieldCheck } from "lucide-react";
import { PageHero, SectionEyebrow } from "@/components/Section";
import { SITE } from "@/lib/site";
import chambersImg from "@/assets/about-chamber.jpg";
import { ImageLightbox } from "@/components/ImageLightbox";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Advocate Prabhat Kaushik · Advocate-on-Record, Supreme Court" },
      {
        name: "description",
        content:
          "Profile of Advocate Prabhat Kaushik — Advocate-on-Record at the Supreme Court of India, based in Faridabad. Education, credentials and approach to legal practice.",
      },
      { property: "og:title", content: "About Advocate Prabhat Kaushik" },
      {
        property: "og:description",
        content:
          "Advocate-on-Record at the Supreme Court of India. Boutique chambers in Faridabad with apex-court rigour.",
      },
    ],
  }),
  component: AboutPage,
});

const VALUES = [
  { icon: Scale, title: "Integrity", desc: "Counsel that respects the client, the court and the rule of law — the threefold duty placed on every advocate by §35 of the Advocates Act, 1961." },
  { icon: BookOpen, title: "Preparation", desc: "Every brief built on disciplined research — statute, precedent and the constitutional framework — before a single line of argument is drafted." },
  { icon: ShieldCheck, title: "Discretion", desc: "Sensitive matters handled with strict confidentiality under §132 of the Bharatiya Sakshya Adhiniyam, 2023 (the successor to §126 Evidence Act, 1872)." },
  { icon: Award, title: "Excellence", desc: "Apex-court standards applied to every forum — from the magistrate's bench in Faridabad to a Constitution Bench in New Delhi." },
];

const TIMELINE = [
  { y: "Representing Sovereign Dignitaries", t: "Advocate-on-Record, Supreme Court of India", d: "In one of his most prestigious constitutional assignments, Mr. Kaushik served as the Advocate-on-Record for the Hon’ble Chief Minister of the State of Sikkim before the Supreme Court of India. Collaborating directly with the Standing Counsel for the State, this role underscores his exceptional reputation for handling politically sensitive, high-profile litigations requiring the utmost discretion and constitutional mastery." },
  { y: "Forensic Defense: De-freezing Corporate Bank Accounts", t: "Supreme Court Advocate-on-Record Examination", d: "Demonstrating exceptional agility in white-collar defense, Mr. Kaushik successfully engineered the de-freezing of primary operational bank accounts of major corporate firms, which had been frozen by law enforcement agencies (including the Cyber Cell and Economic Offences Wing) in Gurugram. Utilizing nuanced arguments under Section 102 of the CrPC / Section 105 of the BNSS, he successfully demonstrated a lack of nexus between the corporate funds and the alleged offenses, restoring immediate financial liquidity and saving the firms from operational paralysis." },
  { y: "Cross-Border Criminal Enforcement for Japanese MNCs", t: "Bar Council of India", d: "In a landmark corporate criminal matter, Mr. Kaushik successfully vindicated a Japanese parent corporation by navigating local bureaucratic barriers to register a formal First Information Report (FIR) and initiate criminal prosecution against the top-tier domestic management of its Indian subsidiary in Gurugram, effectively checking massive local financial fraud." },
  { y: "Panel of Specialized Advocates & Regional Infrastructure", t: "LL.B. & legal research", d: "To ensure hyper-localized, aggressive trial advocacy, Mr. Kaushik commands a handpicked team of specialized litigation advocates across the National Capital Region (NCR)." },
];

function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About the advocate"
        title={
          <>
            Advocate On Records <span className="text-gold">Mr. Kaushik</span>
          </>
        }
        subtitle="Advocate Prabhat Kaushik is a distinguished, highly accomplished Advocate-on-Record at the Supreme Court of India. With over two decades of rigorous, multi-jurisdictional litigation experience, Mr. Kaushik operates at the absolute apex of the Indian legal ecosystem."
      />

      {/* Bio */}
      <section className="py-16">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 md:grid-cols-[1fr_1.4fr] md:items-start">
          <div className="reveal">
            <div className="sticky top-28 space-y-4">
              <ImageLightbox
                src={chambersImg}
                alt="Interior of the chambers of Advocate Prabhat Kaushik in Faridabad"
                caption={<>Chambers of Advocate Prabhat Kaushik · {SITE.location}</>}
                className="glass overflow-hidden p-2"
              >
                <div className="relative overflow-hidden rounded-2xl">
                  <img
                    src={chambersImg}
                    alt="Interior of the chambers of Advocate Prabhat Kaushik in Faridabad"
                    width={1024}
                    height={1024}
                    loading="lazy"
                    decoding="async"
                    className="aspect-[4/5] w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(180deg, transparent 45%, color-mix(in oklab, var(--background) 92%, transparent) 100%)",
                    }}
                  />
                  <div className="absolute inset-x-0 bottom-0 p-5">
                    <span className="grid h-12 w-12 place-items-center rounded-full bg-gold font-display text-xl font-bold text-[color:var(--primary-foreground)] shadow-lg">
                      PK
                    </span>
                    <p className="mt-3 font-display text-2xl text-foreground">Prabhat Kaushik</p>
                    <p className="mt-1 text-[11px] uppercase tracking-[0.22em] text-gold">
                      Advocate-on-Record · SCI
                    </p>
                  </div>
                </div>
              </ImageLightbox>
              <div className="glass rounded-2xl p-5">
                <ul className="space-y-2.5 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2.5"><MapPin className="h-4 w-4 text-gold" />{SITE.location}</li>
                  <li className="flex items-center gap-2.5"><Scale className="h-4 w-4 text-gold" />Supreme Court of India</li>
                  <li className="flex items-center gap-2.5"><GraduationCap className="h-4 w-4 text-gold" />LL.B. · Bar Council of India</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="reveal reveal-delay-2 prose-legal">
            <SectionEyebrow>Profile</SectionEyebrow>
            <h2 className="mt-4 font-display text-3xl md:text-4xl">A Measured Advocate, An Unwavering Counsellor.</h2>
            <p>
              An Advocate-on-Record (AOR) is an elite designation given to a select group of legal practitioners who possess the exclusive constitutional and statutory authority to file appearances, petitions, and act on behalf of litigants before the Supreme Court of India.

            </p>
            <p>
              Advocate Prabhat Kaushik is a distinguished, highly accomplished Advocate-on-Record at the Supreme Court of India. With over two decades of rigorous, multi-jurisdictional litigation experience, Mr. Kaushik operates at the absolute apex of the Indian legal ecosystem. Combining elite statutory expertise with robust trial and appellate advocacy, he provides strategic counsel to a prestigious clientele that spans sovereign political leaders, global multinational corporations (MNCs), international enterprises, and high-net-worth Non-Resident Indians (NRIs).
              Headquartered in the National Capital Region (NCR)—with premium offices at Barakhamba Road, New Delhi and Sector-12, Faridabad—Mr. Kaushik heads a premier, full-service legal outfit characterized by forensic precision, deep regulatory insights, and an unblemished track record in high-stakes litigation.


            </p>
            <h3>Specifications</h3>
            <p>
              Mr. Kaushik has engineered a formidable international practice, serving as a trusted legal anchor for global corporations and the Indian diaspora. His cross-border advisory and litigation practice seamlessly navigates private international law, treaty dynamics, and multi-jurisdictional enforcement across sovereign territories, including:



            </p>
            <p>
              •	The United States & Canada
              •	The United Kingdom
              •	Japan
              •	The United Arab Emirates (Dubai)
              •	Ukraine
              Specialized International & NRI Mandates
              •	Cross-Border Corporate Governance.


            </p>
            
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20">
        <div className="mx-auto max-w-5xl px-4">
          <div className="reveal mb-12 text-center">
            <SectionEyebrow>Achivements</SectionEyebrow>
            <h2 className="mt-4 font-display text-4xl md:text-5xl">
              Throughout <span className="text-gold">The Journey.</span>
            </h2>
          </div>
          <div className="relative">
            {/* Vertical spine — exactly centered on mobile (left-[19px]) and desktop (left-1/2) */}
            <div className="pointer-events-none absolute top-2 bottom-2 left-[19px] w-px bg-gradient-to-b from-transparent via-[color:var(--gold)]/40 to-transparent md:left-1/2 md:-translate-x-1/2" />
            <ol className="space-y-10">
              {TIMELINE.map((m, i) => {
                const isRight = i % 2 === 1;
                return (
                  <li
                    key={i}
                    className={`reveal reveal-delay-${(i % 3) + 1} relative md:grid md:grid-cols-2 md:items-center md:gap-16`}
                  >
                    {/* Dot — centered on the spine */}
                    <span className="absolute left-[11px] top-6 z-10 grid h-4 w-4 -translate-x-px place-items-center rounded-full bg-gold ring-4 ring-[color:var(--background)] md:left-1/2 md:-translate-x-1/2">
                      <Gavel className="h-2 w-2 text-[color:var(--primary-foreground)]" />
                    </span>
                    {/* Card */}
                    <div
                      className={`pl-12 md:pl-0 ${isRight ? "md:col-start-2 md:pl-10 md:text-left" : "md:col-start-1 md:pr-10 md:text-right"
                        }`}
                    >
                      <div className="glass hover-lift inline-block w-full rounded-2xl p-5 text-left md:w-auto md:max-w-md">
                        <p className="text-xs uppercase tracking-[0.22em] text-gold">{m.y}</p>
                        <p className="mt-2 font-display text-xl">{m.t}</p>
                        <p className="mt-2 text-sm text-muted-foreground">{m.d}</p>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24">
        <div className="mx-auto max-w-6xl px-4">
          <div className="reveal mb-12 text-center">
            <SectionEyebrow>Principles</SectionEyebrow>
            <h2 className="mt-4 font-display text-4xl md:text-5xl">What the chambers <span className="text-gold">stand for.</span></h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((v, i) => (
              <div key={v.title} className={`reveal reveal-delay-${i + 1} glass hover-lift rounded-3xl p-6`}>
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[color:var(--gold)]/10 text-gold">
                  <v.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 font-display text-xl">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="pb-20">
        <div className="mx-auto max-w-3xl px-4">
          <div className="reveal mb-10 text-center">
            <SectionEyebrow>Common questions</SectionEyebrow>
            <h2 className="mt-4 font-display text-3xl md:text-4xl">
              About the <span className="text-gold">advocate.</span>
            </h2>
          </div>
          <div className="space-y-3">
            {[
              { q: "What does Advocate-on-Record mean?", a: "An AOR is an advocate who has cleared the Supreme Court of India's examination under the Supreme Court Rules, 2013 and is the only person entitled to file pleadings on its rolls. Order IV makes the AOR the sole authority to act, appear and plead on a matter at the apex court — every Supreme Court filing, from an SLP under Article 136 to a writ under Article 32, must therefore be signed by an AOR." },
              { q: "Where are the chambers based?", a: "The chambers are located in Faridabad with regular appearances in the Punjab & Haryana High Court at Chandigarh, the Delhi High Court, Delhi-NCR district courts and the Supreme Court of India. We accept matters from across India and from NRIs through video consultation and authorised representatives." },
              { q: "Do you take on pro-bono matters?", a: "Yes. In keeping with Rule 46 of the Bar Council of India Rules, the chambers takes on selected public-interest and constitutional matters on a pro-bono basis — particularly those touching fundamental rights under Articles 14, 19, 21 and 25 of the Constitution. Please write in with full details for consideration." },
              { q: "Can I get a written legal opinion?", a: "Yes. Written opinions are issued on most subjects — civil, criminal, matrimonial, property, RERA, arbitration and constitutional — after a paid consultation and document review. The opinion sets out the applicable law, likely forum, realistic outcomes and an estimate of timelines and fees." },
              { q: "How is fee structured?", a: "Fees are quoted in writing in the engagement letter, with clear milestones (drafting, filing, listing, arguments). Consultation fees are separately stated. There are no contingent fees in Indian law (Bar Council Rules prohibit them), and we do not bill for time not spent." },
              { q: "Is everything I share confidential?", a: "Communications with the chambers are protected by professional privilege under §132 of the Bharatiya Sakshya Adhiniyam, 2023 (corresponding to §126 of the Indian Evidence Act, 1872). Nothing you share is disclosed without your express written consent." },
            ].map((f, i) => (
              <details
                key={i}
                className="reveal glass group rounded-2xl p-5 [&_summary::-webkit-details-marker]:hidden"
              >
                <summary className="flex cursor-pointer items-center justify-between gap-4 font-display text-lg">
                  {f.q}
                  <span className="text-gold transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-32">
        <div className="mx-auto max-w-4xl px-4">
          <div className="reveal glass-strong rounded-[2rem] p-10 text-center md:p-14">
            <GraduationCap className="mx-auto h-10 w-10 text-gold" />
            <h2 className="mt-4 font-display text-3xl md:text-4xl">Discuss your matter in confidence.</h2>
            <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
              Reach out to schedule a consultation at the Faridabad chambers or via secure video call.
            </p>
            <Link
              to="/contact"
              className="gold-glow mt-6 inline-flex items-center gap-2 rounded-full bg-gold px-7 py-3.5 text-sm font-semibold text-[color:var(--primary-foreground)]"
            >
              Book a consultation
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
