import React, { useState } from "react";
import Card from "../components/common/Card";
import Button from "../components/common/Button";
import Modal from "../components/common/Modal";
import { get, post } from "../services/http";

const available = [
  { key: "github", name: "GitHub", desc: "Sync commits and PRs", emoji: "🐙" },
  { key: "jira", name: "Jira", desc: "Import tasks and statuses", emoji: "📌" },
  { key: "slack", name: "Slack", desc: "Send daily updates", emoji: "💬" },
  { key: "linear", name: "Linear", desc: "Track issues and cycles", emoji: "📈" },
];

// PUBLIC_INTERFACE
export default function Integrations() {
  /** Integrations hub with connect modal and stubbed status. */
  const [status, setStatus] = useState({});
  const [active, setActive] = useState(null);

  function openConnect(key) {
    setActive(key);
  }

  async function connect(key) {
    try {
      // TODO: integrate backend OAuth flow trigger
      // await post(`/integrations/${key}/connect`, {});
      setStatus((s) => ({ ...s, [key]: "connected" }));
      setActive(null);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error("Connect failed", e);
      alert("Connection failed (stub).");
    }
  }

  return (
    <div>
      <Card title="Integrations" subtitle="Connect your tools">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 16 }}>
          {available.map((i) => {
            const st = status[i.key] || "disconnected";
            const isConn = st === "connected";
            return (
              <div
                key={i.key}
                style={{
                  border: "1px solid var(--color-border)",
                  borderRadius: 12,
                  padding: 16,
                  background: "var(--color-surface)",
                  boxShadow: "var(--shadow-sm)"
                }}
              >
                <div style={{ fontSize: 24 }}>{i.emoji}</div>
                <div style={{ fontWeight: 700, marginTop: 8 }}>{i.name}</div>
                <div style={{ color: "var(--color-text-muted)", fontSize: 13 }}>{i.desc}</div>
                <div className="mt-16" />
                <div className="flex items-center justify-between">
                  <div style={{ fontSize: 12, color: isConn ? "green" : "var(--color-text-muted)" }}>
                    {isConn ? "Connected" : "Not connected"}
                  </div>
                  <Button variant={isConn ? "ghost" : "primary"} onClick={() => openConnect(i.key)}>
                    {isConn ? "Manage" : "Connect"}
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      <Modal
        title="Connect Integration"
        open={!!active}
        onClose={() => setActive(null)}
        actions={
          <div className="flex items-center gap-8">
            <Button variant="ghost" onClick={() => setActive(null)}>Cancel</Button>
            <Button onClick={() => connect(active)}>Continue</Button>
          </div>
        }
      >
        {active ? (
          <div>
            <p>You're about to connect <strong>{available.find(a => a.key === active)?.name}</strong>.</p>
            <p style={{ color: "var(--color-text-muted)" }}>
              This will start an OAuth flow in a real backend. For now, it's a stub that flips status.
            </p>
          </div>
        ) : null}
      </Modal>
    </div>
  );
}
