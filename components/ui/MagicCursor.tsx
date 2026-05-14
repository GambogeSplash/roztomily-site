"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Context-aware custom cursor.
 *
 *  · Native cursor hidden globally (see app/components.css).
 *  · 8px dot by default; morphs only for intentional cases:
 *      - data-cursor="..."   → custom label (case-study, blog, github, twitter)
 *      - href^="mailto:"     → "Send email"
 *      - href^="tel:"        → "Call"
 *      - external http(s)    → "Visit site"
 *  · Internal links, buttons, and form fields stay as the dot —
 *    those elements use their own :hover styles for feedback.
 */

type Kind =
  | "default"
  | "case-study"
  | "blog"
  | "email"
  | "site"
  | "github"
  | "twitter"
  | "call";

const LABELS: Record<Exclude<Kind, "default">, string> = {
  "case-study": "View project",
  "blog":       "Read article",
  "email":      "Send email",
  "site":       "Visit site",
  "github":     "View code",
  "twitter":    "Follow",
  "call":       "Call",
};

const ArrowIcon = (
  <svg width="9" height="9" viewBox="0 0 12 12" fill="none" aria-hidden>
    <path d="M3 9L9 3M9 3H4M9 3V8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

function detectKind(el: HTMLElement | null): Kind {
  if (!el) return "default";
  const dc = el.closest<HTMLElement>("[data-cursor]")?.getAttribute("data-cursor");
  if (dc && dc in LABELS) return dc as Kind;

  const a = el.closest<HTMLAnchorElement>("a[href]");
  if (a) {
    const href = a.getAttribute("href") ?? "";
    if (href.startsWith("mailto:")) return "email";
    if (href.startsWith("tel:"))    return "call";
    if (/^https?:\/\//i.test(href)) {
      try {
        const url = new URL(href);
        if (typeof window !== "undefined" && url.hostname === window.location.hostname) return "default";
        return "site";
      } catch {
        return "site";
      }
    }
  }

  // Internal links, buttons, inputs: dot only — they handle their own hover.
  return "default";
}

export function MagicCursor() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [kind, setKind] = useState<Kind>("default");
  const [visible, setVisible] = useState(false);
  const enabled = useRef(true);
  const pos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isTouch || reduced) {
      enabled.current = false;
      return;
    }

    const onMove = (e: PointerEvent) => {
      pos.current.x = e.clientX;
      pos.current.y = e.clientY;
      if (!visible) setVisible(true);
    };

    const onOver = (e: Event) => setKind(detectKind(e.target as HTMLElement | null));
    const onOut  = (e: Event) => setKind(detectKind((e as PointerEvent).relatedTarget as HTMLElement | null));

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerover", onOver);
    document.addEventListener("pointerout", onOut);

    let raf = 0;
    const tick = () => {
      const el = ref.current;
      if (el) {
        el.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver);
      document.removeEventListener("pointerout", onOut);
      cancelAnimationFrame(raf);
    };
  }, [visible]);

  if (!enabled.current && typeof window !== "undefined") return null;

  const isInteractive = kind !== "default";
  const label = isInteractive ? LABELS[kind] : null;

  return (
    <div
      ref={ref}
      aria-hidden
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 9999,
        pointerEvents: "none",
        opacity: visible ? 1 : 0,
        willChange: "transform",
      }}
    >
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: isInteractive ? 6 : 0,
          paddingInline: isInteractive ? 10 : 0,
          paddingBlock: isInteractive ? 6 : 0,
          width: isInteractive ? "auto" : 8,
          height: isInteractive ? "auto" : 8,
          minHeight: isInteractive ? 24 : 8,
          /* Pill state uses softened rect to match the site's button language;
             default dot state keeps full circle. */
          borderRadius: isInteractive ? 10 : 999,
          background: "var(--bg-teal)",
          color: "#ffffff",
          fontFamily: "var(--font-sans)",
          fontSize: 11,
          fontWeight: 500,
          lineHeight: 1,
          letterSpacing: "-0.005em",
          whiteSpace: "nowrap",
          boxShadow: isInteractive ? "0 4px 10px rgba(0,0,0,0.14)" : "none",
          transition:
            "width 0.14s cubic-bezier(0.22, 1, 0.36, 1), height 0.14s cubic-bezier(0.22, 1, 0.36, 1), padding 0.14s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.14s ease-out, gap 0.12s ease-out",
        }}
      >
        {label && (
          <>
            <span>{label}</span>
            {ArrowIcon}
          </>
        )}
      </div>
    </div>
  );
}
