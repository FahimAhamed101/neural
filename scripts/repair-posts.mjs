import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { createPostStore } from "./post-store.mjs";

const root = process.cwd();
const envPath = path.join(root, ".env");
if (fs.existsSync(envPath)) process.loadEnvFile(envPath);

function countWords(post) {
  return post.sections.flatMap((section) => section.paragraphs).join(" ").trim().split(/\s+/).filter(Boolean).length;
}

function repairTitle(value) {
  let title = String(value || "").trim();
  if (title.length <= 72) return title;
  title = title.slice(0, 72).replace(/\s+\S*$/, "").replace(/[\s:;,.\-]+$/, "").trim();
  return title;
}

const banned = ["we guarantee first-page rankings", "guaranteed business results", "instant ranking results", "game-changing guaranteed"];

function validate(post, existing) {
  const issues = [];
  const words = countWords(post);
  if (post.title.length < 35 || post.title.length > 72) issues.push("Title must be 35-72 characters");
  if (post.description.length < 110 || post.description.length > 165) issues.push("Description must be 110-165 characters");
  if (post.sections.length < 5) issues.push("At least five article sections are required");
  if (words < 700) issues.push(`Article is too short (${words} words)`);
  if (!Array.isArray(post.keywords) || post.keywords.length < 4) issues.push("At least four relevant keywords are required");
  if (!post.primaryKeyword) post.primaryKeyword = (post.keywords && post.keywords[0]) || post.title.toLowerCase().split(/\s+/).slice(0, 4).join(" ");
  if (!Array.isArray(post.faq) || post.faq.length < 3) issues.push("At least three FAQ entries are required");
  const normalizedTitle = post.title.toLowerCase().replace(/[^a-z0-9]/g, "");
  if (existing.some((item) => item.title.toLowerCase().replace(/[^a-z0-9]/g, "") === normalizedTitle)) issues.push("Duplicate title");
  const articleText = JSON.stringify(post).toLowerCase();
  if (banned.some((phrase) => articleText.includes(phrase))) issues.push("Contains an unsupported marketing claim");
  return { issues, words };
}

const store = createPostStore({
  root,
  mongoUri: process.env.MONGODB_URI,
  databaseName: process.env.MONGODB_DB || "nueral",
});

const posts = await store.list();
let titlesFixed = 0;
let promoted = 0;
let stillDraft = 0;

for (const post of posts) {
  const originalTitle = post.title;
  post.title = repairTitle(post.title);
  if (post.title !== originalTitle) titlesFixed += 1;
  if (post.kind !== "news") post.expiresAt = null;

  const others = posts.filter((item) => item.id !== post.id);
  const { issues, words } = validate(post, others);
  post.readingMinutes = Math.max(4, Math.ceil(words / 220));
  post.qualityIssues = issues;

  if (issues.length === 0 && post.status !== "published") {
    post.status = "published";
    post.publishedAt = post.publishedAt || new Date().toISOString();
    post.updatedAt = new Date().toISOString();
    promoted += 1;
  }
  if (issues.length > 0) stillDraft += 1;

  await store.upsert(post);
}

console.log(`Titles repaired: ${titlesFixed}`);
console.log(`Newly published: ${promoted}`);
console.log(`Still draft: ${stillDraft}`);
console.log(`Total posts: ${posts.length}`);
await store.close();