/**
 * Lightweight client-side event logger.
 *
 * - Forwards to window.gtag / window.dataLayer when available (GA4, GTM).
 * - Always emits a CustomEvent ('pk:track') so other listeners can hook in.
 * - Falls back to console.debug in dev.
 *
 * Designed to be tiny, dependency-free and safe to call in SSR.
 */

export type TrackProps = Record<string, string | number | boolean | undefined>;

type GtagFn = (command: "event", name: string, params?: TrackProps) => void;
type DataLayerEntry = { event: string } & TrackProps;

declare global {
  interface Window {
    gtag?: GtagFn;
    dataLayer?: DataLayerEntry[];
  }
}

export function trackEvent(name: string, props: TrackProps = {}) {
  if (typeof window === "undefined") return;
  const payload: TrackProps = {
    ts: Date.now(),
    path: window.location?.pathname,
    ...props,
  };

  try {
    window.gtag?.("event", name, payload);
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: name, ...payload });
    window.dispatchEvent(new CustomEvent("pk:track", { detail: { name, ...payload } }));
    if (import.meta.env?.DEV) {
      // eslint-disable-next-line no-console
      console.debug("[analytics]", name, payload);
    }
  } catch {
    // never let analytics throw
  }
}

/** Attribute helper to mark CTAs that should auto-track on click. */
export const trackAttr = (name: string, props: TrackProps = {}) => ({
  "data-track": name,
  "data-track-props": JSON.stringify(props),
});
