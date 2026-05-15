"use client";

import Image from "next/image";
import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { getBlur } from "@/lib/blur";

type Feature = { title: string; body: string };

export function ProductSection({
  eyebrow,
  title,
  body,
  features,
  image,
  images,
  imageSide = "right",
  background = "page",
}: {
  eyebrow: string;
  title: string;
  body: string;
  /** Deprecated — kept so existing callers don't error. The "Explore" CTA was removed. */
  href?: string;
  features: Feature[];
  /** Single image (back-compat). */
  image?: string;
  /** Multi-frame image story, cycles on hover. */
  images?: string[];
  imageSide?: "right" | "left";
  background?: "page" | "surface" | "muted";
}) {
  const frames = images && images.length > 0 ? images : image ? [image] : [];
  const [activeIdx, setActiveIdx] = useState(0);
  return (
    <section className={`section section--${background}`}>
      <Container>
        <div className="grid-2">
          <div className={imageSide === "left" ? "image-right-on-desktop" : "image-left-on-desktop"} style={{ order: imageSide === "right" ? 0 : 1 }}>
            <Reveal>
              <Eyebrow>{eyebrow}</Eyebrow>
              <h2 className="t-display-m" style={{ marginTop: "var(--space-4)" }}>{title}</h2>
              <p className="t-body-l" style={{ marginTop: "var(--space-4)", color: "var(--text-warm)" }}>{body}</p>

              {features.length > 0 && (
                <div className="feature-grid" style={{ marginTop: "var(--space-12)" }}>
                  {features.map((f) => (
                    <div key={f.title}>
                      <h4 className="t-body" style={{ fontWeight: 500 }}>{f.title}</h4>
                      <p className="t-body-s" style={{ marginTop: 4, color: "var(--text-muted)" }}>{f.body}</p>
                    </div>
                  ))}
                </div>
              )}
            </Reveal>
          </div>

          <Reveal delay={100}>
            <div
              className="lift product-card-frame"
              onMouseEnter={() => {
                if (frames.length <= 1) return;
                setActiveIdx((i) => (i + 1) % frames.length);
              }}
              onMouseLeave={() => setActiveIdx(0)}
              style={{
                order: imageSide === "right" ? 1 : 0,
                borderRadius: "var(--radius-xl)",
                overflow: "hidden",
                aspectRatio: "1 / 1",
                position: "relative",
                background: "var(--product-card-bg)",
                color: "#1a1816",
                outline: "1px solid var(--product-card-border)",
              }}
            >
              {frames.map((src, i) => (
                <Image
                  key={src}
                  src={src}
                  alt=""
                  fill
                  style={{
                    objectFit: "cover",
                    opacity: i === activeIdx ? 1 : 0,
                    transition: "opacity 360ms var(--motion-easing)",
                  }}
                  sizes="(max-width: 768px) 100vw, 600px"
                  placeholder="blur"
                  blurDataURL={getBlur(src)}
                />
              ))}
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
