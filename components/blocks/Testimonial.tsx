import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

export function Testimonial({
  quote,
  author,
  role,
}: {
  quote: string;
  author: string;
  role: string;
}) {
  return (
    <section
      style={{
        paddingTop: "var(--section-pad-y)",
        paddingBottom: "var(--section-pad-y)",
        background: "var(--bg-page)",
      }}
    >
      <Container>
        <Reveal>
          <blockquote
            style={{
              maxWidth: 920,
              margin: "0 auto",
              textAlign: "center",
            }}
          >
            <p className="t-display-m" style={{ fontFamily: "var(--font-serif)" }}>
              “{quote}”
            </p>
            <footer
              style={{
                marginTop: "var(--space-10)",
                color: "var(--text-muted)",
                fontSize: 16,
              }}
            >
              <strong style={{ fontWeight: 500, color: "var(--text-primary)" }}>{author}</strong>
              <span>, {role}</span>
            </footer>
          </blockquote>
        </Reveal>
      </Container>
    </section>
  );
}
