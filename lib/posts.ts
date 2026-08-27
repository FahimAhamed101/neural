import fs from "node:fs";
import path from "node:path";

export type PostKind = "evergreen" | "news";

export type PostSection = {
  heading: string;
  paragraphs: string[];
};

export type PostFaq = {
  question: string;
  answer: string;
};

export type GeneratedPost = {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: string;
  kind: PostKind;
  keywords: string[];
  sections: PostSection[];
  faq: PostFaq[];
  ctaTitle: string;
  ctaText: string;
  readingMinutes: number;
  status: "published" | "draft";
  qualityIssues: string[];
  publishedAt: string;
  updatedAt: string;
  expiresAt: string | null;
};

const postsFile = path.join(process.cwd(), "data", "generated-posts.json");

export function getAllPosts(): GeneratedPost[] {
  try {
    return JSON.parse(fs.readFileSync(postsFile, "utf8")) as GeneratedPost[];
  } catch {
    return [];
  }
}

export function getPublishedPosts(): GeneratedPost[] {
  const now = Date.now();
  return getAllPosts()
    .filter(
      (post) =>
        post.status === "published" &&
        (!post.expiresAt || new Date(post.expiresAt).getTime() > now),
    )
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
}

export function getPostBySlug(slug: string) {
  return getPublishedPosts().find((post) => post.slug === slug);
}
