import type { Metadata } from "next";
import Image from "next/image";
import { getBlur } from "@/lib/blur";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Services · Roztomily",
  description: "PR, media, experiential, digital, creative production, and talent management, an integrated communication system, not isolated functions.",
};

const PILLARS = [
  {
    icon: "layers",
    title: "Integrated, not isolated",
    body: "PR, media, digital, and experiential brought together into a single communication system that works seamlessly across channels.",
  },
  {
    icon: "spark",
    title: "Culture-fluent",
    body: "Deep relationships across Nigerian and West African media, talent, and consumer culture. We know the rooms because we&apos;re in them.",
  },
  {
    icon: "compass",
    title: "Outcome-led",
    body: "We diagnose the brief, not the symptom. Visibility, perception, traction, or growth, each engagement starts with the question your business is actually asking.",
  },
];

const BENTO = [
  { title: "PR & brand marketing",          body: "Narrative development and strategic communications. Help brands own their story and earn public trust.", image: "/roztomily/services/pr-and-brand-marketing.jpg",                  span: 2 },
  { title: "Media relations & buying",      body: "Powerful media relationships paired with data-driven placements across traditional and digital.",       image: "/roztomily/services/media-relations-and-buying.png",              span: 1 },
  { title: "Experiential marketing",        body: "Immersive brand experiences that create emotional connection and turn audiences into communities.",      image: "/roztomily/services/experiential-marketing.jpg",                  span: 1 },
  { title: "Digital marketing",             body: "Digital ecosystems that drive visibility, engagement, and conversion across performance, content, and social.", image: "/roztomily/services/digital-marketing.jpg",                   span: 1 },
  { title: "Creative production & advertising", body: "High-impact visuals, campaigns, and storytelling that cut through noise and command attention.",     image: "/roztomily/services/creative-production-and-advertising.jpg",     span: 1 },
  { title: "Talent management",             body: "Talent that aligns with brand narratives, authentic influence, partnerships, and cultural relevance.",   image: "/roztomily/services/talent-management.jpg",                       span: 2 },
];

function PillarIcon({ kind }: { kind: string }) {
  if (kind === "layers") {
    return (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M12 3l9 5-9 5-9-5 9-5z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
        <path d="M3 13l9 5 9-5M3 18l9 5 9-5" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
      </svg>
    );
  }
  if (kind === "spark") {
    return (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M12 2v6M12 16v6M2 12h6M16 12h6M5 5l4 4M15 15l4 4M5 19l4-4M15 9l4-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    );
  }
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.4" />
      <path d="M16 8l-3 5-5 3 3-5 5-3z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
    </svg>
  );
}

export default function Services() {
  return (
    <>
      {/* Hero, centered, matches /ai */}
      <section className="services-hero" style={{ marginTop: "calc(var(--nav-height) * -1)", paddingTop: "calc(var(--nav-height) + 140px)", paddingBottom: "var(--space-20)", background: "var(--bg-page)" }}>
        <Container>
          <Reveal>
            <div style={{ textAlign: "center", maxWidth: 800, marginInline: "auto" }}>
              <h1 className="t-display-l">We engineer influence across six disciplines.</h1>
              <p className="t-body-l" style={{ marginTop: "var(--space-6)", color: "var(--text-warm)", maxWidth: 640, marginInline: "auto" }}>
                PR · Media · Experiential · Digital · Creative · Talent. Hire one. Hire several. Either way you get one team, one timeline, one source of truth.
              </p>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* 3 pillars */}
      <section className="section section--surface">
        <Container>
          <Reveal>
            <h2 className="t-display-m" style={{ marginBottom: "var(--space-12)" }}>How we work</h2>
          </Reveal>
          <div className="grid-3" style={{ borderTop: "1px solid var(--hairline-strong)", paddingTop: "var(--space-8)" }}>
            {PILLARS.map((p, i) => (
              <Reveal key={p.title} delay={i * 80}>
                <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-3)" }}>
                  <div style={{ color: "var(--text-primary)" }}><PillarIcon kind={p.icon} /></div>
                  <h3 className="t-heading-s">{p.title}</h3>
                  <p className="t-body" style={{ color: "var(--text-warm)" }}>{p.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Dark feature card */}
      <section className="section section--page" style={{ paddingTop: "var(--space-16)", paddingBottom: "var(--space-16)" }}>
        <Container>
          <Reveal>
            <div
              style={{
                borderRadius: "var(--radius-xl)",
                background: "linear-gradient(135deg, #160f0c 0%, #1c1815 55%, #262220 100%)",
                color: "var(--text-fixed-white)",
                padding: "var(--space-16) var(--space-12)",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <p style={{ fontSize: 14, opacity: 0.7, marginBottom: "var(--space-6)", letterSpacing: "0.12em", textTransform: "uppercase" }}>Our promise</p>
              <blockquote className="t-display-s" style={{ maxWidth: 920, color: "#fff" }}>
                PR doesn&apos;t end at the press release. It begins there. The smallest team that can take a brief from strategy to broadcast, without handing it off.
              </blockquote>
              <footer style={{ marginTop: "var(--space-8)", opacity: 0.8, fontSize: 14 }}>
                Lagos, Nigeria · Briefs welcome from anywhere
              </footer>
            </div>
          </Reveal>
        </Container>
      </section>


      {/* Bento services */}
      <section className="section section--surface">
        <Container>
          <Reveal>
            <h2 className="t-display-m" style={{ marginBottom: "var(--space-3)" }}>What you can hire us for</h2>
            <p className="t-body-l" style={{ marginBottom: "var(--space-12)", color: "var(--text-warm)" }}>
              Pick a discipline. Pick several. We compose engagements around the brief, not the org chart.
            </p>
          </Reveal>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gridAutoRows: "minmax(220px, auto)",
              gap: "var(--space-4)",
            }}
            className="services-bento"
          >
            {BENTO.map((b, i) => (
              <Reveal key={b.title} delay={i * 50}>
                <div
                  className="lift"
                  style={{
                    gridColumn: b.span === 2 ? "span 2" : "span 1",
                    borderRadius: "var(--radius-lg)",
                    background: "var(--card-bg)",
                    border: "1px solid var(--border-hairline)",
                    overflow: "hidden",
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                  }}
                >
                  <div style={{ padding: "var(--space-6) var(--space-6) var(--space-4)" }}>
                    <h3 className="t-heading-s">{b.title}</h3>
                    <p className="t-body-s" style={{ marginTop: "var(--space-2)", color: "var(--text-warm)" }}>{b.body}</p>
                  </div>
                  <div style={{ flex: 1, position: "relative", margin: "0 var(--space-3) var(--space-3)", borderRadius: "var(--radius-md)", overflow: "hidden", background: "var(--product-card-bg)", minHeight: 120 }}>
                    <Image src={b.image} alt="" fill style={{ objectFit: "cover" }} sizes="(max-width: 768px) 100vw, 600px" placeholder="blur" blurDataURL={getBlur(b.image)} />
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

    </>
  );
}
