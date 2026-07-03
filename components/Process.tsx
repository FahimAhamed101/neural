import RouteLabel from "./RouteLabel";

const steps = [
  {
    stage: "01",
    title: "Message on WhatsApp",
    description:
      "Send your idea, business type, and any reference links. We reply with useful next steps before asking for a meeting.",
  },
  {
    stage: "02",
    title: "Scope and proposal",
    description:
      "You receive a clear feature list, estimated timeline, and budget range so decisions are simple and transparent.",
  },
  {
    stage: "03",
    title: "Design and development",
    description:
      "We prepare the structure, design the screens, build the system, and share progress through review links.",
  },
  {
    stage: "04",
    title: "Launch and support",
    description:
      "After testing, we deploy the project and stay available for updates, fixes, and future improvements.",
  },
];

export default function Process() {
  return (
    <section id="process" className="border-b border-line bg-white px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <RouteLabel path="Process" />
        <h2 className="max-w-xl font-display text-3xl font-bold text-paper sm:text-4xl">
          A simple process that feels professional from day one.
        </h2>

        <ol className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => (
            <li
              key={step.stage}
              className="rounded-lg border border-line bg-ink p-6 shadow-sm"
            >
              <span className="font-display text-3xl font-bold text-signal">
                {step.stage}
              </span>
              <h3 className="mt-4 font-display text-lg font-bold text-paper">
                {step.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-paper-dim">
                {step.description}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
