import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { ScrollProgress } from "@/components/ui/ScrollProgress";

type Project = {
  tag: string;
  client: string;
  title: string;
  subtitle: string;
  duration: string;
  date: string;
  cover: string;
  role: string;
  stack: string[];
  liveUrl?: string;
  body: { h?: string; p: string }[];
};

const PROJECTS: Record<string, Project> = {
  // Roztomily campaign case studies
  "valuejet-brand-launch": {
    tag: "PR & Brand Marketing",
    client: "ValueJet",
    title: "Airline Launch Campaign",
    subtitle: "Integrated launch communications and event execution for ValueJet's entry into the Nigerian aviation market.",
    duration: "4 min read",
    date: "October 2022",
    cover: "/roztomily/projects/valuejet-brand-launch/01.jpg",
    role: "PR & brand marketing lead",
    stack: ["Earned media", "Event production", "Social amplification"],
    body: [
      { h: "Challenge", p: "In October 2022, ValueJet Airline entered the Nigerian aviation industry, marking its debut in the domestic air travel market. The launch presented an opportunity to introduce the brand and its service offerings, particularly its flexible fare pricing structure designed to make air travel more accessible to a wider range of Nigerian travellers." },
      { h: "Approach", p: "An integrated communications strategy was developed to position the airline's proposition through a targeted media mix, while overseeing the execution of the official launch event and supporting campaign rollout." },
      { h: "Outcomes", p: "Seamless execution of the official launch event, including event set up, production, guest experience, and media coordination. Strong media and public engagement around ValueJet's entry. Over 360% growth in earned media across print, blogs, television and social media. #FlyValueJet trended three times on X (formerly Twitter), reaching over 2 million users." },
    ],
  },
  "premier-cool-ready-up-your-cool": {
    tag: "Creative Production & Advertising",
    client: "Premier Cool",
    title: "“Ready Up Your Cool” TVC",
    subtitle: "End-to-end creative production and delivery of a two-part TVC series for Premier Cool's Black Soap and Ultimate product lines.",
    duration: "3 min read",
    date: "2022",
    cover: "/roztomily/projects/premier-cool-ready-up-your-cool/01.png",
    role: "Creative production lead",
    stack: ["TVC production", "Casting", "Location & logistics"],
    body: [
      { h: "Challenge", p: "Premier Cool sought to strengthen its market positioning by connecting with a younger, lifestyle-driven audience through a bold and relatable campaign that reinforced the brand's promise of comfort, freshness, and everyday ease." },
      { h: "Approach", p: "We championed the end-to-end creative production and delivery of the “Ready Up Your Cool” TVC series across two distinct commercials. Our role spanned concept alignment, cast sourcing, location scouting, production planning, and on-ground coordination, overseeing execution from pre-production through to final delivery with full quality control, brand consistency, and stakeholder collaboration." },
      { h: "Outcomes", p: "Successful delivery of high-quality commercials aligned with Premier Cool's brand positioning. Seamless coordination across all production phases, from scripting to final execution. PR support for commercial rollout across media platforms." },
    ],
  },
  "bord-bia-meet-the-maker": {
    tag: "Experiential Marketing",
    client: "Bord Bia",
    title: "Meet the Maker",
    subtitle: "The first Meet the Maker event in Africa · staged at the Irish Consulate in Lagos to promote premium Irish spirits in Nigeria.",
    duration: "4 min read",
    date: "2021",
    cover: "/roztomily/projects/bord-bia-meet-the-maker/01.jpg",
    role: "Experiential marketing lead",
    stack: ["Event production", "Stakeholder engagement", "Earned media"],
    body: [
      { h: "Challenge", p: "Bord Bia hosted its first Meet the Maker event in Africa in 2021 at the Irish Consulate in Lagos to promote premium Irish spirits in Nigeria, showcase Irish distillers, and deepen engagement with key stakeholders within the local market." },
      { h: "Approach", p: "A detailed communications and event execution plan was developed to guide the rollout, ensuring strong stakeholder participation and coordinated media presence. We supported the experience with audio-visual production and structured media amplification across digital and traditional platforms." },
      { h: "Outcomes", p: "Successfully delivered the first Meet the Maker event in Africa with strong stakeholder attendance. Achieved over 50% in earned media value across campaign coverage. Extended visibility through coordinated media and content amplification." },
    ],
  },
  "kerrygold-world-milk-day": {
    tag: "Experiential Marketing",
    client: "Kerrygold",
    title: "World Milk Day",
    subtitle: "Three-day mall activation plus influencer-led storytelling and an interactive online competition to spotlight Irish milk for World Milk Day.",
    duration: "4 min read",
    date: "May–July 2022",
    cover: "/roztomily/projects/kerrygold-world-milk-day/01.jpg",
    role: "Campaign lead",
    stack: ["Mall activation", "Influencer", "Social competition"],
    body: [
      { h: "Challenge", p: "To leverage World Milk Day as a strategic moment, Bord Bia partnered with Ornua's Kerrygold to increase awareness of the quality and nutritional benefits of Irish milk among Nigerian consumers." },
      { h: "Approach", p: "The campaign combined on-ground engagement with digital amplification to drive both awareness and participation. In the lead-up to World Milk Day, a three-day offline activation was delivered across select malls, supported by influencer-led storytelling and an interactive online competition that encouraged consumers to create and share their own milk-based recipes." },
      { h: "Outcomes", p: "Successfully executed a three-day mall activation with strong foot traffic and consumer participation. Reached over 12 million users across digital and social platforms. Delivered over 330% value-add on influencer media spend through 40 content pieces and mentions. Increased Kerrygold's Instagram following by 20% between May and July 2022." },
    ],
  },
  "carex-carextra-campaign": {
    tag: "Experiential Marketing",
    client: "Carex",
    title: "Carextra Campaign",
    subtitle: "Experiential activation at Ikeja City Mall translating Carex's Carextra concept into a live care-and-pamper brand experience.",
    duration: "3 min read",
    date: "2022",
    cover: "/roztomily/projects/carex-carextra-campaign/01.jpg",
    role: "Experiential lead",
    stack: ["Mall activation", "Brand ambassador", "Foot-traffic engagement"],
    body: [
      { h: "Challenge", p: "Recognising the need to build a more personal and engaging connection with consumers, Carex translated its Carextra campaign into a physical experiential activation designed to bring care and brand interaction directly to shoppers." },
      { h: "Approach", p: "We led the experiential execution, bringing the concept to life at Ikeja City Mall through a branded activation hub that offered visitors care and pamper sessions. This was further enhanced with a meet-and-greet featuring brand ambassador Jbums, driving foot traffic and strengthening emotional connection." },
      { h: "Outcomes", p: "Successfully delivered a high-traffic experiential activation at Ikeja City Mall. Increased visibility for the brand. Generated strong consumer participation through care and pamper engagement sessions." },
    ],
  },
  "regal-turn-up-and-shine": {
    tag: "PR & Brand Marketing",
    client: "Regal Gin",
    title: "Turn Up & Shine",
    subtitle: "Phased media and content amplification strategy for REGAL Gin's sponsorship of the 2019 Afrobeat Party, celebrating the legacy of Fela Anikulapo Kuti.",
    duration: "3 min read",
    date: "2019",
    cover: "/roztomily/projects/regal-turn-up-and-shine/01.jpg",
    role: "PR strategy lead",
    stack: ["Sponsorship activation", "Influencer", "Content amplification"],
    body: [
      { h: "Challenge", p: "REGAL Gin, launched in Nigeria in 1983, has maintained a strong presence within the gin category. To further promote the brand, drive appeal, and increase its market share, REGAL sponsored the 2019 edition of the Afrobeat Party, an annual concert celebrating the legacy of Fela Anikulapo Kuti." },
      { h: "Approach", p: "To maximise the impact of the sponsorship, a phased media and content amplification strategy was executed across pre-event, live event, and post-event stages. Influencers were activated to drive visibility and attendance, while audio-visual content and audience feedback were captured to extend the campaign lifecycle beyond the event." },
      { h: "Outcomes", p: "Amplified event highlights across relevant media and digital platforms. Increased media visibility for REGAL Gin across online and print channels. Extended campaign reach through influencer-led content and post-event amplification." },
    ],
  },
  "good-mama-9ja-queen-fashion-show": {
    tag: "Experiential Marketing",
    client: "Good Mama",
    title: "9ja Queen Open Market Fashion Show",
    subtitle: "Grassroots open-market activations bringing the Good Mama brand directly to traders and shoppers across Nigeria.",
    duration: "3 min read",
    date: "2022",
    cover: "/roztomily/projects/good-mama-9ja-queen-fashion-show/01.jpg",
    role: "Experiential lead",
    stack: ["Grassroots activation", "Open-market engagement", "Reward mechanics"],
    body: [
      { h: "Challenge", p: "Good Mama launched the 9ja Queen Open Market Fashion Show to deepen engagement with everyday consumers by activating directly within high-traffic market environments across Nigeria." },
      { h: "Approach", p: "The campaign focused on bringing brand experience closer to consumers through interactive, reward-driven engagement and live activations. Execution was anchored in grassroots visibility, ensuring strong connection with traders, shoppers, and retail communities." },
      { h: "Outcomes", p: "Strong visibility across multiple open markets nationwide. Increased emotional connection with everyday consumers. High engagement through interactive on-ground activations. Positive sentiment across both offline and digital channels. Strengthened brand presence within core consumer communities." },
    ],
  },
  "jamila-lawal": {
    tag: "Talent Management",
    client: "Jamila Lawal",
    title: "Talent Management",
    subtitle: "Tailored talent representation for nutrition expert and food content creator Jamila Lawal.",
    duration: "3 min read",
    date: "Ongoing",
    cover: "/roztomily/projects/jamila-lawal/01.jpg",
    role: "Talent representation",
    stack: ["Positioning", "Partnership negotiation", "Media exposure"],
    body: [
      { h: "Challenge", p: "As a nutrition expert and food content creator, Jamila Lawal required structured representation to strengthen her personal brand, secure collaborations, and expand her visibility within the health and lifestyle space." },
      { h: "Approach", p: "We were engaged to provide tailored talent representation supporting positioning, media exposure, and partnership negotiation, allowing her to focus on content creation while building a stronger public profile." },
      { h: "Outcomes", p: "Strengthened credibility within the nutrition and lifestyle media space. Secured brand collaborations and strategic partnerships. Increased visibility across events and industry platforms. Improved consistency in brand messaging and representation." },
    ],
  },
};

/** Gallery images per project, every file under public/roztomily/projects/<slug>/. */
const GALLERY: Record<string, string[]> = {
  "valuejet-brand-launch":            ["/roztomily/projects/valuejet-brand-launch/01.jpg",            "/roztomily/projects/valuejet-brand-launch/02.jpg",            "/roztomily/projects/valuejet-brand-launch/03.jpg"],
  "premier-cool-ready-up-your-cool":  ["/roztomily/projects/premier-cool-ready-up-your-cool/01.png"],
  "bord-bia-meet-the-maker":          ["/roztomily/projects/bord-bia-meet-the-maker/01.jpg"],
  "kerrygold-world-milk-day":         ["/roztomily/projects/kerrygold-world-milk-day/01.jpg"],
  "carex-carextra-campaign":          ["/roztomily/projects/carex-carextra-campaign/01.jpg"],
  "regal-turn-up-and-shine":          ["/roztomily/projects/regal-turn-up-and-shine/01.jpg"],
  "good-mama-9ja-queen-fashion-show": ["/roztomily/projects/good-mama-9ja-queen-fashion-show/01.jpg","/roztomily/projects/good-mama-9ja-queen-fashion-show/02.jpg","/roztomily/projects/good-mama-9ja-queen-fashion-show/03.jpg","/roztomily/projects/good-mama-9ja-queen-fashion-show/04.jpg"],
  "jamila-lawal":                     ["/roztomily/projects/jamila-lawal/01.jpg",                    "/roztomily/projects/jamila-lawal/02.jpg"],
};

export async function generateStaticParams() {
  return Object.keys(PROJECTS).map((slug) => ({ slug }));
}

export async function generateMetadata(props: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const p = PROJECTS[slug];
  if (!p) return { title: "Project" };
  return { title: `${p.client}, ${p.title}`, description: p.subtitle };
}

export default async function ProjectPage(props: PageProps<"/projects/[slug]">) {
  const { slug } = await props.params;
  const p = PROJECTS[slug];
  if (!p) notFound();
  const gallery = (GALLERY[slug] ?? []).filter((src) => src !== p.cover);

  // Slug list — used by the "More projects" section to pick related cards.
  const slugs = Object.keys(PROJECTS);

  // Consolidate Challenge + Approach into 1–2 paragraphs of overview prose.
  // Convert the Outcomes block (if any) into bullet points by splitting on sentences.
  const overviewParas = p.body
    .filter((b) => b.h !== "Outcomes")
    .slice(0, 2)
    .map((b) => b.p);
  const outcomes = p.body.find((b) => b.h === "Outcomes")?.p ?? "";
  const outcomeBullets = outcomes
    ? outcomes
        .split(/(?<=[.!?])\s+/)
        .map((s) => s.trim())
        .filter((s) => s.length > 0)
    : [];

  return (
    <>
      <ScrollProgress targetId="project-body" color="var(--bg-teal)" />

      <article id="project-body" className="services-hero" style={{ marginTop: "calc(var(--nav-height) * -1)", paddingTop: "calc(var(--nav-height) + 100px)", paddingBottom: "var(--space-20)" }}>
        <Container>
          <div style={{ maxWidth: 760, margin: "0 auto" }}>
            <Reveal>
              {/* Category pill — top */}
              <div style={{ marginBottom: "var(--space-5)" }}>
                <span
                  style={{
                    display: "inline-block",
                    padding: "5px 11px",
                    borderRadius: 7,
                    background: "var(--bg-teal)",
                    color: "#ffffff",
                    fontSize: 11.5,
                    fontWeight: 500,
                    letterSpacing: "0",
                    lineHeight: 1.3,
                  }}
                >
                  {p.tag}
                </span>
              </div>
              {/* Title */}
              <h1 className="t-display-l" style={{ marginBottom: "var(--space-4)" }}>{p.title}</h1>
              {/* Date */}
              <p style={{ fontSize: 14, color: "var(--text-muted)", marginBottom: "var(--space-6)" }}>
                {p.date}
              </p>
              <p className="t-body-l" style={{ color: "var(--text-warm)" }}>{p.subtitle}</p>
            </Reveal>
          </div>

          {/* Project cover image — under the title/date */}
          <Reveal delay={120}>
            <div style={{ marginTop: "var(--space-12)", borderRadius: "var(--radius-xl)", overflow: "hidden", aspectRatio: "16 / 9", position: "relative", boxShadow: "var(--shadow-card)" }}>
              <Image src={p.cover} alt={`${p.client}, ${p.title}`} fill style={{ objectFit: "cover" }} priority sizes="(max-width: 1024px) 100vw, 1024px" />
            </div>
          </Reveal>

          <Reveal delay={180}>
            <div
              style={{
                maxWidth: 760, margin: "0 auto", marginTop: "var(--space-12)",
                display: "grid", gridTemplateColumns: "1fr 1fr 1.4fr", gap: "var(--space-8)",
                borderBottom: "1px solid var(--hairline-strong)",
                paddingBottom: "var(--space-10)",
              }}
              className="project-meta"
            >
              <div>
                <p className="t-caption" style={{ color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.1em" }}>Client</p>
                <p className="t-body" style={{ marginTop: 4 }}>{p.client}</p>
              </div>
              <div>
                <p className="t-caption" style={{ color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.1em" }}>Role</p>
                <p className="t-body" style={{ marginTop: 4 }}>{p.role}</p>
              </div>
              <div>
                <p className="t-caption" style={{ color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.1em" }}>Stack</p>
                <p className="t-body" style={{ marginTop: 4 }}>{p.stack.join(" · ")}</p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={220}>
            <div style={{ maxWidth: 760, margin: "0 auto", marginTop: "var(--space-10)", color: "var(--text-warm)" }}>
              <h2 className="t-heading-l" style={{ marginBottom: "var(--space-5)", color: "var(--text-primary)" }}>Overview</h2>
              {overviewParas.map((para, i) => (
                <p key={i} className="t-body-m" style={{ marginTop: i === 0 ? 0 : "var(--space-4)" }}>{para}</p>
              ))}
              {outcomeBullets.length > 0 && (
                <ul style={{ marginTop: "var(--space-6)", display: "grid", gap: "var(--space-3)" }}>
                  {outcomeBullets.map((b, i) => (
                    <li
                      key={i}
                      className="t-body-m"
                      style={{ display: "flex", gap: 10 }}
                    >
                      <span aria-hidden style={{ flexShrink: 0, marginTop: 11, width: 5, height: 5, borderRadius: 999, background: "var(--bg-teal)" }} />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </Reveal>

          {gallery.length > 0 && (
            <Reveal delay={260}>
              <div style={{ marginTop: "var(--space-16)" }}>
                <p className="t-caption" style={{ color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: "var(--space-5)" }}>
                  More from the campaign
                </p>
                <div
                  className="project-gallery"
                  style={{
                    display: "grid",
                    gridTemplateColumns: gallery.length === 1 ? "1fr" : "repeat(2, 1fr)",
                    gap: "var(--space-4)",
                  }}
                >
                  {gallery.map((src, i) => (
                    <div key={src} style={{ position: "relative", aspectRatio: "4 / 3", borderRadius: "var(--radius-lg)", overflow: "hidden", background: "var(--product-card-bg)" }}>
                      <Image src={src} alt={`${p.client}, image ${i + 2}`} fill style={{ objectFit: "cover" }} sizes="(max-width: 768px) 100vw, 50vw" />
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          )}
        </Container>
      </article>

      {/* More projects — show 3 other case studies, excluding the current one */}
      <section className="section section--page" style={{ paddingTop: 0, paddingBottom: "var(--space-20)" }}>
        <Container>
          <Reveal>
            <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: "var(--space-10)" }}>
              <h2 className="t-display-s">More projects</h2>
              <Link href="/projects" className="explore-link" style={{ fontSize: 16 }}>
                See all
              </Link>
            </div>
          </Reveal>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              columnGap: 24,
              rowGap: 48,
            }}
            className="projects-list-grid"
          >
            {slugs
              .filter((s) => s !== slug)
              .slice(0, 3)
              .map((relatedSlug, i) => {
                const rp = PROJECTS[relatedSlug];
                const cover = GALLERY[relatedSlug]?.[0] ?? rp.cover;
                return (
                  <Reveal key={relatedSlug} delay={i * 60}>
                    <Link href={`/projects/${relatedSlug}`} data-cursor="case-study" style={{ display: "block" }}>
                      <div
                        className="project-card__frame"
                        style={{
                          aspectRatio: "3 / 2",
                          position: "relative",
                          borderRadius: 16,
                          overflow: "hidden",
                          background: "var(--product-card-bg)",
                        }}
                      >
                        <Image
                          src={cover}
                          alt={rp.title}
                          fill
                          style={{ objectFit: "cover" }}
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                        <span
                          className="project-card__tag"
                          style={{
                            position: "absolute",
                            right: 10,
                            bottom: 10,
                            zIndex: 4,
                            padding: "4px 9px",
                            borderRadius: 7,
                            background: "var(--bg-teal)",
                            color: "#ffffff",
                            fontSize: 10.5,
                            fontWeight: 500,
                            lineHeight: 1.3,
                            boxShadow: "0 1px 4px rgba(0, 0, 0, 0.22)",
                          }}
                        >
                          {rp.tag}
                        </span>
                      </div>
                      <h3
                        style={{
                          marginTop: 18,
                          marginBottom: 4,
                          fontSize: 20,
                          lineHeight: 1.25,
                          letterSpacing: "-0.018em",
                          fontWeight: 400,
                          fontFamily: "var(--font-display)",
                        }}
                      >
                        {rp.title}
                      </h3>
                      <p style={{ fontSize: 13, color: "var(--text-muted)" }}>
                        {rp.date} · {rp.tag}
                      </p>
                    </Link>
                  </Reveal>
                );
              })}
          </div>
        </Container>
      </section>
    </>
  );
}
