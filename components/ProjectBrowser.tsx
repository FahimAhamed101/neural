"use client";

import { useMemo, useState } from "react";
import type { Project } from "@/lib/projects";

function cleanDescription(description: string) {
  const cleaned = description
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  return cleaned || "Project details are available in the screenshots and source links.";
}

function splitList(value: string) {
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function safeUrl(value: string) {
  if (!value.startsWith("http://") && !value.startsWith("https://")) {
    return "";
  }

  return value;
}

function getProjectType(project: Project) {
  const text = `${project.title} ${project.category}`.toLowerCase();

  if (text.includes("flutter") || text.includes("kotlin") || text.includes("native")) {
    return "Mobile app";
  }

  if (text.includes("ecommerce") || text.includes("shop") || text.includes("store")) {
    return "Ecommerce";
  }

  if (text.includes("chat") || text.includes("news") || text.includes("crud")) {
    return "Web app";
  }

  return "Software";
}

export default function ProjectBrowser({ projects }: { projects: Project[] }) {
  const [selectedId, setSelectedId] = useState(projects[0]?.id ?? "");
  const selectedProject = useMemo(
    () => projects.find((project) => project.id === selectedId) ?? projects[0],
    [projects, selectedId]
  );

  if (!selectedProject) {
    return (
      <div className="mt-10 rounded-lg border border-line bg-ink p-8 text-paper-dim">
        No projects are available right now.
      </div>
    );
  }

  const selectedImages = splitList(selectedProject.images);
  const selectedStack = splitList(selectedProject.category);
  const liveUrl = safeUrl(selectedProject.link);

  return (
    <div className="mt-10 grid gap-6 xl:grid-cols-[1.08fr_0.92fr]">
      <article className="overflow-hidden rounded-lg border border-line bg-ink shadow-sm">
        <div className="border-b border-line bg-paper px-4 py-3">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-[#EF4444]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#F59E0B]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#22C55E]" />
            </div>
            <p className="truncate text-xs font-semibold uppercase tracking-wide text-white/70">
              Case study preview
            </p>
          </div>
        </div>

        <div className="grid gap-0 lg:grid-cols-[1.08fr_0.92fr]">
          <div className="bg-[#EFF3F1] p-4 sm:p-6">
            <div className="overflow-hidden rounded-lg border border-line bg-white shadow-[0_18px_40px_rgba(23,33,29,0.12)]">
              {selectedImages[0] ? (
                <img
                  src={selectedImages[0]}
                  alt={`${selectedProject.title} main screenshot`}
                  className="h-[360px] w-full object-contain"
                />
              ) : (
                <div className="flex h-[360px] items-center justify-center text-paper-dim">
                  No screenshot available
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col p-6 sm:p-7">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-success/10 px-3 py-1 text-xs font-bold uppercase tracking-wide text-success">
                  {getProjectType(selectedProject)}
                </span>
                <span className="rounded-full border border-line bg-white px-3 py-1 text-xs font-semibold text-paper-dim">
                  {selectedImages.length} screenshots
                </span>
              </div>

              <h3 className="mt-4 font-display text-2xl font-bold leading-tight text-paper sm:text-3xl">
                {selectedProject.title.trim()}
              </h3>
              <p className="mt-4 text-sm leading-7 text-paper-dim">
                {cleanDescription(selectedProject.description)}
              </p>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              {selectedStack.slice(0, 7).map((item) => (
                <span
                  key={item}
                  className="rounded-md border border-line bg-white px-2.5 py-1.5 text-xs font-semibold text-paper-dim"
                >
                  {item}
                </span>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              {liveUrl ? (
                <a
                  href={liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-md bg-paper px-4 py-2.5 text-sm font-semibold text-white transition-transform hover:scale-[1.03]"
                >
                  Open live project
                </a>
              ) : null}
            </div>

            {selectedImages.length > 1 ? (
              <div className="mt-7 grid grid-cols-3 gap-2">
                {selectedImages.slice(1, 7).map((image, index) => (
                  <button
                    key={image}
                    type="button"
                    className="overflow-hidden rounded-md border border-line bg-white"
                    aria-label={`${selectedProject.title} screenshot ${index + 2}`}
                  >
                    <img
                      src={image}
                      alt=""
                      className="h-20 w-full object-cover transition-transform hover:scale-105"
                      loading="lazy"
                    />
                  </button>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </article>

      <aside className="rounded-lg border border-line bg-ink p-3">
        <div className="flex items-center justify-between gap-3 px-2 pb-3 pt-1">
          <div>
            <p className="text-sm font-bold text-paper">Project library</p>
            <p className="mt-1 text-xs text-paper-dim">
              Select a project to update the preview.
            </p>
          </div>
          <span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-paper">
            {projects.length}
          </span>
        </div>

        <div className="grid max-h-[720px] gap-3 overflow-y-auto pr-1">
          {projects.map((project, index) => {
            const images = splitList(project.images);
            const stack = splitList(project.category);
            const isActive = project.id === selectedProject.id;

            return (
              <button
                key={project.id}
                type="button"
                onClick={() => setSelectedId(project.id)}
                className={`group grid grid-cols-[92px_1fr] gap-4 rounded-lg border p-3 text-left transition ${
                  isActive
                    ? "border-signal bg-white shadow-[0_12px_28px_rgba(37,99,235,0.12)]"
                    : "border-line bg-white/70 hover:border-signal/60 hover:bg-white"
                }`}
              >
                <span className="relative block h-24 overflow-hidden rounded-md border border-line bg-white">
                  {images[0] ? (
                    <img
                      src={images[0]}
                      alt={`${project.title} preview`}
                      className="h-full w-full object-cover transition-transform group-hover:scale-105"
                      loading="lazy"
                    />
                  ) : null}
                  <span className="absolute left-2 top-2 rounded bg-paper/85 px-1.5 py-0.5 text-[10px] font-bold text-white">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </span>

                <span className="min-w-0 py-0.5">
                  <span className="flex items-start justify-between gap-3">
                    <span className="line-clamp-2 font-display text-base font-bold leading-snug text-paper">
                      {project.title.trim()}
                    </span>
                    <span
                      className={`mt-1 h-2 w-2 shrink-0 rounded-full ${
                        isActive ? "bg-success" : "bg-line"
                      }`}
                    />
                  </span>
                  <span className="mt-2 line-clamp-2 block text-sm leading-relaxed text-paper-dim">
                    {cleanDescription(project.description)}
                  </span>
                  <span className="mt-3 flex flex-wrap gap-1.5">
                    {stack.slice(0, 2).map((item) => (
                      <span
                        key={item}
                        className="rounded bg-ink px-2 py-1 text-[11px] font-semibold text-paper-dim"
                      >
                        {item}
                      </span>
                    ))}
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </aside>
    </div>
  );
}
