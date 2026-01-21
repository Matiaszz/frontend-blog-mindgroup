import { useTheme } from "../../hooks/useTheme";

export function ThemeToogle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="px-4 py-2 rounded-lg border 
                 bg-gray-200 text-gray-900
                 dark:bg-gray-800 dark:text-gray-100
                 dark:border-gray-700
                 transition"
    >
      {theme === "dark" ? "🌙 Dark" : "☀️ Light"}
    </button>
  );
}
