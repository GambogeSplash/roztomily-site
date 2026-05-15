import type { MetadataRoute } from "next";
import { projectSlugs } from "@/lib/projects";

const SITE = "https://roztomilygroup.com";

const SERVICE_SLUGS = [
  "pr-and-brand-marketing",
  "experiential-marketing",
  "creative-production-and-advertising",
  "media-relations-and-media-buying",
  "digital-marketing",
  "talent-management",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const top = [
    { url: `${SITE}/`,        changeFrequency: "weekly"  as const, priority: 1.0 },
    { url: `${SITE}/about`,    changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${SITE}/services`, changeFrequency: "monthly" as const, priority: 0.9 },
    { url: `${SITE}/projects`, changeFrequency: "weekly"  as const, priority: 0.9 },
    { url: `${SITE}/blog`,     changeFrequency: "monthly" as const, priority: 0.7 },
    { url: `${SITE}/contact`,  changeFrequency: "yearly"  as const, priority: 0.7 },
  ];
  const services = SERVICE_SLUGS.map((slug) => ({
    url: `${SITE}/services/${slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));
  const projects = projectSlugs().map((slug) => ({
    url: `${SITE}/projects/${slug}`,
    changeFrequency: "yearly" as const,
    priority: 0.6,
  }));
  return [...top, ...services, ...projects].map((e) => ({ ...e, lastModified: now }));
}
