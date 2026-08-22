"use client";

import { useEffect } from "react";

type ContentApiStatus = {
  online: boolean;
  checkedAt: string | null;
  detail: string;
};

export default function ContentApiConsoleMonitor() {
  useEffect(() => {
    let active = true;

    async function reportStatus() {
      try {
        const response = await fetch("/api/content-status", { cache: "no-store" });
        if (!response.ok) throw new Error(`status endpoint returned ${response.status}`);
        const status = await response.json() as ContentApiStatus;
        if (!active) return;
        const checked = status.checkedAt ? new Date(status.checkedAt).toLocaleString() : "not checked";
        if (status.online) {
          console.info(`%cCONTENT API ONLINE%c — ${status.detail} (worker check: ${checked})`, "color:#111;background:#b8ff33;padding:3px 7px;border-radius:4px;font-weight:700", "color:inherit");
        } else {
          console.error(`CONTENT API OFFLINE — ${status.detail} (worker check: ${checked})`);
        }
      } catch (error) {
        if (active) console.error("CONTENT API OFFLINE — unable to read worker status", error);
      }
    }

    reportStatus();
    const timer = window.setInterval(reportStatus, 60_000);
    return () => {
      active = false;
      window.clearInterval(timer);
    };
  }, []);

  return null;
}
