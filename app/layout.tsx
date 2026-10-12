import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Inter, Space_Grotesk } from "next/font/google";
import { siteConfig } from "@/lib/site-config";
import { marketRegions } from "@/lib/markets";
import { servicePages } from "@/lib/services";
import ContentApiConsoleMonitor from "@/components/ContentApiConsoleMonitor";
import GoogleAdsConversionTracker from "@/components/GoogleAdsConversionTracker";
import "./globals.css";
import "./capabilities.css";
import "./markets.css";
import "./reference.css";
import "./blog.css";
import "./service.css";
import "./project.css";
import "./listing.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
  variable: "--font-space-grotesk",
});

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
    default: `${siteConfig.name} | Web, Mobile & AI Development for Europe, Asia & the Middle East`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "hire website developer",
    "create custom website",
    "build mobile app",
    "hire mobile app developer",
    "custom web development company",
    "mobile app development services",
    "iOS and Android app development",
    "Flutter app development company",
    "React Native app developers",
    "Next.js web development agency",
    "hire dedicated developer",
    "ecommerce website development",
    "website redesign company",
    "fix broken website",
    "website and app repair service",
    "custom software development company",
    "SaaS application development",
    "hire full stack developer",
    "full stack web development",
    "software development company for Europe",
    "web development company for Asia",
    "website development Dubai",
    "app development Singapore",
    "website development London",
    "custom software development Middle East",
    "hire remote development team",
    "GDPR compliant website development",
    "Arabic RTL website development",
    "Neural IT Limited",
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

  /**
   * Area served is kept at region level here on purpose.
   *
   * Repeating all 14 city objects inside the Organization, the
   * ProfessionalService and each of the five service offers produced 98
   * duplicate "City" nodes in the homepage markup. That bloats the payload and
   * reads as schema spam. City-level targeting belongs on the city pages,
   * which each carry their own Service schema with a single areaServed.
   */
  const areaServed = marketRegions.map((region) => ({
    "@type": "AdministrativeArea",
    name: region.name,
  }));

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteConfig.url}/#organization`,
        name: siteConfig.name,
        legalName: siteConfig.name,
        description: siteConfig.description,
        url: siteConfig.url,
        logo: {
          "@type": "ImageObject",
          url: `${siteConfig.url}/icon-64.png`,
        },
        image: `${siteConfig.url}/og-image.png`,
        email: siteConfig.email,
        telephone: siteConfig.phoneNumber,
        foundingLocation: {
          "@type": "Place",
          name: "Dhaka, Bangladesh",
        },
        areaServed,
        knowsLanguage: siteConfig.availableLanguages,
        sameAs: [siteConfig.fiverrUrl, siteConfig.facebookUrl, "https://github.com/FahimAhamed101"],
        founder: {
          "@type": "Person",
          name: "Fahim Ahamed",
          jobTitle: "Founder & Principal Software Engineer",
          image: `${siteConfig.url}/fahim-ahamed.jpg`,
          sameAs: [siteConfig.fiverrUrl, "https://github.com/FahimAhamed101"],
          knowsAbout: [
            "Next.js Development",
            "Flutter Mobile App Development",
            "React Native App Development",
            "Full Stack Web Development",
            "Website Repair & Code Rescue",
            "Laravel & Node.js Backend Engineering",
          ],
        },
        contactPoint: [
          {
            "@type": "ContactPoint",
            telephone: siteConfig.phoneNumber,
            contactType: "sales",
            availableLanguage: siteConfig.availableLanguages,
            areaServed: siteConfig.targetRegions,
          },
        ],
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
      {
        "@type": "ProfessionalService",
        "@id": `${siteConfig.url}/#service`,
        name: siteConfig.name,
        description: siteConfig.description,
        url: siteConfig.url,
        image: `${siteConfig.url}/og-image.png`,
        telephone: siteConfig.phoneNumber,
        email: siteConfig.email,
        priceRange: "$$",
        areaServed,
        availableLanguage: siteConfig.availableLanguages,
        provider: { "@id": `${siteConfig.url}/#organization` },
        knowsAbout: [
          "Website development",
          "Website and app repair",
          "Mobile app development",
          "Custom software development",
          "AI automation",
          "Technical SEO",
          "Ecommerce development",
        ],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Development services",
          itemListElement: servicePages.map((service) => ({
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: service.name,
              description: service.metaDescription,
              url: `${siteConfig.url}/services/${service.slug}`,
            },
          })),
        },
      },
    ],
  };

  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <head>
        <link rel="preconnect" href="https://res.cloudinary.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <Script src={`https://www.googletagmanager.com/gtag/js?id=${siteConfig.googleAnalyticsId}`} strategy="afterInteractive" />
        <Script id="ga-init" strategy="afterInteractive">{`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${siteConfig.googleAnalyticsId}');
gtag('config', '${siteConfig.googleAdsId}');`}</Script>
        <ContentApiConsoleMonitor />
        <GoogleAdsConversionTracker />
        {children}
      </body>
    </html>
  );
}
