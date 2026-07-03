import { siteConfig } from "@/lib/site-config";

export const size = { width: 1200, height: 630 };
export const contentType = "image/svg+xml";

export default function OpengraphImage() {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
    <defs>
      <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse">
        <path d="M48 0H0V48" fill="none" stroke="#DDE3E0" stroke-width="1"/>
      </pattern>
    </defs>
    <rect width="1200" height="630" fill="#F7F8FA"/>
    <rect width="1200" height="630" fill="url(#grid)" opacity="0.75"/>
    <rect x="80" y="84" width="54" height="54" rx="10" fill="#17211D"/>
    <text x="107" y="123" text-anchor="middle" font-family="Arial, sans-serif" font-size="28" font-weight="700" fill="#FFFFFF">N</text>
    <text x="154" y="122" font-family="Arial, sans-serif" font-size="34" font-weight="700" fill="#17211D">${siteConfig.name}</text>
    <text x="80" y="275" font-family="Arial, sans-serif" font-size="64" font-weight="700" fill="#17211D">Websites, mobile apps,</text>
    <text x="80" y="350" font-family="Arial, sans-serif" font-size="64" font-weight="700" fill="#17211D">and software clients trust.</text>
    <text x="80" y="430" font-family="Arial, sans-serif" font-size="28" font-weight="500" fill="#5F6B66">${siteConfig.url.replace("https://", "")} | WhatsApp +880 1706 617723</text>
  </svg>`;

  return new Response(svg, {
    headers: {
      "Content-Type": contentType,
    },
  });
}
