import React from "react";
import { NavLink } from "react-router-dom";

const navItemStyle = ({ isActive }) => ({
  display: "flex",
  alignItems: "center",
  gap: 10,
  padding: "10px 12px",
  borderRadius: 10,
  color: isActive ? "#fff" : "var(--color-text)",
  background: isActive ? "var(--color-primary)" : "transparent",
  textDecoration: "none",
  fontSize: 14,
  transition: "background var(--transition-fast), color var(--transition-fast)"
});

// PUBLIC_INTERFACE
export default function Sidebar() {
  /** Left navigation sidebar for modules. */
  return (
    <aside
      style={{
        width: 250,
        padding: 16,
        borderRight: "1px solid var(--color-border)",
        background: "var(--color-surface)"
      }}
    >
      <div style={{ padding: "8px 6px 16px", borderBottom: "1px solid var(--color-border)" }}>
        <div style={{ fontWeight: 700, fontSize: 18 }}>DevDiary</div>
        <div style={{ fontSize: 12, color: "var(--color-text-muted)" }}>Ocean Professional</div>
      </div>
      <nav style={{ display: "grid", gap: 6, marginTop: 16 }}>
        <NavLink to="/" end style={navItemStyle}>
          <span>📝</span> <span>Logs</span>
        </NavLink>
        <NavLink to="/standup" style={navItemStyle}>
          <span>📣</span> <span>Standup</span>
        </NavLink>
        <NavLink to="/integrations" style={navItemStyle}>
          <span>🔗</span> <span>Integrations</span>
        </NavLink>
        <NavLink to="/insights" style={navItemStyle}>
          <span>📊</span> <span>Insights</span>
        </NavLink>
      </nav>
    </aside>
  );
}
