import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

export function SafeAndSecure() {
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
          <div
            style={{
              position: "relative",
              borderRadius: "var(--radius-xl)",
              overflow: "hidden",
              backgroundImage: "url(/roztomily/imagery/services/creative/04-concert-crowd-lights.jpg)",
              backgroundSize: "cover",
              backgroundPosition: "center",
              minHeight: 520,
              display: "flex",
              alignItems: "flex-end",
              padding: "var(--space-16) var(--space-12)",
              color: "var(--text-fixed-white)",
              boxShadow: "var(--shadow-card)",
            }}
          >
            <div
              aria-hidden
              style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(to top, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.15) 60%, rgba(0,0,0,0) 100%)",
              }}
            />
            <div style={{ position: "relative", maxWidth: 620 }}>
              <h2 className="t-display-m" style={{ color: "var(--text-fixed-white)" }}>
                Talent. We represent.
              </h2>
              <p
                className="t-body-l"
                style={{
                  marginTop: "var(--space-5)",
                  color: "var(--text-fixed-white-muted)",
                }}
              >
                We manage and represent talent across nutrition, lifestyle, music, and culture, supporting brand development, partnerships, and long-term growth. On the brand side, we source the right talent for campaigns and ensure measurable impact.
              </p>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
