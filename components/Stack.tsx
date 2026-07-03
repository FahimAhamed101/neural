import RouteLabel from "./RouteLabel";

const layers = [
  {
    name: "Frontend",
    detail: "Next.js, React, Tailwind CSS",
    note: "Modern, responsive interfaces for desktop and mobile users",
  },
  {
    name: "Mobile",
    detail: "React Native, API integration",
    note: "Shared product thinking across website, app, and backend",
  },
  {
    name: "Backend",
    detail: "Node.js, databases, admin panels",
    note: "Secure systems for content, orders, users, reports, and workflows",
  },
  {
    name: "Launch",
    detail: "SEO, analytics, hosting, support",
    note: "A practical launch checklist so the product is ready for clients",
  },
];

export default function Stack() {
  return (
    <section id="stack" className="border-b border-line px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <RouteLabel path="Technology" />
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2 className="max-w-xl font-display text-3xl font-bold text-paper sm:text-4xl">
            Reliable technology without unnecessary complexity.
          </h2>
          <p className="max-w-sm text-sm leading-relaxed text-paper-dim">
            We choose tools that are stable, maintainable, and easy to extend
            when your business grows.
          </p>
        </div>

        <div className="mt-12 overflow-hidden rounded-lg border border-line bg-white shadow-sm">
          {layers.map((layer, i) => (
            <div
              key={layer.name}
              className="grid gap-2 border-b border-line px-6 py-6 last:border-b-0 sm:grid-cols-[90px_150px_240px_1fr] sm:items-center sm:px-8"
            >
              <span className="text-xs font-semibold uppercase tracking-wide text-signal">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="font-display text-lg font-bold text-paper">
                {layer.name}
              </span>
              <span className="text-sm font-semibold text-paper-dim">
                {layer.detail}
              </span>
              <span className="text-sm text-paper-dim">{layer.note}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
