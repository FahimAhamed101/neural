import type { Metadata } from "next";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Projects from "@/components/Projects";
import Stack from "@/components/Stack";
import Process from "@/components/Process";
import ContactCta from "@/components/ContactCta";
import Footer from "@/components/Footer";
import WhatsAppFloatingButton from "@/components/WhatsAppFloatingButton";
import Team from "@/components/Team";
import Testimonials from "@/components/Testimonials";
import Insights from "@/components/Insights";
import USMarkets from "@/components/USMarkets";
import WebsiteCapabilities from "@/components/WebsiteCapabilities";
import { siteConfig } from "@/lib/site-config";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: { absolute: `Web & Mobile App Development Company | ${siteConfig.name}` },
  description: "Hire Neural IT on Fiverr for website and app development or repair in NYC, Miami, Los Angeles, Dallas, Austin, Orlando, Atlanta, and Chicago.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    title: `Web & Mobile App Development Company | ${siteConfig.name}`,
    description: "Website and app development, repair, ecommerce, SaaS, booking systems, and AI applications for businesses in major U.S. cities.",
    images: ["/og-image.png"],
  },
};

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Stack />
        <Services />
        <WebsiteCapabilities />
        <Projects />
        <Team />
        <Process />
        <Testimonials />
        <Insights />
        <USMarkets />
        <ContactCta />
      </main>
      <Footer />
      <WhatsAppFloatingButton />
    </>
  );
}
