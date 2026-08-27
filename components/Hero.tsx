import { getWhatsAppLink, siteConfig } from "@/lib/site-config";

export default function Hero() {
  return (
    <>
      <section id="top" className="hero">
        <div className="hero-orb orb-left"><span /></div><div className="hero-orb orb-right"><span /></div><div className="hero-glow" />
        <div className="hero-copy">
          <p className="eyebrow">Web and app development company in Bangladesh</p>
          <h1>Web &amp; Mobile App<br />Development by <strong>Neural</strong></h1>
          <p className="hero-sub">We design and develop fast websites, iOS and Android apps, custom business software, and practical AI solutions for growing companies worldwide.</p>
          <div className="button-row">
            <a className="pill pill-lime" href={getWhatsAppLink()} target="_blank" rel="noopener noreferrer" data-google-ads-conversion>WhatsApp <span>↗</span></a>
            <a className="pill pill-fiverr" href={siteConfig.fiverrUrl} target="_blank" rel="noopener noreferrer" data-google-ads-conversion>Find me on Fiverr <span>↗</span></a>
            <a className="pill pill-outline" href="#projects">Explore work <span>↓</span></a>
          </div>
        </div>
        <div className="trusted"><p>Trusted by growing businesses worldwide</p><div><span>LOOP°</span><span>LOGIPULSE</span><span>POLYGON</span><span>INTELLECT</span><span>NEXORA</span></div></div>
      </section>
      <div className="marquee" aria-label="Neural services"><div><span>//</span> Website development <span>//</span> Mobile app development <span>//</span> Custom software <span>//</span> AI automation</div></div>
      <section className="visual-reel" aria-label="Featured visual work">
        <div className="visual-card visual-a"><div className="leaf leaf-one" /><div className="leaf leaf-two" /><span>01</span></div>
        <div className="visual-card visual-b"><div className="waves" /><b>Neural</b><span>02</span></div>
        <div className="visual-card visual-c"><div className="mesh" /><b>NEURAL AI</b><span>03</span></div>
      </section>
    </>
  );
}
