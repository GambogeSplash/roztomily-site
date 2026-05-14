import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";

export function PageHero({
  eyebrow,
  title,
  subtitle,
  children,
  background = "page",
  bgImage,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  children?: ReactNode;
  background?: "page" | "surface" | "muted" | "inverse";
  bgImage?: string;
}) {
  return (
    <section
      className={`section--${background}`}
      style={{
        /* Extend behind the sticky transparent nav so hero bg starts at y:0. */
        marginTop: "calc(var(--nav-height) * -1)",
        paddingTop: "calc(var(--space-32) + var(--nav-height))",
        paddingBottom: "var(--space-20)",
        backgroundImage: bgImage ? `url(${bgImage})` : undefined,
        backgroundSize: "cover",
        backgroundPosition: "center bottom",
      }}
    >
      <Container>
        {eyebrow && (
          <Reveal>
            <div style={{ marginBottom: "var(--space-4)" }}>
              <Eyebrow>{eyebrow}</Eyebrow>
            </div>
          </Reveal>
        )}
        <Reveal delay={40}>
          <h1 className="t-display-l" style={{ maxWidth: 920 }}>{title}</h1>
        </Reveal>
        {subtitle && (
          <Reveal delay={120}>
            <p
              className="t-body-l"
              style={{ marginTop: "var(--space-6)", maxWidth: 640, color: background === "inverse" ? "var(--text-on-dark-muted)" : "var(--text-warm)" }}
            >
              {subtitle}
            </p>
          </Reveal>
        )}
        {children && <Reveal delay={180}><div style={{ marginTop: "var(--space-8)" }}>{children}</div></Reveal>}
      </Container>
    </section>
  );
}
