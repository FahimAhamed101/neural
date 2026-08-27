"use client";

import { useState } from "react";
import { getPhoneLink, getWhatsAppLink, siteConfig } from "@/lib/site-config";

const navItems = [
  { label: "Home", href: "/#top" },
  { label: "About", href: "/#about" },
  { label: "Services", href: "/#services" },
  { label: "Fix website/app", href: "/services/website-repair" },
  { label: "Work", href: "/#projects" },
  { label: "Insights", href: "/blog" },
  { label: "Contact", href: "/#contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  return (
    <><div className="site-contact-strip" aria-label="Quick contact">
      <span>Need a website or app built, fixed, or improved?</span>
      <div>
        <a href={getPhoneLink()} data-google-ads-conversion>{siteConfig.phoneDisplay}</a>
        <a href={`mailto:${siteConfig.email}`} data-google-ads-conversion>{siteConfig.email}</a>
      </div>
    </div><header className="site-header">
      <a href="/#top" className="brand" aria-label={`${siteConfig.name} home`}>
        <span className="brand-mark"><i /><i /><i /></span><span>Neural</span>
      </a>
      <nav className={open ? "nav open" : "nav"} aria-label="Primary">
        {navItems.map((item) => <a key={item.href} href={item.href} onClick={() => setOpen(false)}>{item.label}</a>)}
      </nav>
      <div className="header-actions">
        <a className="pill pill-lime header-cta" href={getWhatsAppLink()} target="_blank" rel="noopener noreferrer" data-google-ads-conversion>WhatsApp <span>↗</span></a>
        <a className="pill pill-fiverr header-cta" href={siteConfig.fiverrUrl} target="_blank" rel="noopener noreferrer" data-google-ads-conversion>Hire us on Fiverr <span>↗</span></a>
      </div>
      <button className="menu-toggle" onClick={() => setOpen(!open)} aria-label="Toggle menu" aria-expanded={open}><span /><span /></button>
    </header></>
  );
}
