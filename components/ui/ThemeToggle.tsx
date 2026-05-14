"use client";

import { useEffect, useRef, useState } from "react";

type Mode = "light" | "dark";

/**
 * Theme toggle with a View Transitions reveal.
 *
 * On click, the new theme is "poured" out of the button as a circular
 * clip-path mask — feels like ink dropping into the page. Falls back to
 * an instant swap in browsers without the View Transitions API.
 */

function applyTheme(mode: Mode) {
  const root = document.documentElement;
  root.dataset.theme = mode;
  root.dataset.themeMode = mode;
}

export function ThemeToggle() {
  const btnRef = useRef<HTMLButtonElement | null>(null);
  const [mode, setMode] = useState<Mode | null>(null);

  useEffect(() => {
    const stored = (typeof window !== "undefined" && (localStorage.getItem("duna-theme") as Mode | null)) || null;
    const initial: Mode =
      stored === "light" || stored === "dark"
        ? stored
        : window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    setMode(initial);
    applyTheme(initial);
  }, []);

  const toggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    const next: Mode = mode === "dark" ? "light" : "dark";
    const root = document.documentElement;

    // Capture click origin so the reveal expands from the toggle itself.
    const rect = btnRef.current?.getBoundingClientRect();
    const cx = rect ? rect.left + rect.width / 2 : e.clientX;
    const cy = rect ? rect.top + rect.height / 2 : e.clientY;

    // Max radius — diagonal distance from origin to farthest viewport corner
    const w = window.innerWidth;
    const h = window.innerHeight;
    const endRadius = Math.hypot(Math.max(cx, w - cx), Math.max(cy, h - cy));

    root.style.setProperty("--theme-x", `${cx}px`);
    root.style.setProperty("--theme-y", `${cy}px`);
    root.style.setProperty("--theme-r", `${endRadius}px`);

    const commit = () => {
      setMode(next);
      applyTheme(next);
      try { localStorage.setItem("duna-theme", next); } catch {}
    };

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const doc = document as Document & { startViewTransition?: (cb: () => void) => unknown };

    if (reduced || typeof doc.startViewTransition !== "function") {
      commit();
      return;
    }

    root.dataset.themeSwap = next; // direction hint for CSS
    doc.startViewTransition(commit);
  };

  if (mode === null) {
    return <button aria-hidden="true" style={{ width: 36, height: 36, opacity: 0 }} tabIndex={-1} />;
  }

  const Sun = (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.6" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
  const Moon = (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M20 14.5A8.5 8.5 0 1 1 9.5 4a7 7 0 0 0 10.5 10.5z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  );

  return (
    <button
      ref={btnRef}
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${mode === "dark" ? "light" : "dark"} mode`}
      title={`Theme: ${mode} (click to toggle)`}
      className="theme-toggle"
      style={{
        position: "relative",
        width: 36,
        height: 36,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "var(--radius-pill)",
        color: "inherit",
        overflow: "hidden",
      }}
    >
      <span
        style={{
          position: "absolute",
          inset: 0,
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          opacity: mode === "light" ? 1 : 0,
          transform: mode === "light" ? "rotate(0) scale(1)" : "rotate(-60deg) scale(0.7)",
          transition: "opacity 240ms cubic-bezier(0.22, 1, 0.36, 1), transform 320ms cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      >
        {Sun}
      </span>
      <span
        style={{
          position: "absolute",
          inset: 0,
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          opacity: mode === "dark" ? 1 : 0,
          transform: mode === "dark" ? "rotate(0) scale(1)" : "rotate(60deg) scale(0.7)",
          transition: "opacity 240ms cubic-bezier(0.22, 1, 0.36, 1), transform 320ms cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      >
        {Moon}
      </span>

      {/* Brand-red ripple on press */}
      <span className="theme-toggle__ring" aria-hidden />
    </button>
  );
}
