import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { TiltCard } from "@/components/ui/TiltCard";
import { ParallaxBg } from "@/components/ui/ParallaxBg";

export const metadata: Metadata = {
  title: "About · Roztomily",
  description:
    "Roztomily is a full-service Integrated Marketing Communications agency built for brands that want to be seen, understood, and remembered.",
};

const REASONS = [
  { n: "01", note: "Visibility",  title: "Be seen in competitive markets" },
  { n: "02", note: "Reputation",  title: "Build strong, consistent reputations" },
  { n: "03", note: "Traction",    title: "Launch campaigns that generate real traction" },
  { n: "04", note: "Culture",     title: "Stay culturally relevant" },
  { n: "05", note: "Scale",       title: "Scale influence across multiple platforms" },
];

const PRESS_NEWS = [
  { image: "/roztomily/projects/valuejet-brand-launch/01.jpg",          tag: "Campaign",          title: "ValueJet · Airline Launch Campaign",              href: "/projects/valuejet-brand-launch" },
  { image: "/roztomily/projects/kerrygold-world-milk-day/01.jpg",       tag: "Experiential",      title: "Kerrygold · World Milk Day",                      href: "/projects/kerrygold-world-milk-day" },
  { image: "/roztomily/projects/bord-bia-meet-the-maker/01.jpg",        tag: "Experiential",      title: "Bord Bia · Meet the Maker",                        href: "/projects/bord-bia-meet-the-maker" },
  { image: "/roztomily/projects/premier-cool-ready-up-your-cool/01.png",tag: "Creative Production", title: "Premier Cool · “Ready Up Your Cool” TVC",       href: "/projects/premier-cool-ready-up-your-cool" },
  { image: "/roztomily/projects/regal-turn-up-and-shine/01.jpg",        tag: "PR & Brand",        title: "Regal Gin · Turn Up & Shine",                      href: "/projects/regal-turn-up-and-shine" },
  { image: "/roztomily/projects/jamila-lawal/01.jpg",                   tag: "Talent",            title: "Jamila Lawal · Talent Management",                 href: "/projects/jamila-lawal" },
];

export default function About() {
  return (
    <>
      {/* Painterly hero, agency tagline */}
      <ParallaxBg
        speed={0.2}
        className="painterly-hero painterly-hero--about"
        style={{
          backgroundImage: "url(/roztomily/imagery/about-calm/09-sun-behind-building.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center 35%",
        }}
        overlay={
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(to bottom, rgba(13,10,8,0.62) 0%, rgba(13,10,8,0.74) 100%)",
            }}
          />
        }
      >
        <Container style={{ color: "var(--text-fixed-white)", position: "relative" }}>
          <Reveal>
            <div style={{ maxWidth: 780, marginInline: "auto", textAlign: "center" }}>
              <h1 className="t-display-l">Built for brands that want to be seen, understood, &amp; remembered.</h1>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div style={{ maxWidth: 600, marginInline: "auto", marginTop: "var(--space-12)", color: "rgba(255,250,245,0.86)", display: "grid", gap: "var(--space-5)" }}>
              <p className="t-body-m">
                Roztomily Group is a full-service Integrated Marketing Communications agency based in Lagos, Nigeria. We exist at the intersection of strategy, creativity, and execution, helping brands navigate an increasingly complex media and consumer landscape with clarity and confidence.
              </p>
              <p className="t-body-m">
                From shaping brand narratives to executing large-scale campaigns, we partner with businesses to build visibility, strengthen perception, and drive meaningful growth.
              </p>
              <p className="t-body-m" style={{ fontStyle: "italic", color: "rgba(255,250,245,0.7)" }}>
                We make the work. We don&apos;t just talk about it.
              </p>
            </div>
          </Reveal>
        </Container>
      </ParallaxBg>

      {/* What sets us apart */}
      <section className="section section--page">
        <Container>
          <div className="grid-2">
            <Reveal>
              <div>
                <Eyebrow>What sets us apart</Eyebrow>
                <h2 className="t-display-m" style={{ marginTop: "var(--space-4)" }}>Strategy. Creativity. Execution.</h2>
                <p className="t-body-l" style={{ marginTop: "var(--space-5)", color: "var(--text-warm)" }}>
                  We don&apos;t treat PR, media, digital, or experiential as isolated functions. We bring them together into a single, cohesive communication system that works seamlessly across channels and audiences.
                </p>
                <p className="t-body-l" style={{ marginTop: "var(--space-4)", color: "var(--text-warm)" }}>
                  This integrated approach allows us to move brands from awareness to relevance, and from relevance to authority.
                </p>
              </div>
            </Reveal>
            <Reveal delay={120}>
              <div style={{ borderRadius: "var(--radius-xl)", overflow: "hidden", aspectRatio: "1 / 1", position: "relative", boxShadow: "var(--shadow-card)" }}>
                <Image src="/roztomily/imagery/strategy/01-diagram-drawing.jpg" alt="" fill style={{ objectFit: "cover" }} />
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Our approach */}
      <section className="section section--surface">
        <Container>
          <Reveal>
            <Eyebrow>Our approach</Eyebrow>
            <h2 className="t-display-m" style={{ marginTop: "var(--space-4)", marginBottom: "var(--space-6)" }}>Limitless creatives. No one-size-fits-all.</h2>
            <p className="t-body-l" style={{ color: "var(--text-warm)", maxWidth: 720 }}>
              Every brand has a different challenge, visibility, perception, positioning, or growth. We diagnose the core issue, design tailored communication systems, and deploy solutions that address the immediate challenge while strengthening long-term relevance.
            </p>
          </Reveal>
        </Container>
      </section>

      {/* Why choose Roztomily — numbered bento on dark inverse */}
      <section
        style={{
          paddingTop: "var(--section-pad-y)",
          paddingBottom: "var(--section-pad-y)",
          background: "#0d0a08",
          color: "#ffffff",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Subtle film-grain texture overlay — adds tactile warmth to flat black */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "url('/roztomily/imagery/textures/08-paper-aged.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            mixBlendMode: "overlay",
            opacity: 0.18,
            pointerEvents: "none",
          }}
        />
        <Container style={{ position: "relative" }}>
          <Reveal>
            <div style={{ maxWidth: 760, marginBottom: "var(--space-12)" }}>
              <p className="t-caption" style={{ color: "rgba(255,255,255,0.6)", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: "var(--space-3)" }}>Why choose Roztomily</p>
              <h2 className="t-display-m" style={{ color: "#fff" }}>
                Modern brands don&apos;t just need campaigns. They need momentum.
              </h2>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div
              className="why-bento"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gridAutoRows: "minmax(220px, auto)",
                gap: "var(--space-4)",
              }}
            >
              {REASONS.map((r, i) => (
                <div
                  key={r.n}
                  style={{
                    gridColumn: i === 0 ? "span 2" : "span 1",
                    position: "relative",
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "var(--radius-lg)",
                    padding: "var(--space-10) var(--space-8)",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    minHeight: 220,
                    overflow: "hidden",
                    transition: "background var(--motion-normal) var(--motion-easing), border-color var(--motion-normal) var(--motion-easing)",
                  }}
                  className="why-card"
                >
                  <span
                    aria-hidden
                    style={{
                      fontFamily: "var(--font-extended)",
                      fontSize: 64,
                      fontWeight: 600,
                      letterSpacing: "0.02em",
                      color: "var(--bg-teal)",
                      lineHeight: 1,
                    }}
                  >
                    {r.n}
                  </span>
                  <div>
                    <p style={{ fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", marginBottom: "var(--space-2)" }}>
                      {r.note}
                    </p>
                    <p style={{ fontSize: i === 0 ? 24 : 18, fontWeight: 500, color: "#ffffff", letterSpacing: "-0.01em", lineHeight: 1.25 }}>{r.title}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Selected work */}
      <section className="section section--page">
        <Container>
          <Reveal>
            <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: "var(--space-10)" }}>
              <h2 className="t-display-s">Selected work</h2>
              <Link href="/projects" className="explore-link" style={{ fontSize: 16 }}>
                View all
              </Link>
            </div>
          </Reveal>
          <div className="grid-3" style={{ gap: "var(--space-6)" }}>
            {PRESS_NEWS.slice(0, 3).map((it, i) => (
              <Reveal key={it.title} delay={i * 60}>
                <TiltCard maxTilt={3}>
                  <Link href={it.href} data-cursor="case-study" style={{ display: "block" }}>
                    <div style={{ aspectRatio: "4 / 3", position: "relative", borderRadius: "var(--radius-lg)", overflow: "hidden", background: "var(--product-card-bg)" }}>
                      <Image src={it.image} alt="" fill style={{ objectFit: "cover" }} sizes="(max-width: 768px) 100vw, 33vw" />
                    </div>
                    <h4 className="t-heading-s" style={{ marginTop: "var(--space-4)" }}>{it.title}</h4>
                    <p style={{ marginTop: 6, fontSize: 13, color: "var(--text-muted)" }}>{it.tag}</p>
                  </Link>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

    </>
  );
}
