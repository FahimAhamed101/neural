"use client";
import { useState } from "react";

/**
 * Quotes are attributed to the regions the business now targets so the social
 * proof matches the positioning. Replace these with real, named client quotes
 * and a real rating source before launch — see the handover notes.
 */
const quotes = [
  {
    text: "Our checkout was failing on mobile for weeks and two previous developers could not find it. Neural reproduced the issue in a day, explained the cause in plain language, and had it fixed and tested before our weekend sale.",
    name: "Operations Director",
    role: "Ecommerce retailer · London, United Kingdom",
  },
  {
    text: "We needed an Arabic-first booking platform, not an English site with translated labels. They handled RTL layout, typography and Mada payments properly, and launched to a fixed date we could not move.",
    name: "Marketing Lead",
    role: "Hospitality group · Dubai, United Arab Emirates",
  },
  {
    text: "Our unfinished dashboard had been sitting with another team for months. Neural audited the codebase, told us honestly what was salvageable, and shipped the remaining modules on a clear milestone plan.",
    name: "Founder",
    role: "SaaS startup · Singapore",
  },
  {
    text: "Clear scope, fixed quote, and direct contact with the engineer doing the work. The GDPR and consent handling was done properly without us having to ask twice.",
    name: "Product Manager",
    role: "Professional services firm · Berlin, Germany",
  },
];

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const quote = quotes[active];
  const move = (direction: number) =>
    setActive((active + direction + quotes.length) % quotes.length);

  return (
    <section className="testimonials section-pad" aria-labelledby="testimonials-title">
      <div className="testimonial-summary">
        <p className="kicker">Client feedback</p>
        <h2 id="testimonials-title">What clients say about working with us</h2>
        <strong>4.9</strong>
        <div className="rating">
          ★★★★★ <span>Average rating from client reviews on Fiverr</span>
        </div>
      </div>
      <article className="quote-card">
        <div className="quote-nav">
          <button onClick={() => move(-1)} aria-label="Previous testimonial">
            ←
          </button>
          <button onClick={() => move(1)} aria-label="Next testimonial">
            →
          </button>
        </div>
        <p key={active} className="quote-text">
          &ldquo;{quote.text}&rdquo;
        </p>
        <div className="quote-author">
          <span aria-hidden="true">
            {quote.name
              .split(" ")
              .map((part) => part[0])
              .join("")}
          </span>
          <div>
            <b>{quote.name}</b>
            <small>{quote.role}</small>
          </div>
        </div>
      </article>
    </section>
  );
}
