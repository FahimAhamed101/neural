export type MarketCity = {
  slug: string;
  city: string;
  country: string;
  regionSlug: string;
  regionName: string;
  timezone: string;
  currency: string;
  languages: string;
  industries: string[];
  intro: string[];
  localAngle: string;
  faq: Array<{ question: string; answer: string }>;
};

export type MarketRegion = {
  slug: string;
  name: string;
  headline: string;
  summary: string;
  seoTitle: string;
  seoDescription: string;
  workingHours: string;
  paymentNote: string;
};

export const marketRegions: MarketRegion[] = [
  {
    slug: "europe",
    name: "Europe",
    headline: "Website, app and software development for European businesses",
    summary:
      "We build and repair websites, web apps and mobile apps for companies across the United Kingdom, Germany, the Netherlands, Ireland, the Nordics and the wider EU. Work is delivered in English with GDPR-aware data handling and EU hosting options.",
    seoTitle: "Web, App & Software Development Company for Europe",
    seoDescription:
      "Website development, app repair and custom software for businesses in London, Berlin, Amsterdam, Dublin and Stockholm. GDPR-aware delivery, EU hosting, English-speaking team.",
    workingHours:
      "Our team works a 12:00–21:00 CET shift so European clients get same-day replies and live overlap for calls, reviews and releases.",
    paymentNote:
      "Invoicing in EUR, GBP and USD with EU VAT details supplied where required. Card, bank transfer and SEPA are supported.",
  },
  {
    slug: "asia",
    name: "Asia",
    headline: "Website, app and software development for Asian businesses",
    summary:
      "We support companies across Singapore, Japan, India, Malaysia and Indonesia with product development, platform repair and custom business software. Multi-currency checkout, local payment methods and regional language support are built in from the start.",
    seoTitle: "Web, App & Software Development Company for Asia",
    seoDescription:
      "Website and mobile app development, platform repair and custom software for businesses in Singapore, Tokyo, Bengaluru, Kuala Lumpur and Jakarta. Local payment methods and multi-currency support.",
    workingHours:
      "Our Dhaka studio (GMT+6) already overlaps with South and Southeast Asian business hours, so reviews, standups and launches happen live rather than overnight.",
    paymentNote:
      "We invoice in USD and SGD, and support regional payment methods including PayNow, GrabPay, UPI and GoPay where they are part of the product.",
  },
  {
    slug: "middle-east",
    name: "Middle East",
    headline: "Website, app and software development for Middle East businesses",
    summary:
      "We deliver websites, booking platforms, portals and mobile apps for clients in the United Arab Emirates, Saudi Arabia and Qatar. Bilingual Arabic and English interfaces, RTL layout and Gulf payment gateways are part of the standard build.",
    seoTitle: "Web, App & Software Development Company for the Middle East",
    seoDescription:
      "Website, app and custom software development for businesses in Dubai, Abu Dhabi, Riyadh and Doha. Bilingual Arabic/English interfaces, RTL layouts and Gulf payment gateways.",
    workingHours:
      "Our working week and shift pattern align closely with Gulf Standard Time, giving UAE, Saudi and Qatari clients same-day communication and predictable delivery windows.",
    paymentNote:
      "Invoicing in AED, SAR, QAR and USD, with support for Mada, KNET and regional card processing in customer-facing products.",
  },
];

export const marketCities: MarketCity[] = [
  /* ------------------------------- EUROPE ------------------------------- */
  {
    slug: "london",
    city: "London",
    country: "United Kingdom",
    regionSlug: "europe",
    regionName: "Europe",
    timezone: "GMT / BST (GMT+1 in summer)",
    currency: "GBP",
    languages: "English",
    industries: ["Professional services", "Fintech", "Ecommerce", "Property", "Hospitality"],
    intro: [
      "London buyers compare suppliers quickly and expect a working prototype, not a slide deck. We work with agencies, professional service firms and product teams in the UK that need a website rebuilt, a booking or client portal finished, or an inherited codebase stabilised without pausing the business.",
      "Because our studio works a shift that overlaps UK business hours, you can hold a live review call, watch a staging build, and approve a release on the same working day. Nothing depends on an overnight email chain.",
    ],
    localAngle:
      "UK-specific delivery details: we implement cookie consent and privacy controls that match UK GDPR expectations, set up analytics in a way that respects consent state, and configure EU or UK hosting regions so page speed and data residency both stay defensible.",
    faq: [
      {
        question: "Do you work with UK GDPR and cookie consent requirements?",
        answer:
          "Yes. We implement consent-aware analytics, a cookie banner that actually blocks non-essential scripts until consent is given, privacy policy and cookie policy pages, and data-subject request handling. Where a project processes personal data we keep processing in UK or EU regions.",
      },
      {
        question: "Can you work alongside our existing London agency or in-house developer?",
        answer:
          "Often that is the fastest route. We can take a defined slice of work such as performance repair, a checkout fix, a new booking flow or front-end build, and hand it back with documented components and deployment notes rather than creating a parallel system.",
      },
    ],
  },
  {
    slug: "berlin",
    city: "Berlin",
    country: "Germany",
    regionSlug: "europe",
    regionName: "Europe",
    timezone: "CET / CEST (GMT+1 / GMT+2)",
    currency: "EUR",
    languages: "German, English",
    industries: ["SaaS", "Manufacturing", "Mobility", "Ecommerce", "Startups"],
    intro: [
      "German clients are precise about scope, documentation and data protection, and we build for that expectation. Every engagement starts with a written scope covering user roles, acceptance criteria, milestones and explicit exclusions, so there is no ambiguity about what is being delivered at each stage.",
      "We build B2B portals, SaaS dashboards, manufacturing and logistics tooling, and multilingual marketing sites for German companies. Interfaces can be delivered in German and English with correct date, number and currency formatting for the DACH market.",
    ],
    localAngle:
      "DACH-specific delivery details: German-language interface copy, formal address conventions where appropriate, GDPR-compliant data flows, and hosting in EU regions such as Frankfurt or Falkenstein to keep latency low and data inside the EU.",
    faq: [
      {
        question: "Can you deliver the interface in German as well as English?",
        answer:
          "Yes. We implement proper internationalisation with German and English locales rather than hard-coded text, including German date and number formatting, correct umlaut handling, and a locale switcher that preserves the current page.",
      },
      {
        question: "How do you handle documentation and handover?",
        answer:
          "You receive a written scope, a component and architecture overview, deployment and environment notes, and a record of integrations and credentials. The code and accounts stay in your ownership so you are not dependent on us to keep the product running.",
      },
    ],
  },
  {
    slug: "amsterdam",
    city: "Amsterdam",
    country: "Netherlands",
    regionSlug: "europe",
    regionName: "Europe",
    timezone: "CET / CEST (GMT+1 / GMT+2)",
    currency: "EUR",
    languages: "Dutch, English",
    industries: ["Logistics", "Ecommerce", "Marketplaces", "Travel", "SaaS"],
    intro: [
      "The Netherlands runs on trade, marketplaces and logistics, and those businesses need platforms that stay fast and correct under real transaction volume. We build and repair ecommerce storefronts, marketplace flows, booking engines and logistics dashboards for Dutch companies.",
      "A frequent request is rescuing a stalled build: a marketplace where payments half-work, a storefront with broken checkout, or an integration that silently fails. We diagnose the actual cause before changing code, then fix the paths that affect revenue first.",
    ],
    localAngle:
      "Benelux-specific delivery details: iDEAL and SEPA payment support, Dutch and English locales, EU hosting, and GDPR-aligned consent handling. We also test multi-currency and cross-border VAT display for stores selling beyond the Netherlands.",
    faq: [
      {
        question: "Can you integrate iDEAL and other Benelux payment methods?",
        answer:
          "Yes. We integrate iDEAL and SEPA alongside card payments through established providers, including correct handling of failed, cancelled and refunded payments, plus webhook reliability and reconciliation reporting so orders and payments stay in sync.",
      },
      {
        question: "Can you fix a marketplace or storefront built by another team?",
        answer:
          "Yes, this is one of our most common engagements. We need repository access, the hosting dashboard and test credentials for the affected integrations, then we reproduce the failure, explain the cause in plain language, and repair it in priority order.",
      },
    ],
  },
  {
    slug: "dublin",
    city: "Dublin",
    country: "Ireland",
    regionSlug: "europe",
    regionName: "Europe",
    timezone: "GMT / IST",
    currency: "EUR",
    languages: "English",
    industries: ["SaaS", "Fintech", "Medtech", "Professional services", "Ecommerce"],
    intro: [
      "Dublin hosts a dense cluster of SaaS, fintech and medtech operations, many of them serving the whole EU from Ireland. We build product interfaces, customer portals, dashboards and marketing sites for those teams, and we take accessibility and data-protection expectations seriously from the first sprint.",
      "For regulated products we treat security and auditability as product requirements: role-based permissions, validation, audit trails, error handling and monitoring are planned into the build rather than added later.",
    ],
    localAngle:
      "Ireland-specific delivery details: WCAG 2.2 AA accessibility work with keyboard and screen-reader testing, EU data residency, and analytics configured for consent state. We also support bilingual English and Irish interface strings where a public-sector or cultural requirement exists.",
    faq: [
      {
        question: "Do you build to WCAG accessibility standards?",
        answer:
          "Yes. We implement semantic structure, correct heading order, focus management, visible focus states, colour contrast, form labelling and error messaging, then test with keyboard navigation and screen readers. Public-sector and regulated projects typically need WCAG 2.2 AA.",
      },
      {
        question: "Can you help with an EU data residency requirement?",
        answer:
          "Yes. We deploy to EU regions, keep third-party services within the EU where possible, document which processors touch personal data, and avoid sending production data to services that store it outside the EU without a lawful basis.",
      },
    ],
  },
  {
    slug: "stockholm",
    city: "Stockholm",
    country: "Sweden",
    regionSlug: "europe",
    regionName: "Europe",
    timezone: "CET / CEST (GMT+1 / GMT+2)",
    currency: "SEK",
    languages: "Swedish, English",
    industries: ["SaaS", "Clean energy", "Ecommerce", "Gaming", "Public sector"],
    intro: [
      "Nordic teams tend to be small, senior and pragmatic about tooling. We match that by giving you direct access to the engineer doing the work rather than routing everything through an account manager, and by keeping the stack boring and maintainable.",
      "We build customer-facing products and internal tooling for Swedish companies, with particular care around performance and accessibility because those expectations are genuinely high in the region.",
    ],
    localAngle:
      "Nordic-specific delivery details: Swedish and English locales, SEK pricing and invoice formats, EU hosting in Stockholm or nearby regions, and performance budgets enforced in CI so a slow release is caught before it reaches users.",
    faq: [
      {
        question: "How do you keep a website fast in the Nordics?",
        answer:
          "We set performance budgets, serve pages from a region close to the audience, compress and correctly size images, defer non-critical scripts, and measure real-user Core Web Vitals after launch rather than trusting a single lab score.",
      },
      {
        question: "Who will I actually be talking to?",
        answer:
          "You speak directly with the engineer building your product. We keep the team deliberately small so decisions happen in the conversation instead of being relayed, which shortens delivery and reduces misunderstandings.",
      },
    ],
  },

  /* -------------------------------- ASIA -------------------------------- */
  {
    slug: "singapore",
    city: "Singapore",
    country: "Singapore",
    regionSlug: "asia",
    regionName: "Asia",
    timezone: "SGT (GMT+8)",
    currency: "SGD",
    languages: "English, Mandarin, Malay",
    industries: ["Fintech", "Logistics", "Ecommerce", "Education", "Hospitality"],
    intro: [
      "Singapore is the regional headquarters for a lot of Southeast Asian operations, which means projects here often need to serve several countries from one platform. We build multi-currency, multi-language products with the payment and identity methods each market actually uses.",
      "Our studio timezone is only two hours behind Singapore, so this is one of the closest overlaps we have. Reviews, launches and incident fixes happen inside your working day.",
    ],
    localAngle:
      "Singapore-specific delivery details: PayNow, GrabPay and card payments, SGD pricing with multi-currency display for regional rollout, English, Mandarin and Malay locale support, and PDPA-aligned consent and data handling.",
    faq: [
      {
        question: "Can one platform serve multiple Southeast Asian markets?",
        answer:
          "Yes. We build with locale and currency as first-class concepts rather than hard-coded values, so you can launch in Singapore first and add Malaysia, Indonesia or Vietnam by enabling a locale and its payment and tax rules rather than rebuilding the product.",
      },
      {
        question: "Do you support PDPA requirements?",
        answer:
          "Yes. We implement consent capture, clear notices on what is collected and why, retention controls, and access controls on personal data, and we document which third-party processors receive data.",
      },
    ],
  },
  {
    slug: "tokyo",
    city: "Tokyo",
    country: "Japan",
    regionSlug: "asia",
    regionName: "Asia",
    timezone: "JST (GMT+9)",
    currency: "JPY",
    languages: "Japanese, English",
    industries: ["Manufacturing", "Retail", "Travel", "SaaS", "Hospitality"],
    intro: [
      "Japanese clients expect polish, punctuality and precise specification. We plan interfaces at a level of detail that suits that standard: defined states for every screen, explicit edge-case handling, and typographic care that respects Japanese line-breaking and character spacing.",
      "We build bilingual Japanese and English websites, reservation systems, customer portals and internal tools, and we are careful about the details that make a product feel local rather than translated.",
    ],
    localAngle:
      "Japan-specific delivery details: Japanese typography with correct line-breaking and character spacing, bilingual interfaces with a locale switcher, JPY pricing without decimal confusion, and support for Japanese payment and convenience-store flows where relevant.",
    faq: [
      {
        question: "Can you build a genuinely bilingual Japanese and English site?",
        answer:
          "Yes. We implement separate locale content rather than machine-translating one language, with Japanese typography rules, correct date and address ordering, and a locale switcher that keeps the user on the same page. Both locales are indexed with correct language signals.",
      },
      {
        question: "How do you handle detailed specification requirements?",
        answer:
          "We produce screen-level specifications that define empty, loading, error and success states for each interface, plus written acceptance criteria. This is reviewed and agreed before development, which keeps the build predictable.",
      },
    ],
  },
  {
    slug: "bengaluru",
    city: "Bengaluru",
    country: "India",
    regionSlug: "asia",
    regionName: "Asia",
    timezone: "IST (GMT+5:30)",
    currency: "INR",
    languages: "English, Hindi, Kannada",
    industries: ["SaaS", "IT services", "Ecommerce", "Education", "Healthcare"],
    intro: [
      "Bengaluru teams are technically sharp and move quickly, so engagements here usually need engineering depth rather than hand-holding. We take on defined builds, platform repairs, performance work and integrations that your in-house team wants delivered and documented.",
      "We are in the same timezone band as India, which makes this our tightest working overlap anywhere. Daily standups, live debugging sessions and same-day releases are straightforward.",
    ],
    localAngle:
      "India-specific delivery details: UPI, cards and netbanking payment support, INR pricing and GST-compliant invoicing, support for English plus Hindi and regional language strings, and cost-conscious architecture that scales without unnecessary managed services.",
    faq: [
      {
        question: "Can you work as an extension of our in-house engineering team?",
        answer:
          "Yes. We can take a defined workstream such as a new module, an integration, a performance programme or a legacy migration, join your existing standup and review process, and work in your repository and branching conventions rather than imposing our own.",
      },
      {
        question: "Do you support UPI and Indian payment flows?",
        answer:
          "Yes. We integrate UPI, cards and netbanking through established Indian providers, handle success, failure, pending and refund states properly, and reconcile orders against settlement reports so the accounts match the platform.",
      },
    ],
  },
  {
    slug: "kuala-lumpur",
    city: "Kuala Lumpur",
    country: "Malaysia",
    regionSlug: "asia",
    regionName: "Asia",
    timezone: "MYT (GMT+8)",
    currency: "MYR",
    languages: "Malay, English, Mandarin",
    industries: ["Ecommerce", "Property", "Education", "Hospitality", "Government"],
    intro: [
      "Malaysian businesses often need a strong presence across three languages and several payment habits at once. We build storefronts, property and booking platforms, and service portals that handle that complexity without becoming confusing for the user.",
      "Because Malaysia shares the GMT+8 band with Singapore, project communication lands inside your working day with a two-hour offset at most.",
    ],
    localAngle:
      "Malaysia-specific delivery details: FPX online banking, cards and e-wallet payments, MYR pricing, Malay, English and Mandarin locale support, and PDPA-aligned consent handling for customer data.",
    faq: [
      {
        question: "Can you build a site in Malay, English and Mandarin?",
        answer:
          "Yes. We implement true multi-locale content with a language switcher, correct fonts and line-breaking for each language, and indexed language signals so search engines serve the right version to the right audience.",
      },
      {
        question: "Do you integrate FPX and Malaysian e-wallets?",
        answer:
          "Yes. We support FPX online banking and common e-wallets alongside cards, with proper handling of pending and failed transactions, which matters because FPX flows are not always instant.",
      },
    ],
  },
  {
    slug: "jakarta",
    city: "Jakarta",
    country: "Indonesia",
    regionSlug: "asia",
    regionName: "Asia",
    timezone: "WIB (GMT+7)",
    currency: "IDR",
    languages: "Indonesian, English",
    industries: ["Ecommerce", "Logistics", "Fintech", "Travel", "Retail"],
    intro: [
      "Indonesia is mobile-first and price-sensitive about data usage, so a platform that is heavy on the desktop will lose customers on the phones they actually use. We build and repair storefronts, delivery and logistics tools, and service apps with mobile performance treated as the primary requirement.",
      "We also plan for real Indonesian network conditions: slower connections, intermittent connectivity, and devices with limited storage. That means smaller payloads, sensible caching and interfaces that degrade gracefully.",
    ],
    localAngle:
      "Indonesia-specific delivery details: GoPay, OVO, QRIS and virtual account payments, IDR formatting with correct thousand separators, Indonesian and English locales, and lightweight mobile-first builds tested on mid-range Android devices.",
    faq: [
      {
        question: "How do you make a site fast on Indonesian mobile networks?",
        answer:
          "We prioritise a small initial payload, compress and correctly size images, avoid heavy client-side libraries, cache aggressively where content allows, and test on mid-range Android devices over throttled connections rather than only on fast office wifi.",
      },
      {
        question: "Can you integrate QRIS and local e-wallets?",
        answer:
          "Yes. We integrate QRIS, virtual accounts and major e-wallets through local providers, including correct handling of expired and pending payments, which is common in Indonesian payment flows.",
      },
    ],
  },

  /* ---------------------------- MIDDLE EAST ----------------------------- */
  {
    slug: "dubai",
    city: "Dubai",
    country: "United Arab Emirates",
    regionSlug: "middle-east",
    regionName: "Middle East",
    timezone: "GST (GMT+4)",
    currency: "AED",
    languages: "Arabic, English",
    industries: ["Real estate", "Hospitality", "Ecommerce", "Professional services", "Logistics"],
    intro: [
      "Dubai moves fast and expects a supplier who can start quickly and show visible progress. We build websites, property and listing platforms, booking engines and mobile apps for UAE businesses, and we are comfortable working at the pace this market sets.",
      "A large share of our Gulf work is bilingual by default. Arabic and English are both first-class: real right-to-left layout, mirrored navigation, correct Arabic typography, and mirrored form and table behaviour rather than an English site with translated labels pasted in.",
    ],
    localAngle:
      "UAE-specific delivery details: true Arabic RTL layout and typography, bilingual switching, AED pricing, Mada and regional card payment support, VAT-compliant invoicing, and hosting in the UAE or a nearby region for low latency.",
    faq: [
      {
        question: "Do you build real Arabic RTL websites, or just translated pages?",
        answer:
          "Real RTL. Layout direction, navigation order, icon mirroring, form alignment, table columns and typography are all handled for Arabic, with a language switcher that keeps the user on the same page. Arabic and English are indexed separately with correct language signals.",
      },
      {
        question: "Can you support Mada and local UAE payment methods?",
        answer:
          "Yes. We integrate Mada and regional card processing through established Gulf providers, including 3D Secure flows, refunds, partial captures and reconciliation, so the platform and your accounts agree.",
      },
    ],
  },
  {
    slug: "abu-dhabi",
    city: "Abu Dhabi",
    country: "United Arab Emirates",
    regionSlug: "middle-east",
    regionName: "Middle East",
    timezone: "GST (GMT+4)",
    currency: "AED",
    languages: "Arabic, English",
    industries: ["Government", "Energy", "Healthcare", "Education", "Real estate"],
    intro: [
      "Abu Dhabi projects frequently involve larger organisations, longer approval chains and formal documentation. We work to that rhythm: written scope, defined milestones, documented architecture, and formal handover material that survives staff changes.",
      "We build institutional websites, service portals, internal dashboards and reporting tools, with security, permissions and auditability planned in from the start because the data involved usually demands it.",
    ],
    localAngle:
      "Abu Dhabi-specific delivery details: bilingual Arabic and English interfaces, role-based access control with audit trails, formal documentation and handover packs, WCAG accessibility work for public-facing services, and UAE-region hosting.",
    faq: [
      {
        question: "Can you deliver formal documentation for a larger organisation?",
        answer:
          "Yes. We provide a written scope with acceptance criteria, an architecture and data-flow overview, environment and deployment notes, integration and credential records, and a maintenance guide. This is intended to remain useful long after the project closes.",
      },
      {
        question: "How do you handle access control and audit requirements?",
        answer:
          "We implement role-based permissions, least-privilege access, action logging for sensitive operations, secure session handling and validation on both client and server, then document who can access what and how it is recorded.",
      },
    ],
  },
  {
    slug: "riyadh",
    city: "Riyadh",
    country: "Saudi Arabia",
    regionSlug: "middle-east",
    regionName: "Middle East",
    timezone: "AST (GMT+3)",
    currency: "SAR",
    languages: "Arabic, English",
    industries: ["Government", "Construction", "Retail", "Logistics", "Tourism"],
    intro: [
      "Saudi Arabia is one of the fastest-moving digital markets in the region, with a lot of new platforms being launched across retail, tourism, logistics and public services. We build and repair the websites, portals and mobile apps behind those launches.",
      "Arabic is the primary language for most end users here, so we design Arabic-first rather than treating it as a secondary translation. English remains available for internal and international audiences.",
    ],
    localAngle:
      "Saudi-specific delivery details: Arabic-first interface design with full RTL support, SAR pricing with VAT-compliant invoicing, Mada payment integration, Hijri date display where relevant, and hosting in the region for latency and data-residency reasons.",
    faq: [
      {
        question: "Can you design Arabic-first rather than translating an English site?",
        answer:
          "Yes, and for Saudi audiences we usually recommend it. Arabic-first design means the layout, typography, navigation and content hierarchy are built around Arabic reading patterns from the start, with English available as a secondary locale.",
      },
      {
        question: "Do you handle Hijri dates and local formats?",
        answer:
          "Yes. Where a product needs it we display both Hijri and Gregorian dates, use correct Arabic numerals and date ordering, and apply the Saudi weekend convention to booking, reporting and scheduling logic.",
      },
    ],
  },
  {
    slug: "doha",
    city: "Doha",
    country: "Qatar",
    regionSlug: "middle-east",
    regionName: "Middle East",
    timezone: "AST (GMT+3)",
    currency: "QAR",
    languages: "Arabic, English",
    industries: ["Energy", "Hospitality", "Events", "Real estate", "Education"],
    intro: [
      "Qatar's economy is concentrated around energy, events and hospitality, and the digital work that supports those sectors tends to be event-driven and deadline-critical. We are used to fixed launch dates where the date cannot move, because a conference, season or tender will not wait.",
      "We plan backwards from the launch date, cut scope deliberately rather than letting it slip, and make sure the critical path is working and tested before anything optional is added.",
    ],
    localAngle:
      "Qatar-specific delivery details: bilingual Arabic and English interfaces with RTL support, QAR pricing, regional card and KNET-style payment handling, event and booking systems that hold under traffic spikes, and hosting close to the Gulf.",
    faq: [
      {
        question: "Can you deliver to a fixed launch date?",
        answer:
          "Yes, and we plan for it explicitly. We work backwards from the date, define the minimum viable launch scope, protect the critical path, and phase optional features after launch. If the date is genuinely at risk we tell you early rather than at the end.",
      },
      {
        question: "Will the site hold up under an event traffic spike?",
        answer:
          "We load-test booking and registration flows, cache what can safely be cached, queue or degrade non-critical work under load, and set up monitoring and alerts so problems surface during the event rather than after it.",
      },
    ],
  },
];

export function getRegionBySlug(slug: string) {
  return marketRegions.find((region) => region.slug === slug);
}

export function getCityBySlug(slug: string) {
  return marketCities.find((city) => city.slug === slug);
}

export function getCitiesByRegion(regionSlug: string) {
  return marketCities.filter((city) => city.regionSlug === regionSlug);
}
