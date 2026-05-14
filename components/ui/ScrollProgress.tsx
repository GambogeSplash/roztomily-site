"use client";

import { useEffect, useRef } from "react";

/**
 * Thin scroll-depth indicator pinned to top of viewport. When `target` is
 * provided, progress reflects scroll WITHIN that element (article reading).
 */
export function ScrollProgress({ targetId, color }: { targetId?: string; color?: string }) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const bar = ref.current;
    if (!bar) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        let pct = 0;
        if (targetId) {
          const el = document.getElementById(targetId);
          if (!el) return;
          const r = el.getBoundingClientRect();
          const total = r.height - window.innerHeight;
          pct = total <= 0 ? 1 : Math.min(1, Math.max(0, -r.top / total));
        } else {
          const total = document.documentElement.scrollHeight - window.innerHeight;
          pct = total <= 0 ? 1 : Math.min(1, Math.max(0, window.scrollY / total));
        }
        bar.style.transform = `scaleX(${pct})`;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [targetId]);

  return (
    <div
      aria-hidden
      style={{
        position: "fixed",
        top: 0, left: 0, right: 0,
        height: 2,
        zIndex: 100,
        pointerEvents: "none",
      }}
    >
      <div
        ref={ref}
        style={{
          height: "100%",
          width: "100%",
          background: color ?? "var(--text-primary)",
          transformOrigin: "left center",
          transform: "scaleX(0)",
          transition: "transform 60ms linear",
        }}
      />
    </div>
  );
}
