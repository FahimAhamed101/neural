import { siteConfig } from "@/lib/site-config";

export default function Footer() {
  return (
    <footer>
      <div className="footer-top">
        <a className="brand footer-brand" href="/#top"><span className="brand-mark"><i /><i /><i /></span><span>Neural</span></a>
        <nav><a href="/#about">About</a><a href="/#projects">Portfolio</a><a href="/blog">Insights</a><a href="/#contact">Contact</a></nav>
        <div className="socials"><a href={`mailto:${siteConfig.email}`} aria-label="Email Neural IT">em</a><a href={siteConfig.githubUrl} target="_blank" rel="noopener noreferrer" aria-label="Neural IT on GitHub">gh</a><a href={siteConfig.fiverrUrl} target="_blank" rel="noopener noreferrer" aria-label="Neural IT on Fiverr">fi</a></div>
      </div>
      <div className="footer-bottom"><span>© {new Date().getFullYear()} {siteConfig.name}</span><span>Dhaka, Bangladesh · Worldwide</span><div><a href={`mailto:${siteConfig.email}`}>Email</a><a href={siteConfig.fiverrUrl} target="_blank" rel="noopener noreferrer">Fiverr</a></div></div>
    </footer>
  );
}
