import env from "../config/env";

async function handle(res) {
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`HTTP ${res.status}: ${text || res.statusText}`);
  }
  const ct = res.headers.get("content-type") || "";
  if (ct.includes("application/json")) return res.json();
  return res.text();
}

// PUBLIC_INTERFACE
export async function get(path) {
  /** GET wrapper returning JSON/text, throws on non-2xx. */
  const res = await fetch(`${env.baseURL}${path}`, {
    method: "GET",
    credentials: "include",
  });
  return handle(res);
}

// PUBLIC_INTERFACE
export async function post(path, data) {
  /** POST wrapper with JSON body, returns parsed response. */
  const res = await fetch(`${env.baseURL}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(data || {}),
  });
  return handle(res);
}
