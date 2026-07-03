export const size = { width: 180, height: 180 };
export const contentType = "image/svg+xml";

export default function AppleIcon() {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="180" height="180" viewBox="0 0 180 180"><rect width="180" height="180" rx="36" fill="#17211D"/><text x="90" y="117" text-anchor="middle" font-family="Arial, sans-serif" font-size="88" font-weight="700" fill="#FFFFFF">N</text></svg>`;

  return new Response(svg, {
    headers: {
      "Content-Type": contentType,
    },
  });
}
