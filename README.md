# Neural IT Limited — website

Marketing site for Neural IT Limited, a web, mobile app and custom software
development studio serving clients in **Europe, Asia and the Middle East**.

Built with Next.js 14 (App Router), React 18 and Tailwind, plus a set of
hand-written stylesheets for the design system.

## 1. Before you do anything: set your real details

Open `lib/site-config.ts` and check:

- `whatsappNumber` — digits only, no `+` or spaces, full international format.
  For `+1 555 123 4567` use `"15551234567"`.
- `whatsappDefaultMessage` — the pre-filled message people see when they open the chat.
- `url` — your production domain (drives canonical URLs, sitemap, OG tags, JSON-LD).
- `name`, `tagline`, `description`, `email`, `facebookUrl`, `fiverrUrl`.
- `trust` — the response time, countries served and support window shown in the
  hero and trust bar. **Keep these truthful.** Inflated numbers are the fastest
  way to lose a technical buyer who then checks.
- `guarantees` — the promises listed next to the enquiry form.

The WhatsApp button (floating, header, hero, sticky mobile bar) and all SEO
metadata read from this one file. `getWhatsAppLink()` does the encoding for you —
never build the `wa.me` URL by hand elsewhere.

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

Deploy anywhere that supports Next.js. Vercel is simplest, but see the note on
the content worker below — it needs a persistent server.

## 4. Markets and location pages

`lib/markets.ts` is the single source of truth for geographic targeting. It
defines three regions (Europe, Asia, Middle East) and the cities inside them.

Adding a city is a data-only change:

1. Append an entry to `marketCities` in `lib/markets.ts` with its own intro
   paragraphs, `localAngle`, `industries` and `faq`.
2. That's it. The route `/markets/<slug>`, its metadata, its `Service` and
   `BreadcrumbList` schema, the region hubs, the homepage market list, the
   footer links and the sitemap all update automatically.

**Write unique copy for each city.** Fifteen near-identical pages hurt more than
they help. The `localAngle` field is where the page earns its ranking — local
payment methods, language requirements, data-protection rules, hosting regions,
working-hour overlap.

Regions and cities are also injected into `areaServed` in the JSON-LD in
`app/layout.tsx`, so the geographic signal stays consistent across the site.

## 5. Contact and lead capture

The homepage closes with an enquiry form (`components/ContactForm.tsx`) that
posts to `app/api/enquiry/route.ts`. It needs **no database**.

Delivery is resolved at runtime in this order:

1. `RESEND_API_KEY` + `ENQUIRY_FROM_EMAIL` → emailed via the Resend REST API.
2. `ENQUIRY_WEBHOOK_URL` → forwarded as JSON to any webhook.
3. Neither set → the API returns ready-made `mailto:` and WhatsApp links, and the
   form shows a handoff panel so the visitor finishes the send themselves.

> **Configure a transport before you rely on the form.** With option 3 nothing
> is delivered to you automatically: the visitor has to press send a second
> time, and a share of them will not. The API logs
> `[enquiry] NO TRANSPORT CONFIGURED` on every such submission. Setting
> `RESEND_API_KEY` and `ENQUIRY_FROM_EMAIL` takes a few minutes and removes the
> extra step entirely.

See `.env.example` for the variables. WhatsApp remains the primary CTA
everywhere; Fiverr is deliberately demoted to the footer so it does not compete
with direct enquiries.

## 6. What's included for SEO

- **Metadata API** (`app/layout.tsx`): title template, description, keywords,
  canonical URL, robots directives, Open Graph + Twitter cards.
- **`app/sitemap.ts`** → `/sitemap.xml`, including every market and city page.
- **`app/robots.ts`** → `/robots.txt`. It allows `/_next/` on purpose — see the
  comment in that file. Blocking it stops Googlebot fetching your CSS and JS, so
  Google renders an unstyled page and your rankings suffer.
- **`app/manifest.ts`** → web app manifest.
- **Structured data**: `Organization`, `WebSite` and `ProfessionalService` with
  `areaServed`, `knowsLanguage` and an `OfferCatalog` of services in the layout;
  `FAQPage` on the homepage, region and city pages; `Service` and
  `BreadcrumbList` on market pages. FAQ schema is generated from the same array
  that renders the visible accordion, so the two can never drift apart.
- **Web fonts** via `next/font` (Inter for body, Space Grotesk for display),
  self-hosted with `display: swap` — no layout shift, no third-party request.
- Semantic HTML, one `<h1>` per page, `aria-label`s on icon-only links, visible
  focus states, and a `visually-hidden` heading where a section needs one for
  structure but not for sight.
- Server-rendered content, no client-side data fetching on the landing page.

### What SEO cannot do

No one can guarantee a Google position. Technical SEO removes barriers — it does
not create demand. Rankings for competitive terms also need content depth,
backlinks and time. What is in place here is the foundation; the rest is
publishing and earning links.

## 7. Stylesheet layout

Styles are split by responsibility. Load order matters and is set in
`app/layout.tsx`:

| File | Owns |
| --- | --- |
| `globals.css` | Reset, tokens, and the core sections (header, hero, about, services, team, process, testimonials) plus the project **grid** |
| `capabilities.css` | Homepage capabilities grid and technology band |
| `markets.css` | Market intro and region backgrounds |
| `reference.css` | The design-system pass: typography scale, spacing, buttons, floating contact |
| `blog.css`, `service.css`, `project.css` | Blog, service detail, project detail |
| `listing.css` | Service/project **listing** pages, market pages, trust bar, FAQ, enquiry form, sticky mobile CTA |

Rules of thumb if you edit these:

- A property should be declared in exactly one file. Overlapping declarations
  across files is what previously produced a 16/10 image inside a 2/1 container
  and a stray border under every portfolio card.
- `listing.css` loads last and is the right home for new page-level styles.
- The site is **light-theme only**. There is deliberately no
  `prefers-color-scheme` block; adding one makes the site look different
  depending on the visitor's OS setting.

## 8. Automated SEO content worker

The blog automation uses a local OpenAI-compatible endpoint and the
`deepseek-expert` model.

```bash
npm run content:once     # generate a due daily cycle once
npm run content:fill     # fill missing publishable posts in the current cycle
npm run content:worker   # run the API monitor and scheduler continuously
npm run start:content    # run Next.js and the worker together
```

The worker checks the API every minute, prints `API not online yet` when the
endpoint is unavailable, keeps its schedule in `data/content-worker-state.json`,
and resumes due work when the API returns. It generates six targeted articles per
daily cycle. Evergreen articles expire after 7 days; the daily industry update
expires after 90 days. Expired URLs are removed from the live blog and sitemap.

Generated content is stored in `data/generated-posts.json`. Articles failing
length, metadata, structure, duplication or unsupported-claim checks stay as
drafts and are excluded from routes and the sitemap. Blog routes render
dynamically so a persistent Node/VPS deployment sees worker updates without a
rebuild. Serverless deployments such as Vercel cannot reach a machine-local
`127.0.0.1` API or persist JSON writes — use a persistent server, or replace the
file store and API URL with network-accessible services.

## 9. After deploying, finish the loop

1. Set `url` in `lib/site-config.ts` to your real domain and redeploy — this
   fixes canonical URLs, the sitemap and OG tags in one place.
2. Submit `https://yourdomain.com/sitemap.xml` in **Google Search Console** and
   Bing Webmaster Tools.
3. In Search Console, set your **International Targeting** and confirm the
   market pages are being indexed. Submit each `/markets/...` URL for indexing
   the first time so they are discovered quickly.
4. Run the page through Google's **Rich Results Test** to confirm the
   `ProfessionalService`, `FAQPage`, `Service` and `BreadcrumbList` data all
   validate.
5. Run **Lighthouse** and **PageSpeed Insights** to confirm Core Web Vitals in
   the field, not just the lab.
6. **Replace the placeholder content** listed in the handover notes:
   testimonials, the `4.9` rating figure, and the `trust` numbers.

## WhatsApp link format reference

```
https://wa.me/<countrycode><number>?text=<url-encoded message>
```

`getWhatsAppLink()` handles the encoding — you never need to build this by hand.
