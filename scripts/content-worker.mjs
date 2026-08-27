import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import process from "node:process";
import { createPostStore } from "./post-store.mjs";

const root = process.cwd();
const envPath = path.join(root, ".env");
if (fs.existsSync(envPath)) process.loadEnvFile(envPath);
const apiUrl = process.env.CONTENT_API_URL || "http://127.0.0.1:8000/v1/chat/completions";
const model = process.env.CONTENT_API_MODEL || "deepseek-expert";
const pollMs = Math.max(15000, Number(process.env.CONTENT_POLL_MS || 60000));
const dailyMs = 24 * 60 * 60 * 1000;
const once = process.argv.includes("--once");
const fill = process.argv.includes("--fill");
const healthOnly = process.argv.includes("--health");
const postStore = createPostStore({
  root,
  mongoUri: process.env.MONGODB_URI,
  databaseName: process.env.MONGODB_DB || "nueral",
});

function displayApiUrl(value) {
  try {
    const parsed = new URL(value);
    return `${parsed.protocol}//${parsed.host}${parsed.pathname}`;
  } catch {
    return "configured content API";
  }
}

const topicSeeds = [
  "web development company",
  "web development services",
  "custom web development",
  "website development company",
  "web application development",
  "ecommerce website development",
  "website redesign services",
  "website development cost",
  "web development for small business",
  "mobile app development",
  "mobile app development company",
  "app development services",
  "custom mobile app development",
  "hire app developer",
  "Android app development",
  "iOS app development",
  "React Native app development",
  "cross-platform app development",
  "app development for startups",
  "SaaS development company",
  "MVP development company",
  "custom software development company",
  "AI application development company",
  "business automation development",
  "real estate app development",
  "healthcare app development",
  "restaurant app development",
  "logistics software development",
  "education app development",
  "fintech app development",
  "booking app development",
  "marketplace app development",
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
  if (words < 850) issues.push(`Article is too short (${words} words)`);
  if (!Array.isArray(post.keywords) || post.keywords.length < 4) issues.push("At least four relevant keywords are required");
  if (!post.primaryKeyword) issues.push("Primary keyword is required");
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
  const recentTitles = existing.slice(-80).map((post) => post.title);
  const recentKeywords = existing.slice(-80).flatMap((post) => post.keywords || []).slice(-250);

  const prompt = `You are the SEO content strategist for Neural IT Limited, a Bangladesh-based company serving international clients with web development, mobile app development, ecommerce, SaaS, custom software, API, AI application, and business automation services.

Today is ${day}.

PRIMARY BUSINESS GOAL
Create content that attracts prospective clients from Google Search. Prioritize buyer intent and commercial relevance over raw traffic volume.

Create exactly 6 distinct content opportunities using this required mix:
1. Two high-commercial-intent web or mobile development topics.
2. Two industry-specific development topics.
3. One pricing, cost, hiring, or comparison topic.
4. One useful technology-trend or educational topic directly connected to a service Neural IT Limited sells.

PRIORITIZE SEARCH INTENT SUCH AS
- development company
- development services
- custom development
- hire developer
- development cost
- development price
- best development company
- development for startups
- development for small businesses
- development for a specific industry
- agency vs freelancer
- native vs cross-platform
- custom vs template / SaaS / no-code
- MVP cost
- website redesign cost
- ecommerce development cost

TARGET SERVICES
- web development
- custom website development
- web application development
- ecommerce development
- Shopify development
- WordPress development
- mobile app development
- Android development
- iOS development
- React Native development
- cross-platform app development
- SaaS development
- MVP development
- custom software development
- API development
- AI application development
- business automation

TARGET INDUSTRIES
- real estate
- healthcare
- restaurants
- ecommerce
- retail
- logistics
- education
- fintech
- travel
- hospitality
- construction
- professional services
- startups
- small businesses

AVOID LOW CLIENT-INTENT TOPICS
Do not target courses, tutorials, learning roadmaps, certifications, interview questions, salaries, jobs, internships, coding exercises, source-code downloads, free templates, student projects, homework, or "how to become a developer" queries.

QUALITY RULES
- Never invent search volume, CPC, rankings, statistics, clients, awards, research, quotes, releases, or current events.
- Do not claim guaranteed rankings, guaranteed leads, guaranteed revenue, or guaranteed business results.
- Do not create thin location doorway pages.
- Avoid keyword stuffing.
- Every topic must answer a real buying question or project-planning problem.
- Use service keywords naturally.
- Prefer specific long-tail topics when they show stronger purchase intent.
- Do not repeat or closely paraphrase existing titles or primary keywords.

Topic inspiration: ${topicSeeds.join("; ")}.
Avoid these existing titles: ${recentTitles.join(" | ")}.
Avoid overusing these recent keywords: ${recentKeywords.join(" | ")}.

Return only valid JSON in this exact shape:
{"topics":[{"title":"...","kind":"commercial","primaryKeyword":"...","secondaryKeywords":["..."],"audience":"...","industry":"...","funnelStage":"...","service":"...","searchIntent":"...","customerProblem":"...","angle":"...","cta":"..."}]}

Allowed kind values: commercial, industry, decision, authority.
Exactly 6 topics are required.`;

  const data = extractJson(await completion([{ role: "user", content: prompt }], { maxTokens: 2200 }));
  if (!Array.isArray(data.topics) || data.topics.length !== 6) {
    throw new Error("Topic planner did not return exactly six topics");
  }
  return data.topics;
}

async function createArticle(topic, existing) {
  const prompt = `Write a trustworthy, original, client-acquisition SEO article for Neural IT Limited.

TOPIC
Title idea: ${topic.title}
Type: ${topic.kind}
Primary keyword: ${topic.primaryKeyword}
Secondary keywords: ${(topic.secondaryKeywords || []).join(", ")}
Audience: ${topic.audience}
Industry: ${topic.industry || "general business"}
Funnel stage: ${topic.funnelStage || "consideration"}
Service to promote: ${topic.service || "web and app development"}
Search intent: ${topic.searchIntent || "commercial investigation"}
Customer problem: ${topic.customerProblem || topic.angle}
Angle: ${topic.angle}
Suggested CTA: ${topic.cta || "Talk with Neural IT Limited about your project."}

CONTENT GOAL
Answer the searcher's question better than a generic agency landing page, while naturally positioning Neural IT Limited as a possible development partner.

REQUIREMENTS
- 900-1400 words of practical, specific guidance with no filler.
- Write for founders, business owners, managers, and teams considering a real project.
- Put the most decision-useful information early in the article.
- Use the primary keyword naturally in the title, introduction, and relevant headings when appropriate.
- Use secondary keywords only where they fit naturally.
- Never keyword-stuff.
- Include 5-7 useful sections, each with 2-3 substantial paragraphs.
- Include decision criteria, common risks, budget/timeline factors, or project-planning guidance where relevant.
- For cost articles, explain the factors that change cost rather than inventing exact market prices.
- For comparison articles, present balanced tradeoffs and explain who each option is best for.
- For industry articles, include industry-specific workflows, features, integrations, compliance considerations, or operational challenges when relevant.
- For service-selection articles, explain what buyers should ask a development company before hiring.
- Include exactly 3 useful FAQs.
- End with a restrained, specific CTA related to the service and customer problem.
- Description must be 110-165 characters and accurately summarize the article.
- Title must be 35-72 characters.
- Plain text only inside fields; no Markdown or HTML.

TRUST & SAFETY RULES
- Never claim guaranteed SEO rankings, leads, revenue, downloads, app-store success, or business results.
- Never invent statistics, quotes, clients, case studies, certifications, awards, research, product releases, current events, or company announcements.
- Do not claim Neural IT Limited has experience in a specific regulated industry unless the article only describes general capabilities and considerations.
- Do not fabricate prices. If exact pricing is unknown, discuss cost drivers and recommend a project estimate.
- Do not attack competitors.
- Do not write for students, job seekers, or people looking for coding tutorials.

Return only valid JSON:
{"title":"","description":"","category":"","keywords":[""],"sections":[{"heading":"","paragraphs":[""]}],"faq":[{"question":"","answer":""}],"ctaTitle":"","ctaText":""}`;

  const articleResponse = await completion([{ role: "user", content: prompt }], { maxTokens: 5000 });
  let raw;
  try {
    raw = extractJson(articleResponse);
  } catch (parseError) {
    log("Article JSON was malformed. Asking the API to repair formatting without rewriting the content.");
    const repaired = await completion([
      { role: "system", content: "You are a strict JSON repair tool. Return one valid JSON object only. Preserve the supplied meaning and fields. Escape quotation marks inside strings, remove trailing commas, and do not add Markdown fences." },
      { role: "user", content: articleResponse },
    ], { temperature: 0, maxTokens: 5200 });
    try { raw = extractJson(repaired); } catch { throw parseError; }
  }

  const now = new Date();
  const kind = ["commercial", "industry", "decision", "authority"].includes(topic.kind) ? topic.kind : "commercial";
  const baseSlug = slugify(raw.title || topic.title);
  let slug = baseSlug;
  if (existing.some((post) => post.slug === slug)) slug = `${baseSlug}-${now.toISOString().slice(0, 10)}`;

  const post = {
    id: crypto.randomUUID(),
    slug,
    title: String(raw.title || topic.title).trim(),
    description: String(raw.description || "").trim(),
    category: String(raw.category || "Web & App Development").trim(),
    kind,
    primaryKeyword: String(topic.primaryKeyword || "").trim(),
    secondaryKeywords: Array.isArray(topic.secondaryKeywords) ? topic.secondaryKeywords.map(String).map((item) => item.trim()).filter(Boolean).slice(0, 12) : [],
    audience: String(topic.audience || "business decision-makers").trim(),
    industry: String(topic.industry || "general business").trim(),
    funnelStage: String(topic.funnelStage || "consideration").trim(),
    service: String(topic.service || "web and app development").trim(),
    searchIntent: String(topic.searchIntent || "commercial investigation").trim(),
    keywords: Array.isArray(raw.keywords) ? raw.keywords.map(String).map((item) => item.trim()).filter(Boolean).slice(0, 12) : [],
    sections: Array.isArray(raw.sections)
      ? raw.sections.map((section) => ({
          heading: String(section.heading || "").trim(),
          paragraphs: Array.isArray(section.paragraphs)
            ? section.paragraphs.map(String).map((item) => item.trim()).filter(Boolean)
            : [],
        })).filter((section) => section.heading && section.paragraphs.length)
      : [],
    faq: Array.isArray(raw.faq)
      ? raw.faq.map((item) => ({
          question: String(item.question || "").trim(),
          answer: String(item.answer || "").trim(),
        })).filter((item) => item.question && item.answer).slice(0, 3)
      : [],
    ctaTitle: String(raw.ctaTitle || "Plan your web or app project with confidence").trim(),
    ctaText: String(raw.ctaText || "Talk with Neural IT Limited about your requirements, timeline, and a practical path from idea to launch.").trim(),
    readingMinutes: 1,
    status: "draft",
    qualityIssues: [],
    publishedAt: now.toISOString(),
    updatedAt: now.toISOString(),
    expiresAt: null,
  };

  const result = validate(post, existing);
  post.readingMinutes = Math.max(4, Math.ceil(result.words / 220));
  post.qualityIssues = result.issues;
  post.status = result.issues.length ? "draft" : "published";
  return post;
}

async function cleanup() {
  return postStore.auditAndCleanup();
}

async function dailyRun() {
  const cycleStartedAt = Date.now();
  let posts = await cleanup();
  log("Starting daily generation of 6 targeted posts.");
  const topics = await planTopics(posts);
  for (let index = 0; index < topics.length; index += 1) {
    log(`Generating ${index + 1}/6: ${topics[index].title}`);
    const post = await generateWithRetry(topics[index], posts, `Post ${index + 1}`);
    if (post) posts = await postStore.list();
  }
  await fillRecentPublishedPosts(cycleStartedAt);
  const state = await postStore.loadState();
  state.lastDailyRun = new Date().toISOString();
  state.nextDailyRun = new Date(Date.now() + dailyMs).toISOString();
  await postStore.saveState(state);
  log("Daily content cycle finished.");
}

async function generateWithRetry(topic, posts, label) {
  for (let attempt = 1; attempt <= 2; attempt += 1) {
    try {
      const post = await createArticle(topic, posts);
      posts.push(post);
      await postStore.upsert(post);
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
  let posts = await cleanup();
  const recentPublished = posts.filter((post) => post.status === "published" && new Date(post.publishedAt).getTime() > since).length;
  let needed = Math.max(0, 6 - recentPublished);
  if (!needed) { log("The latest daily window already contains 6 published posts."); return; }
  log(`Filling ${needed} missing published post(s) from the latest daily cycle.`);
  const topics = await planTopics(posts);
  const ordered = [...topics].sort((a, b) => (a.kind === "news" ? 1 : 0) - (b.kind === "news" ? 1 : 0));
  for (let index = 0; index < ordered.length && needed > 0; index += 1) {
    log(`Generating fill candidate: ${ordered[index].title}`);
    const post = await generateWithRetry(ordered[index], posts, `Fill candidate ${index + 1}`);
    posts = await postStore.list();
    if (post?.status === "published") needed -= 1;
  }
  log(needed ? `Fill cycle finished with ${needed} published post(s) still missing.` : "Daily published-post target is complete.");
}

async function tick() {
  await cleanup();
  log(`Checking content API: ${displayApiUrl(apiUrl)}`);
  const apiStatus = await apiOnline();
  const state = await postStore.loadState();
  state.apiStatus = {
    online: apiStatus.online,
    detail: apiStatus.detail,
    checkedAt: new Date().toISOString(),
    pollIntervalMs: pollMs,
  };
  await postStore.saveState(state);
  if (!apiStatus.online) {
    log(`API OFFLINE — ${apiStatus.detail}`);
    return;
  }
  if (healthOnly) {
    log(`API ONLINE — ${apiStatus.detail}. Health-only check complete.`);
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
  if (once || healthOnly) {
    await postStore.close();
    return;
  }
  log(`Worker active. Checking API and schedule every ${Math.round(pollMs / 1000)} seconds.`);
  setInterval(() => tick().catch((error) => log(`Worker error: ${error.message}`)), pollMs);
}

main().catch((error) => { log(`Fatal worker error: ${error.stack || error.message}`); process.exitCode = 1; });
