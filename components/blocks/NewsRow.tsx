import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { TiltCard } from "@/components/ui/TiltCard";

/* "Selected projects" block, kept under the NewsRow filename so existing imports still resolve.
   Used on the homepage to surface 3 projects from the portfolio. */

const ITEMS = [
  { image: "/roztomily/projects/valuejet-brand-launch/01.jpg",        tag: "PR & Brand Marketing",  title: "ValueJet · Airline Launch Campaign",     href: "/projects/valuejet-brand-launch" },
  { image: "/roztomily/projects/kerrygold-world-milk-day/01.jpg",     tag: "Experiential",          title: "Kerrygold · World Milk Day",              href: "/projects/kerrygold-world-milk-day" },
  { image: "/roztomily/projects/premier-cool-ready-up-your-cool/01.png", tag: "Creative Production", title: "Premier Cool · “Ready Up Your Cool” TVC", href: "/projects/premier-cool-ready-up-your-cool" },
];

export function NewsRow() {
  return (
    <section className="section section--muted">
      <Container>
        <Reveal>
          <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: "var(--space-10)" }}>
            <h3 className="t-display-s">Projects</h3>
            <Link href="/projects" className="explore-link" style={{ fontSize: 16 }}>
              See all
            </Link>
          </div>
        </Reveal>
        <div className="grid-3">
          {ITEMS.map((it, i) => (
            <Reveal key={it.href} delay={i * 100}>
              <TiltCard maxTilt={3}>
                <Link href={it.href} data-cursor="case-study" style={{ display: "block" }}>
                  <div style={{ aspectRatio: "16 / 10", position: "relative", borderRadius: "var(--radius-lg)", overflow: "hidden", background: "var(--bg-surface)" }}>
                    <Image src={it.image} alt="" fill style={{ objectFit: "cover" }} sizes="(max-width: 768px) 100vw, 33vw" />
                  </div>
                  <h4 className="t-heading-s" style={{ marginTop: "var(--space-5)" }}>{it.title}</h4>
                  <p className="t-caption" style={{ marginTop: "var(--space-2)", color: "var(--text-muted)", textTransform: "none", letterSpacing: 0 }}>
                    {it.tag}
                  </p>
                </Link>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
