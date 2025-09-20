import React, { useMemo, useState } from "react";
import Card from "../components/common/Card";
import Button from "../components/common/Button";
import Input from "../components/common/Input";
import Tag from "../components/common/Tag";
import { post } from "../services/http";

// crude markdown preview renderer (limited)
function renderMarkdown(md) {
  let html = md
    .replace(/^### (.*$)/gim, "<h3>$1</h3>")
    .replace(/^## (.*$)/gim, "<h2>$1</h2>")
    .replace(/^# (.*$)/gim, "<h1>$1</h1>")
    .replace(/\*\*(.*?)\*\*/gim, "<strong>$1</strong>")
    .replace(/\*(.*?)\*/gim, "<em>$1</em>")
    .replace(/`([^`]+)`/gim, "<code>$1</code>")
    .replace(/\n$/gim, "<br />");
  return { __html: html };
}

const defaultTags = ["blocker", "win", "idea", "perf", "refactor", "review"];

// PUBLIC_INTERFACE
export default function Logs() {
  /** Logs page with markdown editor, preview, quick tags, and mock NLP suggestions. */
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState([]);
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(false);

  const suggestions = useMemo(() => {
    // mock NLP suggestions based on content keywords
    const lower = content.toLowerCase();
    const s = [];
    if (lower.includes("error") || lower.includes("bug")) s.push("Possible blocker detected");
    if (lower.includes("optimiz") || lower.includes("perf")) s.push("Performance improvement noted");
    if (lower.includes("ship") || lower.includes("deploy")) s.push("Deployment milestone");
    return s.slice(0, 3);
  }, [content]);

  async function saveEntry() {
    setLoading(true);
    try {
      // TODO: integrate backend API
      // await post("/logs", { title, content, tags });
      // For now, append locally:
      const newEntry = {
        id: Date.now(),
        title: title || "Untitled",
        content,
        tags: [...tags],
        createdAt: new Date().toISOString(),
      };
      setEntries((prev) => [newEntry, ...prev]);
      setTitle("");
      setContent("");
      setTags([]);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error("Failed to save log:", e);
      alert("Save failed (stub). Check console.");
    } finally {
      setLoading(false);
    }
  }

  function insertTag(tag) {
    if (!tags.includes(tag)) setTags((prev) => [...prev, tag]);
  }

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 16 }}>
      <div style={{ display: "grid", gap: 16 }}>
        <Card
          title="New Log Entry"
          subtitle="Write your update with markdown"
          actions={<div style={{ color: "var(--color-text-muted)", fontSize: 12 }}>{content.length} chars</div>}
        >
          <div className="flex items-center gap-12">
            <Input label="Title" placeholder="Today's progress..." value={title} onChange={setTitle} />
          </div>
          <div className="mt-16" />
          <Input
            textarea
            rows={12}
            placeholder="Use markdown here. Example: **bold**, *italic*, `code`"
            value={content}
            onChange={setContent}
          />
          <div className="mt-16" />
          <div className="flex items-center gap-8" aria-label="Quick insert tags">
            {defaultTags.map((t) => (
              <Tag key={t} label={t} onClick={() => insertTag(t)} />
            ))}
          </div>
          <div className="mt-16" />
          <div className="flex items-center gap-8">
            <Button onClick={saveEntry} disabled={loading}>{loading ? "Saving..." : "Save Entry"}</Button>
            {tags.length > 0 && (
              <div style={{ fontSize: 12, color: "var(--color-text-muted)" }}>
                Tags: {tags.map((t) => `#${t}`).join(" ")}
              </div>
            )}
          </div>
        </Card>

        <Card title="Preview" subtitle="Rendered markdown">
          <div className="prose" dangerouslySetInnerHTML={renderMarkdown(content || "_Nothing to preview..._")} />
        </Card>
      </div>

      <div style={{ display: "grid", gap: 16 }}>
        <Card title="NLP Suggestions" subtitle="Smart assists">
          <ul style={{ margin: 0, paddingLeft: 18 }}>
            {suggestions.length === 0 && <li style={{ color: "var(--color-text-muted)" }}>No suggestions yet.</li>}
            {suggestions.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
        </Card>

        <Card title="Recent Entries" subtitle="Local (stub)">
          <div style={{ display: "grid", gap: 12 }}>
            {entries.length === 0 && <p style={{ color: "var(--color-text-muted)" }}>No entries yet.</p>}
            {entries.map((e) => (
              <div key={e.id} style={{ border: "1px solid var(--color-border)", borderRadius: 10, padding: 12 }}>
                <div style={{ fontWeight: 600 }}>{e.title}</div>
                <div style={{ fontSize: 12, color: "var(--color-text-muted)" }}>
                  {new Date(e.createdAt).toLocaleString()}
                </div>
                <div className="prose" dangerouslySetInnerHTML={renderMarkdown(e.content)} />
                {e.tags?.length > 0 && (
                  <div className="flex items-center gap-8 mt-16">
                    {e.tags.map((t) => (
                      <Tag key={t} label={t} />
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
