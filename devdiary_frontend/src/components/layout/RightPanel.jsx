import React from "react";
import Card from "../common/Card";

// PUBLIC_INTERFACE
export default function RightPanel({ feed = [] }) {
  /** Right-side activity feed and tips. */
  return (
    <aside
      style={{
        width: 320,
        padding: 16,
        borderLeft: "1px solid var(--color-border)",
        background: "var(--color-surface)"
      }}
    >
      <Card title="Activity Feed" subtitle="Recent highlights">
        <div style={{ display: "grid", gap: 12 }}>
          {feed.length === 0 && <p style={{ color: "var(--color-text-muted)", margin: 0 }}>No recent activity.</p>}
          {feed.map((item, idx) => (
            <div key={idx} style={{ fontSize: 14 }}>
              <div style={{ fontWeight: 600 }}>{item.title}</div>
              <div style={{ color: "var(--color-text-muted)" }}>{item.time}</div>
            </div>
          ))}
        </div>
      </Card>
      <div style={{ height: 16 }} />
      <Card title="Pro Tip" subtitle="Logging">
        <p style={{ margin: 0, color: "var(--color-text-muted)" }}>
          Use quick tags to categorize entries. Try #blocker #win #perf.
        </p>
      </Card>
    </aside>
  );
}
