import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";
import { getPublishedPosts } from "@/lib/posts";
import { servicePages } from "@/lib/services";
import { getProjectSlug, getProjects } from "@/lib/projects";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getPublishedPosts();
  const projects = await getProjects();
  return [
    {
      url: siteConfig.url,
      lastModified: new Date(siteConfig.lastModified),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteConfig.url}/blog`,
      lastModified: posts[0]?.updatedAt ? new Date(posts[0].updatedAt) : new Date(siteConfig.lastModified),
      changeFrequency: "daily",
      priority: 0.8,
    },
    ...servicePages.map((service) => ({
      url: `${siteConfig.url}/services/${service.slug}`,
      lastModified: new Date(siteConfig.lastModified),
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
    ...projects.filter((project) => project.images).map((project) => ({
      url: `${siteConfig.url}/projects/${getProjectSlug(project)}`,
      lastModified: new Date(siteConfig.lastModified),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...posts.map((post) => ({
      url: `${siteConfig.url}/blog/${post.slug}`,
      lastModified: new Date(post.updatedAt),
      changeFrequency: "weekly" as const,
      priority: post.kind === "news" ? 0.7 : 0.75,
    })),
  ];
}
