import { getWhatsAppLink, siteConfig } from "@/lib/site-config";

export default function Hero() {
  return (
    <>
      <section id="top" className="hero">
        <div className="hero-orb orb-left"><span /></div><div className="hero-orb orb-right"><span /></div><div className="hero-glow" />
        <div className="hero-copy">
          <p className="eyebrow">Website &amp; app development, repair, maintenance, and support</p>
          <h1>We build &amp; fix<br /><strong>websites and apps</strong></h1>
          <p className="hero-sub">We build, repair, redesign, and improve every kind of business website and app—from ecommerce and news portals to booking systems, SaaS, and mobile apps—across modern frameworks and inherited codebases.</p>
          <div className="button-row">
            <a className="pill pill-lime" href={getWhatsAppLink()} target="_blank" rel="noopener noreferrer" data-google-ads-conversion>WhatsApp <span>↗</span></a>
            <a className="pill pill-fiverr" href={siteConfig.fiverrUrl} target="_blank" rel="noopener noreferrer" data-google-ads-conversion>Hire us on Fiverr <span>↗</span></a>
            <a className="pill pill-outline" href="#projects">Explore work <span>↓</span></a>
          </div>
        </div>
        <div className="trusted"><p>Trusted by growing businesses worldwide</p><div><span>LOOP°</span><span>LOGIPULSE</span><span>POLYGON</span><span>INTELLECT</span><span>NEXORA</span></div></div>
      </section>
      <div className="marquee" aria-label="Neural services"><div><span>//</span> Website development <span>//</span> Website &amp; app repair <span>//</span> Web app development <span>//</span> Mobile app maintenance <span>//</span> Custom software <span>//</span> AI automation</div></div>
      <section className="visual-reel" aria-label="Featured visual work">
        <div className="visual-card visual-a"><div className="leaf leaf-one" /><div className="leaf leaf-two" /><span>01</span></div>
        <div className="visual-card visual-b"><div className="waves" /><b>Neural</b><span>02</span></div>
        <div className="visual-card visual-c"><div className="mesh" /><b>NEURAL AI</b><span>03</span></div>
      </section>
    </>
  );
}
