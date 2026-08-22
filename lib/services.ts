export type ServicePage = {
  slug: string;
  name: string;
  shortName: string;
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  introduction: string;
  audience: string;
  deliverables: string[];
  sections: Array<{ heading: string; paragraphs: string[] }>;
  faq: Array<{ question: string; answer: string }>;
};

export const servicePages: ServicePage[] = [
  {
    slug: "web-development",
    name: "Website Development Services",
    shortName: "Web development",
    metaTitle: "Web Development Company in Bangladesh",
    metaDescription: "Custom website development for businesses worldwide. Fast, responsive Next.js, React, ecommerce and business websites built by Neural IT Limited.",
    eyebrow: "Custom web development",
    introduction: "Neural IT Limited designs and develops fast, responsive websites for businesses that need more than a generic template. We combine conversion-focused UX, maintainable engineering, technical SEO foundations, and clear analytics so your website can support marketing and sales.",
    audience: "Ideal for startups, service companies, ecommerce brands, and established businesses replacing a slow or difficult-to-manage website.",
    deliverables: ["Business and marketing websites", "Next.js and React development", "Ecommerce storefronts", "CMS and API integrations", "Performance and accessibility improvements", "Analytics and technical SEO setup"],
    sections: [
      { heading: "Websites designed around business goals", paragraphs: ["A successful business website must explain the offer quickly, build trust, and make the next action obvious. We plan information architecture, page hierarchy, messaging, and conversion paths before development begins.", "Each interface is adapted for desktop, tablet, and mobile use. Calls to action, contact routes, and important service information remain clear across screen sizes."] },
      { heading: "Modern, maintainable web engineering", paragraphs: ["We build with technologies such as Next.js, React, TypeScript, Laravel, and dependable content systems when they fit the project. The stack is selected around performance, editing needs, integrations, and long-term ownership—not trends alone.", "Clean component structure and documented integrations make future updates easier. We can connect payments, customer systems, booking tools, analytics, and custom APIs as part of the same product."] },
      { heading: "Technical SEO and performance from launch", paragraphs: ["Search visibility begins with pages that crawlers can access and users can understand. We implement descriptive metadata, semantic headings, canonical URLs, structured data where appropriate, internal links, sitemap support, and responsive rendering.", "No agency can guarantee a Google position. Our role is to remove technical barriers and create a strong platform for useful content, credible promotion, and ongoing measurement."] },
    ],
    faq: [
      { question: "How much does a custom business website cost?", answer: "Cost depends on the number of page types, design requirements, CMS needs, ecommerce features, and integrations. After a short discovery call, we provide a scoped estimate with deliverables and milestones." },
      { question: "Can you redesign an existing website?", answer: "Yes. We can audit the current site, preserve valuable content and URLs, improve the user experience, and plan redirects where page addresses change." },
      { question: "Will the website be optimized for mobile and Google?", answer: "Every project includes responsive implementation and core technical SEO foundations. Rankings also depend on competition, content quality, reputation, backlinks, and continued improvement after launch." },
    ],
  },
  {
    slug: "mobile-app-development",
    name: "Mobile App Development Services",
    shortName: "Mobile app development",
    metaTitle: "Mobile App Development Company in Bangladesh",
    metaDescription: "iOS and Android app development with Flutter, React Native and native technology. Build a reliable mobile product with Neural IT Limited.",
    eyebrow: "iOS and Android development",
    introduction: "We design and build mobile applications that solve a clear customer or operational problem. From product definition and interface design to APIs, testing, and release preparation, Neural IT Limited provides one coordinated app development process.",
    audience: "Ideal for founders, service businesses, ecommerce teams, and organizations creating customer apps or internal mobile tools.",
    deliverables: ["iOS and Android applications", "Flutter and React Native apps", "Native Kotlin development", "Product UX and prototyping", "Backend and API development", "Testing and store-release support"],
    sections: [
      { heading: "A practical mobile product strategy", paragraphs: ["We begin by defining the user, the job the app must complete, and the smallest release that can prove value. This prevents unnecessary features from delaying the product and consuming budget.", "User flows and prototypes make the experience testable before engineering. Stakeholders can review navigation, onboarding, and important actions while changes are still inexpensive."] },
      { heading: "The right approach for iOS and Android", paragraphs: ["Flutter or React Native can provide an efficient shared codebase for many business applications. Native development may be a better fit when deep platform integration or specialized performance is required.", "We recommend an approach after reviewing the product rather than forcing every idea into one technology. Backend security, offline behavior, notifications, payments, and analytics are planned alongside the interface."] },
      { heading: "Quality beyond the first release", paragraphs: ["Mobile products need testing across devices, operating-system versions, network conditions, and real user states. We test critical flows, error handling, permissions, and API behavior before release.", "After launch, analytics and user feedback should guide the roadmap. We can support monitoring, maintenance, performance improvements, and carefully prioritized new features."] },
    ],
    faq: [
      { question: "Should my app use Flutter, React Native, or native development?", answer: "The right choice depends on platform features, performance requirements, team plans, budget, and timeline. We evaluate those constraints before recommending a stack." },
      { question: "Do you build the backend and APIs too?", answer: "Yes. We can develop the backend, database, administration tools, authentication, payments, and third-party integrations required by the mobile app." },
      { question: "Can you help publish an app to the stores?", answer: "Yes. We prepare release builds and assist with listing requirements and submission. Final approval always remains with Apple or Google and their current policies." },
    ],
  },
  {
    slug: "custom-software-development",
    name: "Custom Software Development Services",
    shortName: "Custom software",
    metaTitle: "Custom Software Development Company",
    metaDescription: "Custom dashboards, portals, SaaS products and business automation built around your workflow by Neural IT Limited in Bangladesh.",
    eyebrow: "Business software engineering",
    introduction: "When spreadsheets and disconnected tools slow a team down, custom software can create one reliable workflow. We build dashboards, portals, SaaS platforms, and internal systems around the way your business actually operates.",
    audience: "Ideal for growing companies with repeatable processes, multiple data sources, manual reporting, or customer experiences that standard software cannot support well.",
    deliverables: ["Customer and partner portals", "Operations dashboards", "SaaS product development", "Workflow automation", "Database and API engineering", "Legacy system modernization"],
    sections: [
      { heading: "Software shaped around the workflow", paragraphs: ["Discovery maps the people, decisions, data, and exceptions involved in the current process. Together we identify where custom software creates measurable value and where an existing tool is sufficient.", "The first release focuses on essential workflows. This reduces risk and provides a useful foundation that can expand as real usage reveals better priorities."] },
      { heading: "Secure and dependable architecture", paragraphs: ["Architecture decisions account for roles, data sensitivity, integrations, audit needs, expected traffic, and operational ownership. We use established frameworks and cloud services suited to those requirements.", "Validation, permissions, backups, monitoring, and error handling are treated as product requirements. These details help the system remain dependable after launch."] },
      { heading: "Integration and long-term improvement", paragraphs: ["Custom systems often need to exchange information with accounting, ecommerce, CRM, payment, messaging, or analytics tools. We design integrations so failures can be identified and recovered safely.", "Documentation and maintainable code reduce dependence on any one developer. After release, the roadmap can be guided by support requests, usage patterns, and business results."] },
    ],
    faq: [
      { question: "When is custom software better than an off-the-shelf tool?", answer: "Custom development is useful when a workflow creates strategic value, existing products require excessive workarounds, or integration and ownership requirements cannot be met reliably." },
      { question: "Can you modernize an existing system?", answer: "Yes. We can assess the codebase and data, then recommend incremental modernization, interface improvements, integration work, or a staged replacement." },
      { question: "How do you keep a software project within scope?", answer: "We define user roles, workflows, acceptance criteria, milestones, and explicit exclusions. Regular demonstrations make progress visible and allow priorities to be adjusted deliberately." },
    ],
  },
  {
    slug: "ai-automation",
    name: "AI Automation and Integration Services",
    shortName: "AI automation",
    metaTitle: "AI Automation Services for Businesses",
    metaDescription: "Practical AI automation, chatbots, document workflows and data integrations designed around real business processes by Neural IT Limited.",
    eyebrow: "Applied AI solutions",
    introduction: "We help businesses apply AI where it can reduce repetitive work, improve access to information, or support faster decisions. Every engagement begins with the workflow and its risks—not with an assumption that AI belongs everywhere.",
    audience: "Ideal for teams exploring customer support assistants, document processing, knowledge search, content workflows, reporting, or task automation.",
    deliverables: ["AI workflow assessment", "Customer support assistants", "Knowledge and document search", "Data extraction and classification", "Human-review workflows", "Model and business-system integrations"],
    sections: [
      { heading: "Start with a valuable, testable use case", paragraphs: ["A useful AI project has a defined user, input, output, success measure, and fallback path. We examine task frequency, current effort, error cost, data availability, and privacy constraints before proposing automation.", "A focused pilot provides evidence without committing the business to an oversized platform. Results can be reviewed against accuracy, time saved, adoption, and operating cost."] },
      { heading: "Responsible integration into real operations", paragraphs: ["AI output can be uncertain, so important workflows need validation and clear boundaries. We design confidence checks, human approval, access controls, logging, and escalation paths according to the impact of an error.", "The solution may connect models with documents, databases, help desks, CRMs, dashboards, or custom software. Sensitive data and provider retention policies are reviewed during design."] },
      { heading: "Measure quality after deployment", paragraphs: ["Model behavior and business inputs change over time. Monitoring should track failures, latency, cost, user feedback, and examples that require correction.", "We support controlled prompt and workflow updates, evaluation sets, and product improvements so the automation remains useful rather than becoming an unexamined dependency."] },
    ],
    faq: [
      { question: "What business processes can AI automate?", answer: "Common candidates include document classification, information retrieval, support triage, data extraction, drafting, and repetitive decision support. Suitability depends on data quality and the cost of mistakes." },
      { question: "Can AI automation work with our existing software?", answer: "Often yes. We can integrate through available APIs, databases, webhooks, or controlled custom connectors after reviewing security and reliability requirements." },
      { question: "How do you reduce inaccurate AI responses?", answer: "We constrain the task, ground answers in approved data where appropriate, test representative examples, add validation and human review, and monitor failures. No model should be presented as perfectly accurate." },
    ],
  },
];

export function getServiceBySlug(slug: string) {
  return servicePages.find((service) => service.slug === slug);
}
