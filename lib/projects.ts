import fallbackProjects from "@/data/projects.json";

export type Project = {
  id: string;
  title: string;
  description: string;
  category: string;
  link: string;
  github: string;
  images: string;
  userId: string;
};

const PROJECTS_API_URL = "https://www.fahimweb.com/api/projects";

function isProject(value: unknown): value is Project {
  if (!value || typeof value !== "object") {
    return false;
  }

  const project = value as Record<string, unknown>;
  return (
    typeof project.id === "string" &&
    typeof project.title === "string" &&
    typeof project.description === "string" &&
    typeof project.category === "string" &&
    typeof project.link === "string" &&
    typeof project.github === "string" &&
    typeof project.images === "string" &&
    typeof project.userId === "string"
  );
}

function normalizeProjects(value: unknown): Project[] {
  return Array.isArray(value) ? value.filter(isProject) : [];
}

export async function getProjects() {
  let timeout: ReturnType<typeof setTimeout> | undefined;

  try {
    const controller = new AbortController();
    timeout = setTimeout(() => controller.abort(), 4000);
    const response = await fetch(PROJECTS_API_URL, {
      next: { revalidate: 3600 },
      signal: controller.signal,
    });

    if (response.ok) {
      const data = await response.json();
      const projects = normalizeProjects(data);

      if (projects.length > 0) {
        return projects;
      }
    }
  } catch {
    // The local fallback keeps the portfolio visible if the remote API is down.
  } finally {
    if (timeout) {
      clearTimeout(timeout);
    }
  }

  return normalizeProjects(fallbackProjects);
}
