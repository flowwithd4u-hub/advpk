import { useEffect, useRef, useState } from "react";

/**
 * iOS-inspired custom cursor: gold dot + lerp-trailed ring.
 * - Dot is rAF-smoothed (no per-event transform writes) to prevent jitter
 *   over WebGL canvases, iframes, or rapidly re-rendering regions.
 * - Hover targets ([data-cursor="hover"], a, button) expand the ring.
 * - Regions marked [data-cursor="none"] temporarily hide the cursor.
 * - Disabled on touch devices.
 */
export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const target = useRef({ x: -100, y: -100 });
  const dot = useRef({ x: -100, y: -100 });
  const ring = useRef({ x: -100, y: -100 });
  const [enabled, setEnabled] = useState(false);
  const [hover, setHover] = useState(false);
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    setEnabled(mq.matches);
    const onChange = () => setEnabled(mq.matches);
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    let raf = 0;

    const move = (e: MouseEvent) => {
      target.current.x = e.clientX;
      target.current.y = e.clientY;
      if (hidden) setHidden(false);
    };

    const leave = () => setHidden(true);
    const enter = () => setHidden(false);

    const tick = () => {
      // Dot: tight follow (fast lerp) — prevents visible jitter when the
      // underlying element re-renders (e.g. WebGL canvases).
      dot.current.x += (target.current.x - dot.current.x) * 0.55;
      dot.current.y += (target.current.y - dot.current.y) * 0.55;
      // Ring: softer trailing follow
      ring.current.x += (target.current.x - ring.current.x) * 0.18;
      ring.current.y += (target.current.y - ring.current.y) * 0.18;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${dot.current.x - 4}px, ${dot.current.y - 4}px, 0)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.current.x - 18}px, ${ring.current.y - 18}px, 0)`;
      }
      raf = requestAnimationFrame(tick);
    };

    const over = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null;
      if (!t) return;
      // Hide cursor when over explicit no-cursor zones (e.g. video, iframe, canvas)
      const noCursor = !!t.closest('[data-cursor="none"], iframe, video');
      setHidden(noCursor);
      if (noCursor) return;
      const isHover = !!t.closest(
        'a, button, [role="button"], input, textarea, select, [data-cursor="hover"]'
      );
      setHover(isHover);
    };

    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("mouseover", over, { passive: true });
    document.addEventListener("mouseleave", leave);
    document.addEventListener("mouseenter", enter);
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
      document.removeEventListener("mouseleave", leave);
      document.removeEventListener("mouseenter", enter);
      cancelAnimationFrame(raf);
    };
  }, [enabled, hidden]);

  if (!enabled) return null;

  const opacity = hidden ? 0 : 1;

  return (
    <>
      <div
        ref={dotRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-2 w-2 rounded-full bg-gold mix-blend-difference"
        style={{ opacity, transition: "opacity 0.2s ease" }}
      />
      <div
        ref={ringRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[9998] rounded-full border border-[color:var(--gold)]/70"
        style={{
          opacity,
          transition:
            "width 0.25s ease, height 0.25s ease, background-color 0.25s ease, border-color 0.25s ease, opacity 0.2s ease",
          width: hover ? 56 : 36,
          height: hover ? 56 : 36,
          marginLeft: hover ? -10 : 0,
          marginTop: hover ? -10 : 0,
          background: hover ? "oklch(0.82 0.14 85 / 0.12)" : "transparent",
          boxShadow: hover ? "0 0 24px -4px oklch(0.82 0.14 85 / 0.6)" : "none",
        }}
      />
    </>
  );
}
