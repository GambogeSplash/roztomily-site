import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { ProjectsGrid, type ProjectCard } from "@/components/blocks/ProjectsGrid";
import { projects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Projects · Selected work",
  description: "Selected campaigns across PR, experiential marketing, creative production and talent management.",
};

const PROJECTS: ProjectCard[] = projects.map((p) => ({
  slug: p.slug,
  client: p.client,
  title: p.title,
  year: p.year,
  category: p.category,
  image: p.image,
}));

export default function ProjectsIndex() {
  return (
    <section className="services-hero" style={{ marginTop: "calc(var(--nav-height) * -1)", paddingTop: "calc(var(--nav-height) + 80px)", paddingBottom: "var(--space-24)", background: "var(--bg-page)" }}>
      <Container>
        <ProjectsGrid projects={PROJECTS} />
      </Container>
    </section>
  );
}
