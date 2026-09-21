const CLOUDINARY_UPLOAD = "/image/upload/";

/**
 * Adds Cloudinary delivery transformations to an image URL.
 *
 * Why not `next/image`? These assets are already served by Cloudinary's CDN,
 * which does the same job (AVIF/WebP conversion, quality tuning, resizing)
 * without routing every request through Next's optimiser. On Vercel that
 * optimiser is metered, so sending a portfolio of screenshots through it turns
 * a free CDN into a bill. A URL rewrite keeps the layout untouched.
 *
 * `f_auto`  -> serve AVIF or WebP to browsers that accept it
 * `q_auto`  -> let Cloudinary pick the quality/compression tradeoff
 * `c_limit` -> never upscale beyond the source resolution
 * `dpr_2`   -> 2x for retina screens
 *
 * URLs that are not Cloudinary, or that already carry transformations, are
 * returned unchanged so this is safe to apply unconditionally.
 */
export function optimizedImage(url: string, width: number): string {
  if (!url || !url.includes("res.cloudinary.com") || !url.includes(CLOUDINARY_UPLOAD)) {
    return url;
  }

  const index = url.indexOf(CLOUDINARY_UPLOAD);
  const head = url.slice(0, index + CLOUDINARY_UPLOAD.length);
  const tail = url.slice(index + CLOUDINARY_UPLOAD.length);

  // An untransformed Cloudinary path starts with a version segment: v1234567/...
  // Anything else already has a transform chain, so leave it alone.
  if (!/^v\d+\//.test(tail)) return url;

  return `${head}f_auto,q_auto,c_limit,w_${width},dpr_2/${tail}`;
}

/** Widths used across the site, kept in one place so they stay consistent. */
export const imageWidths = {
  /** 3-column project grid card */
  card: 440,
  /** Service feature panel on the homepage */
  feature: 800,
  /** Full-width project showcase */
  showcase: 1200,
  /** 2-column project gallery figure */
  gallery: 640,
} as const;
