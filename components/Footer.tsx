import { getPhoneLink, siteConfig } from "@/lib/site-config";

export default function Footer() {
  const facebookUrl =
    "https://www.facebook.com/profile.php?id=61591580969494";

  return (
    <footer>
      <div className="footer-top">
        <a className="brand footer-brand" href="/#top">
          <span className="brand-mark">
            <i />
            <i />
            <i />
          </span>
          <span>Neural</span>
        </a>

        <nav>
          <a href="/services/web-development">Web development</a>
          <a href="/services/website-repair">Website &amp; app repair</a>
          <a href="/services/mobile-app-development">App development</a>
          <a href="/blog">Insights</a>
          <a href="/#contact">Contact</a>
        </nav>

        <div className="footer-contact" aria-label="Contact Neural IT Limited">
          <a href={getPhoneLink()} data-google-ads-conversion><span>Call</span>{siteConfig.phoneDisplay}</a>
          <a href={`mailto:${siteConfig.email}`} data-google-ads-conversion><span>Email</span>{siteConfig.email}</a>
        </div>

        <div className="socials">

          <a
            href={siteConfig.fiverrUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Neural IT on Fiverr"
            data-google-ads-conversion
          >
            fi
          </a>

          <a
            href={facebookUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Neural IT on Facebook"
          >
            fb
          </a>
        </div>
      </div>

      <div className="footer-bottom">
        <span>
          © {new Date().getFullYear()} {siteConfig.name}
        </span>

        <span>Dhaka, Bangladesh · Serving clients worldwide</span>

        <div>
          <a href={getPhoneLink()} data-google-ads-conversion>Call us</a>

          <a href={`mailto:${siteConfig.email}`} data-google-ads-conversion>Email us</a>

          <a
            href={siteConfig.fiverrUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-google-ads-conversion
          >
            Fiverr
          </a>

          <a
            href={facebookUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Facebook
          </a>
        </div>
      </div>
    </footer>
  );
}
