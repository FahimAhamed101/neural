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
    absolute: `Web, Mobile App & Software Development Company | ${siteConfig.name}`,
  },
  description:
    "Hire Neural IT Limited to build, fix or rescue a website, web app or mobile app. Senior development team serving clients in Europe, Asia and the Middle East, with a written scope and fixed quote.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    title: `Web, Mobile App & Software Development Company | ${siteConfig.name}`,
    description:
      "Website, app and custom software development and repair for businesses in Europe, Asia and the Middle East. GDPR-aware builds, Arabic RTL support, and fixed quotes.",
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
