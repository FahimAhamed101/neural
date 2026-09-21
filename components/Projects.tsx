import Link from "next/link";
import {
  formatProjectDescription,
  formatProjectTitle,
  getProjectSlug,
  getProjects,
} from "@/lib/projects";
import { imageWidths, optimizedImage } from "@/lib/images";

/**
 * How many case studies appear on the homepage.
 *
 * Rendering all 17 here made this single section 7,274px tall on mobile —
 * 28.5% of the whole page, more than the next three sections combined, and the
 * visitor had to scroll past every one of them to reach the enquiry form.
 * Six makes the section a showcase again; the rest live on /projects, which is
 * also the better page for them to rank from.
 */
const FEATURED_COUNT = 6;

export default async function Projects() {
  const all = await getProjects();
  const withImages = all.filter((project) => project.images);
  const projects = withImages.slice(0, FEATURED_COUNT);
  const hasMore = withImages.length > projects.length;

  return (
    <section id="projects" className="portfolio section-pad" aria-labelledby="projects-title">
      <div className="section-head">
        <div>
          <p className="kicker">Our portfolio</p>
          <h2 id="projects-title">Web, mobile app, and software projects</h2>

          <div className="portfolio-links">
            <a className="text-link" href="#enquiry">
              Start a project <span>↗</span>
            </a>
            {hasMore ? (
              <Link className="text-link" href="/projects">
                View all {withImages.length} projects <span>↗</span>
              </Link>
            ) : null}
          </div>
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
                  src={optimizedImage(image, imageWidths.card)}
                  alt={`${title} project preview`}
                  loading={index < 3 ? "eager" : "lazy"}
                  decoding="async"
                />
              </Link>

              <div className="project-meta">
                <div>
                  <p>Selected case study</p>

                  <h3>
                    <Link href={detailsUrl}>{title}</Link>
                  </h3>

                  <small>{formatProjectDescription(project.description).slice(0, 125)}</small>
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

      {hasMore ? (
        <div className="portfolio-more">
          <Link className="pill pill-outline" href="/projects">
            Browse all {withImages.length} case studies <span>↗</span>
          </Link>
        </div>
      ) : null}
    </section>
  );
}
