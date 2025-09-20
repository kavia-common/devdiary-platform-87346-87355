import React, { useEffect } from "react";
import Button from "./Button";

// PUBLIC_INTERFACE
export default function Modal({ title, open, onClose, children, actions }) {
  /** Accessible modal dialog with esc/overlay close. */
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") onClose?.();
    };
    if (open) window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={title || "Modal dialog"}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(2,6,23,0.6)",
        display: "grid",
        placeItems: "center",
        padding: 16,
        zIndex: 50
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose?.();
      }}
    >
      <div
        style={{
          background: "var(--color-surface)",
          color: "var(--color-text)",
          border: "1px solid var(--color-border)",
          borderRadius: 12,
          boxShadow: "var(--shadow-lg)",
          width: "100%",
          maxWidth: 560,
          overflow: "hidden"
        }}
      >
        <header style={{ padding: 16, borderBottom: "1px solid var(--color-border)" }}>
          <div className="flex items-center justify-between">
            <h3 style={{ margin: 0 }}>{title}</h3>
            <Button variant="ghost" ariaLabel="Close modal" onClick={onClose}>✕</Button>
          </div>
        </header>
        <div style={{ padding: 16 }}>{children}</div>
        {actions && (
          <footer style={{ padding: 16, borderTop: "1px solid var(--color-border)" }}>
            <div className="flex items-center justify-between">{actions}</div>
          </footer>
        )}
      </div>
    </div>
  );
}
