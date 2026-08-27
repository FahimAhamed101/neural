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
import { siteConfig } from "@/lib/site-config";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: { absolute: `Web & Mobile App Development Company | ${siteConfig.name}` },
  description: "Neural IT Limited develops, repairs, redesigns, and maintains websites, web apps, iOS and Android apps, ecommerce stores, and custom software for clients worldwide.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    title: `Web & Mobile App Development Company | ${siteConfig.name}`,
    description: "Website and app development, repair, redesign, maintenance, custom software, and practical AI automation for companies worldwide.",
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
        <Projects />
        <Team />
        <Process />
        <Testimonials />
        <Insights />
        <ContactCta />
      </main>
      <Footer />
      <WhatsAppFloatingButton />
    </>
  );
}
import type { Metadata } from "next";
