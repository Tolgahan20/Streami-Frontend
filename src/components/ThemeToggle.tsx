"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import styles from "./layout/Navbar/Navbar.module.css";
import { toggleTheme } from "@/app/providers/ThemeProvider";

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (typeof document === "undefined") return;
    const hasDark = document.documentElement.classList.contains("dark");
    setIsDark(hasDark);
  }, []);

  function onToggle() {
    toggleTheme();
    if (typeof document !== "undefined") {
      setIsDark(document.documentElement.classList.contains("dark"));
    }
  }

  return (
    <button type="button" aria-label="Toggle theme" className={styles.toggle} onClick={onToggle}>
      {isDark ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  );
}


