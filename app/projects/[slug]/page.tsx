import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { projects, getProject, projectSlugs } from "@/lib/projects";
import { getBlur } from "@/lib/blur";

export async function generateStaticParams() {
  return projectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata(props: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const p = getProject(slug);
  if (!p) return { title: "Project" };
  return { title: `${p.client}, ${p.title}`, description: p.subtitle };
}

export default async function ProjectPage(props: PageProps<"/projects/[slug]">) {
  const { slug } = await props.params;
  const p = getProject(slug);
  if (!p) notFound();

  // Gallery: optional secondary images; filter out the cover so it doesn't duplicate.
  const gallery = (p.gallery ?? []).filter((src) => src !== p.image);

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

  // Related: up to 3 other projects, rotated so each detail page shows a
  // different trio. Start from the project after the current one and wrap.
  const currentIdx = projects.findIndex((rp) => rp.slug === slug);
  const others = projects.filter((rp) => rp.slug !== slug);
  const startOffset = currentIdx >= 0 ? currentIdx % others.length : 0;
  const related = others.length <= 3
    ? others
    : Array.from({ length: 3 }, (_, i) => others[(startOffset + i) % others.length]);

  const coverFit = p.coverFit ?? "cover";
  const coverPosition = p.coverPosition ?? "center";
  const coverBackdrop = coverFit === "contain";

  return (
    <>
      <ScrollProgress targetId="project-body" color="var(--bg-teal)" />

      <article id="project-body" className="services-hero" style={{ marginTop: "calc(var(--nav-height) * -1)", paddingTop: "calc(var(--nav-height) + 100px)", paddingBottom: "var(--space-20)" }}>
        <Container>
          <div style={{ maxWidth: 760, margin: "0 auto" }}>
            <Reveal>
              <div style={{ marginBottom: "var(--space-5)" }}>
                <span
                  style={{
                    display: "inline-block",
                    padding: "4px 11px",
                    borderRadius: 7,
                    background: "rgba(220, 44, 37, 0.18)",
                    border: "1px solid var(--bg-teal)",
                    color: "#ffffff",
                    fontSize: 11.5,
                    fontWeight: 500,
                    lineHeight: 1.3,
                  }}
                >
                  {p.category}
                </span>
              </div>
              <h1 className="t-display-l" style={{ marginBottom: "var(--space-4)" }}>{p.title}</h1>
              <p style={{ fontSize: 14, color: "var(--text-muted)", marginBottom: "var(--space-6)" }}>
                {p.date}
              </p>
              <p className="t-body-l" style={{ color: "var(--text-warm)" }}>{p.subtitle}</p>
            </Reveal>
          </div>

          <Reveal delay={120}>
            <div
              style={{
                marginTop: "var(--space-12)",
                borderRadius: "var(--radius-xl)",
                overflow: "hidden",
                aspectRatio: "16 / 9",
                position: "relative",
                boxShadow: "var(--shadow-card)",
                background: coverBackdrop ? "var(--product-card-bg)" : undefined,
              }}
            >
              <Image
                src={p.image}
                alt={`${p.client}, ${p.title}`}
                fill
                style={{ objectFit: coverFit, objectPosition: coverPosition }}
                priority
                sizes="(max-width: 1024px) 100vw, 1024px"
                placeholder="blur"
                blurDataURL={getBlur(p.image)}
              />
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
                      <Image
                        src={src}
                        alt={`${p.client}, image ${i + 2}`}
                        fill
                        style={{ objectFit: "cover", objectPosition: p.galleryPositions?.[src] ?? "center" }}
                        sizes="(max-width: 768px) 100vw, 50vw"
                        placeholder="blur"
                        blurDataURL={getBlur(src)}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          )}
        </Container>
      </article>

      {/* More projects — 3 related case studies */}
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
            {related.map((rp, i) => (
              <Reveal key={rp.slug} delay={i * 60}>
                <Link href={`/projects/${rp.slug}`} data-cursor="case-study" style={{ display: "block" }}>
                  <div
                    className="project-card__frame"
                    style={{
                      aspectRatio: "3 / 2",
                      position: "relative",
                      borderRadius: 16,
                      background: "var(--product-card-bg)",
                    }}
                  >
                    <Image
                      src={rp.image}
                      alt={rp.title}
                      fill
                      style={{ objectFit: "cover" }}
                      sizes="(max-width: 768px) 100vw, 33vw"
                      placeholder="blur"
                      blurDataURL={getBlur(rp.image)}
                    />
                    <span
                      className="project-card__tag"
                      style={{
                        position: "absolute",
                        right: 10,
                        bottom: 10,
                        zIndex: 4,
                        padding: "3px 9px",
                        borderRadius: 7,
                        background: "rgba(220, 44, 37, 0.2)",
                        border: "1px solid var(--bg-teal)",
                        color: "#ffffff",
                        fontSize: 10.5,
                        fontWeight: 500,
                        lineHeight: 1.3,
                        backdropFilter: "blur(8px)",
                        WebkitBackdropFilter: "blur(8px)",
                      }}
                    >
                      {rp.category}
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
                    {rp.date} · {rp.category}
                  </p>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
