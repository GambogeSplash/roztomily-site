import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Pill } from "@/components/ui/Pill";
import { Reveal } from "@/components/ui/Reveal";
import { ParallaxBg } from "@/components/ui/ParallaxBg";

export function Hero() {
  return (
    <ParallaxBg
      speed={0.12}
      className="painterly-hero"
      style={{
        backgroundImage: "url('/roztomily/imagery/hero/06-malik-buraimoh-boats.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center 55%",
      }}
      overlay={
        <>
          {/* Cycling video layer — image stays as the thumbnail, video fades in
              every ~14s, plays a few seconds, fades back to image */}
          <video
            className="hero-video"
            src="/roztomily/imagery/videos/03-lagos-riverfront.mp4"
            autoPlay
            loop
            muted
            playsInline
            aria-hidden
          />
          {/* Stronger dark scrim for text legibility + atmospheric mood */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(to bottom, rgba(13,10,8,0.86) 0%, rgba(13,10,8,0.92) 100%)",
              zIndex: 2,
            }}
          />
          {/* Red brand glare — sits ABOVE the scrim so the screen blend
              actually lifts the red through everything */}
          <div className="hero-red-glare" aria-hidden />
        </>
      }
    >
      <Container style={{ position: "relative", textAlign: "center", color: "var(--text-fixed-white)" }}>
        <Reveal>
          <Link href="/projects/valuejet-brand-launch" className="series-a-banner">
            <span aria-hidden className="series-a-banner__dot">
              <span className="series-a-banner__pulse" />
            </span>
            <span className="series-a-banner__text">
              ValueJet, Airline Launch Campaign · 360% earned media lift
            </span>
            <span aria-hidden className="series-a-banner__arrow">→</span>
          </Link>
        </Reveal>

        <Reveal delay={60}>
          <h1
            className="t-display-l hero-headline"
            style={{ maxWidth: 760, marginInline: "auto" }}
          >
            We don&apos;t just market brands. We engineer influence.
          </h1>
        </Reveal>

        <Reveal delay={120}>
          <p className="t-body-l hero-subtext" style={{ marginTop: "var(--space-6)", maxWidth: 640, marginInline: "auto", color: "rgba(255,250,245,0.86)" }}>
            Roztomily is a full-service Integrated Marketing Communications agency. We help brands be seen, understood, and remembered, across PR, media, digital, experiential, creative, and talent.
          </p>
        </Reveal>

        <Reveal delay={180}>
          <div style={{ marginTop: "var(--space-8)", display: "flex", justifyContent: "center" }}>
            <Pill href="/contact">Start a project</Pill>
          </div>
        </Reveal>
      </Container>
    </ParallaxBg>
  );
}
