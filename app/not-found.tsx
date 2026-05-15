import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Pill } from "@/components/ui/Pill";

export const metadata: Metadata = {
  title: "Page not found · Roztomily",
  description: "The page you're looking for doesn't exist anymore — or never did.",
};

export default function NotFound() {
  return (
    <section
      className="services-hero"
      style={{
        marginTop: "calc(var(--nav-height) * -1)",
        paddingTop: "calc(var(--nav-height) + 120px)",
        paddingBottom: "var(--space-24)",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        background: "var(--bg-page)",
      }}
    >
      <Container>
        <div style={{ textAlign: "center", maxWidth: 640, marginInline: "auto" }}>
          <p
            aria-hidden
            style={{
              fontFamily: "var(--font-extended)",
              fontSize: 120,
              fontWeight: 600,
              letterSpacing: "0.02em",
              color: "var(--bg-teal)",
              lineHeight: 1,
              marginBottom: "var(--space-6)",
            }}
          >
            404
          </p>
          <h1 className="t-display-l" style={{ marginBottom: "var(--space-4)" }}>
            That page isn&rsquo;t here.
          </h1>
          <p className="t-body-l" style={{ color: "var(--text-warm)", marginBottom: "var(--space-8)" }}>
            The link may be broken, the page may have moved, or it may never have existed.
            Either way, let&rsquo;s point you somewhere useful.
          </p>
          <div
            style={{
              display: "inline-flex",
              gap: "var(--space-4)",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            <Pill href="/">Back to home</Pill>
            <Link
              href="/projects"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                fontSize: 15,
                fontWeight: 500,
                color: "var(--text-primary)",
                borderBottom: "1px solid currentColor",
                paddingBottom: 2,
              }}
            >
              View projects <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
