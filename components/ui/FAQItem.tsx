"use client";

import { useState, type ReactNode } from "react";

export function FAQItem({ q, children }: { q: string; children: ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: "1px solid var(--hairline-strong)" }}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "var(--space-6)",
          padding: "var(--space-5) 0",
          textAlign: "left",
          fontSize: 18,
          color: "var(--text-primary)",
        }}
      >
        <span>{q}</span>
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          aria-hidden
          style={{
            flexShrink: 0,
            transform: open ? "rotate(45deg)" : "rotate(0)",
            transition: "transform 240ms cubic-bezier(0.22, 1, 0.36, 1)",
            color: "var(--text-muted)",
          }}
        >
          <path d="M10 4v12M4 10h12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      </button>
      <div
        style={{
          display: "grid",
          gridTemplateRows: open ? "1fr" : "0fr",
          transition: "grid-template-rows 280ms cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      >
        <div style={{ overflow: "hidden" }}>
          <div style={{ paddingBottom: "var(--space-5)", color: "var(--text-warm)", fontSize: 16, lineHeight: 1.55, maxWidth: 720 }}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
