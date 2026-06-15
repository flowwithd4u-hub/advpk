import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import { useEffect } from "react";

import appCss from "../styles.css?url";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CustomCursor } from "@/components/CustomCursor";
import { SmoothScroll } from "@/components/SmoothScroll";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { PageTransition } from "@/components/PageTransition";
import { FloatingActions } from "@/components/FloatingActions";
import { Disclaimer } from "@/components/Disclaimer";

import { ThemeProvider } from "@/components/ThemeProvider";
import { trackEvent } from "@/lib/analytics";

const themeInitScript = `(function(){try{var r=document.documentElement;r.classList.remove('light');r.classList.add('dark');r.style.colorScheme='dark';}catch(e){document.documentElement.classList.add('dark');}})();`;

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
      <p className="font-display text-[8rem] leading-none text-gold">404</p>
      <h1 className="mt-2 font-display text-2xl">Page not found</h1>
      <p className="mt-2 max-w-md text-center text-sm text-muted-foreground">
        The page you're looking for has been moved or doesn't exist.
      </p>
      <Link
        to="/"
        className="mt-6 inline-flex rounded-full bg-gold px-5 py-2.5 text-sm font-medium text-[color:var(--primary-foreground)] gold-glow"
      >
        Return Home
      </Link>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "theme-color", content: "#0A0A0A" },
      { title: "Advocate Prabhat Kaushik · Advocate-on-Record, Supreme Court of India" },
      {
        name: "description",
        content:
          "Chambers of Advocate Prabhat Kaushik — Advocate-on-Record at the Supreme Court of India, based in Faridabad. Counsel in criminal, family, property, commercial and constitutional matters.",
      },
      { name: "author", content: "Advocate Prabhat Kaushik" },
      { name: "robots", content: "index, follow" },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "en_IN" },
      { property: "og:site_name", content: "Advocate Prabhat Kaushik" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600;700&family=Inter:wght@400;500;600&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  // Global click delegator: any element with data-track="event_name" is auto-logged.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const el = (e.target as HTMLElement | null)?.closest?.("[data-track]");
      if (!el) return;
      const name = el.getAttribute("data-track") || "click";
      let props: Record<string, unknown> = {};
      try {
        const raw = el.getAttribute("data-track-props");
        if (raw) props = JSON.parse(raw);
      } catch {
        /* ignore */
      }
      trackEvent(name, props as Record<string, string | number | boolean | undefined>);
    };
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true } as AddEventListenerOptions);
  }, []);

  return (
    <ThemeProvider>
      <Disclaimer />
      <SmoothScroll />
      <CustomCursor />
      <RevealOnScroll />
      <Navbar />
      <PageTransition>
        <main className="min-h-screen pb-20 md:pb-0">
          <Outlet />
        </main>
        <Footer />
      </PageTransition>
      
      <FloatingActions />
    </ThemeProvider>
  );
}
