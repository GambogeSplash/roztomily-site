"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { getBlur } from "@/lib/blur";

export type ProjectCard = {
  slug: string;
  client: string;
  title: string;
  year: string;
  category: string;
  image: string;
};

const FEATURE_TITLE_STYLE: React.CSSProperties = {
  fontSize: 40,
  lineHeight: 1.04,
  letterSpacing: "-0.03em",
  fontWeight: 400,
  fontFamily: "var(--font-display)",
};

const CARD_TITLE_STYLE: React.CSSProperties = {
  marginTop: 16,
  marginBottom: 4,
  fontSize: 20,
  lineHeight: 1.25,
  letterSpacing: "-0.018em",
  fontWeight: 400,
  fontFamily: "var(--font-display)",
};

const META_STYLE: React.CSSProperties = {
  fontSize: 13,
  letterSpacing: "-0.005em",
  color: "var(--text-muted)",
};

function CategoryTag({ children }: { children: React.ReactNode }) {
  return (
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
        letterSpacing: "0",
        lineHeight: 1.3,
        boxShadow: "0 1px 4px rgba(0, 0, 0, 0.22)",
      }}
    >
      {children}
    </span>
  );
}

export function ProjectsGrid({ projects }: { projects: ProjectCard[] }) {
  const categories = useMemo(() => {
    const set = new Set(projects.map((p) => p.category));
    return ["All", ...Array.from(set)];
  }, [projects]);

  const [active, setActive] = useState<string>("All");

  if (projects.length === 0) {
    return <p className="t-body" style={{ color: "var(--text-muted)" }}>No projects yet.</p>;
  }

  const feature = projects[0];
  const rest = projects.slice(1);
  const visibleRest = active === "All" ? rest : rest.filter((p) => p.category === active);

  return (
    <>
      {/* Featured — single container, image left, text right, shared border */}
      <Reveal>
        <Link
          href={`/projects/${feature.slug}`}
          data-cursor="case-study"
          style={{ display: "block", marginBottom: 56 }}
        >
          <div
            className="projects-feature-card"
            style={{
              border: "1px solid var(--border-hairline)",
              borderRadius: 16,
              background: "var(--bg-surface)",
              overflow: "hidden",
              display: "grid",
              gridTemplateColumns: "1.55fr 1fr",
              alignItems: "stretch",
            }}
          >
            <div
              className="project-card__frame"
              style={{
                position: "relative",
                aspectRatio: "16 / 11",
                background: "var(--product-card-bg)",
              }}
            >
              <Image
                src={feature.image}
                alt={feature.title}
                fill
                style={{ objectFit: "cover" }}
                sizes="(max-width: 900px) 100vw, 820px"
                priority
                placeholder="blur"
                blurDataURL={getBlur(feature.image)}
              />
              <CategoryTag>{feature.category}</CategoryTag>
            </div>

            <div
              className="projects-feature-text"
              style={{
                padding: "var(--space-8)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                gap: 14,
              }}
            >
              <p
                className="t-caption"
                style={{ color: "var(--bg-teal)", fontSize: 12, letterSpacing: "0.02em", fontWeight: 500 }}
              >
                Featured project
              </p>
              <h1 style={FEATURE_TITLE_STYLE}>{feature.title}</h1>
              <p style={{ ...META_STYLE, marginTop: 4 }}>{feature.year} · {feature.category}</p>
              <p
                style={{
                  marginTop: 6,
                  fontSize: 14,
                  fontWeight: 500,
                  color: "var(--text-primary)",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                }}
              >
                View project <span aria-hidden>→</span>
              </p>
            </div>
          </div>
        </Link>
      </Reveal>

      {/* Filter tabs */}
      <div
        className="projects-filter"
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 8,
          marginBottom: 36,
          marginTop: 16,
        }}
      >
        {categories.map((c) => {
          const isActive = active === c;
          return (
            <button
              key={c}
              type="button"
              onClick={() => setActive(c)}
              data-active={isActive ? "true" : undefined}
              style={{
                appearance: "none",
                border: `1px solid ${isActive ? "var(--bg-teal)" : "var(--border-hairline)"}`,
                background: isActive ? "var(--bg-teal)" : "transparent",
                color: isActive ? "#ffffff" : "var(--text-soft)",
                padding: "8px 14px",
                borderRadius: 8,
                fontSize: 13,
                fontWeight: 500,
                letterSpacing: "-0.005em",
                cursor: "pointer",
                transition:
                  "background var(--motion-fast) var(--motion-easing), border-color var(--motion-fast) var(--motion-easing), color var(--motion-fast) var(--motion-easing)",
              }}
            >
              {c}
            </button>
          );
        })}
      </div>

      {/* Grid: 3 columns, shorter card frames */}
      <div
        className="projects-list-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          columnGap: 24,
          rowGap: 56,
        }}
      >
        {visibleRest.length === 0 ? (
          <p className="t-body" style={{ color: "var(--text-muted)", gridColumn: "1 / -1" }}>
            Nothing in this category yet.
          </p>
        ) : (
          visibleRest.map((p, i) => (
            <Reveal key={p.slug} delay={i * 40}>
              <Link href={`/projects/${p.slug}`} data-cursor="case-study" style={{ display: "block" }}>
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
                    src={p.image}
                    alt={p.title}
                    fill
                    style={{ objectFit: "cover" }}
                    sizes="(max-width: 768px) 100vw, 33vw"
                    placeholder="blur"
                    blurDataURL={getBlur(p.image)}
                  />
                  <CategoryTag>{p.category}</CategoryTag>
                </div>

                <h2 style={CARD_TITLE_STYLE}>{p.title}</h2>
                <p style={META_STYLE}>{p.year} · {p.category}</p>
              </Link>
            </Reveal>
          ))
        )}
      </div>
    </>
  );
}
