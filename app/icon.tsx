export const size = { width: 64, height: 64 };
export const contentType = "image/svg+xml";

export default function Icon() {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64"><rect width="64" height="64" rx="14" fill="#17211D"/><text x="32" y="42" text-anchor="middle" font-family="Arial, sans-serif" font-size="32" font-weight="700" fill="#FFFFFF">N</text></svg>`;

  return new Response(svg, {
    headers: {
      "Content-Type": contentType,
    },
  });
}
