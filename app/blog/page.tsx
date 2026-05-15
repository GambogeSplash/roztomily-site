import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Blog · Roztomily",
  description:
    "The latest news & insights from Roztomily Group — PR, brand strategy, experiential, and culture from Lagos.",
};

export default function Blog() {
  return (
    <section
      className="services-hero"
      style={{
        marginTop: "calc(var(--nav-height) * -1)",
        paddingTop: "calc(var(--nav-height) + 140px)",
        paddingBottom: "var(--space-24)",
        background: "var(--bg-page)",
      }}
    >
      <Container>
        <Reveal>
          <div style={{ textAlign: "center", maxWidth: 720, marginInline: "auto" }}>
            <h1 className="t-display-l" style={{ marginBottom: "var(--space-5)" }}>
              The latest news &amp; insights from Roztomily.
            </h1>
            <p className="t-body-l" style={{ color: "var(--text-warm)" }}>
              Editorial coming soon. Campaign retrospectives, communications-industry notes,
              and points of view on PR and brand-building from Lagos.
            </p>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
