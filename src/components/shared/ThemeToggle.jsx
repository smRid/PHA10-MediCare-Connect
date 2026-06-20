"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import Button from "@/components/ui/Button";

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("medicare_theme");
    const shouldDark = saved
      ? saved === "dark"
      : window.matchMedia("(prefers-color-scheme: dark)").matches;
    document.documentElement.classList.toggle("dark", shouldDark);
    setDark(shouldDark);
  }, []);

  const toggle = () => {
    const next = !dark;
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("medicare_theme", next ? "dark" : "light");
    setDark(next);
  };

  return (
    <Button
      aria-label="Toggle dark and light theme"
      variant="outline"
      size="icon"
      onClick={toggle}
    >
      {dark ? <Sun className="size-4" /> : <Moon className="size-4" />}
    </Button>
  );
}
