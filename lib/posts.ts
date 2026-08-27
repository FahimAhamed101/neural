import fs from "node:fs";
import path from "node:path";
import { getMongoDatabase } from "@/lib/mongodb";

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
  targetMarket?: string;
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

function getLocalPosts(): GeneratedPost[] {
  try {
    return JSON.parse(fs.readFileSync(postsFile, "utf8")) as GeneratedPost[];
  } catch {
    return [];
  }
}

export async function getAllPosts(): Promise<GeneratedPost[]> {
  try {
    const database = await getMongoDatabase();
    if (database) {
      const posts = await database
        .collection<GeneratedPost>("seo_posts")
        .find({}, { projection: { _id: 0 } })
        .toArray();
      if (posts.length) return posts;
    }
  } catch (error) {
    console.error("MongoDB posts unavailable; using bundled post data.", error instanceof Error ? error.message : error);
  }

  return getLocalPosts();
}

export async function getPublishedPosts(): Promise<GeneratedPost[]> {
  const now = Date.now();
  return (await getAllPosts())
    .filter(
      (post) =>
        post.status === "published" &&
        (!post.expiresAt || new Date(post.expiresAt).getTime() > now),
    )
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
}

export async function getPostBySlug(slug: string) {
  return (await getPublishedPosts()).find((post) => post.slug === slug);
}
