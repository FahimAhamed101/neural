import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FaqSection from "@/components/FaqSection";
import WhatsAppFloatingButton from "@/components/WhatsAppFloatingButton";
import StickyMobileCta from "@/components/StickyMobileCta";
import {
  getCitiesByRegion,
  getCityBySlug,
  getRegionBySlug,
  marketCities,
  marketRegions,
} from "@/lib/markets";
import { getWhatsAppLink, siteConfig } from "@/lib/site-config";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return [
    ...marketRegions.map((region) => ({ slug: region.slug })),
    ...marketCities.map((city) => ({ slug: city.slug })),
  ];
}

export function generateMetadata({ params }: { params: Params }): Metadata {
  const region = getRegionBySlug(params.slug);
  if (region) {
    return {
      title: region.seoTitle,
      description: region.seoDescription,
      keywords: [
        `website development ${region.name}`,
        `app development company ${region.name}`,
        `hire software developers ${region.name}`,
        `custom software engineering ${region.name}`,
        `mobile app developers ${region.name}`,
        "hire remote development team",
      ],
      alternates: { canonical: `/markets/${region.slug}` },
      openGraph: {
        title: `${region.seoTitle} | ${siteConfig.name}`,
        description: region.seoDescription,
        url: `/markets/${region.slug}`,
        type: "website",
        images: ["/og-image.png"],
      },
      twitter: {
        card: "summary_large_image",
        title: `${region.seoTitle} | ${siteConfig.name}`,
        description: region.seoDescription,
        images: ["/og-image.png"],
      },
    };
  }

  const city = getCityBySlug(params.slug);
  if (city) {
    const title = `Website & App Development Company for ${city.city}`;
    const description = `Website development, app repair and custom software for businesses in ${city.city}, ${city.country}. Bilingual interfaces, local payment methods, and fixed quotes from ${siteConfig.name}.`;
    return {
      title,
      description,
      keywords: [
        `website development ${city.city}`,
        `app development ${city.city}`,
        `mobile app developer ${city.city}`,
        `hire web developer ${city.city}`,
        `software company ${city.city}`,
        `create website ${city.country}`,
      ],
      alternates: { canonical: `/markets/${city.slug}` },
      openGraph: {
        title: `${title} | ${siteConfig.name}`,
        description,
        url: `/markets/${city.slug}`,
        type: "website",
        images: ["/og-image.png"],
      },
      twitter: {
        card: "summary_large_image",
        title: `${title} | ${siteConfig.name}`,
        description,
        images: ["/og-image.png"],
      },
    };
  }

  return {};
}

export default function MarketPage({ params }: { params: Params }) {
  const region = getRegionBySlug(params.slug);
  if (region) return <RegionView slug={region.slug} />;

  const city = getCityBySlug(params.slug);
  if (city) return <CityView slug={city.slug} />;

  notFound();
}

function Breadcrumbs({ trail }: { trail: Array<{ name: string; href: string }> }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteConfig.url}${item.href === "/" ? "" : item.href}`,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav className="market-breadcrumb" aria-label="Breadcrumb">
        {trail.map((item, index) => (
          <span key={item.href}>
            {index > 0 ? <i aria-hidden="true">/</i> : null}
            <Link href={item.href}>{item.name}</Link>
          </span>
        ))}
      </nav>
    </>
  );
}

function RegionView({ slug }: { slug: string }) {
  const region = getRegionBySlug(slug);
  if (!region) return null;
  const cities = getCitiesByRegion(region.slug);

  const regionFaq = [
    {
      question: `How do you handle time zones for clients in ${region.name}?`,
      answer: region.workingHours,
    },
    {
      question: `What currencies and payment methods do you accept in ${region.name}?`,
      answer: region.paymentNote,
    },
    {
      question: `Do you work remotely with ${region.name} businesses, or do you need to be local?`,
      answer: `We work remotely and have done so for every client in ${region.name}. You get a named engineer, scheduled review calls inside your working hours, a shared staging environment you can open at any time, and written documentation at handover. Being remote is not a limitation here — it means you talk to the person building the product rather than an account manager.`,
    },
  ];

  return (
    <>
      <Header />
      <main className="markets-page">
        <section className="markets-hero">
          <Breadcrumbs
            trail={[
              { name: "Home", href: "/" },
              { name: "Markets", href: "/markets" },
              { name: region.name, href: `/markets/${region.slug}` },
            ]}
          />
          <p className="kicker">{region.name}</p>
          <h1>{region.headline}</h1>
          <p>{region.summary}</p>
        </section>

        <section className="market-detail">
          <div className="market-detail-grid">
            <div>
              <h2>What we build for {region.name} clients</h2>
              <p>
                Most engagements in the region fall into one of three shapes: a new website or
                platform that has to launch properly, a broken product that is costing revenue right
                now, or an unfinished build that another team walked away from. We scope all three
                the same way — written requirements, milestone plan, fixed quote — then deliver
                against it.
              </p>
              <p>{region.workingHours}</p>
              <p>{region.paymentNote}</p>
              <div className="industry-tags">
                <span>Website development</span>
                <span>Website &amp; app repair</span>
                <span>Mobile app development</span>
                <span>Custom software</span>
                <span>AI automation</span>
                <span>Technical SEO</span>
              </div>
            </div>
            <aside className="market-facts">
              <p className="kicker">Region at a glance</p>
              <dl>
                <dt>Cities covered</dt>
                <dd>{cities.length}</dd>
                <dt>Communication window</dt>
                <dd>Overlaps your business hours</dd>
                <dt>Engagement model</dt>
                <dd>Remote, fixed quote per milestone</dd>
              </dl>
              <a
                className="pill pill-lime"
                href={getWhatsAppLink(
                  `Hi Neural IT, I am in ${region.name} and I need help with a website or app.`
                )}
                target="_blank"
                rel="noopener noreferrer"
                data-google-ads-conversion
              >
                Message us on WhatsApp <span>↗</span>
              </a>
            </aside>
          </div>
        </section>

        <div className="region-block">
          <div className="region-block-head">
            <h2>Cities we work with in {region.name}</h2>
            <p>Each city page covers the local payment, language and compliance requirements.</p>
          </div>
          <ul className="city-list">
            {cities.map((city) => (
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

        <FaqSection
          id="region-faq"
          items={regionFaq}
          kicker="Working with us"
          title={`Questions from ${region.name} clients`}
        />
      </main>
      <Footer />
      <WhatsAppFloatingButton />
      <StickyMobileCta />
    </>
  );
}

function CityView({ slug }: { slug: string }) {
  const city = getCityBySlug(slug);
  if (!city) return null;
  const siblings = getCitiesByRegion(city.regionSlug).filter((item) => item.slug !== city.slug);

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Website, mobile app and custom software development",
    name: `Website and app development for ${city.city}`,
    description: `Website development, app repair and custom software for businesses in ${city.city}, ${city.country}.`,
    url: `${siteConfig.url}/markets/${city.slug}`,
    provider: { "@id": `${siteConfig.url}/#organization` },
    areaServed: {
      "@type": "City",
      name: `${city.city}, ${city.country}`,
    },
    availableLanguage: city.languages.split(", "),
  };

  return (
    <>
      <Header />
      <main className="markets-page">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
        />
        <section className="markets-hero">
          <Breadcrumbs
            trail={[
              { name: "Home", href: "/" },
              { name: "Markets", href: "/markets" },
              { name: city.regionName, href: `/markets/${city.regionSlug}` },
              { name: city.city, href: `/markets/${city.slug}` },
            ]}
          />
          <p className="kicker">
            {city.city}, {city.country}
          </p>
          <h1>
            Website, app and software development for businesses in {city.city}
          </h1>
          <p>{city.intro[0]}</p>
        </section>

        <section className="market-detail">
          <div className="market-detail-grid">
            <div>
              <h2>How we work with {city.city} businesses</h2>
              {city.intro.slice(1).map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              <h2>Local requirements we build for</h2>
              <p>{city.localAngle}</p>
              <div className="industry-tags">
                {city.industries.map((industry) => (
                  <span key={industry}>{industry}</span>
                ))}
              </div>
              <p style={{ marginTop: "34px" }}>
                See the full service list, or tell us what you need on WhatsApp and we will reply in{" "}
                {siteConfig.trust.responseTime}.
              </p>
              <div className="market-actions">
                <a
                  className="pill pill-lime"
                  href={getWhatsAppLink(
                    `Hi Neural IT, I am in ${city.city} and I need help with a website or app.`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-google-ads-conversion
                >
                  Message us on WhatsApp <span>↗</span>
                </a>
                <Link className="pill pill-outline" href="/services">
                  See our services <span>↗</span>
                </Link>
              </div>
            </div>
            <aside className="market-facts">
              <p className="kicker">{city.city} at a glance</p>
              <dl>
                <dt>Region</dt>
                <dd>
                  <Link href={`/markets/${city.regionSlug}`}>{city.regionName}</Link>
                </dd>
                <dt>Timezone</dt>
                <dd>{city.timezone}</dd>
                <dt>Currency</dt>
                <dd>{city.currency}</dd>
                <dt>Languages supported</dt>
                <dd>{city.languages}</dd>
                <dt>Typical first reply</dt>
                <dd>{siteConfig.trust.responseTime}</dd>
              </dl>
            </aside>
          </div>
        </section>

        <FaqSection
          id="city-faq"
          items={city.faq}
          kicker={`${city.city} questions`}
          title={`Working with us from ${city.city}`}
        />

        {siblings.length > 0 ? (
          <div className="region-block">
            <div className="region-block-head">
              <h2>Other cities we serve in {city.regionName}</h2>
              <p>Same team, same delivery process, different local requirements.</p>
            </div>
            <ul className="city-list">
              {siblings.map((sibling) => (
                <li key={sibling.slug}>
                  <Link href={`/markets/${sibling.slug}`}>
                    <span>
                      {sibling.city} <small>{sibling.country}</small>
                    </span>
                    <span aria-hidden="true">↗</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </main>
      <Footer />
      <WhatsAppFloatingButton />
      <StickyMobileCta />
    </>
  );
}
