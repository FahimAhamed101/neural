import fs from "node:fs";
import path from "node:path";
import { MongoClient } from "mongodb";

const managedBy = "neural-content-worker";

function readJson(file, fallback) {
  try { return JSON.parse(fs.readFileSync(file, "utf8")); } catch { return fallback; }
}

function writeJson(file, value) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  const temporary = `${file}.tmp`;
  fs.writeFileSync(temporary, `${JSON.stringify(value, null, 2)}\n`, "utf8");
  fs.renameSync(temporary, file);
}

export function createPostStore({ root, mongoUri, databaseName = "nueral" }) {
  const postsPath = path.join(root, "data", "generated-posts.json");
  const statePath = path.join(root, "data", "content-worker-state.json");
  let databasePromise;
  let mongoClient;

  async function database() {
    if (!mongoUri) return null;
    databasePromise ??= new MongoClient(mongoUri, {
      maxPoolSize: 5,
      serverSelectionTimeoutMS: 8_000,
    }).connect().then((client) => {
      mongoClient = client;
      return client.db(databaseName);
    });
    return databasePromise;
  }

  async function initialize() {
    const db = await database();
    if (!db) return null;
    const collection = db.collection("seo_posts");
    const existing = await collection.estimatedDocumentCount();
    if (!existing) {
      const localPosts = readJson(postsPath, []);
      if (localPosts.length) {
        await collection.insertMany(localPosts.map((post) => ({ ...post, managedBy, schemaVersion: 1 })));
        console.log(`[${new Date().toISOString()}] Seeded ${localPosts.length} post(s) into MongoDB.`);
      }
    }
    await collection.createIndex({ id: 1 }, { unique: true });
    await collection.createIndex({ slug: 1 }, { unique: true });
    await collection.createIndex({ status: 1, publishedAt: -1 });
    return db;
  }

  async function list() {
    try {
      const db = await initialize();
      if (db) {
        const posts = await db.collection("seo_posts").find({}, { projection: { _id: 0, managedBy: 0, schemaVersion: 0 } }).sort({ publishedAt: 1 }).toArray();
        writeJson(postsPath, posts);
        return posts;
      }
    } catch (error) {
      console.error(`[${new Date().toISOString()}] MongoDB read failed; using local posts: ${error.message}`);
    }
    return readJson(postsPath, []);
  }

  async function upsert(post) {
    const db = await initialize();
    if (db) {
      await db.collection("seo_posts").updateOne(
        { id: post.id },
        { $set: { ...post, managedBy, schemaVersion: 1 } },
        { upsert: true },
      );
    }
    const local = readJson(postsPath, []);
    const index = local.findIndex((item) => item.id === post.id);
    if (index >= 0) local[index] = post; else local.push(post);
    writeJson(postsPath, local);
  }

  async function auditAndCleanup() {
    const posts = await list();
    const now = Date.now();
    const seenSlugs = new Set();
    const removals = [];

    for (const post of [...posts].sort((a, b) => new Date(b.updatedAt || b.publishedAt).getTime() - new Date(a.updatedAt || a.publishedAt).getTime())) {
      let reason = null;
      if (post.expiresAt && new Date(post.expiresAt).getTime() <= now) reason = "expired";
      else if (seenSlugs.has(post.slug)) reason = "duplicate-slug";
      else if (post.status === "draft" && now - new Date(post.updatedAt || post.publishedAt).getTime() > 45 * 86_400_000) reason = "stale-failed-draft";
      seenSlugs.add(post.slug);
      if (reason) removals.push({ post, reason });
    }

    if (!removals.length) return posts;
    const removalIds = removals.map(({ post }) => post.id);
    const db = await initialize();
    if (db) {
      await db.collection("seo_post_archive").insertMany(removals.map(({ post, reason }) => ({ ...post, managedBy, archivedAt: new Date().toISOString(), archiveReason: reason })));
      await db.collection("seo_posts").deleteMany({ id: { $in: removalIds }, managedBy });
    }
    const retained = posts.filter((post) => !removalIds.includes(post.id));
    writeJson(postsPath, retained);
    console.log(`[${new Date().toISOString()}] Archived and removed ${removals.length} expired, duplicate, or stale draft post(s).`);
    return retained;
  }

  async function loadState() {
    try {
      const db = await initialize();
      if (db) return (await db.collection("seo_worker_state").findOne({ key: "primary" })) || readJson(statePath, {});
    } catch (error) {
      console.error(`[${new Date().toISOString()}] MongoDB state read failed: ${error.message}`);
    }
    return readJson(statePath, {});
  }

  async function saveState(state) {
    const cleanState = { ...state };
    delete cleanState._id;
    delete cleanState.key;
    try {
      const db = await initialize();
      if (db) await db.collection("seo_worker_state").updateOne({ key: "primary" }, { $set: { ...cleanState, key: "primary" } }, { upsert: true });
    } catch (error) {
      console.error(`[${new Date().toISOString()}] MongoDB state write failed: ${error.message}`);
    }
    writeJson(statePath, cleanState);
  }

  async function close() {
    if (mongoClient) await mongoClient.close();
  }

  return { list, upsert, auditAndCleanup, loadState, saveState, close };
}
