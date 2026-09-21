import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";

/**
 * NOTE: this file previously disallowed "/_next/".
 *
 * That blocked Googlebot from fetching the site's CSS and JavaScript. Google
 * renders pages with a real browser, so when the stylesheet is blocked it
 * evaluates a broken, unstyled layout — which damages both perceived quality
 * and rankings. Next.js serves compiled CSS, JS and optimised images from
 * /_next/, so it must stay crawlable. Only /api/ is disallowed here.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
      {
        // These crawlers only consume crawl budget without sending visitors.
        userAgent: ["AhrefsBot", "SemrushBot", "MJ12bot", "DotBot"],
        disallow: "/",
      },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}
