# Northstack — Next.js dev studio landing page

A single-page marketing site for a Next.js web/app development studio, with a
click-to-chat WhatsApp button and SEO already wired up.

## 1. Before you do anything: set your real details

Open `lib/site-config.ts` and replace:

- `whatsappNumber` — your real WhatsApp number, **digits only, no `+` or spaces**,
  in full international format (country code + number).
  Example: for `+1 555 123 4567` use `"15551234567"`.
- `whatsappDefaultMessage` — the pre-filled message people see when they open the chat.
- `url` — your real production domain (used for canonical URLs, sitemap, OG tags, JSON-LD).
- `name`, `tagline`, `description`, `email` — your business details.

That's it — the WhatsApp button (floating button, header link, and hero/CTA buttons)
and all SEO metadata read from this one file.

## 2. Run it

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## 3. Build for production

```bash
npm run build
npm run start
```

Deploy the output anywhere that supports Next.js (Vercel is the simplest — connect
the repo and it builds automatically).

## What's included for SEO

- **Metadata API** (`app/layout.tsx`): title template, meta description, keywords,
  canonical URL, robots directives, Open Graph + Twitter card tags.
- **`app/sitemap.ts`** → generates `/sitemap.xml` automatically.
- **`app/robots.ts`** → generates `/robots.txt` and points to the sitemap.
- **`app/manifest.ts`** → web app manifest for installability/PWA signals.
- **Dynamic OG image** (`app/opengraph-image.tsx`) and **favicons**
  (`app/icon.tsx`, `app/apple-icon.tsx`) generated at build time — no image files to manage.
- **JSON-LD structured data** (`ProfessionalService` schema) injected in the layout,
  including your phone/WhatsApp number and service description.
- Semantic HTML (`<header>`, `<main>`, `<section>`, `<footer>`), one `<h1>` per page,
  descriptive `aria-label`s on icon-only links, and visible focus states.
- Fast by default: server-rendered content, no client-side data fetching on the
  landing page, `next/font` for zero layout shift, compressed responses.

## After deploying, finish the loop

1. Update `url` in `lib/site-config.ts` to your real domain, then redeploy —
   this fixes the canonical URL, sitemap, and OG tags in one place.
2. Submit `https://yourdomain.com/sitemap.xml` in Google Search Console and
   Bing Webmaster Tools.
3. Run the page through Google's Rich Results Test to confirm the
   `ProfessionalService` structured data validates.
4. Run Lighthouse (Chrome DevTools → Lighthouse) and PageSpeed Insights to
   confirm Core Web Vitals in the field, not just the lab.
5. If you want per-page indexing for more services, add more routes under
   `app/` — each folder with a `page.tsx` becomes a URL, and you can export
   its own `metadata` the same way `app/layout.tsx` does.

## WhatsApp link format reference

The chat link is built as:

```
https://wa.me/<countrycode><number>?text=<url-encoded message>
```

`lib/site-config.ts`'s `getWhatsAppLink()` helper does the encoding for you —
you never need to build this URL by hand elsewhere in the app.
