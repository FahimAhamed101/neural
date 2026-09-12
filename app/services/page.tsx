import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFloatingButton from "@/components/WhatsAppFloatingButton";
import { servicePages } from "@/lib/services";
import { siteConfig } from "@/lib/site-config";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Services",
  description: `Web, mobile, and software development services by ${siteConfig.name}. Custom websites, app repair, ecommerce, SaaS, and AI automation for businesses worldwide.`,
  alternates: { canonical: "/services" },
  openGraph: { title: "Services | Web, Mobile & AI Development", description: "Custom websites, mobile apps, ecommerce, SaaS, custom software, and AI automation by Neural IT Limited.", url: "/services", type: "website", images: ["/og-image.png"] },
};

export default function ServicesPage() {
  return (
    <>
      <Header />
      <main className="services-listing-page">
        <section className="services-hero">
          <p className="kicker">What we build</p>
          <h1>Services that grow your business</h1>
          <p>{servicePages.length} dedicated service pages covering web development, app repair, mobile apps, custom software, and AI automation.</p>
        </section>
        <section className="service-grid" aria-labelledby="service-list">
          {servicePages.map((service) => (
            <article key={service.slug} className="service-card">
              <Link href={`/services/${service.slug}`} aria-label={`Read about ${service.name}`}>
                <span className="service-card-kicker">{service.eyebrow}</span>
                <h2>{service.name}</h2>
                <p>{service.metaDescription}</p>
                <span className="service-card-link">Read about {service.shortName} <span>↗</span></span>
              </Link>
            </article>
          ))}
        </section>
      </main>
      <Footer />
      <WhatsAppFloatingButton />
    </>
  );
}