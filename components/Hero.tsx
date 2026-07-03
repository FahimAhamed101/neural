import { getWhatsAppLink, siteConfig } from "@/lib/site-config";
import { WhatsAppGlyph } from "./WhatsAppFloatingButton";

const proofPoints = [
  "Business websites",
  "Mobile apps",
  "Admin dashboards",
  "Support after launch",
];

const stats = [
  { value: "7+", label: "service areas" },
  { value: "24h", label: "scope response" },
  { value: "100%", label: "mobile-ready builds" },
];

export default function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden border-b border-line bg-blueprint bg-grid pb-16 pt-32 sm:pt-40"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(37,99,235,0.12),transparent_34%),linear-gradient(180deg,rgba(255,255,255,0.82),rgba(247,248,250,0.98))]" />

      <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-6 lg:grid-cols-[1.08fr_0.92fr]">
        <div className="animate-rise">
          <p className="route-label mb-5">Software company in Bangladesh</p>
          <h1 className="font-display text-4xl font-bold leading-[1.08] text-paper sm:text-5xl lg:text-6xl">
            {siteConfig.name} builds websites and apps clients can trust.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-paper-dim">
            We design and develop company websites, ecommerce experiences,
            mobile apps, and custom software with clear timelines, clean code,
            and direct WhatsApp communication from start to launch.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href={getWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 rounded-md bg-success px-6 py-3.5 font-semibold text-white shadow-[0_12px_28px_rgba(18,140,74,0.28)] transition-transform hover:scale-[1.03]"
            >
              <WhatsAppGlyph className="h-5 w-5" />
              Get a quote on WhatsApp
            </a>
            <a
              href="#services"
              className="inline-flex items-center gap-2 rounded-md border border-line bg-white px-6 py-3.5 font-semibold text-paper transition-colors hover:border-signal hover:text-signal"
            >
              View services
            </a>
          </div>

          <div className="mt-7 flex flex-wrap gap-2">
            {proofPoints.map((item) => (
              <span
                key={item}
                className="rounded-full border border-line bg-white px-3 py-1.5 text-sm font-medium text-paper-dim shadow-sm"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        <TrustPanel />
      </div>
    </section>
  );
}

function TrustPanel() {
  return (
    <div className="animate-rise rounded-lg border border-line bg-white p-5 shadow-[0_24px_70px_rgba(23,33,29,0.12)] [animation-delay:150ms]">
      <div className="rounded-md border border-line bg-ink p-5">
        <div className="flex items-center justify-between gap-4 border-b border-line pb-4">
          <div>
            <p className="text-sm font-semibold text-paper">Project enquiry</p>
            <p className="mt-1 text-xs text-paper-dim">WhatsApp-first workflow</p>
          </div>
          <span className="rounded-full bg-success/10 px-3 py-1 text-xs font-semibold text-success">
            Active
          </span>
        </div>

        <div className="mt-5 space-y-3">
          {[
            "Tell us your business goal",
            "Receive scope, timeline, and budget guidance",
            "Review design and staging links before launch",
          ].map((item) => (
            <div key={item} className="flex items-start gap-3">
              <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-success text-[10px] font-bold text-white">
                OK
              </span>
              <p className="text-sm leading-relaxed text-paper-dim">{item}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 grid grid-cols-3 gap-3">
          {stats.map((stat) => (
            <div key={stat.label} className="rounded-md bg-white p-3 text-center shadow-sm">
              <p className="font-display text-xl font-bold text-paper">
                {stat.value}
              </p>
              <p className="mt-1 text-[11px] leading-tight text-paper-dim">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
