import { useEffect, useState } from "react";

/**
 * Returns true when the user prefers reduced motion OR is on a low-end device
 * (low memory, low CPU concurrency, save-data, or coarse pointer with <4 cores).
 *
 * Use to gate hero parallax, float animations, and other non-essential motion.
 */
export function useLowMotion(): boolean {
  const [low, setLow] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    const nav = navigator as Navigator & {
      deviceMemory?: number;
      connection?: { saveData?: boolean; effectiveType?: string };
    };

    const compute = () => {
      const reduced = !!mq?.matches;
      const lowMem = typeof nav.deviceMemory === "number" && nav.deviceMemory <= 2;
      const lowCpu =
        typeof navigator.hardwareConcurrency === "number" &&
        navigator.hardwareConcurrency <= 2;
      const saveData = !!nav.connection?.saveData;
      const slowNet =
        nav.connection?.effectiveType === "2g" ||
        nav.connection?.effectiveType === "slow-2g";
      setLow(reduced || lowMem || lowCpu || saveData || slowNet);
    };

    compute();
    mq?.addEventListener?.("change", compute);
    return () => mq?.removeEventListener?.("change", compute);
  }, []);

  return low;
}
