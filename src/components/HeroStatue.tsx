import { useEffect, useRef, useState } from "react";
import { MapPin, Scale, ShieldCheck, Star } from "lucide-react";
import { useLowMotion } from "@/hooks/use-low-motion";
import { ImageLightbox } from "@/components/ImageLightbox";
import chambersImg from "@/assets/about-chambers.jpg";

/**
 * Hero image (chambers) with cursor parallax + rich hover effects.
 * Theme-aware via design tokens; static fallback when reduced motion is on.
 */
export function HeroStatue() {
  const lowMotion = useLowMotion();
  const wrapRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [loaded, setLoaded] = useState(true);

  useEffect(() => {
    if (lowMotion) return;
    const wrap = wrapRef.current;
    const img = imgRef.current;
    if (!wrap || !img) return;

    let raf = 0;
    const target = { x: 0, y: 0 };
    const current = { x: 0, y: 0 };

    const onMove = (e: MouseEvent) => {
      const r = wrap.getBoundingClientRect();
      target.x = Math.max(-1, Math.min(1, (e.clientX - (r.left + r.width / 2)) / (r.width / 2)));
      target.y = Math.max(-1, Math.min(1, (e.clientY - (r.top + r.height / 2)) / (r.height / 2)));
    };

    const tick = () => {
      current.x += (target.x - current.x) * 0.08;
      current.y += (target.y - current.y) * 0.08;
      img.style.transform = `perspective(1200px) translate3d(${current.x * 8}px, ${current.y * 4}px, 0) rotateX(${-current.y * 3}deg) rotateY(${current.x * 4}deg)`;
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
      if (img) img.style.transform = "";
    };
  }, [lowMotion]);

  return (
    <div
      ref={wrapRef}
      data-cursor="none"
      className="relative mx-auto flex w-full max-w-[540px] items-center justify-center h-[min(72svh,480px)] sm:h-[min(76svh,540px)] md:h-[min(82svh,620px)] lg:h-[min(84svh,660px)]"
    >
      {/* Ambient gold backdrop + orbiting glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[2rem]"
        style={{
          background:
            "radial-gradient(ellipse at 50% 30%, oklch(0.82 0.14 85 / 0.22), transparent 60%), radial-gradient(ellipse at 50% 100%, color-mix(in oklab, var(--background) 90%, transparent) 0%, transparent 60%)",
        }}
      />
      {!lowMotion && (
        <div
          aria-hidden
          className="animate-float pointer-events-none absolute -right-6 -top-6 h-32 w-32 rounded-full opacity-60 blur-3xl"
          style={{ background: "var(--gradient-gold)" }}
        />
      )}

      <ImageLightbox
        src={chambersImg}
        alt="Chambers of Advocate Prabhat Kaushik in Faridabad"
        caption={<>Chambers of Advocate Prabhat Kaushik · Delhi-NCR · Supreme Court of India</>}
        className="relative z-10 h-auto w-auto"
      >
        <div className="hero-frame group relative h-full w-full overflow-hidden rounded-[2rem]">
          <img
            ref={imgRef}
            src={chambersImg}
            alt="Chambers of Advocate Prabhat Kaushik in Delhi-NCR"
            width={1024}
            height={1280}
            loading="eager"
            decoding="async"
            // @ts-expect-error - valid HTML attribute
            fetchPriority="high"
            onLoad={() => setLoaded(true)}
            draggable={false}
            className={`hero-img h-full w-full select-none object-cover transition-opacity duration-700 ${
              loaded ? "opacity-100" : "opacity-0"
            }`}
            style={{
              transformStyle: "preserve-3d",
              willChange: lowMotion ? "auto" : "transform",
            }}
          />

          {/* Bottom + top gradients */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, color-mix(in oklab, var(--background) 18%, transparent) 0%, transparent 22%, transparent 55%, color-mix(in oklab, var(--background) 92%, transparent) 100%)",
            }}
          />

          {/* Diagonal shine sweep on hover */}
          <span aria-hidden className="hero-shine pointer-events-none absolute inset-0" />

          

          {/* Verified ribbon — top right */}
          <div className="pointer-events-none absolute right-5 top-5 flex items-center gap-1.5 rounded-full border border-[color:var(--hairline)] bg-[color:var(--scrim)] px-2.5 py-1 text-[10px] uppercase tracking-[0.18em] text-foreground/85 backdrop-blur-md">
            <ShieldCheck className="h-3 w-3 text-gold" /> Advocate-On-Record
          </div>

          {/* Floating "12+ yrs" stat — right middle */}
          <div className="pointer-events-none absolute right-4 top-1/2 hidden -translate-y-1/2 sm:block">
            <div className="rounded-2xl border border-[color:var(--gold)]/30 bg-[color:var(--scrim-strong)] px-3.5 py-3 text-center backdrop-blur-md transition-all duration-500 group-hover:-translate-x-0.5 group-hover:border-[color:var(--gold)]/60">
              <p className="font-display text-2xl leading-none text-gold">20+</p>
              <p className="mt-1 text-[9px] uppercase tracking-[0.2em] text-muted-foreground">Yrs · Advocacy</p>
            </div>
          </div>

          {/* Bottom location + rating chip */}
          <div className="pointer-events-none absolute bottom-5 left-5 right-5 flex items-end justify-between gap-3">
            <div className="rounded-2xl border border-[color:var(--hairline)] bg-[color:var(--scrim-strong)] px-4 py-2.5 backdrop-blur-md transition-all duration-500 group-hover:border-[color:var(--gold)]/40">
              <p className="font-display text-base leading-tight text-foreground">Chambers · Supreme Court Of India</p>
              <p className="mt-0.5 inline-flex items-center gap-1 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                <MapPin className="h-2.5 w-2.5" /> Delhi-NCR · Pan-India
              </p>
            </div>
            <div className="hidden rounded-full border border-[color:var(--hairline)] bg-[color:var(--scrim)] px-3 py-1.5 backdrop-blur-md sm:flex sm:items-center sm:gap-1 text-[11px]">
              <Star className="h-3 w-3 fill-[color:var(--gold)] text-[color:var(--gold)]" />
              <span className="font-semibold text-foreground">4.9</span>
              <span className="text-muted-foreground">· 200+ clients</span>
            </div>
          </div>
        </div>
      </ImageLightbox>
    </div>
  );
}
