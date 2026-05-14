"use client";

import { useEffect, useRef, useState } from "react";

export function Counter({
  target,
  suffix = "",
  decimals = 0,
  duration = 1400,
}: {
  target: number;
  suffix?: string;
  decimals?: number;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [value, setValue] = useState(0);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    let raf = 0;
    let started = false;

    const ease = (t: number) => 1 - Math.pow(1 - t, 3); // easeOutCubic

    const run = (startTs: number) => (now: number) => {
      const elapsed = Math.min(1, (now - startTs) / duration);
      setValue(target * ease(elapsed));
      if (elapsed < 1) raf = requestAnimationFrame(run(startTs));
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          started = true;
          raf = requestAnimationFrame((now) => requestAnimationFrame(run(now)));
          io.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    io.observe(node);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [target, duration]);

  return (
    <span ref={ref}>
      {value.toFixed(decimals)}
      {suffix}
    </span>
  );
}
