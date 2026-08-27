"use client";

import { useEffect } from "react";
import { siteConfig } from "@/lib/site-config";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export default function GoogleAdsConversionTracker() {
  useEffect(() => {
    const trackLeadClick = (event: MouseEvent) => {
      if (!(event.target instanceof Element)) return;

      const conversionLink = event.target.closest(
        "[data-google-ads-conversion]",
      );
      if (!conversionLink || typeof window.gtag !== "function") return;

      window.gtag("event", "conversion", {
        send_to: `${siteConfig.googleAdsId}/${siteConfig.googleAdsConversionLabel}`,
        value: 1.0,
        currency: "USD",
      });
    };

    document.addEventListener("click", trackLeadClick);
    return () => document.removeEventListener("click", trackLeadClick);
  }, []);

  return null;
}
