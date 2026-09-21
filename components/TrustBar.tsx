import { siteConfig } from "@/lib/site-config";

const items = [
  {
    value: siteConfig.trust.responseTime,
    label: "First reply on WhatsApp, during working hours",
  },
  {
    value: `${siteConfig.trust.countriesServed} countries`,
    label: "Clients across Europe, Asia and the Middle East",
  },
  {
    value: siteConfig.trust.supportWindow,
    label: "Support coverage including weekends",
  },
  {
    value: "You own it",
    label: "Code, repository, hosting and domain stay yours",
  },
];

export default function TrustBar() {
  return (
    <section className="trust-bar" aria-label="Why clients choose Neural IT Limited">
      {items.map((item) => (
        <div key={item.label}>
          <strong>{item.value}</strong>
          <span>{item.label}</span>
        </div>
      ))}
    </section>
  );
}
