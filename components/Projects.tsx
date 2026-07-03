import { getProjects } from "@/lib/projects";
import ProjectBrowser from "./ProjectBrowser";
import RouteLabel from "./RouteLabel";

export default async function Projects() {
  const projects = await getProjects();

  return (
    <section id="projects" className="border-b border-line bg-ink px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="rounded-lg border border-line bg-white p-6 shadow-[0_24px_70px_rgba(23,33,29,0.08)] sm:p-8">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div>
              <RouteLabel path="Portfolio" />
              <h2 className="max-w-2xl font-display text-3xl font-bold text-paper sm:text-4xl">
                Proof of work across web, mobile, and full-stack systems.
              </h2>
              <p className="mt-4 max-w-2xl leading-relaxed text-paper-dim">
                Review real projects with screenshots, technology stacks, live
                links, and source links. Select any project to inspect it
                without leaving the page.
              </p>
            </div>

            <div className="grid grid-cols-3 overflow-hidden rounded-lg border border-line bg-ink text-center">
              <div className="border-r border-line px-4 py-3">
                <p className="font-display text-2xl font-bold text-paper">
                  {projects.length}
                </p>
                <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-paper-dim">
                  Projects
                </p>
              </div>
              <div className="border-r border-line px-4 py-3">
                <p className="font-display text-2xl font-bold text-paper">8+</p>
                <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-paper-dim">
                  Stacks
                </p>
              </div>
              <div className="px-4 py-3">
                <p className="font-display text-2xl font-bold text-paper">1</p>
                <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-paper-dim">
                  Page
                </p>
              </div>
            </div>
          </div>

          <ProjectBrowser projects={projects} />
        </div>
      </div>
    </section>
  );
}
