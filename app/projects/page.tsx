import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { ProjectsGrid, type ProjectCard } from "@/components/blocks/ProjectsGrid";

export const metadata: Metadata = {
  title: "Projects · Selected work",
  description: "Selected campaigns across PR, experiential marketing, creative production and talent management.",
};

const PROJECTS: ProjectCard[] = [
  { slug: "good-mama-9ja-queen-fashion-show", client: "Good Mama",      title: "9ja Queen Open Market Fashion Show",      year: "2023",      category: "Experiential",           image: "/roztomily/projects/good-mama-9ja-queen-fashion-show/01.jpg" },
  { slug: "valuejet-brand-launch",            client: "ValueJet",       title: "Airline Launch Campaign",                year: "2022",      category: "PR & Brand Marketing",  image: "/roztomily/projects/valuejet-brand-launch/01.jpg" },
  { slug: "premier-cool-ready-up-your-cool",  client: "Premier Cool",   title: "“Ready Up Your Cool” TVC",              year: "2022",      category: "Creative Production",   image: "/roztomily/projects/premier-cool-ready-up-your-cool/01.png" },
  { slug: "bord-bia-meet-the-maker",          client: "Bord Bia",       title: "Meet the Maker",                          year: "2021",      category: "Experiential",           image: "/roztomily/projects/bord-bia-meet-the-maker/01.jpg" },
  { slug: "kerrygold-world-milk-day",         client: "Kerrygold",      title: "World Milk Day",                          year: "2022",      category: "Experiential",           image: "/roztomily/projects/kerrygold-world-milk-day/01.jpg" },
  { slug: "carex-carextra-campaign",          client: "Carex",          title: "Carextra Campaign",                       year: "2022",      category: "Experiential",           image: "/roztomily/projects/carex-carextra-campaign/01.jpg" },
  { slug: "regal-turn-up-and-shine",          client: "Regal Gin",      title: "Turn Up & Shine",                         year: "2019",      category: "PR & Brand Marketing",  image: "/roztomily/projects/regal-turn-up-and-shine/01.jpg" },
  { slug: "jamila-lawal",                     client: "Jamila Lawal",   title: "Talent Management",                       year: "Ongoing",   category: "Talent Management",      image: "/roztomily/projects/jamila-lawal/01.jpg" },
];

export default function ProjectsIndex() {
  return (
    <section className="services-hero" style={{ marginTop: "calc(var(--nav-height) * -1)", paddingTop: "calc(var(--nav-height) + 80px)", paddingBottom: "var(--space-24)", background: "var(--bg-page)" }}>
      <Container>
        <ProjectsGrid projects={PROJECTS} />
      </Container>
    </section>
  );
}
