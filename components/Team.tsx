import { siteConfig } from "@/lib/site-config";

/**
 * This section previously showed four "team members" with placeholder
 * portraits, three of which were not people at all ("Product Strategy",
 * "Creative Studio", "Engineering Lab"). For a technical buyer that reads as
 * padding and undermines trust, so it now describes the four disciplines a
 * client actually works with. No invented headshots, no invented headcount.
 */
const disciplines = [
  {
    index: "01",
    name: "Product & discovery",
    role: "Scope, milestones, acceptance criteria and a fixed quote before anything is built.",
    tone: "amber",
  },
  {
    index: "02",
    name: "UI/UX design",
    role: "Interface design, responsive behaviour, accessibility and Arabic RTL layout.",
    tone: "blue",
  },
  {
    index: "03",
    name: "Engineering",
    role: "Web, mobile and backend development, plus repair of inherited or unfinished codebases.",
    tone: "pink",
  },
  {
    index: "04",
    name: "QA & support",
    role: "Cross-device testing, performance work, monitoring and ongoing maintenance.",
    tone: "green",
  },
];

export default function Team() {
  return (
    <section className="team section-pad" aria-labelledby="team-title">
      <div className="team-top">
        <div>
          <p className="kicker">How we work</p>
          <h2 id="team-title">Four disciplines, one small senior team</h2>
        </div>
        <div className="team-stat">
          <strong>{siteConfig.trust.yearsExperience}</strong>
          <span>Years building web and mobile products</span>
          <a className="text-link" href="#enquiry">
            Start a conversation <i>↗</i>
          </a>
        </div>
      </div>
      <div className="team-grid">
        {disciplines.map((item) => (
          <article key={item.name} className="team-card">
            <div className={`portrait ${item.tone}`}>
              <span>{item.index}</span>
              <i />
              <b />
            </div>
            <h3>{item.name}</h3>
            <p>{item.role}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
