import React from "react";
import { useTheme } from "../../context/ThemeContext";
import Button from "../common/Button";

// PUBLIC_INTERFACE
export default function Topbar() {
  /** Header bar with theme toggle and quick actions. */
  const { theme, toggle } = useTheme();

  return (
    <header
      style={{
        height: 64,
        borderBottom: "1px solid var(--color-border)",
        background: "var(--color-surface)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 16px",
        position: "sticky",
        top: 0,
        zIndex: 10
      }}
    >
      <div style={{ fontWeight: 600 }}>Welcome back</div>
      <div className="flex items-center gap-8">
        <Button variant="ghost" onClick={toggle} ariaLabel="Toggle theme">
          {theme === "light" ? "🌙 Dark" : "☀️ Light"}
        </Button>
      </div>
    </header>
  );
}
