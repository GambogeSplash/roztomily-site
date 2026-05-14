import type { MetadataRoute } from "next";

const SITE = "https://roztomily.vercel.app";

const PROJECT_SLUGS = [
  "valuejet-brand-launch",
  "premier-cool-ready-up-your-cool",
  "bord-bia-meet-the-maker",
  "kerrygold-world-milk-day",
  "carex-carextra-campaign",
  "regal-turn-up-and-shine",
  "morning-fresh-30-million-gang",
  "bet9ja-reputation-management",
  "bb-irish-mixers-club",
  "good-mama-9ja-queen-fashion-show",
  "jamila-lawal",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const top = [
    { url: `${SITE}/`,        changeFrequency: "weekly"  as const, priority: 1.0 },
    { url: `${SITE}/about`,    changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${SITE}/services`, changeFrequency: "monthly" as const, priority: 0.9 },
    { url: `${SITE}/projects`, changeFrequency: "weekly"  as const, priority: 0.9 },
    { url: `${SITE}/contact`,  changeFrequency: "yearly"  as const, priority: 0.7 },
  ];
  const projects = PROJECT_SLUGS.map((slug) => ({
    url: `${SITE}/projects/${slug}`,
    changeFrequency: "yearly" as const,
    priority: 0.6,
  }));
  return [...top, ...projects].map((e) => ({ ...e, lastModified: now }));
}
