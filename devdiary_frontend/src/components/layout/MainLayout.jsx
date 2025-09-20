import React from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import RightPanel from "./RightPanel";

// PUBLIC_INTERFACE
export default function MainLayout({ children }) {
  /** Primary application layout with left nav, topbar, and right feed. */
  const mockFeed = [
    { title: "Standup generated", time: "2h ago" },
    { title: "Linked GitHub repo", time: "1d ago" },
  ];

  return (
    <div style={{ display: "grid", gridTemplateColumns: "250px 1fr 320px", height: "100%" }}>
      <Sidebar />
      <div style={{ display: "flex", flexDirection: "column", minWidth: 0 }}>
        <Topbar />
        <main style={{ padding: 16, background: "var(--color-bg)", minHeight: 0, flex: 1 }}>
          {children}
        </main>
      </div>
      <RightPanel feed={mockFeed} />
    </div>
  );
}
