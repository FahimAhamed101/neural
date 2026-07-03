import RouteLabel from "./RouteLabel";
import { getWhatsAppLink, siteConfig } from "@/lib/site-config";
import { WhatsAppGlyph } from "./WhatsAppFloatingButton";

export default function ContactCta() {
  return (
    <section id="contact" className="relative overflow-hidden px-6 py-24">
      <div className="absolute inset-0 bg-blueprint bg-grid opacity-70" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(247,248,250,0.9),rgba(255,255,255,0.96))]" />
      <div className="relative mx-auto max-w-4xl rounded-lg border border-line bg-white p-8 text-center shadow-[0_22px_60px_rgba(23,33,29,0.10)] sm:p-12">
        <RouteLabel path="Start your project" />
        <h2 className="mx-auto max-w-2xl font-display text-3xl font-bold text-paper sm:text-4xl">
          Need a website, mobile app, or custom software?
        </h2>
        <p className="mx-auto mt-4 max-w-xl leading-relaxed text-paper-dim">
          Message Neural IT Limited on WhatsApp. Share your idea, target
          audience, and any reference link. We will reply with the best next
          step for your project.
        </p>

        <a
          href={getWhatsAppLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-flex items-center gap-2.5 rounded-md bg-success px-8 py-4 font-semibold text-white shadow-[0_12px_28px_rgba(18,140,74,0.28)] transition-transform hover:scale-[1.03]"
        >
          <WhatsAppGlyph className="h-5 w-5" />
          Text us on WhatsApp
        </a>

        <p className="mt-5 text-sm text-paper-dim">
          WhatsApp: +880 1706 617723 | Email: {siteConfig.email}
        </p>
      </div>
    </section>
  );
}
