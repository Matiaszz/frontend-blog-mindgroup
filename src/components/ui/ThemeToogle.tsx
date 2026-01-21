import { Moon, Sun } from "lucide-react";
import { useTheme } from "../../hooks/useTheme";

export function ThemeToogle() {
  const { theme, toggleTheme, classes } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={(
        `px-4 py-2 rounded-lg hover:cursor-pointer 
        ${theme === 'light' ? 'hover:text-yellow-600' : 'hover:text-blue-950'} 
        transition ${classes.textClass}`)}
    >
      {theme === "dark" ? (<Moon/>) : (<Sun/>)}
    </button>
  );
}
