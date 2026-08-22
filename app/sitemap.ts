import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";
import { getPublishedPosts } from "@/lib/posts";

export const dynamic = "force-dynamic";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getPublishedPosts();
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
    ...posts.map((post) => ({
      url: `${siteConfig.url}/blog/${post.slug}`,
      lastModified: new Date(post.updatedAt),
      changeFrequency: "weekly" as const,
      priority: post.kind === "news" ? 0.7 : 0.75,
    })),
  ];
}
