"use client";

import { useState } from "react";
import Link from "next/link";
const services = [
  { title: "Website development", meta: "Business sites, ecommerce, CMS & redesigns", slug: "web-development", image: "https://res.cloudinary.com/fahim1213456/image/upload/v1761948055/vechahayrxk7rn2lsboa.png" },
  { title: "Website & app repair", meta: "Bugs, speed, security, UX & project recovery", slug: "website-repair", image: "https://res.cloudinary.com/fahim1213456/image/upload/v1761948055/vechahayrxk7rn2lsboa.png" },
  { title: "Mobile app development", meta: "Flutter, Kotlin & React Native", slug: "mobile-app-development", image: "https://res.cloudinary.com/fahim1213456/image/upload/v1773793100/rebjtceyfmlypkeoh9p0.png" },
  { title: "Custom software development", meta: "Dashboards, SaaS, portals & APIs", slug: "custom-software-development", image: "https://res.cloudinary.com/fahim1213456/image/upload/v1769815356/rgwswxk8i4chumfaqjng.png" },
  { title: "AI automation & integration", meta: "Assistants, workflows & analytics", slug: "ai-automation", image: "https://res.cloudinary.com/fahim1213456/image/upload/v1775757672/vwdgxjkwswjp8bdemh70.png" },
];
export default function Services() {
  const [active, setActive] = useState(0); const item = services[active];
  return (
    <section id="services" className="services dark-section section-pad">
      <div className="section-head light-head"><div><p className="kicker">Build, fix, and improve</p><h2>Development and repair for websites, web apps, and mobile apps</h2></div><a href="#contact" className="text-link light">Get expert help <span>↗</span></a></div>
      <div className="services-layout">
        <div className="service-selector"><div className="service-list">{services.map((service, index) => <button key={service.title} className={active === index ? "active" : ""} onClick={() => setActive(index)}><span>{service.title}</span><small>{service.meta}</small></button>)}</div><nav className="service-page-links" aria-label="Development service pages">{services.map((service) => <Link key={service.slug} href={`/services/${service.slug}`}>{service.title}<span>↗</span></Link>)}</nav></div>
        <article className="service-feature"><div className="service-image"><img src={item.image} alt={`${item.title} project preview by Neural IT Limited`} /></div><div className="service-content"><p>Featured capability</p><h3>{item.title}</h3><p>Bring us a new idea, a broken feature, a slow website, or an unfinished codebase. We diagnose the problem, explain the options, and deliver dependable design and engineering.</p><Link className="text-link light" href={`/services/${item.slug}`}>View service details <span>↗</span></Link></div></article>
      </div>
    </section>
  );
}
