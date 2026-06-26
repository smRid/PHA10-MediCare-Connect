"use client";

import { Moon, Sun } from "lucide-react";
import Button from "@/components/ui/Button";

const THEME_KEY = "medicare_theme";

function getCurrentTheme() {
  const root = document.documentElement;
  const theme = root.getAttribute("data-theme");

  if (theme === "dark" || theme === "light") return theme;
  return root.classList.contains("dark") ? "dark" : "light";
}

function applyTheme(theme) {
  const root = document.documentElement;
  root.setAttribute("data-theme", theme);
  root.classList.toggle("dark", theme === "dark");
  root.classList.toggle("light", theme === "light");
  root.style.colorScheme = theme;
}

export default function ThemeToggle() {
  const toggle = () => {
    const nextTheme = getCurrentTheme() === "dark" ? "light" : "dark";
    applyTheme(nextTheme);
    window.localStorage.setItem(THEME_KEY, nextTheme);
  };

  return (
    <Button
      aria-label="Toggle dark and light theme"
      variant="outline"
      size="icon"
      onClick={toggle}
      className="relative overflow-hidden transition-all duration-300 hover:ring-2 hover:ring-primary/20"
    >
      <Sun className="h-5 w-5 rotate-0 scale-100 transition-all duration-500 ease-in-out dark:-rotate-90 dark:scale-0 text-amber-500" />
      <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all duration-500 ease-in-out dark:rotate-0 dark:scale-100 text-sky-400" />
    </Button>
  );
}
