import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFloatingButton from "@/components/WhatsAppFloatingButton";
import { getServiceBySlug, servicePages } from "@/lib/services";
import { getWhatsAppLink, siteConfig } from "@/lib/site-config";

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return servicePages.map(({ slug }) => ({ slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const service = getServiceBySlug(params.slug);
  if (!service) return { title: "Service not found", robots: { index: false, follow: false } };
  const url = `/services/${service.slug}`;
  return {
    title: { absolute: `${service.metaTitle} | ${siteConfig.name}` },
    description: service.metaDescription,
    alternates: { canonical: url },
    openGraph: { type: "website", url, title: service.metaTitle, description: service.metaDescription, images: ["/og-image.png"] },
    twitter: { card: "summary_large_image", title: service.metaTitle, description: service.metaDescription, images: ["/og-image.png"] },
  };
}

export default function ServicePage({ params }: Props) {
  const service = getServiceBySlug(params.slug);
  if (!service) notFound();
  const pageUrl = `${siteConfig.url}/services/${service.slug}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${pageUrl}#service`,
        name: service.name,
        description: service.metaDescription,
        url: pageUrl,
        provider: { "@id": `${siteConfig.url}/#organization` },
        areaServed: ["Bangladesh", "Worldwide"],
        serviceType: service.shortName,
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${pageUrl}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
          { "@type": "ListItem", position: 2, name: "Services", item: `${siteConfig.url}/#services` },
          { "@type": "ListItem", position: 3, name: service.shortName, item: pageUrl },
        ],
      },
    ],
  };

  return (
    <>
      <Header />
      <main className="service-page">
        <article>
          <header className="service-hero">
            <nav className="service-breadcrumb" aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><Link href="/#services">Services</Link><span>/</span><span>{service.shortName}</span></nav>
            <p className="kicker">{service.eyebrow}</p>
            <h1>{service.name} for growing businesses</h1>
            <p className="service-lede">{service.introduction}</p>
            <div className="button-row">
              <a className="pill pill-lime" href={getWhatsAppLink(`Hi, I need help with ${service.shortName}.`)} target="_blank" rel="noopener noreferrer">Discuss your project <span>↗</span></a>
              <a className="pill pill-fiverr" href={siteConfig.fiverrUrl} target="_blank" rel="noopener noreferrer">Find me on Fiverr <span>↗</span></a>
            </div>
          </header>
          <div className="service-layout">
            <aside>
              <p className="kicker">What we deliver</p>
              <ul>{service.deliverables.map((item) => <li key={item}>{item}</li>)}</ul>
              <p>{service.audience}</p>
            </aside>
            <div className="service-copy">
              {service.sections.map((section) => <section key={section.heading}><h2>{section.heading}</h2>{section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</section>)}
              <section className="service-faq"><p className="kicker">Common questions</p><h2>Frequently asked questions</h2>{service.faq.map((item) => <details key={item.question}><summary>{item.question}<span>+</span></summary><p>{item.answer}</p></details>)}</section>
              <section className="service-next"><p className="kicker">Related expertise</p><h2>Explore other development services</h2><div>{servicePages.filter((item) => item.slug !== service.slug).map((item) => <Link key={item.slug} href={`/services/${item.slug}`}>{item.shortName}<span>↗</span></Link>)}</div></section>
            </div>
          </div>
        </article>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      </main>
      <Footer />
      <WhatsAppFloatingButton />
    </>
  );
}
