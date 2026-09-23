import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "shadow-theme";

function readTheme() {
  if (typeof window === "undefined") return "dark";
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "light" || stored === "dark") return stored;
  } catch {
    /* stockage indisponible (navigation privée) : on retombe sur le thème du document */
  }
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

/** Thème clair/sombre, synchronisé avec la classe `dark` du <html>. */
export function useTheme() {
  const [theme, setTheme] = useState(readTheme);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    try {
      window.localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      /* ignore */
    }
  }, [theme]);

  const toggleTheme = useCallback(
    () => setTheme((t) => (t === "dark" ? "light" : "dark")),
    []
  );

  return { theme, setTheme, toggleTheme };
}
