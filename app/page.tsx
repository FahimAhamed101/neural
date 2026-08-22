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

export const dynamic = "force-dynamic";

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
