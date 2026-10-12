import Link from "next/link";
import { getPhoneLink, siteConfig } from "@/lib/site-config";
import { marketCities, marketRegions } from "@/lib/markets";

const featuredCitySlugs = [
  "london",
  "berlin",
  "amsterdam",
  "dublin",
  "dubai",
  "riyadh",
  "doha",
  "singapore",
  "tokyo",
  "bengaluru",
];

export default function Footer() {
  const featuredCities = featuredCitySlugs
    .map((slug) => marketCities.find((city) => city.slug === slug))
    .filter((city): city is (typeof marketCities)[number] => Boolean(city));

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
          <Link href="/services/web-development">Web development</Link>
          <Link href="/services/website-repair">Website &amp; app repair</Link>
          <Link href="/services/mobile-app-development">App development</Link>
          <Link href="/markets">Markets</Link>
          <Link href="/blog">Insights</Link>
        </nav>

        <div className="footer-contact" aria-label="Contact Neural IT Limited">
          <a href={getPhoneLink()} data-google-ads-conversion>
            <span>Call</span>
            {siteConfig.phoneDisplay}
          </a>
          <a href={`mailto:${siteConfig.email}`} data-google-ads-conversion>
            <span>Email</span>
            {siteConfig.email}
          </a>
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
            href={siteConfig.facebookUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Neural IT on Facebook"
          >
            fb
          </a>
        </div>
      </div>

      <div className="footer-capability-note">
        <strong>We develop and repair websites, web apps, and mobile apps.</strong>
        <span>
          PHP · Laravel · React · Next.js · Node.js · WordPress · Flutter · React Native · Kotlin ·
          .NET · Django
        </span>
      </div>

      <nav className="footer-regions" aria-label="Regions and cities we serve">
        {marketRegions.map((region) => (
          <div key={region.slug}>
            <Link className="footer-region-name" href={`/markets/${region.slug}`}>
              {region.name}
            </Link>
            <div>
              {featuredCities
                .filter((city) => city.regionSlug === region.slug)
                .map((city) => (
                  <Link key={city.slug} href={`/markets/${city.slug}`}>
                    {city.city}
                  </Link>
                ))}
            </div>
          </div>
        ))}
      </nav>

      <div className="footer-extra-gigs">
        <div>
          <span>Prefer a marketplace?</span>
          <strong>We also take work through Fiverr</strong>
        </div>
        <a
          href={siteConfig.fiverrExtraGigsUrl}
          target="_blank"
          rel="noopener noreferrer"
          data-google-ads-conversion
        >
          View our gigs <span>↗</span>
        </a>
      </div>

      <div className="footer-bottom">
        <span>
          © {new Date().getFullYear()} {siteConfig.name}
        </span>

        <span>Dhaka, Bangladesh · Serving Europe, Asia and the Middle East</span>

        <div>
          <a href={getPhoneLink()} data-google-ads-conversion>
            Call us
          </a>
          <a href={`mailto:${siteConfig.email}`} data-google-ads-conversion>
            Email us
          </a>
          <Link href="/markets">Markets</Link>
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
          <Link href="/child-safety-standards">Child Safety</Link>
        </div>
      </div>
    </footer>
  );
}
