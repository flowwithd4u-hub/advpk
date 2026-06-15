import { Link } from "@tanstack/react-router";
import { Mail, MapPin, Phone } from "lucide-react";
import { SITE } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-[color:var(--surface)]/40 py-14">
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid gap-10 md:grid-cols-4">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-gold text-[color:var(--primary-foreground)] font-display text-lg font-bold">
                P
              </span>
              <span className="font-display text-lg">Prabhat Kaushik</span>
            </div>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Advocate-on-Record at the Supreme Court of India. Trusted counsel for clients across Faridabad, Delhi-NCR and India.
            </p>
          </div>

          <div>
            <h4 className="font-display text-sm uppercase tracking-[0.18em] text-gold">Practice</h4>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li><Link to="/practice" className="story-link">Supreme Court Litigation</Link></li>
              <li><Link to="/practice" className="story-link">Criminal Defence</Link></li>
              <li><Link to="/practice" className="story-link">Family & Matrimonial</Link></li>
              <li><Link to="/practice" className="story-link">Property & RERA</Link></li>
              <li><Link to="/practice" className="story-link">Commercial Disputes</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-sm uppercase tracking-[0.18em] text-gold">Firm</h4>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li><Link to="/about" className="story-link">About the Advocate</Link></li>
              <li><Link to="/blog" className="story-link">Legal Insights</Link></li>
              <li><Link to="/contact" className="story-link">Book a Consultation</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-sm uppercase tracking-[0.18em] text-gold">Chambers</h4>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                <span>{SITE.address}</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                <a href={SITE.phoneHref} className="story-link">{SITE.phone}</a>
              </li>
              <li className="flex items-start gap-2.5">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                <a href={`mailto:${SITE.email}`} className="story-link break-all">{SITE.email}</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-3 border-t border-white/5 pt-6 text-xs text-muted-foreground md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} Chambers of Advocate Prabhat Kaushik. All rights reserved.</p>
          <p className="max-w-xl text-right">
            Bar Council of India rules prohibit advertisement & solicitation. The information here is for general awareness only and does not constitute legal advice.
          </p>
        </div>
      </div>
    </footer>
  );
}
