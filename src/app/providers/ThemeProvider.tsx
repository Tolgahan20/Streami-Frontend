"use client";

import { PropsWithChildren, useEffect, useState, createContext, useContext } from "react";

interface ThemeContextType {
  theme: "light" | "dark";
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

export default function ThemeProvider({ children }: PropsWithChildren) {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    // Initialize theme from localStorage or default to light
    const savedTheme = window.localStorage.getItem("theme") as "light" | "dark" | null;
    const initialTheme = savedTheme || "light";
    
    setTheme(initialTheme);
    const root = document.documentElement;
    
    if (initialTheme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    window.localStorage.setItem("theme", newTheme);
    
    const root = document.documentElement;
    if (newTheme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Standalone toggle function for use in dashboard components
export function toggleTheme() {
  if (typeof window === "undefined") return;
  const current = window.localStorage.getItem("theme") === "dark" ? "dark" : "light";
  const next = current === "dark" ? "light" : "dark";
  window.localStorage.setItem("theme", next);
  const root = document.documentElement;
  if (next === "dark") root.classList.add("dark");
  else root.classList.remove("dark");
}


