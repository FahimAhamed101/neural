import { getPhoneLink, getWhatsAppLink, siteConfig } from "@/lib/site-config";

/**
 * Mobile-only sticky action bar.
 *
 * On phones the floating contact stack sat over page content and offered three
 * competing actions. A single full-width WhatsApp action plus a call button
 * converts better and never covers the text underneath.
 */
export default function StickyMobileCta() {
  return (
    <div className="mobile-cta-bar" aria-label="Contact Neural IT Limited">
      <a
        className="bar-whatsapp"
        href={getWhatsAppLink()}
        target="_blank"
        rel="noopener noreferrer"
        data-google-ads-conversion
      >
        Chat on WhatsApp
      </a>
      <a
        className="bar-call"
        href={getPhoneLink()}
        aria-label={`Call Neural IT Limited at ${siteConfig.phoneDisplay}`}
        data-google-ads-conversion
      >
        Call
      </a>
    </div>
  );
}
