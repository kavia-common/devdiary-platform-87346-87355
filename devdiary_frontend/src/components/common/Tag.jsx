import React from "react";

// PUBLIC_INTERFACE
export default function Tag({ label, color = "var(--color-secondary)", onClick, ariaLabel }) {
  /** Clickable tag pill used for quick insert and labels. */
  return (
    <button
      type="button"
      aria-label={ariaLabel || label}
      onClick={onClick}
      style={{
        display: "inline-flex",
        alignItems: "center",
        padding: "6px 10px",
        background: `${color}22`,
        color: "var(--color-text)",
        border: `1px solid ${color}55`,
        borderRadius: 9999,
        fontSize: 12,
        cursor: "pointer",
        transition: "transform var(--transition-fast), background var(--transition-fast)"
      }}
      onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-1px)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
    >
      #{label}
    </button>
  );
}
