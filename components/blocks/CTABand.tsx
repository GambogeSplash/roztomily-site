import { Container } from "@/components/ui/Container";
import { Pill } from "@/components/ui/Pill";
import { Reveal } from "@/components/ui/Reveal";

export function CTABand({
  title = "Ready to see Duna in action?",
  body = "Book a 30-minute walkthrough with our team.",
  ctaLabel = "Schedule a demo",
  href = "/contact",
}: {
  title?: string;
  body?: string;
  ctaLabel?: string;
  href?: string;
}) {
  return (
    <section className="section section--page" style={{ paddingTop: "var(--space-16)", paddingBottom: "var(--space-20)" }}>
      <Container>
        <Reveal>
          <div
            style={{
              background: "var(--bg-inverse)",
              color: "var(--text-on-dark)",
              borderRadius: "var(--radius-xl)",
              padding: "var(--space-16) var(--space-12)",
              textAlign: "center",
            }}
          >
            <h2 className="t-display-m" style={{ maxWidth: 720, margin: "0 auto" }}>{title}</h2>
            <p className="t-body-l" style={{ marginTop: "var(--space-4)", color: "var(--text-on-dark-muted)" }}>{body}</p>
            <div style={{ marginTop: "var(--space-8)", display: "inline-block" }}>
              <Pill href={href}>{ctaLabel}</Pill>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
