import { getPhoneLink, getWhatsAppLink, siteConfig } from "@/lib/site-config";

const solutionGroups = [
  {
    title: "Commerce & media",
    items: ["Ecommerce stores", "News portals", "E-paper platforms", "Online TV and media"],
  },
  {
    title: "Business & property",
    items: ["Corporate websites", "Real estate and furniture", "Construction and engineering", "Garments and buying houses"],
  },
  {
    title: "Travel & experiences",
    items: ["Hotels and resorts", "Tour and visa agencies", "Booking systems", "Event management"],
  },
  {
    title: "Professional services",
    items: ["Marketing agencies", "Law firms", "Interior design", "Personal portfolios"],
  },
  {
    title: "Education & healthcare",
    items: ["Schools and training", "Coaching platforms", "Hospitals and clinics", "NGOs and social organizations"],
  },
  {
    title: "Custom apps & systems",
    items: ["Web and mobile apps", "SaaS dashboards", "APIs and integrations", "Custom business software"],
  },
];

const technologies = [
  "PHP",
  "Laravel",
  "JavaScript",
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "WordPress",
  "Flutter",
  "React Native",
  "Kotlin",
  ".NET",
  "Django",
];

export default function WebsiteCapabilities() {
  return (
    <section id="solutions" className="capabilities section-pad" aria-labelledby="capabilities-title">
      <div className="capabilities-head">
        <div>
          <p className="kicker">Develop, repair, redesign, and maintain</p>
          <h2 id="capabilities-title">Websites and apps for almost every kind of business</h2>
        </div>
        <div className="capabilities-intro">
          <p>
            Starting something new or struggling with an existing product? We build from scratch,
            fix bugs, improve speed and SEO, modernize old systems, and rescue unfinished projects.
          </p>
          <a className="text-link" href={getWhatsAppLink("Hi, I would like to see relevant website or app demos for my business.")} target="_blank" rel="noopener noreferrer" data-google-ads-conversion>
            Ask for relevant demos <span>↗</span>
          </a>
        </div>
      </div>

      <div className="capability-grid">
        {solutionGroups.map((group, index) => (
          <article className="capability-card" key={group.title}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <h3>{group.title}</h3>
            <ul>
              {group.items.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </article>
        ))}
      </div>

      <div className="technology-band">
        <div>
          <p className="kicker">Framework-flexible engineering</p>
          <h3>We work across modern frameworks, libraries, CMS platforms, and inherited codebases.</h3>
        </div>
        <div className="technology-list" aria-label="Technologies we support">
          {technologies.map((technology) => <span key={technology}>{technology}</span>)}
        </div>
        <div className="capability-actions">
          <a className="pill pill-lime" href={getWhatsAppLink("Hi, I need help developing or repairing a website or app.")} target="_blank" rel="noopener noreferrer" data-google-ads-conversion>Message us <span>↗</span></a>
          <a className="pill pill-light" href={getPhoneLink()} data-google-ads-conversion>Call {siteConfig.phoneDisplay} <span>↗</span></a>
        </div>
      </div>
    </section>
  );
}
