export const siteConfig = {
  name: "Neural IT Limited",
  tagline: "Web, mobile, software, and AI solutions",
  description:
    "Neural IT Limited builds AI solutions, websites, mobile apps, and custom business software for companies in Bangladesh and worldwide.",
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://neuralitlimited.com").replace(/\/$/, ""),
  lastModified: "2026-08-23",
  whatsappNumber: "8801706617723",
  whatsappDefaultMessage: "Hi I need a website or mobile app.",
  fiverrUrl: "https://www.fiverr.com/stark420?public_mode=true",
  email: "fahimahamedweb@gmail.com",
  locale: "en_US",
  themeColor: "#F7F8FA",
  googleAnalyticsId: process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID || "G-BNF8CJG38R",
};

export function getWhatsAppLink(message?: string) {
  const text = encodeURIComponent(message ?? siteConfig.whatsappDefaultMessage);
  return `https://wa.me/${siteConfig.whatsappNumber}?text=${text}`;
}
