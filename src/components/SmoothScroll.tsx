import { useEffect } from "react";

/**
 * Lightweight Lenis-style smooth scroll. Wheel events are intercepted and
 * scroll position is interpolated towards a target each frame.
 * Falls back to native scroll on touch devices and when prefers-reduced-motion.
 */
export function SmoothScroll() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    let target = window.scrollY;
    let current = window.scrollY;
    let raf = 0;
    let active = false;

    const tick = () => {
      current += (target - current) * 0.1;
      if (Math.abs(target - current) < 0.5) {
        current = target;
        active = false;
        window.scrollTo(0, current);
        return;
      }
      window.scrollTo(0, current);
      raf = requestAnimationFrame(tick);
    };

    const onWheel = (e: WheelEvent) => {
      if (e.ctrlKey) return; // allow pinch-zoom
      e.preventDefault();
      target = Math.max(
        0,
        Math.min(
          document.documentElement.scrollHeight - window.innerHeight,
          target + e.deltaY
        )
      );
      if (!active) {
        active = true;
        raf = requestAnimationFrame(tick);
      }
    };

    const onResize = () => {
      target = window.scrollY;
      current = window.scrollY;
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(raf);
    };
  }, []);

  return null;
}
