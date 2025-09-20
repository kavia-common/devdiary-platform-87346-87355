import React from "react";

// PUBLIC_INTERFACE
export default function Card({ title, subtitle, actions, children, padding = 16, style }) {
  /** A surface container with optional header and action region. */
  return (
    <section
      style={{
        background: "var(--color-surface)",
        border: "1px solid var(--color-border)",
        borderRadius: "12px",
        boxShadow: "var(--shadow-sm)",
        overflow: "hidden",
        ...style
      }}
    >
      {(title || subtitle || actions) && (
        <header
          className="flex items-center justify-between"
          style={{ padding: 16, borderBottom: "1px solid var(--color-border)" }}
        >
          <div>
            {title && <h3 style={{ margin: 0 }}>{title}</h3>}
            {subtitle && <p style={{ margin: "4px 0 0", color: "var(--color-text-muted)", fontSize: 13 }}>{subtitle}</p>}
          </div>
          {actions && <div className="flex items-center gap-8">{actions}</div>}
        </header>
      )}
      <div style={{ padding }}>{children}</div>
    </section>
  );
}
