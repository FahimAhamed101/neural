import type { Metadata } from "next";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import Stack from "@/components/Stack";
import Services from "@/components/Services";
import WebsiteCapabilities from "@/components/WebsiteCapabilities";
import Projects from "@/components/Projects";
import Process from "@/components/Process";
import GlobalMarkets from "@/components/GlobalMarkets";
import Team from "@/components/Team";
import Testimonials from "@/components/Testimonials";
import FaqSection from "@/components/FaqSection";
import Insights from "@/components/Insights";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import WhatsAppFloatingButton from "@/components/WhatsAppFloatingButton";
import StickyMobileCta from "@/components/StickyMobileCta";
import { homepageFaq } from "@/lib/faq";
import { siteConfig } from "@/lib/site-config";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: {
    absolute: `Custom Web & Mobile App Development Company | ${siteConfig.name}`,
  },
  description:
    "Hire Neural IT Limited to build custom websites, iOS & Android mobile apps, and business software. Expert Next.js, React, Flutter, and Laravel developers with a written scope and fixed quote.",
  keywords: [
    "hire website developer",
    "create custom website",
    "build mobile app",
    "hire mobile app developer",
    "custom web development company",
    "mobile app development services",
    "Flutter app developers",
    "React Native mobile app development",
    "Next.js web development agency",
    "hire full stack developer",
    "ecommerce website development",
    "fix broken website",
    "website and app repair",
    "custom software development company",
    "SaaS application development",
    "MVP development for startups",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    title: `Custom Web & Mobile App Development Company | ${siteConfig.name}`,
    description:
      "Hire senior developers to build or repair your website, mobile app, or software product. Fast Next.js, Flutter, React, and Laravel engineering with fixed quotes.",
    images: ["/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: `Custom Web & Mobile App Development Company | ${siteConfig.name}`,
    description:
      "Hire expert developers to create custom websites, mobile apps, and business software with fixed pricing.",
    images: ["/og-image.png"],
  },
};

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <TrustBar />
        <Stack />
        <Services />
        <WebsiteCapabilities />
        <Projects />
        <Process />
        <GlobalMarkets />
        <Team />
        <Testimonials />
        <FaqSection
          items={homepageFaq}
          title="Questions clients ask before they hire us"
          intro="Cost, time zones, GDPR, Arabic support, code ownership and what happens when another developer has already walked away. If your question is not here, ask us on WhatsApp — you will get a straight answer."
        />
        <Insights />
        <ContactForm />
      </main>
      <Footer />
      <WhatsAppFloatingButton />
      <StickyMobileCta />
    </>
  );
}
