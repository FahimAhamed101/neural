import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFloatingButton from "@/components/WhatsAppFloatingButton";
import { getProjects, getProjectSlug } from "@/lib/projects";
import { siteConfig } from "@/lib/site-config";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Portfolio",
  description: `Case studies and portfolio projects by ${siteConfig.name}. Flutter, React Native, ecommerce, SaaS, dashboards, and custom software built for clients worldwide.`,
  alternates: { canonical: "/projects" },
  openGraph: { title: "Portfolio | Projects by Neural IT Limited", description: "Case studies covering ecommerce, mobile apps, SaaS, dashboards, and custom software built for businesses worldwide.", url: "/projects", type: "website", images: ["/og-image.png"] },
};

export default async function ProjectsPage() {
  const projects = await getProjects();
  const featured = projects.filter((p) => p.images).slice(0, 6);
  return (
    <>
      <Header />
      <main className="projects-listing-page">
        <section className="projects-hero">
          <p className="kicker">Selected work</p>
          <h1>Portfolio</h1>
          <p>Case studies spanning ecommerce, mobile apps, SaaS, dashboards, and custom software for businesses in major U.S. markets and worldwide.</p>
        </section>
        {featured.length ? (
          <section className="project-grid" aria-labelledby="featured-list">
            {featured.map((project) => {
              const title = project.title;
              const image = project.images.split(",")[0];
              return (
                <article key={project.id} className="project-card">
                  <Link href={`/projects/${getProjectSlug(project)}`}>
                    {image ? <img src={image} alt={title} loading="lazy" /> : null}
                    <span>{title}</span>
                  </Link>
                </article>
              );
            })}
          </section>
        ) : null}
        <section className="project-full-list" aria-labelledby="all-projects">
          <h2 id="all-projects">All projects</h2>
          {projects.length ? (
            <ul>
              {projects.map((project) => (
                <li key={project.id}>
                  <Link href={`/projects/${getProjectSlug(project)}`}>{project.title}</Link>
                </li>
              ))}
            </ul>
          ) : (
            <p>No projects listed yet. New work is added regularly.</p>
          )}
        </section>
      </main>
      <Footer />
      <WhatsAppFloatingButton />
    </>
  );
}