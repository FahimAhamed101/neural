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

export function cleanProjectText(value: string) {
  return value.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

export function formatProjectTitle(value: string) {
  return cleanProjectText(value)
    .replace(/\bfluttter\b/gi, "Flutter")
    .replace(/\becomem?rce\b/gi, "Ecommerce")
    .replace(/\bmacbook\b/gi, "MacBook")
    .replace(/\bcrud\b/gi, "CRUD")
    .replace(/\bneibrly\b/gi, "Neibrly");
}

export function formatProjectDescription(value: string) {
  const cleaned = cleanProjectText(value)
    .replace(/\bRestaurent\b/gi, "restaurant")
    .replace(/\bresturents\b/gi, "restaurants")
    .replace(/\bProivider\b/gi, "provider")
    .replace(/\bProivder\b/gi, "provider")
    .replace(/\bcreat(?:e|ed) with\b/gi, "built with")
    .replace(/\bmade with\b/gi, "built with")
    .replace(/\bshows restaurants foods\b/gi, "shows restaurant menus")
    .replace(/\blocation\.user\b/gi, "location. Users")
    .replace(/\bby stripe\b/gi, "through Stripe")
    .replace(/\bgetx\b/g, "GetX");
  if (!cleaned) return "A digital product designed and developed by Neural IT Limited.";
  const sentence = cleaned.charAt(0).toUpperCase() + cleaned.slice(1);
  return /[.!?]$/.test(sentence) ? sentence : `${sentence}.`;
}

export function getProjectSlug(project: Project) {
  const title = formatProjectTitle(project.title)
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 60);
  return `${title || "project"}-${project.id.slice(-6).toLowerCase()}`;
}

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

export async function getProjectBySlug(slug: string) {
  const projects = await getProjects();
  return projects.find((project) => getProjectSlug(project) === slug);
}
