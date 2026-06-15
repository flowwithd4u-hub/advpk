import { useEffect, useState, type ReactNode } from "react";
import { useRouterState } from "@tanstack/react-router";

/** Fades + un-blurs page content on every route change. */
export function PageTransition({ children }: { children: ReactNode }) {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const [key, setKey] = useState(path);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    setVisible(false);
    const t = setTimeout(() => {
      setKey(path);
      setVisible(true);
      window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
    }, 180);
    return () => clearTimeout(t);
  }, [path]);

  return (
    <div
      key={key}
      style={{
        opacity: visible ? 1 : 0,
        filter: visible ? "blur(0px)" : "blur(8px)",
        transition: "opacity 0.5s cubic-bezier(0.22,1,0.36,1), filter 0.5s cubic-bezier(0.22,1,0.36,1)",
      }}
    >
      {children}
    </div>
  );
}
