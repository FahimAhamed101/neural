"use client";

import { useState } from "react";
const services = [
  { title: "AI-powered data analytics", meta: "AI insights & automation", image: "https://res.cloudinary.com/fahim1213456/image/upload/v1775757672/vwdgxjkwswjp8bdemh70.png" },
  { title: "Websites & ecommerce", meta: "Next.js, React & Laravel", image: "https://res.cloudinary.com/fahim1213456/image/upload/v1761948055/vechahayrxk7rn2lsboa.png" },
  { title: "Mobile app development", meta: "Flutter, Kotlin & React Native", image: "https://res.cloudinary.com/fahim1213456/image/upload/v1773793100/rebjtceyfmlypkeoh9p0.png" },
  { title: "Custom business systems", meta: "Dashboards, API & automation", image: "https://res.cloudinary.com/fahim1213456/image/upload/v1769815356/rgwswxk8i4chumfaqjng.png" },
];
export default function Services() {
  const [active, setActive] = useState(0); const item = services[active];
  return (
    <section id="services" className="services dark-section section-pad">
      <div className="section-head light-head"><div><p className="kicker">Our services</p><h2>Our best AI solutions</h2></div><a href="#contact" className="text-link light">Explore more <span>↗</span></a></div>
      <div className="services-layout">
        <div className="service-list">{services.map((service, index) => <button key={service.title} className={active === index ? "active" : ""} onClick={() => setActive(index)}><span>{service.title}</span><small>{service.meta}</small></button>)}</div>
        <article className="service-feature"><div className="service-image"><img src={item.image} alt="Selected Neural IT project preview" /></div><div className="service-content"><p>Featured capability</p><h3>{item.title}</h3><p>We turn complex product ideas into simple, high-performance experiences with thoughtful strategy, strong visual design, and reliable engineering.</p><a className="text-link light" href="#projects">View details <span>↗</span></a></div></article>
      </div>
    </section>
  );
}
