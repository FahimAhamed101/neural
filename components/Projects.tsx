import { getProjects } from "@/lib/projects";

function clean(value: string) {
  return value.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

export default async function Projects() {
  const all = await getProjects();
  const projects = all.filter((project) => project.images).slice(0, 4);
  return (
    <section id="projects" className="portfolio section-pad">
      <div className="section-head"><div><p className="kicker">Our portfolio</p><h2>Portfolio of AI excellence</h2><a className="text-link portfolio-link" href="#contact">Explore more <span>↗</span></a></div><div className="project-count"><strong>{all.length}+</strong><span>Completed projects</span></div></div>
      <div className="project-stack">
        {projects.map((project, index) => {
          const image = project.images.split(",")[0];
          const link = project.link.startsWith("http") ? project.link : project.github;
          const tags = project.category.split(",").slice(0, 2);
          return (
            <article className="project-card" key={project.id}>
              <div className="project-tags">{tags.map((tag) => <span key={tag}>{tag.trim()}</span>)}</div>
              <div className="project-media"><img src={image} alt={`${project.title} project preview`} loading={index ? "lazy" : "eager"} /></div>
              <div className="project-meta"><div><p>Project name</p><h3>{project.title.trim()}</h3><small>{clean(project.description).slice(0, 105)}</small></div>{link.startsWith("http") ? <a href={link} target="_blank" rel="noreferrer" className="mini-pill">Full project <span>↗</span></a> : null}</div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
