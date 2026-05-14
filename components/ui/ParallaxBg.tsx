"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

/**
 * Wraps a section that has a background image and gently translates the image
 * upward as the user scrolls, slower than the content, so depth.
 *
 * Set the background-image / position / size via `style` on this component.
 * The internal translation is applied to a stacked layer behind `children`.
 */
export function ParallaxBg({
  children,
  style,
  className,
  speed = 0.25,
  overlay,
}: {
  children: ReactNode;
  style?: CSSProperties;
  className?: string;
  /** 0 = locked with content, 1 = scrolls at the same rate as the page. */
  speed?: number;
  /** Optional full-bleed overlay (e.g. a scrim) rendered between the
      parallaxed background and the children. Always covers the full section. */
  overlay?: ReactNode;
}) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const bgRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const sec = sectionRef.current;
        const bg = bgRef.current;
        if (!sec || !bg) return;
        const rect = sec.getBoundingClientRect();
        // How far the section's top is above/below the viewport top.
        // Translate background by -(offsetFromTop * speed) → moves opposite of scroll, slower than 1:1.
        const offset = -rect.top * speed;
        bg.style.transform = `translate3d(0, ${offset}px, 0)`;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [speed]);

  return (
    <section
      ref={sectionRef}
      className={className}
      style={{
        position: "relative",
        overflow: "hidden",
        /* Pull the section up under the sticky transparent nav so painterly fills the viewport from y:0. */
        marginTop: "calc(var(--nav-height) * -1)",
        ...style,
        backgroundImage: "none",
      }}
    >
      <div
        ref={bgRef}
        aria-hidden
        style={{
          position: "absolute",
          inset: "-15% 0 0 0",
          backgroundImage: style?.backgroundImage,
          backgroundSize: style?.backgroundSize ?? "cover",
          backgroundPosition: style?.backgroundPosition ?? "center",
          backgroundRepeat: "no-repeat",
          willChange: "transform",
          zIndex: 0,
        }}
      />
      {overlay && (
        <div
          aria-hidden
          style={{ position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none" }}
        >
          {overlay}
        </div>
      )}
      <div style={{ position: "relative", zIndex: 2 }}>{children}</div>
    </section>
  );
}
