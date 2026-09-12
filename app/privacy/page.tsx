import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFloatingButton from "@/components/WhatsAppFloatingButton";
import { siteConfig } from "@/lib/site-config";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `Privacy policy for ${siteConfig.name}. Learn how we collect, use, and protect your personal information when you visit our website or use our services.`,
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main className="legal-page">
        <section className="legal-hero">
          <p className="kicker">Legal</p>
          <h1>Privacy Policy</h1>
          <p>Last updated: {new Date().toLocaleDateString("en", { month: "long", day: "numeric", year: "numeric" })}</p>
        </section>
        <article className="legal-content">
          <h2>1. Information We Collect</h2>
          <p>When you visit {siteConfig.name}, we may collect information you voluntarily provide through contact forms, WhatsApp links, or email, including your name, email address, phone number, and project details. We also collect standard web analytics data such as pages visited, time spent, referral source, and device type.</p>

          <h2>2. How We Use Your Information</h2>
          <p>We use collected information to respond to your inquiries, provide requested services, improve our website and service offerings, and communicate with you about projects, updates, or marketing relevant to your interests.</p>

          <h2>3. Third-Party Services</h2>
          <p>We use Google Analytics and Google Ads to understand site usage and measure advertising effectiveness. These services may collect data through cookies and similar technologies. We also use Fiverr as a freelancing platform; transactions processed through Fiverr are subject to Fiverr&apos;s own privacy policy.</p>

          <h2>4. Cookies</h2>
          <p>Our website uses essential cookies for functionality and analytics cookies to understand how visitors interact with our site. You can control cookie preferences through your browser settings.</p>

          <h2>5. Data Sharing</h2>
          <p>We do not sell or rent your personal information to third parties. We may share information with trusted service providers who assist in operating our website and conducting our business, subject to confidentiality obligations.</p>

          <h2>6. Data Security</h2>
          <p>We implement reasonable security measures to protect your personal information. However, no method of transmission over the Internet is completely secure, and we cannot guarantee absolute security.</p>

          <h2>7. Your Rights</h2>
          <p>You have the right to access, correct, or delete your personal information. To exercise these rights, contact us at <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>.</p>

          <h2>8. Changes to This Policy</h2>
          <p>We may update this privacy policy from time to time. Changes will be posted on this page with an updated revision date.</p>

          <h2>9. Contact</h2>
          <p>For questions about this privacy policy, contact us at <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a> or via <a href="https://wa.me/8801706617723" target="_blank" rel="noopener noreferrer">WhatsApp</a>.</p>
        </article>
      </main>
      <Footer />
      <WhatsAppFloatingButton />
    </>
  );
}