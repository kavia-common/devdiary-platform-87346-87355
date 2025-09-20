import React from "react";

// PUBLIC_INTERFACE
export default function Button({
  children,
  variant = "primary",
  size = "md",
  onClick,
  type = "button",
  disabled = false,
  ariaLabel,
}) {
  /** A themed, accessible button with variants and sizes. */
  const base = {
    padding: size === "sm" ? "8px 12px" : size === "lg" ? "14px 18px" : "10px 14px",
    fontSize: size === "sm" ? 12 : size === "lg" ? 16 : 14,
    borderRadius: "10px",
    border: "1px solid transparent",
    cursor: disabled ? "not-allowed" : "pointer",
    transition: "transform var(--transition-fast), box-shadow var(--transition-fast), background var(--transition-fast), color var(--transition-fast)",
    boxShadow: "var(--shadow-sm)",
    display: "inline-flex",
    alignItems: "center",
    gap: 8
  };

  const palettes = {
    primary: {
      background: "var(--color-primary)",
      color: "#fff",
    },
    secondary: {
      background: "var(--color-secondary)",
      color: "#111827",
    },
    ghost: {
      background: "transparent",
      color: "var(--color-text)",
      border: "1px solid var(--color-border)",
    },
    danger: {
      background: "var(--color-error)",
      color: "#fff",
    },
  };

  const style = { ...base, ...(palettes[variant] || palettes.primary) };

  return (
    <button
      type={type}
      aria-label={ariaLabel}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      style={style}
      onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-1px)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
    >
      {children}
    </button>
  );
}
