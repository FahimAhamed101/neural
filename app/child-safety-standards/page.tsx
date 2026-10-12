import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFloatingButton from "@/components/WhatsAppFloatingButton";
import StickyMobileCta from "@/components/StickyMobileCta";
import { siteConfig } from "@/lib/site-config";

export const revalidate = 86400;

type PageProps = {
  searchParams?: {
    app?: string;
  };
};

export const metadata: Metadata = {
  title: `Child Safety Standards | ${siteConfig.name}`,
  description: `Child safety standards, CSAE/CSAM prevention protocols, reporting mechanisms, and enforcement procedures for applications published by ${siteConfig.name}.`,
  keywords: [
    "child safety standards",
    "Google Play child safety policy",
    "CSAM prevention policy",
    "CSAE child protection",
    "Neural IT Limited child safety",
  ],
  alternates: { canonical: "/child-safety-standards" },
  openGraph: {
    title: `Child Safety Standards | ${siteConfig.name}`,
    description: `Child safety standards and child protection protocols for applications by ${siteConfig.name}.`,
    url: "/child-safety-standards",
    type: "website",
    images: ["/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: `Child Safety Standards | ${siteConfig.name}`,
    description: `Child safety standards and child protection protocols for applications by ${siteConfig.name}.`,
    images: ["/og-image.png"],
  },
};

export default function ChildSafetyStandardsPage({ searchParams }: PageProps) {
  const currentApp = searchParams?.app?.trim() || "Neural IT Limited Applications";
  const contactEmail = siteConfig.email;
  const lastUpdated = "October 12, 2026";

  const pageUrl = `${siteConfig.url}/child-safety-standards`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: `Child Safety Standards | ${siteConfig.name}`,
        description: `Child safety standards and child protection policy for applications published by ${siteConfig.name}.`,
        inLanguage: "en-US",
        isPartOf: { "@id": `${siteConfig.url}/#website` },
        dateModified: "2026-10-12",
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${pageUrl}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
          { "@type": "ListItem", position: 2, name: "Child Safety Standards", item: pageUrl },
        ],
      },
    ],
  };

  return (
    <>
      <Header />
      <main className="legal-page">
        <section className="legal-hero">
          <p className="kicker">Google Play Policy &amp; Child Protection</p>
          <h1>Child Safety Standards</h1>
          <p>
            <strong>App:</strong> {currentApp} &nbsp;·&nbsp; <strong>Last updated:</strong> {lastUpdated}
          </p>
        </section>

        <article className="legal-content">
          <div className="legal-notice-banner">
            <div>
              <strong>Designated Child Safety Contact:</strong>{" "}
              <span>Child Safety &amp; Compliance Team, {siteConfig.name}</span>
            </div>
            <div>
              <strong>Urgent Contact Email:</strong>{" "}
              <a href={`mailto:${contactEmail}?subject=Child%20Safety%20Inquiry`}>{contactEmail}</a>
            </div>
          </div>

          <h2>1. Our Commitment to Child Safety</h2>
          <p>
            <strong>{currentApp}</strong> is committed to protecting children from child sexual abuse and
            exploitation (CSAE). We do not tolerate child sexual abuse material (CSAM), child grooming,
            sexual exploitation of minors, sextortion, or any behavior that endangers children.
          </p>
          <p>These standards apply to all users and all content shared through our app.</p>

          <h2>2. Prohibited Content and Behavior</h2>
          <p>Users must not:</p>
          <ul>
            <li>Create, upload, share, request, or distribute child sexual abuse material.</li>
            <li>Groom, threaten, exploit, or sexually solicit minors.</li>
            <li>Use the app to engage in sexual conversations with children for exploitative purposes.</li>
            <li>Threaten or blackmail minors using intimate images or personal information.</li>
            <li>Promote, facilitate, or arrange child trafficking or sexual exploitation.</li>
            <li>Attempt to bypass our safety measures or use another account to continue prohibited activities.</li>
          </ul>

          <h2>3. Reporting Safety Concerns</h2>
          <p>
            Users can report suspected child exploitation, abusive content, or suspicious behavior through
            the reporting mechanism available in <strong>{currentApp}</strong> or by contacting our child safety
            team at <a href={`mailto:${contactEmail}?subject=Child%20Safety%20Concern%20Report`}>{contactEmail}</a>.
          </p>
          <p>
            Please include relevant details so we can investigate the report promptly. Do not download, copy,
            or forward suspected illegal material.
          </p>

          <div className="safety-action-card">
            <h3>Direct Child Safety Reporting Channel</h3>
            <p>
              If you discover content or behavior on our platform or apps that threatens the safety of minors,
              please notify our safety team immediately:
            </p>
            <div className="safety-actions">
              <a
                className="pill pill-lime"
                href={`mailto:${contactEmail}?subject=URGENT:%20Child%20Safety%20Concern%20-${encodeURIComponent(
                  currentApp
                )}`}
              >
                Report via Email ({contactEmail})
              </a>
            </div>
          </div>

          <h2>4. Investigation and Enforcement</h2>
          <p>
            We review reports of suspected child exploitation and take appropriate action based on the
            circumstances and applicable laws.
          </p>
          <p>
            Actions may include removing prohibited content, restricting account access, suspending or
            terminating accounts, preserving relevant information where legally appropriate, and reporting
            confirmed cases to the appropriate authorities.
          </p>
          <p>
            We take appropriate action when we become aware of child sexual abuse material, consistent with
            applicable laws and our reporting obligations.
          </p>

          <h2>5. Compliance with Child Safety Laws</h2>
          <p>
            We are committed to complying with applicable child safety laws and regulations. Where required,
            we will report confirmed child sexual abuse material to the appropriate regional or national
            authority, including the relevant child-protection reporting organization.
          </p>

          <h2>6. Child Safety Contact</h2>
          <p>For child safety concerns, policy questions, or notifications from Google Play, contact:</p>
          <div className="contact-details-box">
            <p>
              <strong>Child Safety Contact:</strong> Child Safety &amp; Compliance Team ({siteConfig.name})
            </p>
            <p>
              <strong>Email:</strong>{" "}
              <a href={`mailto:${contactEmail}?subject=Child%20Safety%20Inquiry`}>{contactEmail}</a>
            </p>
            <p>
              <strong>Organization:</strong> {siteConfig.name}
            </p>
            <p>
              <strong>Website:</strong>{" "}
              <a href={siteConfig.url} target="_blank" rel="noopener noreferrer">
                {siteConfig.url}
              </a>
            </p>
          </div>
          <p>
            Our designated contact is responsible for receiving safety notifications, coordinating
            investigations, and addressing compliance concerns.
          </p>

          <h2>7. Policy Updates</h2>
          <p>
            We may update these standards when necessary to improve user safety or meet legal and platform
            requirements.
          </p>
          <p>
            For child safety concerns, contact{" "}
            <a href={`mailto:${contactEmail}?subject=Child%20Safety%20Concern`}>{contactEmail}</a>.
          </p>
        </article>
      </main>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <Footer />
      <WhatsAppFloatingButton />
      <StickyMobileCta />
    </>
  );
}
