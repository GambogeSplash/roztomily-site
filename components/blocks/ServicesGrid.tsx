import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

type Service = {
  eyebrow: string;
  title: string;
  image: string;
  href: string;
};

const SERVICES: Service[] = [
  {
    eyebrow: "PR & Brand",
    title: "We shape perception.",
    image: "/roztomily/services/pr-and-brand-marketing.jpg",
    href: "/services",
  },
  {
    eyebrow: "Experiential",
    title: "Experiences people remember.",
    image: "/roztomily/services/experiential-marketing.jpg",
    href: "/services",
  },
  {
    eyebrow: "Creative Production",
    title: "Ideas, made tangible.",
    image: "/roztomily/services/creative-production-and-advertising.jpg",
    href: "/services",
  },
  {
    eyebrow: "Media Relations",
    title: "Right audience. Right channel.",
    image: "/roztomily/services/media-relations-and-buying.png",
    href: "/services",
  },
  {
    eyebrow: "Digital",
    title: "Visibility into conversion.",
    image: "/roztomily/services/digital-marketing.jpg",
    href: "/services",
  },
  {
    eyebrow: "Talent",
    title: "We represent.",
    image: "/roztomily/services/talent-management.jpg",
    href: "/services",
  },
];

export function ServicesGrid() {
  return (
    <section className="section section--page">
      <Container>
        <Reveal>
          <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: "var(--space-10)" }}>
            <h2 className="t-display-s">What we do</h2>
            <Link href="/services" className="explore-link" style={{ fontSize: 16 }}>
              All disciplines
            </Link>
          </div>
        </Reveal>

        <div className="services-grid">
          {SERVICES.map((s, i) => (
            <Reveal key={s.title} delay={i * 50}>
              <Link href={s.href} className="services-grid__tile">
                <div className="services-grid__image">
                  <Image
                    src={s.image}
                    alt=""
                    fill
                    style={{ objectFit: "cover" }}
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="services-grid__scrim" aria-hidden />
                <div className="services-grid__copy">
                  <p className="services-grid__eyebrow">{s.eyebrow}</p>
                  <div className="services-grid__bottom">
                    <h3 className="services-grid__title">{s.title}</h3>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden className="services-grid__arrow">
                      <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
