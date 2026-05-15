import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

type Service = {
  number: string;
  eyebrow: string;
  title: string;
  body: string;
  href: string;
};

const SERVICES: Service[] = [
  {
    number: "01",
    eyebrow: "PR & Brand",
    title: "We shape perception.",
    body: "Narrative development, earned media, executive thought leadership, crisis response.",
    href: "/services/pr-and-brand-marketing",
  },
  {
    number: "02",
    eyebrow: "Experiential",
    title: "Experiences people remember.",
    body: "Mall activations, brand events, ambassador moments, grassroots community work.",
    href: "/services/experiential-marketing",
  },
  {
    number: "03",
    eyebrow: "Creative Production",
    title: "Ideas, made tangible.",
    body: "TVCs end-to-end, campaign rollout, content systems, quality control.",
    href: "/services/creative-production-and-advertising",
  },
  {
    number: "04",
    eyebrow: "Media Relations",
    title: "Right audience. Right channel.",
    body: "Earned media, paid planning, crisis response, performance reporting.",
    href: "/services/media-relations-and-media-buying",
  },
  {
    number: "05",
    eyebrow: "Digital",
    title: "Visibility into conversion.",
    body: "Performance campaigns, social strategy, content production, community management.",
    href: "/services/digital-marketing",
  },
  {
    number: "06",
    eyebrow: "Talent",
    title: "We represent.",
    body: "Talent representation across nutrition, lifestyle, music, culture. Brand–talent matchmaking.",
    href: "/services/talent-management",
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

        <ul className="services-list">
          {SERVICES.map((s, i) => (
            <Reveal key={s.number} delay={i * 40}>
              <li className="services-list__row">
                <Link href={s.href} className="services-list__link">
                  <span className="services-list__number" aria-hidden>{s.number}</span>
                  <span className="services-list__copy">
                    <span className="services-list__eyebrow">{s.eyebrow}</span>
                    <span className="services-list__title">{s.title}</span>
                  </span>
                  <span className="services-list__body">{s.body}</span>
                  <svg
                    className="services-list__arrow"
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden
                  >
                    <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
              </li>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}
