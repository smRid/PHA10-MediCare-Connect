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
    >
      <Moon className="size-4 dark:hidden" />
      <Sun className="hidden size-4 dark:block" />
    </Button>
  );
}
