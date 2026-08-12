"use client";

import { useState, useEffect, type ReactNode } from "react";

async function copyText(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}

function Shell({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 dark:bg-black dark:text-zinc-100">
      <div className="mx-auto max-w-5xl px-4 py-10">
        <header className="mb-8">
          <p className="text-xs font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
            Client-side utility · no server required
          </p>
          <h1 className="mt-1 text-3xl font-semibold tracking-tight">{title}</h1>
          <p className="mt-2 max-w-2xl text-sm text-zinc-600 dark:text-zinc-400">{subtitle}</p>
        </header>
        {children}
        <footer className="mt-10 border-t border-zinc-200 pt-4 text-xs text-zinc-500 dark:border-zinc-800 dark:text-zinc-500">
          Data stays in your browser. Part of the Bookchaowalit developer tools portfolio.
        </footer>
      </div>
    </div>
  );
}

function Button({
  children,
  onClick,
  variant = "primary",
  disabled,
  type = "button",
}: {
  children: ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "ghost";
  disabled?: boolean;
  type?: "button" | "submit";
}) {
  const base =
    "inline-flex items-center justify-center rounded-lg px-3 py-2 text-sm font-medium transition disabled:opacity-50";
  const styles =
    variant === "primary"
      ? "bg-zinc-900 text-white hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white"
      : variant === "secondary"
        ? "bg-white text-zinc-900 ring-1 ring-zinc-200 hover:bg-zinc-100 dark:bg-zinc-900 dark:text-zinc-100 dark:ring-zinc-700 dark:hover:bg-zinc-800"
        : "text-zinc-600 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-900";
  return (
    <button type={type} disabled={disabled} onClick={onClick} className={`${base} ${styles}`}>
      {children}
    </button>
  );
}

function Field({
  label,
  children,
  hint,
}: {
  label: string;
  children: ReactNode;
  hint?: string;
}) {
  return (
    <label className="block space-y-1.5">
      <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">{label}</span>
      {children}
      {hint ? <span className="block text-xs text-zinc-500">{hint}</span> : null}
    </label>
  );
}

const inputClass =
  "w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 font-mono text-sm text-zinc-900 outline-none ring-zinc-400 focus:ring-2 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100";
const areaClass = `${inputClass} min-h-[160px] resize-y`;

type Item = { id: string; text: string; createdAt: number; pinned: boolean };

const KEY = "clipboard-manager-items-v1";

export default function Home() {
  const [items, setItems] = useState<Item[]>([]);
  const [draft, setDraft] = useState("");
  const [query, setQuery] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setItems(JSON.parse(raw) as Item[]);
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(items));
  }, [items]);

  const add = () => {
    if (!draft.trim()) return;
    setItems((prev) => [
      { id: crypto.randomUUID(), text: draft, createdAt: Date.now(), pinned: false },
      ...prev,
    ]);
    setDraft("");
  };

  const filtered = items
    .filter((i) => i.text.toLowerCase().includes(query.toLowerCase()))
    .sort((a, b) => Number(b.pinned) - Number(a.pinned) || b.createdAt - a.createdAt);

  return (
    <Shell
      title="Clipboard Manager"
      subtitle="Keep reusable snippets in this browser. Browsers block passive clipboard listening — paste or type to save."
    >
      <Field label="New snippet">
        <textarea className={areaClass} value={draft} onChange={(e) => setDraft(e.target.value)} placeholder="Paste text to remember…" />
      </Field>
      <div className="mt-3 flex flex-wrap gap-2">
        <Button onClick={add}>Save snippet</Button>
        <Button
          variant="secondary"
          onClick={async () => {
            try {
              const t = await navigator.clipboard.readText();
              setDraft(t);
            } catch {
              setDraft((d) => d || "(Clipboard read blocked — paste manually with Ctrl/Cmd+V)");
            }
          }}
        >
          Read clipboard
        </Button>
        <Button variant="ghost" onClick={() => setItems([])}>
          Clear all
        </Button>
      </div>
      <div className="mt-6">
        <Field label="Search">
          <input className={inputClass} value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Filter…" />
        </Field>
      </div>
      <ul className="mt-4 space-y-3">
        {filtered.length === 0 ? (
          <li className="text-sm text-zinc-500">No snippets yet.</li>
        ) : (
          filtered.map((item) => (
            <li
              key={item.id}
              className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950"
            >
              <pre className="whitespace-pre-wrap break-words font-mono text-sm">{item.text}</pre>
              <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-zinc-500">
                <span>{new Date(item.createdAt).toLocaleString()}</span>
                <Button
                  variant="secondary"
                  onClick={async () => {
                    if (await copyText(item.text)) {
                      setCopiedId(item.id);
                      setTimeout(() => setCopiedId(null), 1500);
                    }
                  }}
                >
                  {copiedId === item.id ? "Copied" : "Copy"}
                </Button>
                <Button
                  variant="ghost"
                  onClick={() =>
                    setItems((prev) => prev.map((x) => (x.id === item.id ? { ...x, pinned: !x.pinned } : x)))
                  }
                >
                  {item.pinned ? "Unpin" : "Pin"}
                </Button>
                <Button variant="ghost" onClick={() => setItems((prev) => prev.filter((x) => x.id !== item.id))}>
                  Delete
                </Button>
              </div>
            </li>
          ))
        )}
      </ul>
    </Shell>
  );
}
