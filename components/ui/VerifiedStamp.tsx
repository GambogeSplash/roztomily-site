"use client";

import { useEffect, useRef, useState } from "react";

/**
 * "Verified" stamp: animates a circle stroke + check on first intersection.
 * Drops a subtle scale-pop after the stroke completes.
 */
export function VerifiedStamp({ label }: { label: string }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          io.disconnect();
        }
      },
      { threshold: 0.5 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "var(--space-3)",
        padding: "10px 14px 10px 10px",
        borderRadius: "var(--radius-pill)",
        border: "1px solid var(--border-hairline)",
        background: "var(--card-bg)",
        fontSize: 14,
        color: "var(--text-warm)",
      }}
    >
      <svg width="22" height="22" viewBox="0 0 24 24" style={{ flexShrink: 0 }}>
        <circle
          cx="12" cy="12" r="10"
          fill="none"
          stroke="var(--bg-teal)"
          strokeWidth="1.6"
          strokeDasharray="64"
          strokeDashoffset={active ? 0 : 64}
          style={{ transition: "stroke-dashoffset 720ms cubic-bezier(0.22, 1, 0.36, 1)" }}
        />
        <path
          d="M7 12.5l3.2 3 6.5-7"
          fill="none"
          stroke="var(--bg-teal)"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="20"
          strokeDashoffset={active ? 0 : 20}
          style={{ transition: "stroke-dashoffset 480ms 540ms cubic-bezier(0.22, 1, 0.36, 1)" }}
        />
      </svg>
      <span>{label}</span>
    </div>
  );
}
