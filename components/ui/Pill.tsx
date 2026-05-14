"use client";

import type { ReactNode } from "react";
import { useRef } from "react";
import Link from "next/link";

type Variant = "solid" | "ghost";

const baseStyle = {
  display: "inline-flex",
  alignItems: "center",
  gap: "var(--space-2)",
  borderRadius: 12,
  paddingInline: "var(--space-5)",
  paddingBlock: "var(--space-3)",
  fontSize: "var(--type-body-s-size)",
  lineHeight: 1,
  letterSpacing: "var(--type-body-s-tr)",
  fontFamily: "var(--font-sans)",
  fontWeight: 400,
  whiteSpace: "nowrap" as const,
  transition:
    "transform 240ms cubic-bezier(0.22, 1, 0.36, 1), background 200ms var(--motion-easing), opacity 200ms var(--motion-easing)",
  willChange: "transform",
};

/**
 * Pill CTA with a "magnetic" pull toward the cursor when within range.
 * Hover anywhere inside the pill region triggers a subtle 1.04× scale + lift;
 * cursor proximity tugs the element a few px toward the pointer.
 */
export function Pill({
  children,
  href,
  variant = "solid",
  className = "",
  magnetic = false,
}: {
  children: ReactNode;
  href?: string;
  variant?: Variant;
  className?: string;
  /** Cursor-pull effect. Default off, opt in per call site for special CTAs. */
  magnetic?: boolean;
}) {
  const ref = useRef<HTMLElement | null>(null);

  const handleMove = (e: React.MouseEvent) => {
    if (!magnetic) return;
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const r = el.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    // Range: only nearby cursor pulls; clamp to ~10px max translate.
    const max = 10;
    const strength = 0.25;
    const tx = Math.max(-max, Math.min(max, dx * strength));
    const ty = Math.max(-max, Math.min(max, dy * strength));
    el.style.transform = `translate3d(${tx}px, ${ty}px, 0) scale(1.04)`;
  };

  const handleLeave = () => {
    const el = ref.current;
    if (el) el.style.transform = "";
  };

  const style =
    variant === "solid"
      ? { ...baseStyle, background: "var(--bg-teal)", color: "#ffffff" }
      : { ...baseStyle, background: "transparent", color: "var(--text-primary)", border: "1px solid rgba(0,0,0,0.12)" };

  if (href) {
    return (
      <Link
        href={href}
        className={className}
        style={style}
        data-pill={variant}
        ref={ref as React.RefObject<HTMLAnchorElement>}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
      >
        {children}
      </Link>
    );
  }
  return (
    <button
      className={className}
      style={style}
      data-pill={variant}
      ref={ref as React.RefObject<HTMLButtonElement>}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      {children}
    </button>
  );
}
