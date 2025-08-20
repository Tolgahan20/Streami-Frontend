"use client";

import { PropsWithChildren, useEffect, useState } from "react";

type Theme = "light" | "dark";

function getInitialTheme(): Theme {
  if (typeof window === "undefined") return "light";
  const stored = window.localStorage.getItem("theme");
  if (stored === "light" || stored === "dark") return stored;
  return "light"; // default to light mode
}

export default function ThemeProvider({ children }: PropsWithChildren) {
  const [theme] = useState<Theme>(getInitialTheme);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") root.classList.add("dark");
    else root.classList.remove("dark");
    window.localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <>
      {children}
    </>
  );
}

export function toggleTheme() {
  if (typeof window === "undefined") return;
  const current = window.localStorage.getItem("theme") === "dark" ? "dark" : "light";
  const next = current === "dark" ? "light" : "dark";
  window.localStorage.setItem("theme", next);
  const root = document.documentElement;
  if (next === "dark") root.classList.add("dark");
  else root.classList.remove("dark");
}


