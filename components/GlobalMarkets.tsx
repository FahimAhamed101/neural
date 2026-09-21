import Link from "next/link";
import { getCitiesByRegion, marketRegions } from "@/lib/markets";
import { getWhatsAppLink } from "@/lib/site-config";

export default function GlobalMarkets() {
  return (
    <section
      id="markets"
      className="markets-section section-pad"
      aria-labelledby="markets-title"
    >
      <div className="market-intro">
        <div>
          <p className="kicker">Where we work</p>
          <h2 id="markets-title">
            Development partners for Europe, Asia and the Middle East
          </h2>
        </div>
        <div>
          <p>
            We work remotely with businesses across three regions, on overlapping shifts so
            communication happens inside your working day rather than overnight. Pick your market to
            see the local requirements we build for — payments, languages, data protection and
            hosting.
          </p>
          <Link className="pill pill-outline" href="/markets">
            See every market <span>↗</span>
          </Link>
        </div>
      </div>

      {marketRegions.map((region) => (
        <div className="region-block" key={region.slug}>
          <div className="region-block-head">
            <h3>
              <Link href={`/markets/${region.slug}`}>{region.name}</Link>
            </h3>
            <p>{region.summary}</p>
          </div>
          <ul className="city-list">
            {getCitiesByRegion(region.slug).map((city) => (
              <li key={city.slug}>
                <Link href={`/markets/${city.slug}`}>
                  <span>
                    {city.city} <small>{city.country}</small>
                  </span>
                  <span aria-hidden="true">↗</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}

      <div className="markets-cta">
        <p>
          Not in one of these cities? We work with clients worldwide and quote in your currency.
        </p>
        <a
          className="pill pill-lime"
          href={getWhatsAppLink(
            "Hi Neural IT, I would like help with a website or app project. My location is:"
          )}
          target="_blank"
          rel="noopener noreferrer"
          data-google-ads-conversion
        >
          Message us on WhatsApp <span>↗</span>
        </a>
      </div>
    </section>
  );
}
