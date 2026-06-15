import { useEffect, type ReactNode } from "react";

// Theme switching has been removed. The app is locked to the dark theme.
export function ThemeProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    if (typeof document === "undefined") return;
    const root = document.documentElement;
    root.classList.remove("light");
    root.classList.add("dark");
    root.style.colorScheme = "dark";
    try {
      window.localStorage.removeItem("pk-theme");
    } catch {
      // ignore
    }
  }, []);

  return <>{children}</>;
}

export function useTheme() {
  return { theme: "dark" as const, toggleTheme: () => {}, setTheme: () => {} };
}
