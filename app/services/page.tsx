import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFloatingButton from "@/components/WhatsAppFloatingButton";
import StickyMobileCta from "@/components/StickyMobileCta";
import { servicePages } from "@/lib/services";
import { getWhatsAppLink, siteConfig } from "@/lib/site-config";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: `Web & Mobile App Development Services | ${siteConfig.name}`,
  description: `Professional web development, mobile app development, website repair, custom software and AI automation by ${siteConfig.name}. Build custom websites and apps with a fixed quote.`,
  keywords: [
    "web development services",
    "mobile app development services",
    "create custom website",
    "build mobile app",
    "hire website developer",
    "hire mobile app developer",
    "website repair and bug fixing",
    "custom software development",
    "ecommerce website development",
    "AI automation services",
    "Next.js web agency",
    "Flutter app development",
  ],
  alternates: { canonical: "/services" },
  openGraph: {
    title: `Web & Mobile App Development Services | ${siteConfig.name}`,
    description:
      "Custom websites, iOS & Android mobile apps, ecommerce, SaaS, custom software and AI automation by Neural IT Limited.",
    url: "/services",
    type: "website",
    images: ["/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: `Web & Mobile App Development Services | ${siteConfig.name}`,
    description:
      "Custom websites, iOS & Android mobile apps, ecommerce, SaaS, custom software and AI automation by Neural IT Limited.",
    images: ["/og-image.png"],
  },
};

export default function ServicesPage() {
  return (
    <>
      <Header />
      <main className="services-listing-page">
        <section className="services-hero">
          <p className="kicker">What we build</p>
          <h1>Services that grow your business</h1>
          <p>
            {servicePages.length} dedicated service pages covering web development, website and app
            repair, mobile apps, custom software and AI automation — delivered for clients in Europe,
            Asia and the Middle East with a written scope and a fixed quote.
          </p>
        </section>
        <section className="service-grid" aria-labelledby="service-list">
          <h2 id="service-list" className="visually-hidden">
            Our services
          </h2>
          {servicePages.map((service) => (
            <article key={service.slug} className="service-card">
              <Link href={`/services/${service.slug}`} aria-label={`Read about ${service.name}`}>
                <span className="service-card-kicker">{service.eyebrow}</span>
                <h3>{service.name}</h3>
                <p>{service.metaDescription}</p>
                <span className="service-card-link">
                  Read about {service.shortName} <span aria-hidden="true">↗</span>
                </span>
              </Link>
            </article>
          ))}
        </section>

        <div className="markets-cta">
          <p>
            Not sure which service you need? Describe the problem and we will tell you what it
            actually takes — including when the honest answer is that you do not need us.
          </p>
          <a
            className="pill pill-lime"
            href={getWhatsAppLink(
              "Hi Neural IT, I need help choosing the right service for my project:"
            )}
            target="_blank"
            rel="noopener noreferrer"
            data-google-ads-conversion
          >
            Ask on WhatsApp <span>↗</span>
          </a>
        </div>
      </main>
      <Footer />
      <WhatsAppFloatingButton />
      <StickyMobileCta />
    </>
  );
}
