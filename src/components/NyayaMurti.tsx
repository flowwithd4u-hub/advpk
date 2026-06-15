import { useEffect, useRef, useState } from "react";
import statueUrl from "@/assets/nyaya-murti.webp";

export interface NyayaMurtiProps {
  parallaxRotateY?: number;
  parallaxRotateX?: number;
  parallaxShiftX?: number;
  glowShift?: number;
  scrollRise?: number;
  scrollRotate?: number;
  smoothing?: number;
  scrollSmoothing?: number;
}

/**
 * Nyaya Murti — AI-generated Lady Justice statue with cinematic backdrop:
 * radiant god-rays, layered halos, soft pedestal glow, and cursor-driven
 * parallax. Scroll & mousemove are coalesced into a single rAF loop.
 */
export function NyayaMurti({
  parallaxRotateY = 8,
  parallaxRotateX = 6,
  parallaxShiftX = 10,
  glowShift = 24,
  scrollRise = -28,
  scrollRotate = 2,
  smoothing,
  scrollSmoothing,
}: NyayaMurtiProps = {}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const raysRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [lite, setLite] = useState(false);
  const state = useRef({ mx: 0, my: 0, sy: 0, tx: 0, ty: 0, ts: 0 });

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    // Heuristics: low memory, few cores, or save-data => lite mode (static image).
    const nav = navigator as Navigator & { deviceMemory?: number; connection?: { saveData?: boolean } };
    const lowMem = typeof nav.deviceMemory === "number" && nav.deviceMemory <= 2;
    const lowCpu = typeof navigator.hardwareConcurrency === "number" && navigator.hardwareConcurrency <= 2;
    const saveData = !!nav.connection?.saveData;
    const liteMode = reduced || lowMem || lowCpu || saveData;
    if (liteMode) {
      setLite(true);
      return;
    }

    let raf = 0;

    const lerpPos = smoothing ?? (coarse ? 0.14 : 0.08);
    const lerpScroll = scrollSmoothing ?? (coarse ? 0.16 : 0.08);
    const damp = reduced ? 0.25 : 1;
    const rY = parallaxRotateY * damp;
    const rX = parallaxRotateX * damp;
    const sX = parallaxShiftX * damp;
    const gS = glowShift * damp;
    const sR = scrollRise * damp;
    const sRot = scrollRotate * damp;

    const onMove = (e: MouseEvent) => {
      const el = wrapRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      state.current.mx = Math.max(-1, Math.min(1, (e.clientX - cx) / (r.width / 2)));
      state.current.my = Math.max(-1, Math.min(1, (e.clientY - cy) / (r.height / 2)));
    };

    const computeScroll = () => {
      const el = wrapRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      const progress = (vh / 2 - (r.top + r.height / 2)) / (vh / 2 + r.height / 2);
      state.current.sy = Math.max(-1, Math.min(1, progress));
    };

    let scrollScheduled = false;
    const onScroll = () => {
      if (scrollScheduled) return;
      scrollScheduled = true;
      requestAnimationFrame(() => {
        computeScroll();
        scrollScheduled = false;
      });
    };

    const tick = () => {
      state.current.tx += (state.current.mx - state.current.tx) * lerpPos;
      state.current.ty += (state.current.my - state.current.ty) * lerpPos;
      state.current.ts += (state.current.sy - state.current.ts) * lerpScroll;

      const { tx, ty, ts } = state.current;
      if (imgRef.current) {
        const rotY = tx * rY;
        const rotX = -ty * rX;
        const tyPx = ts * sR;
        const scrollRotDeg = ts * sRot;
        imgRef.current.style.transform = `perspective(1200px) translate3d(${tx * sX}px, ${tyPx}px, 0) rotateX(${rotX}deg) rotateY(${rotY + scrollRotDeg}deg)`;
      }
      if (glowRef.current) {
        glowRef.current.style.transform = `translate3d(${tx * gS}px, ${ty * (gS * 0.75)}px, 0)`;
        glowRef.current.style.opacity = String(0.55 + Math.abs(ts) * 0.25);
      }
      if (raysRef.current) {
        raysRef.current.style.transform = `translate(-50%, -50%) rotate(${tx * 6}deg)`;
      }
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    computeScroll();
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [parallaxRotateY, parallaxRotateX, parallaxShiftX, glowShift, scrollRise, scrollRotate, smoothing, scrollSmoothing]);

  return (
    <div
      ref={wrapRef}
      className="relative h-full w-full overflow-hidden rounded-[2rem]"
      style={{ perspective: "1200px" }}
    >
      {/* Layered backdrop — vignette + warm wash */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 30%, oklch(0.82 0.14 85 / 0.28), transparent 60%), radial-gradient(ellipse at 50% 100%, oklch(0.13 0.005 270) 0%, transparent 60%), linear-gradient(160deg, oklch(0.18 0.01 270 / 0.7), oklch(0.12 0.005 270 / 0.4))",
        }}
      />

      {!lite && (
        <>
          {/* Animated god-rays — slow rotation, conic gradient */}
          <div
            ref={raysRef}
            aria-hidden
            className="nyaya-rays pointer-events-none absolute left-1/2 top-1/2 h-[140%] w-[140%]"
          />

          {/* Soft cursor-tracking glow */}
          <div
            ref={glowRef}
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-1/2 h-[72%] w-[72%] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
            style={{
              background: "radial-gradient(circle, oklch(0.82 0.14 85 / 0.42), transparent 70%)",
              transition: "opacity 0.6s ease",
            }}
          />

          {/* Concentric halos */}
          <div aria-hidden className="pointer-events-none absolute left-1/2 top-1/2 h-[92%] w-[92%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[color:var(--gold)]/15" />
          <div aria-hidden className="pointer-events-none absolute left-1/2 top-1/2 h-[70%] w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[color:var(--gold)]/10" />
          <div aria-hidden className="pointer-events-none absolute left-1/2 top-1/2 h-[48%] w-[48%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[color:var(--gold)]/8" />

          {/* Pedestal — gold disc + cast shadow */}
          <div
            aria-hidden
            className="pointer-events-none absolute bottom-[8%] left-1/2 h-[18px] w-[58%] -translate-x-1/2 rounded-[50%] blur-md"
            style={{ background: "radial-gradient(ellipse, oklch(0.82 0.14 85 / 0.35), transparent 70%)" }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute bottom-[5%] left-1/2 h-[10px] w-[66%] -translate-x-1/2 rounded-[50%] blur-2xl"
            style={{ background: "oklch(0 0 0 / 0.75)" }}
          />

          {/* Floating particles */}
          <div className="nyaya-particles pointer-events-none absolute inset-0" aria-hidden>
            <span /><span /><span /><span /><span /><span />
          </div>
        </>
      )}

      <img
        ref={imgRef}
        src={statueUrl}
        alt="Nyaya Murti — Statue of Lady Justice holding scales and sword"
        width={1024}
        height={1024}
        loading="eager"
        decoding="async"
        // @ts-expect-error - valid HTML attribute
        fetchPriority="high"
        onLoad={() => setLoaded(true)}
        className={`relative z-10 mx-auto h-full w-auto max-w-full select-none object-contain transition-opacity duration-700 ${
          lite ? "" : "animate-float"
        } ${loaded ? "opacity-100" : "opacity-0"}`}
        style={{
          filter: lite
            ? "drop-shadow(0 18px 24px oklch(0 0 0 / 0.55))"
            : "drop-shadow(0 30px 40px oklch(0 0 0 / 0.6)) drop-shadow(0 0 40px oklch(0.82 0.14 85 / 0.35))",
          transformStyle: "preserve-3d",
          willChange: lite ? "auto" : "transform",
        }}
        draggable={false}
      />
    </div>
  );
}

export default NyayaMurti;
