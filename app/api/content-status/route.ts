import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const apiUrl = process.env.CONTENT_API_URL;
const model = process.env.CONTENT_API_MODEL || "deepseek-expert";
const cacheDurationMs = 60_000;

type LiveStatus = {
  online: boolean;
  checkedAt: string;
  detail: string;
};

let cachedStatus: LiveStatus | null = null;
let pendingCheck: Promise<LiveStatus> | null = null;

async function checkContentApi(): Promise<LiveStatus> {
  const checkedAt = new Date().toISOString();

  if (!apiUrl) {
    return {
      online: false,
      checkedAt,
      detail: "CONTENT_API_URL is not configured for this deployment.",
    };
  }

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "ngrok-skip-browser-warning": "true",
      },
      body: JSON.stringify({
        model,
        messages: [{ role: "user", content: "Reply with only OK" }],
        temperature: 0,
        max_tokens: 10,
      }),
      cache: "no-store",
      signal: AbortSignal.timeout(12_000),
    });

    if (!response.ok) {
      return {
        online: false,
        checkedAt,
        detail: `The content API returned HTTP ${response.status}.`,
      };
    }

    const payload = await response.json();
    const answer = payload?.choices?.[0]?.message?.content;

    return {
      online: Boolean(answer),
      checkedAt,
      detail: answer ? "Live API health check succeeded." : "The API returned an empty health-check response.",
    };
  } catch (error) {
    const detail = error instanceof Error && error.name === "TimeoutError"
      ? "The live API health check timed out."
      : "The live API health check could not connect.";

    return { online: false, checkedAt, detail };
  }
}

async function getStatus() {
  if (cachedStatus && Date.now() - new Date(cachedStatus.checkedAt).getTime() < cacheDurationMs) {
    return cachedStatus;
  }

  pendingCheck ??= checkContentApi();
  try {
    cachedStatus = await pendingCheck;
    return cachedStatus;
  } finally {
    pendingCheck = null;
  }
}

export async function GET() {
  const status = await getStatus();
  return NextResponse.json(status, {
    headers: { "Cache-Control": "no-store, max-age=0" },
  });
}
