import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

export type BentoItem = {
  icon: ReactNode;
  artefact?: ReactNode;
  title: string;
  body: string;
  span?: 1 | 2;
};

export function BentoFeatures({
  eyebrow,
  title,
  subtitle,
  items,
  background = "surface",
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  items: BentoItem[];
  background?: "page" | "surface" | "muted";
}) {
  return (
    <section className={`section section--${background}`}>
      <Container>
        <Reveal>
          {eyebrow && (
            <p
              className="t-caption"
              style={{
                color: "var(--text-muted)",
                textTransform: "uppercase",
                letterSpacing: "0.12em",
                marginBottom: "var(--space-3)",
              }}
            >
              {eyebrow}
            </p>
          )}
          <h2 className="t-display-m" style={{ marginBottom: "var(--space-3)" }}>{title}</h2>
          {subtitle && (
            <p className="t-body-l" style={{ marginBottom: "var(--space-12)", color: "var(--text-warm)" }}>
              {subtitle}
            </p>
          )}
        </Reveal>

        <div
          className="bento-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gridAutoRows: "minmax(380px, auto)",
            gap: "var(--space-4)",
          }}
        >
          {items.map((b, i) => (
            <Reveal key={b.title} delay={i * 50}>
              <div
                className="bento-card lift"
                style={{
                  gridColumn: b.span === 2 ? "span 2" : "span 1",
                  position: "relative",
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                  padding: "32px",
                  background: "var(--product-card-bg)",
                  borderRadius: "var(--radius-lg)",
                  overflow: "hidden",
                  color: "rgb(27, 6, 36)",
                  gap: b.artefact ? 0 : "32px",
                }}
              >
                {/* Icon top-left (hidden when only an artefact is provided without an icon) */}
                {b.icon && (
                  <div style={{ color: "rgb(62, 55, 39)" }}>{b.icon}</div>
                )}

                {/* Artefact only renders when provided */}
                {b.artefact && (
                  <div
                    style={{
                      flex: 1,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      paddingBlock: "16px",
                    }}
                  >
                    {b.artefact}
                  </div>
                )}

                {/* When no artefact, push title + body to the bottom with a spacer */}
                {!b.artefact && <div style={{ flex: 1 }} />}

                {/* Title + body bottom-left, duna-style spacing */}
                <div>
                  <h3 style={{ fontSize: 22, fontWeight: 500, lineHeight: 1.25, letterSpacing: "-0.02em", color: "rgb(27, 6, 36)" }}>
                    {b.title}
                  </h3>
                  <p style={{ marginTop: 8, fontSize: 15, lineHeight: 1.5, color: "rgba(27, 6, 36, 0.6)", maxWidth: 380 }}>
                    {b.body}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
