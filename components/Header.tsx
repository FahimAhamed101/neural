"use client";

import { useState } from "react";
import { getWhatsAppLink, siteConfig } from "@/lib/site-config";

const navItems = [
  { label: "Home", href: "/#top" },
  { label: "About", href: "/#about" },
  { label: "Services", href: "/#services" },
  { label: "Work", href: "/#projects" },
  { label: "Insights", href: "/blog" },
  { label: "Contact", href: "/#contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="site-header">
      <a href="/#top" className="brand" aria-label={`${siteConfig.name} home`}>
        <span className="brand-mark"><i /><i /><i /></span><span>Neural</span>
      </a>
      <nav className={open ? "nav open" : "nav"} aria-label="Primary">
        {navItems.map((item) => <a key={item.href} href={item.href} onClick={() => setOpen(false)}>{item.label}</a>)}
      </nav>
      <div className="header-actions">
        <a className="pill pill-lime header-cta" href={getWhatsAppLink()} target="_blank" rel="noopener noreferrer">WhatsApp <span>↗</span></a>
        <a className="pill pill-fiverr header-cta" href={siteConfig.fiverrUrl} target="_blank" rel="noopener noreferrer">Find me on Fiverr <span>↗</span></a>
      </div>
      <button className="menu-toggle" onClick={() => setOpen(!open)} aria-label="Toggle menu" aria-expanded={open}><span /><span /></button>
    </header>
  );
}
