import Link from "next/link";
import {
  formatProjectDescription,
  formatProjectTitle,
  getProjectSlug,
  getProjects,
} from "@/lib/projects";

export default async function Projects() {
  const all = await getProjects();

  // Show ALL projects that have images
  const projects = all.filter((project) => project.images);

  return (
    <section id="projects" className="portfolio section-pad">
      <div className="section-head">
        <div>
          <p className="kicker">Our portfolio</p>
          <h2>Web, mobile app, and software projects</h2>

          <a className="text-link portfolio-link" href="#contact">
            Start a project <span>↗</span>
          </a>
        </div>

        <div className="project-count">
          <strong>{all.length}+</strong>
          <span>Completed projects</span>
        </div>
      </div>

      <div className="project-grid">
        {projects.map((project, index) => {
          const image = project.images.split(",")[0];
          const detailsUrl = `/projects/${getProjectSlug(project)}`;
          const tags = project.category.split(",").slice(0, 2);
          const title = formatProjectTitle(project.title);

          return (
            <article className="project-card" key={project.id}>
              <div className="project-tags">
                {tags.map((tag) => (
                  <span key={tag}>{tag.trim()}</span>
                ))}
              </div>

              <span className="project-index" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>

              <Link
                href={detailsUrl}
                className="project-media"
                aria-label={`View details for ${title}`}
              >
                <img
                  src={image}
                  alt={`${title} project preview`}
                  loading={index < 4 ? "eager" : "lazy"}
                />
              </Link>

              <div className="project-meta">
                <div>
                  <p>Selected case study</p>

                  <h3>
                    <Link href={detailsUrl}>{title}</Link>
                  </h3>

                  <small>
                    {formatProjectDescription(project.description).slice(
                      0,
                      125
                    )}
                  </small>
                </div>

               <Link
  href={detailsUrl}
  className="project-action"
  aria-label={`View ${title} case study`}
>
  View project <span>↗</span>
</Link>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}