import { Hero } from "@/components/blocks/Hero";
import { TrustedBy } from "@/components/blocks/TrustedBy";
import { ProductSection } from "@/components/blocks/ProductSection";
import { NewsRow } from "@/components/blocks/NewsRow";

export default function Home() {
  return (
    <>
      <Hero />
      <TrustedBy />

      <ProductSection
        eyebrow="PR & Brand Marketing"
        title="We shape perception and build credibility."
        body="From narrative development to strategic communications, we help brands own their story and earn public trust, across earned media, executive thought leadership, and crisis response."
        href="/services"
        images={[
          "/roztomily/services/pr-and-brand-marketing.jpg",
          "/roztomily/imagery/services/media/04-typewriter-newspaper.jpg",
          "/roztomily/imagery/services/media/01-office-desks.jpg",
        ]}
        features={[]}
        background="page"
      />

      <ProductSection
        eyebrow="Experiential Marketing"
        title="Brand experiences people remember."
        body="Immersive activations that create emotional connection, drive engagement, and turn audiences into communities, from mall takeovers to brand-led events and grassroots open-market activations."
        href="/services"
        imageSide="left"
        background="surface"
        images={[
          "/roztomily/services/experiential-marketing.jpg",
          "/roztomily/imagery/services/experiential/01-installation-crowd.jpg",
          "/roztomily/imagery/services/experiential/02-venue-tables.jpg",
          "/roztomily/imagery/services/experiential/04-concert-stage-lasers.jpg",
        ]}
        features={[
          { title: "Mall + market activations",  body: "Bring the brand to where the foot traffic already is." },
          { title: "Brand-led events",            body: "Concept, production, guest experience, and earned media in one pass." },
          { title: "Ambassador meet-and-greets",  body: "Talent-led moments that move product and sentiment." },
          { title: "Grassroots community work",   body: "Open-market activations that build emotional brand share." },
        ]}
      />

      <ProductSection
        eyebrow="Creative Production & Advertising"
        title="Ideas, made tangible."
        body="We bring ideas to life through high-impact visuals, campaigns, and storytelling that cut through the noise, TVCs, OOH, social-first content, and integrated rollouts. End-to-end, from script to final delivery."
        href="/services"
        images={[
          "/roztomily/services/creative-production-and-advertising.jpg",
          "/roztomily/imagery/services/creative/02-cameraman-silhouette.jpg",
          "/roztomily/imagery/services/creative/04-concert-crowd-lights.jpg",
          "/roztomily/imagery/services/creative/03-camera-tripod.jpg",
        ]}
        background="page"
        features={[
          { title: "TVCs end-to-end",             body: "Concept · casting · location · production · post, under one roof." },
          { title: "Campaign rollout",            body: "OOH, print, digital, and PR amplification, sequenced for momentum." },
          { title: "Content systems",             body: "Repeatable formats your team can run with after we're gone." },
          { title: "Quality control",             body: "One producer, one timeline, one source of truth." },
        ]}
      />

      <ProductSection
        eyebrow="Media Relations & Media Buying"
        title="Connecting brands to the right audiences."
        body="Powerful media relationships paired with data-driven placements across traditional and digital channels. We don&apos;t just buy media, we earn it, place it, and measure it."
        href="/services"
        imageSide="left"
        background="surface"
        features={[
          { title: "Earned media",                body: "Long-standing relationships with print, broadcast, and digital editors across Nigeria + West Africa." },
          { title: "Paid media planning",         body: "Cost-aware buys across TV, radio, OOH, digital, and influencer." },
          { title: "Crisis response",             body: "Structured frameworks that stabilise narrative under pressure." },
          { title: "Performance reporting",       body: "Reach, share-of-voice, sentiment, quantified, not vibed." },
        ]}
        images={[
          "/roztomily/services/media-relations-and-buying.png",
          "/roztomily/imagery/services/media/01-office-desks.jpg",
          "/roztomily/imagery/services/media/04-typewriter-newspaper.jpg",
        ]}
      />

      <ProductSection
        eyebrow="Digital Marketing"
        title="Visibility, engagement, conversion."
        body="Digital ecosystems that drive measurable outcomes through performance campaigns, content, and social strategy. We build for the funnel, not the impression count."
        href="/services"
        background="muted"
        images={[
          "/roztomily/services/digital-marketing.jpg",
          "/roztomily/imagery/services/digital/01-phone-social.jpg",
          "/roztomily/imagery/services/digital/02-phone-laptop.jpg",
        ]}
        features={[
          { title: "Performance campaigns",       body: "Paid social, search, and affiliate, built around the metric that matters." },
          { title: "Social strategy",             body: "Editorial calendars that match brand voice + audience cadence." },
          { title: "Content production",          body: "Scroll-stopping creative made for the platforms it&apos;ll live on." },
          { title: "Community management",        body: "Native moderation, response, and tone-matched conversation." },
        ]}
      />

      <ProductSection
        eyebrow="Talent Management"
        title="Talent. We represent."
        body="We manage and represent talent across nutrition, lifestyle, music, and culture, supporting brand development, partnerships, and long-term growth. On the brand side, we source the right talent for campaigns and ensure measurable impact."
        imageSide="left"
        background="surface"
        images={[
          "/roztomily/services/talent-management.jpg",
          "/roztomily/projects/jamila-lawal/01.jpg",
          "/roztomily/projects/jamila-lawal/02.jpg",
        ]}
        features={[
          { title: "Talent representation",   body: "Long-term partnerships with creators across nutrition, lifestyle, music, and culture." },
          { title: "Brand–talent matchmaking",body: "Sourcing the right voice for the brief — credibility over follower count." },
          { title: "Partnership negotiation", body: "Deal structures + rate cards that protect both sides." },
          { title: "Campaign measurement",    body: "Measured impact — reach, engagement, sentiment, sales lift where attributable." },
        ]}
      />

      <NewsRow />
    </>
  );
}
