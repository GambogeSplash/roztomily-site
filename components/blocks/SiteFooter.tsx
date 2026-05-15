"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Container } from "@/components/ui/Container";

type Social = { label: string; href: string; icon: "instagram" | "linkedin" | "x" | "email" };

const SOCIALS: Social[] = [
  { label: "Instagram", href: "https://instagram.com/roztomily",       icon: "instagram" },
  { label: "LinkedIn",  href: "https://linkedin.com/company/roztomily", icon: "linkedin"  },
  { label: "X",         href: "https://x.com/roztomily",               icon: "x"         },
  { label: "Email",     href: "mailto:hello@roztomilygroup.com",       icon: "email"     },
];

function Icon({ kind }: { kind: Social["icon"] }) {
  if (kind === "instagram") {
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
        <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.6" />
        <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.6" />
        <circle cx="17.5" cy="6.5" r="1.1" fill="currentColor" />
      </svg>
    );
  }
  if (kind === "linkedin") {
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
        <rect x="3" y="3" width="18" height="18" rx="3" stroke="currentColor" strokeWidth="1.6" />
        <path d="M7 10v7M7 7.5v.01M11 17v-4.5a2 2 0 0 1 4 0V17M11 17v-7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    );
  }
  if (kind === "x") {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M4 4l16 16M20 4L4 20" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    );
  }
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.6" />
      <path d="M4 7l8 6 8-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* Routes where the "Let's build momentum together" CTA should appear.
   Excludes /contact (you're already there) and any one-off static pages
   like /privacy-policy. */
function shouldShowCta(pathname: string): boolean {
  if (pathname === "/") return true;
  if (pathname === "/about") return true;
  if (pathname === "/services") return true;
  if (pathname === "/projects" || pathname.startsWith("/projects/")) return true;
  return false;
}

export function SiteFooter() {
  const pathname = usePathname();
  const showCta = shouldShowCta(pathname);

  return (
    <footer
      style={{
        position: "relative",
        marginTop: 0,
        backgroundImage: "url('/roztomily/imagery/hero/footer-04-miguel-almeida-water.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center 30%",
        backgroundRepeat: "no-repeat",
        backgroundColor: "var(--bg-teal)",
        color: "var(--text-fixed-white)",
        paddingTop: "var(--space-32)",
        paddingBottom: "var(--space-12)",
        minHeight: 520,
        overflow: "hidden",
      }}
    >
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, rgba(220, 44, 37, 0.82) 0%, rgba(140, 24, 20, 0.92) 38%, rgba(40, 10, 8, 0.96) 72%, rgba(4, 2, 2, 0.98) 100%)",
        }}
      />
      {/* SVG-generated noise — true pixel grain, no raster file needed.
          feTurbulence creates fractal noise; image-rendering: pixelated keeps
          the grain crisp on retina. Sits over the red gradient. */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.85 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
          backgroundSize: "240px 240px",
          backgroundRepeat: "repeat",
          imageRendering: "pixelated",
          mixBlendMode: "overlay",
          opacity: 0.42,
          pointerEvents: "none",
        }}
      />
      {/* Subtle pixel mosaic — large blocks for visible "8-bit" character */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='8' height='8'><rect width='8' height='8' fill='black' fill-opacity='0.04'/><rect x='4' y='0' width='4' height='4' fill='white' fill-opacity='0.06'/><rect x='0' y='4' width='4' height='4' fill='white' fill-opacity='0.06'/></svg>\")",
          backgroundSize: "8px 8px",
          backgroundRepeat: "repeat",
          mixBlendMode: "overlay",
          opacity: 0.5,
          pointerEvents: "none",
        }}
      />

      <Container style={{ position: "relative" }}>
        {showCta && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "var(--space-8)",
              paddingBottom: "var(--space-12)",
              marginBottom: "var(--space-12)",
              borderBottom: "1px solid rgba(255,255,255,0.18)",
              flexWrap: "wrap",
            }}
          >
            <h2
              className="t-display-m"
              style={{
                color: "var(--text-fixed-white)",
                maxWidth: 640,
                letterSpacing: "-0.02em",
                lineHeight: 1.08,
                margin: 0,
              }}
            >
              Let&rsquo;s build momentum together.
            </h2>
            <Link href="/contact" className="footer-cta-link">
              <span>Start a project</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>
        )}

        {/* Brand · contact · socials */}
        <div className="footer-cols" style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr 1fr", gap: "var(--space-12)", paddingBottom: "var(--space-12)", borderBottom: "1px solid rgba(255,255,255,0.18)" }}>
          {/* Brand column */}
          <div>
            <div style={{ display: "flex", alignItems: "center", marginBottom: "var(--space-5)" }}>
              <Image src="/roztomily/logo.svg" alt="" width={260} height={48} unoptimized style={{ height: 36, width: "auto" }} />
              <span
                style={{
                  fontFamily: "var(--font-extended)",
                  fontSize: 26,
                  fontWeight: 600,
                  letterSpacing: "0.02em",
                  textTransform: "uppercase",
                  marginLeft: 10,
                }}
              >
                ROZTOMILY
              </span>
            </div>
            <p className="t-body" style={{ color: "rgba(255,255,255,0.86)", maxWidth: 380 }}>
              A full-service Integrated Marketing Communications agency. We help brands be seen, understood, and remembered.
            </p>
          </div>

          {/* Contact column */}
          <div>
            <h4 className="t-caption" style={{ color: "rgba(255,255,255,0.6)", marginBottom: "var(--space-4)" }}>
              Contact
            </h4>
            <ul style={{ display: "grid", gap: 10, fontSize: 14, color: "rgba(255,255,255,0.92)" }}>
              <li>
                <a href="mailto:hello@roztomilygroup.com" style={{ borderBottom: "1px solid rgba(255,255,255,0.32)" }}>
                  hello@roztomilygroup.com
                </a>
              </li>
              <li>
                <a href="tel:+2349000000000" style={{ borderBottom: "1px solid rgba(255,255,255,0.32)" }}>
                  +234 90 000 0000
                </a>
              </li>
              <li style={{ color: "rgba(255,255,255,0.6)", paddingTop: 4 }}>Lagos, Nigeria</li>
            </ul>
          </div>

          {/* Socials column */}
          <div>
            <h4 className="t-caption" style={{ color: "rgba(255,255,255,0.6)", marginBottom: "var(--space-4)" }}>
              Follow
            </h4>
            <ul style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              {SOCIALS.map((s) => (
                <li key={s.label}>
                  <Link
                    href={s.href}
                    aria-label={s.label}
                    target={s.icon === "email" ? undefined : "_blank"}
                    rel={s.icon === "email" ? undefined : "noopener noreferrer"}
                    className="social-icon"
                  >
                    <Icon kind={s.icon} />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom row */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "var(--space-6)",
            fontSize: 13,
            color: "rgba(255,255,255,0.65)",
            gap: "var(--space-6)",
            flexWrap: "wrap",
          }}
        >
          <span>© Roztomily Group 2026. All rights reserved.</span>
        </div>
      </Container>
    </footer>
  );
}
