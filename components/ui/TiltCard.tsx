"use client";

import { useRef, type CSSProperties, type ReactNode } from "react";

/**
 * 3D-tilt wrapper that tracks cursor position over the card and rotates it
 * up to ~maxTilt degrees on each axis. Resets on leave.
 */
export function TiltCard({
  children,
  maxTilt = 3,
  perspective = 800,
  className,
  style,
}: {
  children: ReactNode;
  maxTilt?: number;
  perspective?: number;
  className?: string;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLDivElement | null>(null);

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;   // 0..1
    const py = (e.clientY - r.top) / r.height;   // 0..1
    const rotY = (px - 0.5) * 2 * maxTilt;       // -max..+max
    const rotX = (0.5 - py) * 2 * maxTilt;
    el.style.transform = `perspective(${perspective}px) rotateX(${rotX}deg) rotateY(${rotY}deg)`;
  };

  const onLeave = () => {
    const el = ref.current;
    if (el) el.style.transform = "";
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={className}
      style={{
        transformStyle: "preserve-3d",
        transition: "transform 320ms var(--motion-easing)",
        willChange: "transform",
        ...style,
      }}
    >
      {children}
    </div>
  );
}
