import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFloatingButton from "@/components/WhatsAppFloatingButton";
import StickyMobileCta from "@/components/StickyMobileCta";
import { getCitiesByRegion, marketRegions } from "@/lib/markets";
import { getWhatsAppLink, siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Markets we serve — Europe, Asia and the Middle East",
  description:
    "Neural IT Limited builds and repairs websites, web apps and mobile apps for businesses in Europe, Asia and the Middle East. Choose your market to see local payments, languages and data-protection requirements.",
  alternates: { canonical: "/markets" },
  openGraph: {
    title: "Markets we serve | Europe, Asia and the Middle East",
    description:
      "Website, app and software development for businesses across Europe, Asia and the Middle East.",
    url: "/markets",
    type: "website",
    images: ["/og-image.png"],
  },
};

export default function MarketsPage() {
  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
      { "@type": "ListItem", position: 2, name: "Markets", item: `${siteConfig.url}/markets` },
    ],
  };

  return (
    <>
      <Header />
      <main className="markets-page">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
        />
        <section className="markets-hero">
          <p className="kicker">Where we work</p>
          <h1>Markets we serve</h1>
          <p>
            We work remotely with businesses across Europe, Asia and the Middle East, on shifts that
            overlap your working day. Each market page below explains the local requirements we build
            for — payments, languages, data protection, hosting and launch timing.
          </p>
        </section>

        {marketRegions.map((region) => (
          <div className="region-block" key={region.slug}>
            <div className="region-block-head">
              <h2>
                <Link href={`/markets/${region.slug}`}>{region.name}</Link>
              </h2>
              <p>{region.summary}</p>
            </div>
            <ul className="city-list">
              {getCitiesByRegion(region.slug).map((city) => (
                <li key={city.slug}>
                  <Link href={`/markets/${city.slug}`}>
                    <span>
                      {city.city} <small>{city.country}</small>
                    </span>
                    <span aria-hidden="true">↗</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div className="markets-cta">
          <p>
            Not listed? We work with clients worldwide and quote in your currency. Tell us where you
            are and what you need.
          </p>
          <a
            className="pill pill-lime"
            href={getWhatsAppLink(
              "Hi Neural IT, I would like help with a website or app project. My location is:"
            )}
            target="_blank"
            rel="noopener noreferrer"
            data-google-ads-conversion
          >
            Message us on WhatsApp <span>↗</span>
          </a>
        </div>
      </main>
      <Footer />
      <WhatsAppFloatingButton />
      <StickyMobileCta />
    </>
  );
}
