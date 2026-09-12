import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFloatingButton from "@/components/WhatsAppFloatingButton";
import { siteConfig } from "@/lib/site-config";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `Terms of service for ${siteConfig.name}. Read the conditions governing your use of our website and engagement of our development and repair services.`,
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <>
      <Header />
      <main className="legal-page">
        <section className="legal-hero">
          <p className="kicker">Legal</p>
          <h1>Terms of Service</h1>
          <p>Last updated: {new Date().toLocaleDateString("en", { month: "long", day: "numeric", year: "numeric" })}</p>
        </section>
        <article className="legal-content">
          <h2>1. Services</h2>
          <p>{siteConfig.name} provides website development, mobile app development, website repair, custom software, and AI automation services. Service details, deliverables, timelines, and pricing are agreed upon in writing before work begins.</p>

          <h2>2. Engagement</h2>
          <p>Projects may be initiated through Fiverr, direct communication, or other agreed channels. Each engagement is governed by a written scope of work or order confirmation that specifies deliverables, milestones, revisions, and payment terms.</p>

          <h2>3. Intellectual Property</h2>
          <p>Upon full payment, the client receives ownership of the final deliverables as specified in the project scope. {siteConfig.name} retains the right to display completed work in its portfolio unless otherwise agreed in writing.</p>

          <h2>4. Client Responsibilities</h2>
          <p>Clients are expected to provide timely feedback, access to necessary accounts and platforms, and content required for the project. Delays in client responses may affect project timelines.</p>

          <h2>5. Payment Terms</h2>
          <p>Payment terms are defined per project or per Fiverr order. Late payments may result in work suspension until the account is brought current.</p>

          <h2>6. Limitation of Liability</h2>
          <p>{siteConfig.name} is not liable for indirect, incidental, or consequential damages. Our total liability is limited to the fees paid for the specific service giving rise to the claim.</p>

          <h2>7. Warranty</h2>
          <p>We warrant that services will be performed in a professional manner consistent with industry standards. Specific warranty terms and duration are defined in the project scope.</p>

          <h2>8. Termination</h2>
          <p>Either party may terminate an engagement with written notice. Fees for work completed up to the termination date remain payable.</p>

          <h2>9. Governing Law</h2>
          <p>These terms are governed by the laws of Bangladesh. Any disputes shall be resolved through good-faith negotiation before formal proceedings.</p>

          <h2>10. Contact</h2>
          <p>For questions about these terms, contact us at <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a> or via <a href="https://wa.me/8801706617723" target="_blank" rel="noopener noreferrer">WhatsApp</a>.</p>
        </article>
      </main>
      <Footer />
      <WhatsAppFloatingButton />
    </>
  );
}