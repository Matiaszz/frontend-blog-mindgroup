import { useEffect, useState } from "react";

type Theme = "light" | "dark";

export function useTheme() {
  const [theme, setTheme] = useState<Theme>("light");
  const bgVar = 'var(--bg)'
  const textVar = 'var(--text)';
  const bgClass = `bg-[var(--bg)]`;
  const textClass = `text-[var(--text)]`;
  const mutedVar = 'var(--muted)';
  const primaryColorVar = 'var(--primary)';
  const borderClass = 'border-[var(--muted)]';

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () =>
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));

  return { theme, toggleTheme, 
    classes: {
        bgClass, 
        textClass,
        borderClass
    }, 
    vars: {
        bgVar,
        textVar,
        mutedVar,
        primaryColorVar
    }
  };
}
