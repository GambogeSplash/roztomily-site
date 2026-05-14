import type { ReactNode } from "react";

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span
      style={{
        display: "inline-block",
        fontSize: "var(--type-caption-size)",
        lineHeight: "var(--type-caption-lh)",
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        color: "var(--text-muted)",
        fontFamily: "var(--font-mono)",
      }}
    >
      {children}
    </span>
  );
}
