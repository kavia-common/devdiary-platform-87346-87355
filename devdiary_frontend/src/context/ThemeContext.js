import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

const ThemeContext = createContext({ theme: "light", toggle: () => {} });

// PUBLIC_INTERFACE
export function ThemeProvider({ children }) {
  /** Provides app-wide theme state with localStorage persistence. */
  const [theme, setTheme] = useState(() => {
    const saved = typeof window !== "undefined" ? localStorage.getItem("devdiary-theme") : null;
    return saved || "light";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    try {
      localStorage.setItem("devdiary-theme", theme);
    } catch {
      // ignore storage issues
    }
  }, [theme]);

  const value = useMemo(
    () => ({ theme, toggle: () => setTheme((t) => (t === "light" ? "dark" : "light")) }),
    [theme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

// PUBLIC_INTERFACE
export function useTheme() {
  /** Hook to access theme and toggle. */
  return useContext(ThemeContext);
}
