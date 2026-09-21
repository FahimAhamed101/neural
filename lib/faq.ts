export type FaqItem = { question: string; answer: string };

export const homepageFaq: FaqItem[] = [
  {
    question: "How much does a website or app project cost?",
    answer:
      "It depends on scope, not on hours. A focused website repair or a small business site is priced per project, while a web app, marketplace or mobile product is priced in milestones after a short discovery call. You receive a written scope with a fixed quote and a milestone list before any work begins, so the price does not drift once development starts.",
  },
  {
    question: "How do you work with clients in Europe, Asia and the Middle East across time zones?",
    answer:
      "We run overlapping shifts rather than asking you to wait overnight. European clients get a 12:00–21:00 CET window, Asian clients are inside our natural GMT+6 working day, and Gulf clients align closely with our schedule. Reviews, standups and releases are scheduled inside your working hours, and you get a named engineer rather than a ticket queue.",
  },
  {
    question: "Can you fix a website or app that another developer abandoned?",
    answer:
      "Yes, and it is one of our most common engagements. We need the repository, the hosting dashboard and test credentials for the affected integrations. We reproduce the failure, tell you in plain language whether the cause is code, configuration, hosting, data or a third-party service, then repair the highest-impact customer journeys first. If the foundation is genuinely unsalvageable we tell you that too, instead of charging for repairs that will not hold.",
  },
  {
    question: "Do you build Arabic RTL and bilingual websites?",
    answer:
      "Yes. For Middle East clients we build Arabic and English as genuine first-class locales: right-to-left layout direction, mirrored navigation and icons, correct Arabic typography and line-breaking, mirrored forms and tables, and a language switcher that keeps the visitor on the same page. Both locales are indexed separately with the correct language signals.",
  },
  {
    question: "Do you handle GDPR and data protection requirements?",
    answer:
      "Yes. We implement consent-aware analytics where non-essential scripts are blocked until consent is given, cookie and privacy policy pages, data-subject request handling, and EU or UK hosting regions where data residency matters. We document which third-party processors receive personal data so your records stay accurate.",
  },
  {
    question: "How quickly can you start, and how fast do you reply?",
    answer:
      "We reply on WhatsApp in under 2 hours during working hours, seven days a week. Urgent repairs such as a broken checkout, failed deployment, malware warning or app crash are usually assessed the same day. New builds typically start within a few days of scope agreement, depending on current capacity.",
  },
  {
    question: "Do we own the code and the accounts?",
    answer:
      "Always. The repository, hosting, domain, analytics and third-party accounts stay in your name and under your control. We work inside your accounts rather than holding them, and we hand over documentation so you are never locked to us. You can take the project to another team at any point.",
  },
  {
    question: "What currencies and payment methods do you accept?",
    answer:
      "We invoice in USD, EUR, GBP, SGD, AED, SAR and QAR, and we can supply EU VAT and local tax details where required. Bank transfer, card and SEPA are supported. In customer-facing products we integrate the payment methods each market actually uses, including iDEAL, PayNow, UPI, QRIS, Mada and regional e-wallets.",
  },
];
