import type { Metadata, Viewport } from "next";
import { siteConfig } from "@/lib/site-config";
import ContentApiConsoleMonitor from "@/components/ContentApiConsoleMonitor";
import GoogleAdsConversionTracker from "@/components/GoogleAdsConversionTracker";
import "./globals.css";
import "./capabilities.css";
import "./markets.css";
import "./reference.css";
import "./blog.css";
import "./service.css";
import "./project.css";

export const viewport: Viewport = {
  themeColor: siteConfig.themeColor,
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  applicationName: siteConfig.name,
  category: "technology",
  title: {
    default: `${siteConfig.name} | Web, Mobile & AI Solutions`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "Neural IT Limited",
    "software company Bangladesh",
    "website development company",
    "mobile app development",
    "business software development",
    "Next.js development",
    "React development agency",
    "SEO optimized websites",
  ],
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  alternates: {
    canonical: "/",
    languages: {
      en: "/",
      "x-default": "/",
    },
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  verification: {
    google: "rtJcLUUii70K3p547_4ph8gxG_SMikjLwyLiTGsWhhg",
  },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} | Websites, mobile apps, and software`,
    description: siteConfig.description,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} software company preview`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} | Websites, mobile apps, and software`,
    description: siteConfig.description,
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/icon-64.png",
    apple: "/apple-icon-180.png",
  },
  manifest: "/manifest.webmanifest",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const analyticsId = JSON.stringify(siteConfig.googleAnalyticsId);
  const googleAdsId = JSON.stringify(siteConfig.googleAdsId);
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteConfig.url}/#organization`,
        name: siteConfig.name,
        description: siteConfig.description,
        url: siteConfig.url,
        logo: `${siteConfig.url}/icon-64.png`,
        image: `${siteConfig.url}/og-image.png`,
        email: siteConfig.email,
        telephone: siteConfig.phoneNumber,
        areaServed: [
          "Bangladesh",
          "Worldwide",
          "New York City, NY",
          "Miami, FL",
          "Los Angeles, CA",
          "Dallas, TX",
          "Austin, TX",
          "Orlando, FL",
          "Atlanta, GA",
          "Chicago, IL",
        ],
        sameAs: [siteConfig.fiverrUrl],
        contactPoint: {
          "@type": "ContactPoint",
          telephone: siteConfig.phoneNumber,
          contactType: "sales",
          availableLanguage: ["English", "Bengali"],
          areaServed: "Worldwide",
        },
      },
      {
        "@type": "WebSite",
        "@id": `${siteConfig.url}/#website`,
        url: siteConfig.url,
        name: siteConfig.name,
        description: siteConfig.description,
        inLanguage: "en",
        publisher: { "@id": `${siteConfig.url}/#organization` },
      },
    ],
  };

  return (
    <html lang="en">
      <head>
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${siteConfig.googleAnalyticsId}`}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', ${analyticsId});
gtag('config', ${googleAdsId});`,
          }}
        />
      </head>
      <body>
        <ContentApiConsoleMonitor />
        <GoogleAdsConversionTracker />
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
