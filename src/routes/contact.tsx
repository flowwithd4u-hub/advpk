import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { Mail, MapPin, Phone, MessageCircle, Send, Clock, CheckCircle2, ShieldCheck, Award } from "lucide-react";
import { PageHero, SectionEyebrow } from "@/components/Section";
import { SITE, whatsappLink } from "@/lib/site";
import { trackAttr, trackEvent } from "@/lib/analytics";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Advocate Prabhat Kaushik · Chambers in Faridabad" },
      {
        name: "description",
        content: `Contact the chambers of Advocate Prabhat Kaushik in Faridabad. Call ${SITE.phone}, email ${SITE.email}, or send a confidential enquiry.`,
      },
      { property: "og:title", content: "Contact Advocate Prabhat Kaushik" },
      {
        property: "og:description",
        content: "Speak to a Supreme Court Advocate-on-Record. Confidential consultations in Faridabad and online.",
      },
    ],
  }),
  component: ContactPage,
});

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your full name").max(100),
  email: z.string().trim().email("Please enter a valid email address").max(255),
  phone: z
    .string()
    .trim()
    .min(7, "Enter a valid phone number")
    .max(20)
    .regex(/^[+\d][\d\s\-()]{6,}$/, "Use digits, spaces, +, -, ()"),
  matter: z.string().trim().min(2, "Please choose a matter type").max(60),
  message: z.string().trim().min(10, "Please describe your matter (min 10 chars)").max(1000),
  // Honeypot — must remain empty
  company: z.string().max(0).optional(),
});

const MATTERS = [
  "Supreme Court Litigation",
  "Criminal Defence",
  "Family & Matrimonial",
  "Property & RERA",
  "Commercial / Arbitration",
  "Consumer Protection",
  "Cyber Law",
  "NRI Legal Services",
  "Other",
];

function ContactPage() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (submitting) return;
    const fd = new FormData(e.currentTarget);
    const data = Object.fromEntries(fd.entries());
    const parsed = schema.safeParse(data);
    if (!parsed.success) {
      const errs: Record<string, string> = {};
      parsed.error.issues.forEach((iss) => {
        const k = String(iss.path[0] ?? "form");
        if (!errs[k]) errs[k] = iss.message;
      });
      setErrors(errs);
      trackEvent("contact_form_invalid", { errors: Object.keys(errs).join(",") });
      return;
    }
    setErrors({});
    setSubmitting(true);
    trackEvent("contact_form_submit", { matter: parsed.data.matter });
    await new Promise((r) => setTimeout(r, 700));
    const { name, email, phone, matter, message } = parsed.data;
    const text =
      `Hello, I would like to consult Advocate Prabhat Kaushik.\n\n` +
      `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nMatter: ${matter}\n\nDetails: ${message}`;
    trackEvent("whatsapp_handoff", { source: "contact_form", matter });
    window.open(whatsappLink(text), "_blank", "noopener");
    setSubmitting(false);
    setSent(true);
  };

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title={
          <>
            Speak to the chambers <span className="text-gold">in confidence.</span>
          </>
        }
        subtitle={`Faridabad chambers · Supreme Court of India · NCR-wide representation. The first 20-minute consultation is complimentary.`}
      />

      <section className="pb-32">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 lg:grid-cols-[1fr_1.2fr]">
          {/* Info */}
          <div className="reveal space-y-3">
            <a
              href={SITE.phoneHref}
              {...trackAttr("call_chambers", { source: "contact_card" })}
              className="glass hover-lift block rounded-3xl p-6"
              data-cursor="hover"
            >
              <div className="flex items-start gap-4">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gold text-[color:var(--primary-foreground)]">
                  <Phone className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-xs uppercase tracking-[0.22em] text-gold">Call chambers</p>
                  <p className="mt-1 font-display text-xl">{SITE.phone}</p>
                  <p className="mt-1 text-sm text-muted-foreground">Mon–Sat · 10:00 – 19:00 IST</p>
                </div>
              </div>
            </a>

            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              {...trackAttr("whatsapp_handoff", { source: "contact_card" })}
              className="glass hover-lift block rounded-3xl p-6"
              data-cursor="hover"
            >
              <div className="flex items-start gap-4">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-[#25D366] text-white">
                  <MessageCircle className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-xs uppercase tracking-[0.22em] text-gold">WhatsApp</p>
                  <p className="mt-1 font-display text-xl">{SITE.phone}</p>
                  <p className="mt-1 text-sm text-muted-foreground">Fastest channel · usually replies within an hour</p>
                </div>
              </div>
            </a>

            <a
              href={`mailto:${SITE.email}`}
              className="glass hover-lift block rounded-3xl p-6"
              data-cursor="hover"
            >
              <div className="flex items-start gap-4">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-[color:var(--gold)]/10 text-gold">
                  <Mail className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-xs uppercase tracking-[0.22em] text-gold">Email</p>
                  <p className="mt-1 break-all font-display text-xl">{SITE.email}</p>
                  <p className="mt-1 text-sm text-muted-foreground">For documents and detailed briefs</p>
                </div>
              </div>
            </a>

            <div className="glass rounded-3xl p-6">
              <div className="flex items-start gap-4">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-[color:var(--gold)]/10 text-gold">
                  <MapPin className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-xs uppercase tracking-[0.22em] text-gold">Chambers</p>
                  <p className="mt-1 font-display text-xl">{SITE.address}</p>
                  <p className="mt-2 inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" /> By appointment only
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="reveal reveal-delay-2">
            <div className="glass-strong rounded-[2rem] p-7 md:p-9">
              <SectionEyebrow>Send an enquiry</SectionEyebrow>
              <h2 className="mt-3 font-display text-3xl">Tell us about your matter</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                We'll review your message and respond personally — typically within one working day.
              </p>

              {sent ? (
                <div className="mt-8 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-6">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-6 w-6 shrink-0 text-emerald-400" />
                    <div>
                      <p className="font-display text-lg">Message ready</p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        WhatsApp has opened in a new tab with your message pre-filled. Tap send to deliver it to the chambers.
                      </p>
                      <button
                        type="button"
                        onClick={() => setSent(false)}
                        className="mt-4 text-sm story-link text-gold"
                      >
                        Send another enquiry
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <form onSubmit={onSubmit} className="mt-6 space-y-4" noValidate>
                  {/* Honeypot — hidden from users */}
                  <input
                    type="text"
                    name="company"
                    tabIndex={-1}
                    autoComplete="off"
                    className="hidden"
                    aria-hidden
                  />

                  <Field label="Full name" name="name" error={errors.name} required>
                    <input name="name" autoComplete="name" className={inputCls} placeholder="Your full name" maxLength={100} />
                  </Field>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="Email" name="email" error={errors.email} required>
                      <input
                        name="email"
                        type="email"
                        autoComplete="email"
                        className={inputCls}
                        placeholder="you@example.com"
                        maxLength={255}
                      />
                    </Field>
                    <Field label="Phone" name="phone" error={errors.phone} required>
                      <input
                        name="phone"
                        type="tel"
                        autoComplete="tel"
                        className={inputCls}
                        placeholder="+91 …"
                        maxLength={20}
                      />
                    </Field>
                  </div>

                  <Field label="Matter type" name="matter" error={errors.matter} required>
                    <select name="matter" defaultValue="" className={inputCls}>
                      <option value="" disabled>Select…</option>
                      {MATTERS.map((m) => (
                        <option key={m} value={m} className="bg-[color:var(--surface)]">
                          {m}
                        </option>
                      ))}
                    </select>
                  </Field>

                  <Field label="Brief description" name="message" error={errors.message} required>
                    <textarea
                      name="message"
                      rows={5}
                      maxLength={1000}
                      className={`${inputCls} resize-none`}
                      placeholder="Share the key facts — court / forum if known, dates, and what outcome you're seeking."
                    />
                  </Field>

                  <p className="text-[11px] leading-relaxed text-muted-foreground">
                    By submitting, you consent to the chambers contacting you about your enquiry. Your details will be handed off to WhatsApp pre-filled — no data is stored on this site.
                  </p>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="gold-glow inline-flex w-full items-center justify-center gap-2 rounded-full bg-gold py-3.5 text-sm font-semibold text-[color:var(--primary-foreground)] disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto sm:px-8"
                  >
                    {submitting ? (
                      <>
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-[color:var(--primary-foreground)]/30 border-t-[color:var(--primary-foreground)]" />
                        Preparing…
                      </>
                    ) : (
                      <>
                        Send via WhatsApp <Send className="h-4 w-4" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <section className="pb-16">
        <div className="mx-auto grid max-w-6xl gap-3 px-4 sm:grid-cols-3">
          {[
            { icon: ShieldCheck, t: "Strict confidentiality", d: "All consultations covered by attorney-client privilege." },
            { icon: Award, t: "Apex-court credentials", d: "Advocate-on-Record at the Supreme Court of India." },
            { icon: Clock, t: "Response within a day", d: "Most enquiries answered the same working day." },
          ].map((f) => (
            <div key={f.t} className="reveal glass rounded-2xl p-5">
              <div className="flex items-start gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-[color:var(--gold)]/10 text-gold">
                  <f.icon className="h-4 w-4" />
                </span>
                <div>
                  <p className="font-display text-base">{f.t}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{f.d}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Map */}
      <section className="pb-24">
        <div className="mx-auto max-w-6xl px-4">
          <div className="reveal glass overflow-hidden rounded-3xl">
            <iframe
              title="Chambers location · District Court Faridabad"
              src="https://www.google.com/maps?q=District+Court+Sector+12+Faridabad&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-[360px] w-full border-0"
            />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="pb-32">
        <div className="mx-auto max-w-3xl px-4">
          <div className="reveal mb-10 text-center">
            <SectionEyebrow>Frequently asked</SectionEyebrow>
            <h2 className="mt-4 font-display text-3xl md:text-4xl">
              Before you <span className="text-gold">reach out.</span>
            </h2>
          </div>
          <div className="space-y-3">
            {[
              { q: "Is the first consultation free?", a: "Yes — the first 20-minute call is complimentary so we can understand your matter and outline next steps." },
              { q: "Do you handle matters outside Faridabad?", a: "Yes. The chambers regularly appears across Delhi-NCR, the Punjab & Haryana High Court and the Supreme Court of India." },
              { q: "How do you charge?", a: "Engagement letters are signed before any work begins, with a clear scope and transparent fee structure — fixed, hourly or milestone based depending on the matter." },
              { q: "Is my information confidential?", a: "Absolutely. All communications and documents are protected by attorney-client privilege and handled with strict discretion." },
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
    </>
  );
}

const inputCls =
  "w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-[color:var(--gold)]/50 focus:outline-none focus:ring-2 focus:ring-[color:var(--ring)]";

function Field({
  label, name, error, required, children,
}: { label: string; name: string; error?: string; required?: boolean; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs uppercase tracking-[0.18em] text-muted-foreground">
        {label}{required && <span className="text-gold"> *</span>}
      </span>
      {children}
      {error && <span className="mt-1 block text-xs text-destructive">{error}</span>}
      <input type="hidden" name={`__${name}_marker`} />
    </label>
  );
}
