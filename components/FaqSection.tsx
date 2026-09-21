import type { FaqItem } from "@/lib/faq";

type Props = {
  items: FaqItem[];
  kicker?: string;
  title: string;
  intro?: string;
  id?: string;
};

/**
 * Renders a visible FAQ accordion and the matching FAQPage structured data.
 * The schema is generated from the same array that renders on screen, so the
 * markup can never drift out of sync with the visible content (which is what
 * gets FAQ rich results rejected).
 */
export default function FaqSection({
  items,
  kicker = "Common questions",
  title,
  intro,
  id = "faq",
}: Props) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <section id={id} className="faq-section" aria-labelledby={`${id}-title`}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="faq-head">
        <div>
          <p className="kicker">{kicker}</p>
          <h2 id={`${id}-title`}>{title}</h2>
        </div>
        {intro ? <p>{intro}</p> : null}
      </div>
      <div className="faq-list">
        {items.map((item) => (
          <details key={item.question}>
            <summary>
              {item.question}
              <span aria-hidden="true">+</span>
            </summary>
            <p>{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
