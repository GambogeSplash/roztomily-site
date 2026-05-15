"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Container } from "@/components/ui/Container";
import { Pill } from "@/components/ui/Pill";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

const NAV_ITEMS: { label: string; href: string }[] = [
  { label: "Home",     href: "/" },
  { label: "About",    href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Projects", href: "/projects" },
  { label: "Blog",     href: "/blog" },
];

export function SiteNav() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(href + "/");
  };

  /* Pages whose unscrolled state shows a dark-overlay painterly hero under
     the nav (need white nav text). /contact uses a light scrim now, so nav
     goes dark there. */
  const isPainterlyHero =
    pathname === "/" || pathname === "/about";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll + compensate for scrollbar to prevent horizontal shift
  useEffect(() => {
    if (drawerOpen) {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      const prevOverflow = document.body.style.overflow;
      const prevPaddingRight = document.body.style.paddingRight;
      document.body.style.overflow = "hidden";
      if (scrollbarWidth > 0) {
        document.body.style.paddingRight = `${scrollbarWidth}px`;
      }
      return () => {
        document.body.style.overflow = prevOverflow;
        document.body.style.paddingRight = prevPaddingRight;
      };
    }
  }, [drawerOpen]);

  // Close drawer on route change
  useEffect(() => { setDrawerOpen(false); }, [pathname]);

  return (
    <>
      <header
        data-scrolled={scrolled ? "true" : undefined}
        className="site-nav"
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          background: scrolled ? "var(--nav-bg)" : "transparent",
          backdropFilter: scrolled ? "saturate(140%) blur(10px)" : "none",
          WebkitBackdropFilter: scrolled ? "saturate(140%) blur(10px)" : "none",
          borderBottom: scrolled ? "1px solid var(--border-hairline)" : "1px solid transparent",
          color: scrolled
            ? "var(--text-primary)"
            : isPainterlyHero
              ? "var(--text-fixed-white)"
              : "var(--text-fixed-ink)",
          transition:
            "background var(--motion-normal) var(--motion-easing), border-color var(--motion-normal) var(--motion-easing), backdrop-filter var(--motion-normal) var(--motion-easing), color var(--motion-normal) var(--motion-easing)",
        }}
      >
        <Container>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingBlock: "var(--space-4)", gap: "var(--space-6)" }}>
            <Link href="/" aria-label="Roztomily home" className="site-nav__brand">
              <Image src="/roztomily/logo.svg" alt="" width={240} height={48} priority unoptimized style={{ height: 36, width: "auto" }} />
              <span
                style={{
                  fontFamily: "var(--font-extended)",
                  fontSize: 22,
                  fontWeight: 600,
                  letterSpacing: "0.02em",
                  textTransform: "uppercase",
                  color: "inherit",
                }}
              >
                ROZTOMILY
              </span>
            </Link>

            <nav className="nav-menu" aria-label="Primary">
              {NAV_ITEMS.map((it) => (
                <Link
                  key={it.href}
                  href={it.href}
                  className="nav-link"
                  data-active={isActive(it.href) ? "true" : undefined}
                  aria-current={isActive(it.href) ? "page" : undefined}
                >
                  {it.label}
                </Link>
              ))}
            </nav>

            <div className="site-nav__actions">
              <ThemeToggle />
              <Pill href="/contact">Start a project</Pill>
            </div>

            <button
              type="button"
              aria-label={drawerOpen ? "Close menu" : "Open menu"}
              aria-expanded={drawerOpen}
              className="burger"
              data-open={drawerOpen ? "true" : undefined}
              onClick={() => setDrawerOpen((v) => !v)}
            >
              <span className="burger__line burger__line--top" />
              <span className="burger__line burger__line--bottom" />
            </button>
          </div>
        </Container>
      </header>

      {/* Mobile drawer — full-screen translucent overlay */}
      <div
        className="mobile-drawer"
        data-open={drawerOpen ? "true" : undefined}
        role="dialog"
        aria-modal="true"
        aria-hidden={!drawerOpen}
      >
        <Container>
          {/* Top row mirrors the nav: logo+name left, close burger right */}
          <div className="mobile-drawer__top">
            <Link href="/" onClick={() => setDrawerOpen(false)} aria-label="Roztomily home" className="site-nav__brand">
              <Image src="/roztomily/logo.svg" alt="" width={240} height={48} unoptimized style={{ height: 36, width: "auto" }} />
              <span
                style={{
                  fontFamily: "var(--font-extended)",
                  fontSize: 22,
                  fontWeight: 600,
                  letterSpacing: "0.02em",
                  textTransform: "uppercase",
                }}
              >
                ROZTOMILY
              </span>
            </Link>
            <button
              type="button"
              onClick={() => setDrawerOpen(false)}
              aria-label="Close menu"
              className="burger"
              data-open="true"
            >
              <span className="burger__line burger__line--top" />
              <span className="burger__line burger__line--bottom" />
            </button>
          </div>

          {/* Nav list — each item has a right arrow */}
          <nav className="mobile-drawer__nav" aria-label="Mobile primary">
            {NAV_ITEMS.map((it) => (
              <Link
                key={it.href}
                href={it.href}
                onClick={() => setDrawerOpen(false)}
                data-active={isActive(it.href) ? "true" : undefined}
                className="mobile-drawer__item"
              >
                <span>{it.label}</span>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            ))}
          </nav>

          {/* Bottom CTA */}
          <div className="mobile-drawer__cta">
            <Pill href="/contact">Start a project</Pill>
          </div>
        </Container>
      </div>
    </>
  );
}
