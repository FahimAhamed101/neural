import RouteLabel from "./RouteLabel";

const services = [
  {
    file: "company-website",
    title: "Company websites",
    description:
      "Professional websites for software, service, education, healthcare, real estate, and local businesses with fast loading and strong SEO foundations.",
  },
  {
    file: "mobile-app",
    title: "Mobile app development",
    description:
      "Android and iOS app experiences for bookings, ecommerce, delivery, learning, service requests, and customer portals.",
  },
  {
    file: "business-software",
    title: "Custom software systems",
    description:
      "Admin panels, dashboards, CRM tools, inventory systems, reporting portals, and internal workflows built around your operation.",
  },
  {
    file: "growth-support",
    title: "SEO, maintenance, and support",
    description:
      "Performance checks, content structure, technical SEO, security updates, bug fixes, and ongoing improvements after launch.",
  },
];

export default function Services() {
  return (
    <section id="services" className="border-b border-line bg-white px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <RouteLabel path="Services" />
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <h2 className="max-w-2xl font-display text-3xl font-bold text-paper sm:text-4xl">
            Software services built for real business outcomes.
          </h2>
          <p className="max-w-sm text-sm leading-relaxed text-paper-dim">
            Clear scope, practical technology, and communication that keeps
            clients confident while the work is moving.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {services.map((service) => (
            <div
              key={service.file}
              className="rounded-lg border border-line bg-ink p-7 shadow-sm transition-transform hover:-translate-y-1"
            >
              <p className="text-xs font-semibold uppercase tracking-wide text-signal">
                {service.file}
              </p>
              <h3 className="mt-4 font-display text-xl font-bold text-paper">
                {service.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-paper-dim">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
