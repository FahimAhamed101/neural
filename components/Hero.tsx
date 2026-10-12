import { getWhatsAppLink, siteConfig } from "@/lib/site-config";

export default function Hero() {
  return (
    <>
      <section id="top" className="hero">
        <div className="hero-orb orb-left"><span /></div>
        <div className="hero-orb orb-right"><span /></div>
        <div className="hero-glow" />
        <div className="hero-copy">
          <p className="eyebrow">
            Website, mobile app &amp; software development · Europe · Asia · Middle East
          </p>
          <h1>
            We build and fix
            <br />
            <strong>websites, apps and software</strong>
          </h1>
          <p className="hero-sub">
            Hire a senior development team to create custom websites, build iOS and Android mobile apps,
            or repair and rescue an existing codebase. You get a written scope, a fixed quote, and
            the engineer actually doing the work — not an account manager relaying messages.
          </p>
          <div className="button-row">
            <a
              className="pill pill-lime"
              href={getWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              data-google-ads-conversion
            >
              Chat on WhatsApp <span>↗</span>
            </a>
            <a className="pill pill-outline" href="#enquiry">
              Get a fixed quote <span>↓</span>
            </a>
          </div>
          <div className="hero-founder-strip">
            <img
              src="/fahim-ahamed.jpg"
              alt="Fahim Ahamed, Founder & Principal Full-Stack Engineer"
              className="hero-founder-avatar"
              width={42}
              height={42}
            />
            <div className="hero-founder-text">
              <strong>Led by Founder &amp; Principal Engineer Fahim Ahamed</strong>
              <span>Direct WhatsApp &amp; code access · 6+ yrs experience · Written scope &amp; fixed quotes</span>
            </div>
          </div>
          <p className="hero-proof">
            Replies in {siteConfig.trust.responseTime} · Clients in{" "}
            {siteConfig.trust.countriesServed} countries · You own the code, hosting and domain
          </p>
        </div>
        <div className="trusted">
          <p>Working with businesses in</p>
          {/* Ordered one-per-region first: on mobile only the first three are
              shown, so Europe, the Middle East and Asia each stay represented. */}
          <div>
            <span>LONDON</span>
            <span>DUBAI</span>
            <span>SINGAPORE</span>
            <span>BERLIN</span>
            <span>RIYADH</span>
            <span>TOKYO</span>
            <span>AMSTERDAM</span>
            <span>BENGALURU</span>
          </div>
        </div>
      </section>
      <div className="marquee" aria-label="Neural services">
        <div>
          <span>//</span> Website development <span>//</span> Website &amp; app repair{" "}
          <span>//</span> Web app development <span>//</span> Mobile app development{" "}
          <span>//</span> Custom software <span>//</span> AI automation <span>//</span>
        </div>
      </div>
      <section className="visual-reel" aria-label="Featured visual work">
        <div className="visual-card visual-a"><div className="leaf leaf-one" /><div className="leaf leaf-two" /><span>01</span></div>
        <div className="visual-card visual-b"><div className="waves" /><b>Neural</b><span>02</span></div>
        <div className="visual-card visual-c"><div className="mesh" /><b>NEURAL AI</b><span>03</span></div>
      </section>
    </>
  );
}
