import { getWhatsAppLink, siteConfig } from "@/lib/site-config";
export default function ContactCta() {
  return <section id="contact" className="contact-cta dark-section section-pad"><div><p className="kicker">Start a project</p><h2>Build your website, mobile app, or custom software with Neural</h2></div><div className="contact-actions"><a className="pill pill-lime" href={getWhatsAppLink()} target="_blank" rel="noopener noreferrer">WhatsApp <span>↗</span></a><a className="pill pill-fiverr" href={siteConfig.fiverrUrl} target="_blank" rel="noopener noreferrer">Find me on Fiverr <span>↗</span></a></div></section>;
}
