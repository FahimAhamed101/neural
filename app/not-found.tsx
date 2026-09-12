import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFloatingButton from "@/components/WhatsAppFloatingButton";
import { siteConfig } from "@/lib/site-config";

export const metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="error-page">
        <section className="error-hero">
          <p className="kicker">Lost page</p>
          <h1>404 — page not found</h1>
          <p>The page you are looking for does not exist, has been moved, or is temporarily unavailable.</p>
          <div className="button-row">
            <Link className="pill pill-lime" href="/">Back to home <span>↗</span></Link>
            <Link className="pill pill-outline" href="/blog">Read insights <span>↗</span></Link>
            <Link className="pill pill-outline" href="/#services">View services <span>↗</span></Link>
          </div>
          <p className="error-help">Need help with a website or app? <a href={`mailto:${siteConfig.email}`}>Email us</a> or reach out on <a href="https://wa.me/8801706617723" target="_blank" rel="noopener noreferrer">WhatsApp</a>.</p>
        </section>
      </main>
      <Footer />
      <WhatsAppFloatingButton />
    </>
  );
}