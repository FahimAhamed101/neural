import { siteConfig } from "@/lib/site-config";

const markets = [
  { city: "New York City", label: "NYC", services: "Startups, SaaS, ecommerce & business websites" },
  { city: "Miami", label: "Miami", services: "Ecommerce, real estate, restaurants & startups" },
  { city: "Los Angeles", label: "Los Angeles", services: "Entertainment, creators, business sites & mobile apps" },
  { city: "Dallas", label: "Dallas", services: "SaaS, small and midsize businesses & ecommerce" },
  { city: "Austin", label: "Austin", services: "Startups, SaaS products & AI applications" },
  { city: "Orlando", label: "Orlando", services: "Tourism, restaurants, booking systems & local businesses" },
  { city: "Atlanta", label: "Atlanta", services: "Business websites, ecommerce & SaaS" },
  { city: "Chicago", label: "Chicago", services: "Business websites, web apps & ecommerce" },
];

export default function USMarkets() {
  return (
    <section id="us-markets" className="us-markets section-pad" aria-labelledby="us-markets-title">
      <div className="market-intro">
        <div>
          <p className="kicker">Serving U.S. businesses remotely</p>
          <h2 id="us-markets-title">Web and app experts for your market</h2>
        </div>
        <div>
          <p>
            Build a new product, repair a broken website or app, or rescue an unfinished project.
            We support businesses across eight fast-moving U.S. markets through Fiverr.
          </p>
          <a className="pill pill-fiverr" href={siteConfig.fiverrUrl} target="_blank" rel="noopener noreferrer" data-google-ads-conversion>
            Start on Fiverr <span>↗</span>
          </a>
        </div>
      </div>

      <div className="market-grid">
        {markets.map((market, index) => (
          <a
            className="market-card"
            href={siteConfig.fiverrUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-google-ads-conversion
            aria-label={`Hire Neural IT on Fiverr for web and app development in ${market.city}`}
            key={market.city}
          >
            <span className="market-number">{String(index + 1).padStart(2, "0")}</span>
            <h3>{market.label}</h3>
            <p>{market.services}</p>
            <span className="market-link">Build or repair your project <i>↗</i></span>
          </a>
        ))}
      </div>
    </section>
  );
}
