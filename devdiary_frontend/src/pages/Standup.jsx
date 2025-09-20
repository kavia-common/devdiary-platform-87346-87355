import React, { useState } from "react";
import Card from "../components/common/Card";
import Button from "../components/common/Button";
import Input from "../components/common/Input";
import { post } from "../services/http";

const defaultTemplate = `Yesterday:
- 

Today:
- 

Blockers:
- `;

// PUBLIC_INTERFACE
export default function Standup() {
  /** Standup prep with template, regenerate/copy actions, and API stubs. */
  const [template, setTemplate] = useState(defaultTemplate);
  const [summary, setSummary] = useState("");

  async function generate() {
    // TODO: integrate backend summarization
    try {
      // const data = await post("/standup/generate", { template });
      // setSummary(data.summary);
      setSummary(`# Standup\n\n${template}\n\n(Generated from stub)`);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error("Generate failed", e);
      alert("Generation failed (stub).");
    }
  }

  function copy() {
    navigator.clipboard.writeText(summary || template).then(
      () => alert("Copied to clipboard"),
      () => alert("Copy failed")
    );
  }

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
      <Card title="Template" subtitle="Customize your standup structure">
        <Input textarea rows={14} value={template} onChange={setTemplate} />
        <div className="mt-16" />
        <div className="flex items-center gap-8">
          <Button onClick={generate}>Regenerate</Button>
          <Button variant="ghost" onClick={() => setTemplate(defaultTemplate)}>Reset</Button>
        </div>
      </Card>
      <Card title="Summary" subtitle="Ready to share">
        <div className="prose" dangerouslySetInnerHTML={{ __html: (summary || "(nothing generated)").replace(/\n/g, "<br/>") }} />
        <div className="mt-16" />
        <div className="flex items-center gap-8">
          <Button onClick={copy}>Copy</Button>
          <Button variant="ghost" onClick={() => setSummary("")}>Clear</Button>
        </div>
      </Card>
    </div>
  );
}
