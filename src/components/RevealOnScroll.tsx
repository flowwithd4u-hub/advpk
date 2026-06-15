import { useEffect } from "react";
import { useRouterState } from "@tanstack/react-router";

/**
 * Scans the DOM for `.reveal` elements and toggles `.is-visible`
 * when they enter the viewport. Re-runs on route changes.
 */
export function RevealOnScroll() {
  const location = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    if (typeof window === "undefined") return;
    const els = document.querySelectorAll<HTMLElement>(".reveal");
    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("is-visible"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Trigger as soon as any portion enters, OR if element is already
          // (partially) on screen on a fast scroll / initial load.
          if (entry.isIntersecting || entry.intersectionRatio > 0) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      {
        // Multiple thresholds so fast scrolls still fire a callback
        // before the element passes through the viewport.
        threshold: [0, 0.01, 0.1],
        // Start ~10% before the element enters so content is ready
        // by the time the user actually sees it.
        rootMargin: "0px 0px -10% 0px",
      }
    );
    els.forEach((el) => {
      // Safety net: if element is already in view on mount, reveal immediately.
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        el.classList.add("is-visible");
        return;
      }
      io.observe(el);
    });
    return () => io.disconnect();
  }, [location]);

  return null;
}
