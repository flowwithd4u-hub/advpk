import { useEffect, useState } from "react";
import { Scale, ShieldCheck, AlertTriangle } from "lucide-react";

export function Disclaimer() {
  const [accepted, setAccepted] = useState(false);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  if (accepted) return null;

  return (
    <div className="fixed inset-0 z-[100] flex min-h-screen items-center justify-center bg-[color:var(--scrim-strong)] px-4 py-6 backdrop-blur-sm">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="disclaimer-title"
        aria-describedby="disclaimer-description"
        className="glass-strong relative w-full max-w-xl overflow-hidden rounded-[2rem] border border-[oklch(0.82_0.14_85/0.25)] p-5 shadow-2xl sm:p-6 md:max-w-3xl md:p-8"
      >
        {/* Decorative top accent */}
        <div className="absolute inset-x-0 top-0 h-1 bg-[var(--gradient-gold)]" />

        {/* Header */}
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[oklch(0.82_0.14_85/0.35)] bg-[var(--surface)] text-[var(--gold)]">
            <Scale className="h-5 w-5" />
          </div>
          <div>
            <h2 id="disclaimer-title" className="font-display text-xl font-semibold tracking-tight text-[var(--foreground)] sm:text-2xl">
              Important Disclaimer
            </h2>
            <p className="text-xs text-[var(--muted-foreground)] sm:text-sm">
              Please read carefully before proceeding.
            </p>
          </div>
        </div>

        {/* Body */}
        <div id="disclaimer-description" className="prose-legal max-h-[calc(100vh-18rem)] space-y-5 overflow-y-auto pr-1 text-sm leading-relaxed text-[oklch(0.85_0.01_270)] md:text-base">
          <div className="flex flex-col gap-3 rounded-2xl border border-[oklch(0.82_0.14_85/0.15)] bg-[oklch(0.82_0.14_85/0.05)] p-4 sm:flex-row sm:items-start">
            <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-[var(--gold)]" />
            <p>
              As per the rules of the Bar Council of India, advocates are prohibited from soliciting work or advertising their services. This website has been created solely for informational purposes and is not intended to advertise, solicit, invite, or induce any person to engage the legal services of Advocate Prabhat Kaushik or his Chambers.
            </p>
          </div>

          <p>
            The content available on this website is provided only to offer general information about the professional background, areas of practice, experience, and legal developments. Nothing contained on this website should be construed as legal advice, legal opinion, or a substitute for professional legal consultation.
          </p>

          <p>
            The transmission, receipt, or use of this website, including any communication through contact forms, email, telephone, or other means, does not create an advocate-client relationship. Such a relationship shall arise only upon the execution of a formal engagement and acceptance of instructions by the Chambers.
          </p>

          <div className="flex flex-col gap-3 rounded-xl border border-[oklch(0.82_0.14_85/0.12)] p-4 text-xs text-[var(--muted-foreground)] sm:text-sm">
            <div className="flex items-start gap-2">
              <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-[var(--gold)]" />
              <p>
                While reasonable efforts are made to ensure that the information presented is accurate and up to date, no warranty, express or implied, is given regarding the completeness, accuracy, reliability, or suitability of the content. Visitors are advised to seek independent legal advice before acting upon any information contained herein.
              </p>
            </div>

            <div className="space-y-2">
              <p className="font-semibold text-[var(--foreground)]">By proceeding beyond this page, you acknowledge and confirm that:</p>
              <ul className="list-inside list-disc space-y-1 text-[var(--muted-foreground)]">
                <li>You are seeking information about Advocate Prabhat Kaushik and his Chambers on your own accord.</li>
                <li>There has been no form of solicitation, advertisement, personal communication, invitation, or inducement by Advocate Prabhat Kaushik or his Chambers.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
          <a
            href="https://www.google.com"
            className="inline-flex w-full items-center justify-center rounded-full border border-[oklch(0.82_0.14_85/0.25)] bg-transparent px-4 py-3 text-sm font-medium text-[var(--foreground)] transition-all hover:bg-[var(--surface-2)] hover:border-[oklch(0.82_0.14_85/0.4)] sm:w-auto"
          >
            I Disagree — Leave Site
          </a>
          <button
            type="button"
            onClick={() => setAccepted(true)}
            className="inline-flex w-full items-center justify-center rounded-full bg-gold px-4 py-3 text-sm font-semibold text-[color:var(--primary-foreground)] gold-glow sm:w-auto"
          >
            <ShieldCheck className="mr-2 h-4 w-4" />
            I Agree — Enter Site
          </button>
        </div>
      </div>
    </div>
  );
}
