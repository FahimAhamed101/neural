import { NextRequest, NextResponse } from "next/server";
import { getMongoDatabase } from "@/lib/mongodb";
import { getPostBySlug } from "@/lib/posts";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

function getCountryCode(request: NextRequest) {
  const value = request.headers.get("x-vercel-ip-country") || request.headers.get("cf-ipcountry") || "ZZ";
  return /^[A-Z]{2}$/i.test(value) ? value.toUpperCase() : "ZZ";
}

export async function POST(request: NextRequest) {
  try {
    const { slug } = await request.json() as { slug?: unknown };
    if (typeof slug !== "string" || !/^[a-z0-9-]{3,90}$/.test(slug)) {
      return NextResponse.json({ ok: false }, { status: 400 });
    }

    const post = await getPostBySlug(slug);
    const database = await getMongoDatabase();
    if (!post || !database) return NextResponse.json({ ok: true });

    const country = getCountryCode(request);
    await database.collection("seo_post_metrics").updateOne(
      { slug },
      {
        $inc: { totalViews: 1, [`countryViews.${country}`]: 1 },
        $set: { updatedAt: new Date().toISOString() },
        $setOnInsert: { slug, createdAt: new Date().toISOString() },
      },
      { upsert: true },
    );

    return NextResponse.json({ ok: true }, { headers: { "Cache-Control": "no-store" } });
  } catch {
    return NextResponse.json({ ok: true });
  }
}
