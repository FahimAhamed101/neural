export const siteConfig = {
  name: "Neural IT Limited",
  tagline: "Web, mobile, software, and AI solutions",
  description:
    "Neural IT Limited builds, fixes, redesigns, and maintains websites, web apps, mobile apps, ecommerce stores, and custom business software for clients across Europe, Asia, and the Middle East.",
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://neuralitlimited.online").replace(/\/$/, ""),
  lastModified: "2026-09-22",
  whatsappNumber: "8801706617723",
  phoneNumber: "+8801706617723",
  phoneDisplay: "+880 1706-617723",
  whatsappDefaultMessage:
    "Hi Neural IT, I need help building or fixing a website or app. Here is my project:",
  fiverrUrl: "https://www.fiverr.com/stark420?public_mode=true",
  fiverrExtraGigsUrl: "https://www.fiverr.com/s/YLvaW5Q",
  facebookUrl: "https://www.facebook.com/profile.php?id=61591580969494",
  email: "fahimahamedweb@gmail.com",
  locale: "en_US",
  themeColor: "#F7F8FA",
  googleAnalyticsId: process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID || "G-BNF8CJG38R",
  googleAdsId: process.env.NEXT_PUBLIC_GOOGLE_ADS_ID || "AW-18103640487",
  googleAdsConversionLabel:
    process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL || "NCGWCIzC2J4cEKfDvrhD",

  /**
   * Trust signals. These are shown in the hero and trust bar.
   * Keep them factual — inflated numbers are the fastest way to lose a
   * technical buyer who then checks.
   */
  trust: {
    responseTime: "under 2 hours",
    countriesServed: "20+",
    yearsExperience: "6+",
    supportWindow: "7 days a week",
  },

  /** What a client gets on every engagement. Used by the enquiry form. */
  guarantees: [
    "A written scope, milestone list, and fixed quote before any work starts.",
    "Direct contact with the engineer doing the work — no account-manager relay.",
    "You own the code, the repository, the hosting, and the domain. Always.",
    "First reply on WhatsApp in under 2 hours during working hours.",
    "If we cannot fix it, you do not pay for the diagnosis.",
  ],

  /** Regions the business actively targets. Kept in one place for SEO. */
  targetRegions: ["Europe", "Asia", "Middle East"],

  /** Languages offered to clients. Drives JSON-LD availableLanguage. */
  availableLanguages: ["English", "Arabic", "Bengali", "German", "Japanese", "Indonesian"],
} as const;

export function getWhatsAppLink(message?: string) {
  const text = encodeURIComponent(message ?? siteConfig.whatsappDefaultMessage);
  return `https://wa.me/${siteConfig.whatsappNumber}?text=${text}`;
}

export function getPhoneLink() {
  return `tel:${siteConfig.phoneNumber}`;
}

export function getEmailLink(subject?: string, body?: string) {
  const params = new URLSearchParams();
  if (subject) params.set("subject", subject);
  if (body) params.set("body", body);
  const query = params.toString();
  return `mailto:${siteConfig.email}${query ? `?${query}` : ""}`;
}
