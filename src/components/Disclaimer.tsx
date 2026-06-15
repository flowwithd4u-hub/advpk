import { useState } from "react";
import { Scale, ShieldCheck, AlertTriangle } from "lucide-react";

export function Disclaimer() {
  const [accepted, setAccepted] = useState(false);

  if (accepted) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[color:var(--scrim-strong)] p-4 backdrop-blur-sm">
      <div className="glass-strong relative w-full max-w-2xl overflow-hidden rounded-3xl border border-[oklch(0.82_0.14_85/0.25)] p-8 md:p-10 shadow-2xl">
        {/* Decorative top accent */}
        <div className="absolute inset-x-0 top-0 h-1 bg-[var(--gradient-gold)]" />

        {/* Header */}
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[oklch(0.82_0.14_85/0.35)] bg-[var(--surface)] text-[var(--gold)]">
            <Scale className="h-5 w-5" />
          </div>
          <div>
            <h2 className="font-display text-2xl font-semibold tracking-tight text-[var(--foreground)]">
              Important Disclaimer
            </h2>
            <p className="text-xs text-[var(--muted-foreground)]">
              Please read carefully before proceeding
            </p>
          </div>
        </div>

        {/* Body */}
        <div className="prose-legal space-y-4 text-sm leading-relaxed text-[oklch(0.85_0.01_270)]">
          <div className="flex items-start gap-3 rounded-2xl border border-[oklch(0.82_0.14_85/0.15)] bg-[oklch(0.82_0.14_85/0.05)] p-4">
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

          <div className="flex items-start gap-2 rounded-xl border border-[oklch(0.82_0.14_85/0.12)] p-3 text-xs text-[var(--muted-foreground)]">
            <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-[var(--gold)]" />
            <p>
              While reasonable efforts are made to ensure that the information presented is accurate and up to date, no warranty, express or implied, is given regarding the completeness, accuracy, reliability, or suitability of the content. Visitors are advised to seek independent legal advice before acting upon any information contained herein.
            </p>

            <p>By proceeding beyond this page, you acknowledge and confirm that:

              • You are seeking information about Advocate Prabhat Kaushik and his Chambers on your own accord.

              • There has been no form of solicitation, advertisement, personal communication, invitation, or inducement by Advocate Prabhat Kaushik or his Chambers.</p>
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <a
            href="https://www.google.com"
            className="inline-flex items-center justify-center rounded-full border border-[oklch(0.82_0.14_85/0.25)] bg-transparent px-6 py-3 text-sm font-medium text-[var(--foreground)] transition-all hover:bg-[var(--surface-2)] hover:border-[oklch(0.82_0.14_85/0.4)]"
          >
            I Disagree — Leave Site
          </a>
          <button
            onClick={() => setAccepted(true)}
            className="inline-flex items-center justify-center rounded-full bg-gold px-6 py-3 text-sm font-semibold text-[color:var(--primary-foreground)] gold-glow"
          >
            <ShieldCheck className="mr-2 h-4 w-4" />
            I Agree — Enter Site
          </button>
        </div>
      </div>
    </div>
  );
}
