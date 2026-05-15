import type { Metadata } from "next";
import Image from "next/image";
import { getBlur } from "@/lib/blur";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Pill } from "@/components/ui/Pill";

type Service = {
  number: string;
  title: string;
  short: string;
  body: string;
  image: string;
  features: { title: string; body: string }[];
};

const SERVICES: Record<string, Service> = {
  "pr-and-brand-marketing": {
    number: "01",
    title: "PR & Brand Marketing",
    short: "We shape perception and build credibility.",
    body: "From narrative development to strategic communications, we help brands own their story and earn public trust — across earned media, executive thought leadership, and crisis response.",
    image: "/roztomily/services/pr-and-brand-marketing.jpg",
    features: [
      { title: "Narrative development",      body: "Sharp brand stories, written for the audiences that matter." },
      { title: "Earned media",               body: "Long-standing editor relationships across Nigeria + West Africa." },
      { title: "Executive thought leadership", body: "Founders and execs positioned as authoritative voices in their space." },
      { title: "Crisis response",            body: "Structured frameworks that stabilise narrative under pressure." },
    ],
  },
  "experiential-marketing": {
    number: "02",
    title: "Experiential Marketing",
    short: "Brand experiences people remember.",
    body: "Immersive activations that create emotional connection, drive engagement, and turn audiences into communities — from mall takeovers to brand-led events and grassroots open-market activations.",
    image: "/roztomily/services/experiential-marketing.jpg",
    features: [
      { title: "Mall + market activations", body: "Bring the brand to where the foot traffic already is." },
      { title: "Brand-led events",          body: "Concept, production, guest experience, and earned media in one pass." },
      { title: "Ambassador meet-and-greets",body: "Talent-led moments that move product and sentiment." },
      { title: "Grassroots community work", body: "Open-market activations that build emotional brand share." },
    ],
  },
  "creative-production-and-advertising": {
    number: "03",
    title: "Creative Production & Advertising",
    short: "Ideas, made tangible.",
    body: "We bring ideas to life through high-impact visuals, campaigns, and storytelling — TVCs, OOH, social-first content, and integrated rollouts. End-to-end, from script to final delivery.",
    image: "/roztomily/services/creative-production-and-advertising.jpg",
    features: [
      { title: "TVCs end-to-end",   body: "Concept · casting · location · production · post — under one roof." },
      { title: "Campaign rollout",  body: "OOH, print, digital, and PR amplification sequenced for momentum." },
      { title: "Content systems",   body: "Repeatable formats your team can run with after we're gone." },
      { title: "Quality control",   body: "One producer, one timeline, one source of truth." },
    ],
  },
  "media-relations-and-media-buying": {
    number: "04",
    title: "Media Relations & Media Buying",
    short: "Connecting brands to the right audiences.",
    body: "Powerful media relationships paired with data-driven placements across traditional and digital channels. We don't just buy media — we earn it, place it, and measure it.",
    image: "/roztomily/services/media-relations-and-buying.png",
    features: [
      { title: "Earned media",          body: "Editor relationships across print, broadcast, and digital." },
      { title: "Paid media planning",   body: "Cost-aware buys across TV, radio, OOH, digital, and influencer." },
      { title: "Crisis response",       body: "Structured frameworks that stabilise narrative under pressure." },
      { title: "Performance reporting", body: "Reach, share-of-voice, sentiment, quantified — not vibed." },
    ],
  },
  "digital-marketing": {
    number: "05",
    title: "Digital Marketing",
    short: "Visibility, engagement, conversion.",
    body: "Digital ecosystems that drive measurable outcomes through performance campaigns, content, and social strategy. We build for the funnel, not the impression count.",
    image: "/roztomily/services/digital-marketing.jpg",
    features: [
      { title: "Performance campaigns", body: "Paid social, search, and affiliate, built around the metric that matters." },
      { title: "Social strategy",       body: "Editorial calendars that match brand voice + audience cadence." },
      { title: "Content production",    body: "Scroll-stopping creative made for the platforms it'll live on." },
      { title: "Community management",  body: "Native moderation, response, and tone-matched conversation." },
    ],
  },
  "talent-management": {
    number: "06",
    title: "Talent Management",
    short: "Talent that aligns with brand narratives.",
    body: "We manage and represent talent across diverse industries, delivering tailored solutions that support brand development, strategic positioning, and long-term growth. On the brand side, we facilitate talent sourcing and management for campaigns, ensuring the right fit and measurable impact. We have worked with Leo Da Silva, Deyemi Okanlawon, Mai Atafo, Sisi Yemmie, and others.",
    image: "/roztomily/services/talent-management.jpg",
    features: [
      { title: "Talent representation",   body: "Long-term partnerships across nutrition, lifestyle, music, and culture." },
      { title: "Brand–talent matchmaking",body: "Sourcing the right voice — credibility over follower count." },
      { title: "Partnership negotiation", body: "Deal structures that protect both sides." },
      { title: "Campaign measurement",    body: "Reach, engagement, sentiment, sales lift where attributable." },
    ],
  },
};

export async function generateStaticParams() {
  return Object.keys(SERVICES).map((slug) => ({ slug }));
}

export async function generateMetadata(props: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const s = SERVICES[slug];
  if (!s) return { title: "Service · Roztomily" };
  return { title: `${s.title} · Roztomily`, description: s.short };
}

export default async function ServicePage(props: PageProps<"/services/[slug]">) {
  const { slug } = await props.params;
  const s = SERVICES[slug];
  if (!s) notFound();

  return (
    <article
      className="services-hero"
      style={{
        marginTop: "calc(var(--nav-height) * -1)",
        paddingTop: "calc(var(--nav-height) + 100px)",
        paddingBottom: "var(--space-20)",
      }}
    >
      <Container>
        <Reveal>
          <Link
            href="/services"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              fontSize: 13,
              color: "var(--text-muted)",
              marginBottom: "var(--space-6)",
            }}
          >
            <span aria-hidden>←</span> All services
          </Link>
          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "var(--space-6)", maxWidth: 880 }}>
            <p
              style={{
                fontFamily: "var(--font-extended)",
                fontSize: 48,
                fontWeight: 600,
                letterSpacing: "0.02em",
                color: "var(--bg-teal)",
                lineHeight: 1,
              }}
            >
              {s.number}
            </p>
            <h1 className="t-display-l">{s.title}</h1>
            <p className="t-body-l" style={{ color: "var(--text-warm)", maxWidth: 720 }}>{s.short}</p>
            <p className="t-body-m" style={{ color: "var(--text-warm)", maxWidth: 720, marginTop: 4 }}>{s.body}</p>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div
            style={{
              marginTop: "var(--space-12)",
              borderRadius: "var(--radius-xl)",
              overflow: "hidden",
              aspectRatio: "21 / 9",
              position: "relative",
              background: "var(--product-card-bg)",
            }}
          >
            <Image src={s.image} alt="" fill style={{ objectFit: "cover" }} priority sizes="(max-width: 1024px) 100vw, 1024px" placeholder="blur" blurDataURL={getBlur(s.image)} />
          </div>
        </Reveal>

        <Reveal delay={180}>
          <div className="feature-grid" style={{ marginTop: "var(--space-12)", maxWidth: 880 }}>
            {s.features.map((f) => (
              <div key={f.title}>
                <h3 className="t-body" style={{ fontWeight: 500 }}>{f.title}</h3>
                <p className="t-body-s" style={{ marginTop: 6, color: "var(--text-muted)" }}>{f.body}</p>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={240}>
          <div
            style={{
              marginTop: "var(--space-16)",
              padding: "var(--space-10)",
              borderRadius: 12,
              border: "1px solid var(--border-hairline)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "var(--space-6)",
              flexWrap: "wrap",
            }}
          >
            <p className="t-heading-m" style={{ maxWidth: 480 }}>
              Have a brief that fits {s.title.toLowerCase()}?
            </p>
            <Pill href="/contact">Start a project</Pill>
          </div>
        </Reveal>
      </Container>
    </article>
  );
}
