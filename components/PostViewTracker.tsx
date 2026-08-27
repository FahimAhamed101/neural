"use client";

import { useEffect } from "react";

export default function PostViewTracker({ slug }: { slug: string }) {
  useEffect(() => {
    const storageKey = `neural-post-view:${slug}`;
    if (window.sessionStorage.getItem(storageKey)) return;
    window.sessionStorage.setItem(storageKey, "1");

    void fetch("/api/post-view", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ slug }),
      keepalive: true,
    });
  }, [slug]);

  return null;
}
