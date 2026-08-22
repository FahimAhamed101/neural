import fs from "node:fs";
import path from "node:path";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

type WorkerState = {
  apiStatus?: {
    online?: boolean;
    detail?: string;
    checkedAt?: string;
    pollIntervalMs?: number;
  };
};

export function GET() {
  try {
    const statePath = path.join(process.cwd(), "data", "content-worker-state.json");
    const state = JSON.parse(fs.readFileSync(statePath, "utf8")) as WorkerState;
    const status = state.apiStatus;
    if (!status?.checkedAt || typeof status.online !== "boolean") {
      return NextResponse.json(
        { online: false, checkedAt: null, detail: "The content worker has not completed an API health check yet." },
        { headers: { "Cache-Control": "no-store" } },
      );
    }

    const pollInterval = Math.max(15_000, Number(status.pollIntervalMs || 60_000));
    const stale = Date.now() - new Date(status.checkedAt).getTime() > pollInterval * 3;
    return NextResponse.json(
      {
        online: stale ? false : status.online,
        checkedAt: status.checkedAt,
        detail: stale ? "The content worker is not reporting current health checks." : status.detail,
      },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch {
    return NextResponse.json(
      { online: false, checkedAt: null, detail: "Content API status is unavailable." },
      { headers: { "Cache-Control": "no-store" } },
    );
  }
}
