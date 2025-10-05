"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
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
    <button 
      type="button" 
      aria-label="Toggle theme" 
      className="theme-toggle"
      onClick={onToggle}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '40px',
        height: '40px',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--border)',
        background: 'var(--background)',
        color: 'var(--foreground)',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = 'var(--muted)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = 'var(--background)';
      }}
    >
      {isDark ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  );
}