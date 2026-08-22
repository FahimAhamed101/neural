import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";

const root = process.cwd();
const postsPath = path.join(root, "data", "generated-posts.json");
const statePath = path.join(root, "data", "content-worker-state.json");
const apiUrl = process.env.CONTENT_API_URL || "http://127.0.0.1:8000/v1/chat/completions";
const model = process.env.CONTENT_API_MODEL || "deepseek-expert";
const pollMs = Math.max(15000, Number(process.env.CONTENT_POLL_MS || 60000));
const dailyMs = 24 * 60 * 60 * 1000;
const once = process.argv.includes("--once");
const fill = process.argv.includes("--fill");

const topicSeeds = [
  "AI automation for small and medium businesses",
  "mobile app strategy for service businesses",
  "ecommerce conversion and customer experience",
  "custom business dashboards and reporting",
  "website performance and technical SEO",
  "responsible AI product design",
  "software modernization for growing companies",
  "customer support chatbots and assistants",
  "data analytics for better business decisions",
  "web accessibility and inclusive product design",
  "cloud-ready application architecture",
  "digital product planning for founders",
];

function readJson(file, fallback) {
  try { return JSON.parse(fs.readFileSync(file, "utf8")); } catch { return fallback; }
}

function writeJson(file, value) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  const temporary = `${file}.tmp`;
  fs.writeFileSync(temporary, `${JSON.stringify(value, null, 2)}\n`, "utf8");
  fs.renameSync(temporary, file);
}

function log(message) {
  console.log(`[${new Date().toISOString()}] ${message}`);
}

async function completion(messages, options = {}) {
  const response = await fetch(apiUrl, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ model, messages, temperature: options.temperature ?? 0.55, max_tokens: options.maxTokens ?? 2800 }),
    signal: AbortSignal.timeout(120000),
  });
  if (!response.ok) throw new Error(`API returned ${response.status} ${response.statusText}`);
  const payload = await response.json();
  const content = payload?.choices?.[0]?.message?.content;
  if (!content) throw new Error("API response did not contain message content");
  return content;
}

async function apiOnline() {
  try {
    const answer = await completion([{ role: "user", content: "Reply with only OK" }], { temperature: 0, maxTokens: 10 });
    return { online: Boolean(answer), detail: answer ? "health check succeeded" : "empty health-check response" };
  } catch (error) {
    return { online: false, detail: error instanceof Error ? error.message : String(error) };
  }
}

function extractJson(text) {
  const fenced = text.match(/```(?:json)?\s*([\s\S]*?)```/i)?.[1];
  const source = (fenced || text).trim();
  const start = Math.min(...[source.indexOf("{"), source.indexOf("[")].filter((index) => index >= 0));
  if (!Number.isFinite(start)) throw new Error("No JSON found in model response");
  const open = source[start];
  const end = open === "[" ? source.lastIndexOf("]") : source.lastIndexOf("}");
  return JSON.parse(source.slice(start, end + 1));
}

function slugify(value) {
  return String(value).toLowerCase().normalize("NFKD").replace(/[^a-z0-9\s-]/g, "").trim().replace(/\s+/g, "-").replace(/-+/g, "-").slice(0, 72);
}

function countWords(post) {
  return post.sections.flatMap((section) => section.paragraphs).join(" ").trim().split(/\s+/).filter(Boolean).length;
}

function validate(post, existing) {
  const issues = [];
  const words = countWords(post);
  if (post.title.length < 35 || post.title.length > 72) issues.push("Title must be 35-72 characters");
  if (post.description.length < 110 || post.description.length > 165) issues.push("Description must be 110-165 characters");
  if (post.sections.length < 5) issues.push("At least five article sections are required");
  if (words < 750) issues.push(`Article is too short (${words} words)`);
  if (!Array.isArray(post.keywords) || post.keywords.length < 4) issues.push("At least four relevant keywords are required");
  if (!Array.isArray(post.faq) || post.faq.length < 3) issues.push("At least three FAQ entries are required");
  const normalizedTitle = post.title.toLowerCase().replace(/[^a-z0-9]/g, "");
  if (existing.some((item) => item.title.toLowerCase().replace(/[^a-z0-9]/g, "") === normalizedTitle)) issues.push("Duplicate title");
  const banned = ["we guarantee first-page rankings", "guaranteed business results", "instant ranking results", "game-changing guaranteed"];
  const articleText = JSON.stringify(post).toLowerCase();
  if (banned.some((phrase) => articleText.includes(phrase))) issues.push("Contains an unsupported marketing claim");
  return { issues, words };
}

async function planTopics(existing) {
  const day = new Date().toISOString().slice(0, 10);
  const recentTitles = existing.slice(-40).map((post) => post.title);
  const prompt = `You plan useful editorial content for Neural IT Limited, a Bangladesh-based global web, mobile, custom software, and AI solutions agency.
Today is ${day}. Create exactly 6 distinct, commercially relevant topics. Five must be evergreen educational articles and one must be a cautious technology industry update labeled news. Never invent a breaking event, statistic, company announcement, or quote. The goal is to help real buyers make better technology decisions, not manipulate search rankings.
Topic inspiration: ${topicSeeds.join("; ")}.
Avoid these existing titles: ${recentTitles.join(" | ")}.
Return only JSON in this shape: {"topics":[{"title":"...","kind":"evergreen","primaryKeyword":"...","audience":"...","angle":"..."}]}. Exactly one item must use kind "news".`;
  const data = extractJson(await completion([{ role: "user", content: prompt }], { maxTokens: 1400 }));
  if (!Array.isArray(data.topics) || data.topics.length !== 6) throw new Error("Topic planner did not return exactly six topics");
  return data.topics;
}

async function createArticle(topic, existing) {
  const prompt = `Write a trustworthy, original article for Neural IT Limited.
Topic: ${topic.title}
Type: ${topic.kind}
Primary keyword: ${topic.primaryKeyword}
Audience: ${topic.audience}
Angle: ${topic.angle}

Requirements:
- 850-1200 words of practical, specific guidance with no filler.
- Never claim guaranteed SEO rankings or invent statistics, quotes, clients, research, product releases, or current events.
- If type is news, write a general industry update/analysis and explicitly distinguish established facts from forward-looking interpretation.
- Use the primary keyword naturally; no keyword stuffing.
- Include 5-7 sections, each with 2-3 substantial paragraphs.
- Include exactly 3 useful FAQs and a restrained client-focused CTA.
- Description must be 110-165 characters and accurately summarize the article.
- Title must be 35-72 characters.
- Plain text only inside fields; no Markdown or HTML.

Return only valid JSON:
{"title":"","description":"","category":"","keywords":[""],"sections":[{"heading":"","paragraphs":[""]}],"faq":[{"question":"","answer":""}],"ctaTitle":"","ctaText":""}`;
  const articleResponse = await completion([{ role: "user", content: prompt }], { maxTokens: 4200 });
  let raw;
  try {
    raw = extractJson(articleResponse);
  } catch (parseError) {
    log("Article JSON was malformed. Asking the API to repair formatting without rewriting the content.");
    const repaired = await completion([
      { role: "system", content: "You are a strict JSON repair tool. Return one valid JSON object only. Preserve the supplied meaning and fields. Escape quotation marks inside strings, remove trailing commas, and do not add Markdown fences." },
      { role: "user", content: articleResponse },
    ], { temperature: 0, maxTokens: 4400 });
    try { raw = extractJson(repaired); } catch { throw parseError; }
  }
  const now = new Date();
  const kind = topic.kind === "news" ? "news" : "evergreen";
  const baseSlug = slugify(raw.title || topic.title);
  let slug = baseSlug;
  if (existing.some((post) => post.slug === slug)) slug = `${baseSlug}-${now.toISOString().slice(0, 10)}`;
  const post = {
    id: crypto.randomUUID(), slug, title: String(raw.title || topic.title).trim(),
    description: String(raw.description || "").trim(), category: String(raw.category || "Digital Strategy").trim(), kind,
    keywords: Array.isArray(raw.keywords) ? raw.keywords.map(String).map((item) => item.trim()).filter(Boolean).slice(0, 10) : [],
    sections: Array.isArray(raw.sections) ? raw.sections.map((section) => ({ heading: String(section.heading || "").trim(), paragraphs: Array.isArray(section.paragraphs) ? section.paragraphs.map(String).map((item) => item.trim()).filter(Boolean) : [] })).filter((section) => section.heading && section.paragraphs.length) : [],
    faq: Array.isArray(raw.faq) ? raw.faq.map((item) => ({ question: String(item.question || "").trim(), answer: String(item.answer || "").trim() })).filter((item) => item.question && item.answer).slice(0, 3) : [],
    ctaTitle: String(raw.ctaTitle || "Plan your next digital product with confidence").trim(),
    ctaText: String(raw.ctaText || "Talk with Neural IT Limited about a practical path from idea to launch.").trim(),
    readingMinutes: 1, status: "draft", qualityIssues: [], publishedAt: now.toISOString(), updatedAt: now.toISOString(),
    expiresAt: new Date(now.getTime() + (kind === "news" ? 90 : 7) * dailyMs).toISOString(),
  };
  const result = validate(post, existing);
  post.readingMinutes = Math.max(4, Math.ceil(result.words / 220));
  post.qualityIssues = result.issues;
  post.status = result.issues.length ? "draft" : "published";
  return post;
}

function cleanup() {
  const posts = readJson(postsPath, []);
  const now = Date.now();
  const retained = posts.filter((post) => new Date(post.expiresAt).getTime() > now);
  if (retained.length !== posts.length) {
    writeJson(postsPath, retained);
    log(`Retention cleanup removed ${posts.length - retained.length} expired post(s).`);
  }
  return retained;
}

async function dailyRun() {
  const cycleStartedAt = Date.now();
  let posts = cleanup();
  log("Starting daily generation of 6 targeted posts.");
  const topics = await planTopics(posts);
  for (let index = 0; index < topics.length; index += 1) {
    log(`Generating ${index + 1}/6: ${topics[index].title}`);
    const post = await generateWithRetry(topics[index], posts, `Post ${index + 1}`);
    if (post) posts = readJson(postsPath, posts);
  }
  await fillRecentPublishedPosts(cycleStartedAt);
  const state = readJson(statePath, {});
  state.lastDailyRun = new Date().toISOString();
  state.nextDailyRun = new Date(Date.now() + dailyMs).toISOString();
  writeJson(statePath, state);
  log("Daily content cycle finished.");
}

async function generateWithRetry(topic, posts, label) {
  for (let attempt = 1; attempt <= 2; attempt += 1) {
    try {
      const post = await createArticle(topic, posts);
      posts.push(post);
      writeJson(postsPath, posts);
      log(`${post.status === "published" ? "Published" : "Saved draft"}: ${post.title}${post.qualityIssues.length ? ` (${post.qualityIssues.join("; ")})` : ""}`);
      return post;
    } catch (error) {
      log(`${label} attempt ${attempt} failed: ${error.message}`);
      if (attempt < 2) log(`${label}: asking the API to regenerate valid structured content.`);
    }
  }
  return null;
}

async function fillRecentPublishedPosts(since = Date.now() - dailyMs) {
  let posts = cleanup();
  const recentPublished = posts.filter((post) => post.status === "published" && new Date(post.publishedAt).getTime() > since).length;
  let needed = Math.max(0, 6 - recentPublished);
  if (!needed) { log("The latest daily window already contains 6 published posts."); return; }
  log(`Filling ${needed} missing published post(s) from the latest daily cycle.`);
  const topics = await planTopics(posts);
  const ordered = [...topics].sort((a, b) => (a.kind === "news" ? 1 : 0) - (b.kind === "news" ? 1 : 0));
  for (let index = 0; index < ordered.length && needed > 0; index += 1) {
    log(`Generating fill candidate: ${ordered[index].title}`);
    const post = await generateWithRetry(ordered[index], posts, `Fill candidate ${index + 1}`);
    posts = readJson(postsPath, posts);
    if (post?.status === "published") needed -= 1;
  }
  log(needed ? `Fill cycle finished with ${needed} published post(s) still missing.` : "Daily published-post target is complete.");
}

async function tick() {
  cleanup();
  log(`Checking content API: ${apiUrl}`);
  const apiStatus = await apiOnline();
  const state = readJson(statePath, {});
  state.apiStatus = {
    online: apiStatus.online,
    detail: apiStatus.detail,
    checkedAt: new Date().toISOString(),
    pollIntervalMs: pollMs,
  };
  writeJson(statePath, state);
  if (!apiStatus.online) {
    log(`API OFFLINE — ${apiStatus.detail}`);
    return;
  }
  log(`API ONLINE — ${apiStatus.detail}. Calculating saved schedule and continuing due work.`);
  if (fill) {
    log("Filling the current content cycle.");
    await fillRecentPublishedPosts();
    return;
  }
  const due = !state.nextDailyRun || new Date(state.nextDailyRun).getTime() <= Date.now();
  if (!due && once) { log(`Not due yet. Next run: ${state.nextDailyRun}`); return; }
  if (!due) return;
  await dailyRun();
}

async function main() {
  await tick();
  if (once) return;
  log(`Worker active. Checking API and schedule every ${Math.round(pollMs / 1000)} seconds.`);
  setInterval(() => tick().catch((error) => log(`Worker error: ${error.message}`)), pollMs);
}

main().catch((error) => { log(`Fatal worker error: ${error.stack || error.message}`); process.exitCode = 1; });
