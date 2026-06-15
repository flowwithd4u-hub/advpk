import { Moon, Sun } from "lucide-react";
import { useTheme } from "./ThemeProvider";

export function ThemeToggle({ className = "" }: { className?: string }) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Light mode" : "Dark mode"}
      className={`relative grid h-10 w-10 place-items-center rounded-full glass border border-white/10 text-foreground/80 transition-all duration-300 hover:text-gold hover:border-[color:var(--gold)]/40 hover:shadow-[0_0_20px_-4px_oklch(0.82_0.14_85_/_0.45)] ${className}`}
    >
      <Sun
        className={`absolute h-4.5 w-4.5 transition-all duration-500 ${
          isDark ? "rotate-90 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100"
        }`}
        style={{ width: "1.125rem", height: "1.125rem" }}
      />
      <Moon
        className={`absolute h-4.5 w-4.5 transition-all duration-500 ${
          isDark ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-0 opacity-0"
        }`}
        style={{ width: "1.125rem", height: "1.125rem" }}
      />
    </button>
  );
}
