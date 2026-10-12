import { getWhatsAppLink, siteConfig } from "@/lib/site-config";

const disciplines = [
  {
    index: "01",
    name: "Product Discovery & Scope",
    role: "Written technical milestones, architecture plan, acceptance criteria, and a fixed quote before any code is built.",
  },
  {
    index: "02",
    name: "Modern Web Engineering",
    role: "Production-grade Next.js, React, TypeScript, and Laravel architectures built for speed, conversion, and SEO.",
  },
  {
    index: "03",
    name: "Cross-Platform Mobile Apps",
    role: "High-performance iOS and Android mobile applications crafted with Flutter and React Native with store submission.",
  },
  {
    index: "04",
    name: "Codebase Rescue & QA",
    role: "Direct debugging, performance audits, payment integrations, and rescuing broken or unfinished projects.",
  },
];

export default function Team() {
  return (
    <section id="leadership" className="team-section section-pad" aria-labelledby="team-title">
      <div className="section-head">
        <div>
          <p className="kicker">Engineering Leadership &amp; Delivery</p>
          <h2 id="team-title">Work directly with the engineer who builds your product</h2>
        </div>
        <p className="team-head-intro">
          No account-manager telephone games, no outsourced junior contractors. You get direct access to the
          principal engineer writing the code, running daily deployments, and taking personal accountability.
        </p>
      </div>

      <div className="founder-spotlight-card">
        <div className="founder-media">
          <img
            src="/fahim-ahamed.jpg"
            alt="Fahim Ahamed, Founder and Principal Full-Stack Engineer at Neural IT Limited"
            className="founder-photo"
            loading="lazy"
            decoding="async"
          />
          <div className="founder-status-badge">
            <span className="status-dot" aria-hidden="true" />
            <span>Available for select global client projects</span>
          </div>
        </div>

        <div className="founder-info">
          <div className="founder-header">
            <div>
              <span className="founder-kicker">Founder &amp; Principal Software Engineer</span>
              <h3>Fahim Ahamed</h3>
            </div>
            <div className="founder-badges">
              <span className="badge-pill">{siteConfig.trust.yearsExperience} Experience</span>
              <span className="badge-pill">{siteConfig.trust.countriesServed} Countries</span>
            </div>
          </div>

          <p className="founder-bio">
            &ldquo;When international clients hire Neural IT Limited, they hire direct technical accountability.
            Whether building a scalable web application from scratch, developing an iOS &amp; Android app,
            or rescuing a broken codebase another developer walked away from, I ensure clean engineering,
            rapid communication, and 100% intellectual property ownership for your business.&rdquo;
          </p>

          <div className="founder-skills-grid">
            <div>
              <strong>Primary Stack:</strong>
              <span>Next.js · React · TypeScript · Flutter · React Native · Laravel · Node.js · MongoDB</span>
            </div>
            <div>
              <strong>Global Coverage:</strong>
              <span>Europe (CET/GMT) · Middle East (GST/AST) · Asia (SGT/JST) · US Overlap</span>
            </div>
          </div>

          <div className="founder-actions">
            <a
              className="pill pill-lime"
              href={getWhatsAppLink("Hi Fahim, I would like to discuss a project for my business:")}
              target="_blank"
              rel="noopener noreferrer"
              data-google-ads-conversion
            >
              Talk directly with Fahim <span>↗</span>
            </a>
            <a
              className="pill pill-outline"
              href={siteConfig.fiverrUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-google-ads-conversion
            >
              Verified Fiverr Profile <span>↗</span>
            </a>
            <a
              className="pill pill-light"
              href="https://github.com/FahimAhamed101"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub Profile <span>↗</span>
            </a>
          </div>
        </div>
      </div>

      <div className="disciplines-grid">
        {disciplines.map((item) => (
          <article key={item.name} className="discipline-card">
            <span className="discipline-index">{item.index}</span>
            <h4>{item.name}</h4>
            <p>{item.role}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
