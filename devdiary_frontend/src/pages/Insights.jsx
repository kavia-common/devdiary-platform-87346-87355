import React from "react";
import Card from "../components/common/Card";

function KPI({ label, value, trend = "+0%" }) {
  return (
    <div
      style={{
        border: "1px solid var(--color-border)",
        borderRadius: 12,
        padding: 16,
        background: "var(--color-surface)",
        boxShadow: "var(--shadow-sm)"
      }}
    >
      <div style={{ fontSize: 12, color: "var(--color-text-muted)" }}>{label}</div>
      <div style={{ fontWeight: 800, fontSize: 22, marginTop: 6 }}>{value}</div>
      <div style={{ fontSize: 12, color: trend.startsWith("-") ? "var(--color-error)" : "green" }}>{trend}</div>
    </div>
  );
}

function TinyBarChart({ values }) {
  const max = Math.max(...values, 1);
  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: 6, height: 80 }}>
      {values.map((v, i) => (
        <div key={i} style={{ width: 16, height: (v / max) * 80, background: "var(--color-primary)", borderRadius: 6 }} />
      ))}
    </div>
  );
}

// PUBLIC_INTERFACE
export default function Insights() {
  /** Personal dashboard with KPIs, trends and simple charts. */
  const entriesWeek = 9;
  const streak = 4;
  const blockers = 1;

  const weekly = [1, 3, 2, 5, 4, 6, 3, 7, 2, 4, 5, 3];
  const blockerTrend = [0, 1, 0, 1, 2, 1, 0];

  return (
    <div style={{ display: "grid", gap: 16 }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
        <KPI label="Entries this week" value={entriesWeek} trend="+12%" />
        <KPI label="Current streak (days)" value={streak} trend="+1" />
        <KPI label="Blockers" value={blockers} trend="-1" />
      </div>

      <Card title="Entries Trend" subtitle="Past 12 weeks">
        <TinyBarChart values={weekly} />
      </Card>

      <Card title="Blockers Trend" subtitle="Last 7 days">
        <TinyBarChart values={blockerTrend} />
      </Card>
    </div>
  );
}
