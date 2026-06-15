import { Phone, MessageCircle } from "lucide-react";
import { SITE, whatsappLink } from "@/lib/site";
import { trackAttr } from "@/lib/analytics";

/** Sticky mobile call button + floating WhatsApp button (all viewports). */
export function FloatingActions() {
  return (
    <>
      <a
        href={whatsappLink()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        {...trackAttr("whatsapp_handoff", { source: "floating_button" })}
        className="fixed bottom-6 right-6 z-40 grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-[0_10px_30px_-5px_rgba(37,211,102,0.55)] ring-1 ring-[color:var(--hairline)] transition-transform hover:scale-110"
        data-cursor="hover"
      >
        <MessageCircle className="h-6 w-6" />
        <span className="absolute -top-1 -right-1 h-3 w-3 animate-ping rounded-full bg-[#25D366]" />
      </a>

      {/* Sticky mobile call bar */}
      <a
        href={SITE.phoneHref}
        {...trackAttr("call_chambers", { source: "sticky_mobile" })}
        className="fixed inset-x-0 bottom-0 z-40 flex items-center justify-center gap-2 bg-gold px-4 py-3 font-medium text-[color:var(--primary-foreground)] shadow-[0_-10px_30px_-10px_rgba(0,0,0,0.6)] md:hidden"
      >
        <Phone className="h-4 w-4" />
        Call Chambers Now
      </a>
    </>
  );
}
