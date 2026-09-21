"use client";

import { useState } from "react";
import { siteConfig } from "@/lib/site-config";
import { servicePages } from "@/lib/services";

const countries = [
  "United Kingdom",
  "Germany",
  "Netherlands",
  "Ireland",
  "Sweden",
  "France",
  "Spain",
  "Italy",
  "Poland",
  "Switzerland",
  "Singapore",
  "Japan",
  "India",
  "Malaysia",
  "Indonesia",
  "Thailand",
  "Vietnam",
  "Philippines",
  "United Arab Emirates",
  "Saudi Arabia",
  "Qatar",
  "Kuwait",
  "Bahrain",
  "Oman",
  "Other",
];

const budgets = [
  "Under $500",
  "$500 – $2,000",
  "$2,000 – $5,000",
  "$5,000 – $15,000",
  "$15,000+",
  "Not sure yet — please advise",
];

type Status =
  | { kind: "idle" }
  | { kind: "sending" }
  | { kind: "sent"; message: string }
  | { kind: "handoff"; mailto: string; whatsapp: string; message: string }
  | { kind: "error"; message: string };

export default function ContactForm({ defaultService }: { defaultService?: string }) {
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const [errors, setErrors] = useState<Record<string, string>>({});

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    const payload = {
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      company: String(data.get("company") ?? ""),
      country: String(data.get("country") ?? ""),
      service: String(data.get("service") ?? ""),
      budget: String(data.get("budget") ?? ""),
      message: String(data.get("message") ?? ""),
      website: String(data.get("website") ?? ""),
    };

    const localErrors: Record<string, string> = {};
    if (payload.name.trim().length < 2) localErrors.name = "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(payload.email.trim())) {
      localErrors.email = "Please enter a valid email address.";
    }
    if (payload.message.trim().length < 20) {
      localErrors.message = "Please add at least a sentence about the project.";
    }

    if (Object.keys(localErrors).length > 0) {
      setErrors(localErrors);
      setStatus({ kind: "idle" });
      return;
    }

    setErrors({});
    setStatus({ kind: "sending" });

    try {
      const response = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (result?.error === "validation" && result.errors) {
        setErrors(result.errors);
        setStatus({ kind: "idle" });
        return;
      }

      if (!response.ok || !result?.ok) {
        setStatus({
          kind: "error",
          message: `Something went wrong sending that. Please message us on WhatsApp instead — we reply in ${siteConfig.trust.responseTime}.`,
        });
        return;
      }

      if (result.delivered) {
        form.reset();
        setStatus({
          kind: "sent",
          message: `Thanks — your enquiry is with us. We reply in ${siteConfig.trust.responseTime} during working hours.`,
        });
        return;
      }

      // No server-side transport configured: hand the composed enquiry to the
      // visitor's own mail app or WhatsApp so the lead is never lost.
      setStatus({
        kind: "handoff",
        mailto: result.mailto,
        whatsapp: result.whatsapp,
        message:
          "Your message is written and ready. One tap sends it — WhatsApp is fastest and always works.",
      });
    } catch {
      setStatus({
        kind: "error",
        message:
          "We could not reach the server. Please message us on WhatsApp instead — that always works.",
      });
    }
  }

  return (
    <div id="contact">
      <section id="enquiry" className="enquiry-section" aria-labelledby="enquiry-title">
        <div className="enquiry-layout">
          <div className="enquiry-intro">
            <p className="kicker">Start a project</p>
            <h2 id="enquiry-title">Tell us what you need built, fixed, or rescued</h2>
            <p>
              Send the details below and you will get a straight answer: whether we can help, roughly
              what it costs, and how long it takes. No sales sequence, no discovery-call maze.
            </p>
            <ul className="enquiry-promises">
              {siteConfig.guarantees.map((item) => (
                <li key={item}>
                  <b aria-hidden="true">✓</b>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

        <form className="enquiry-form" onSubmit={handleSubmit} noValidate>
          <div className="enquiry-field">
            <label htmlFor="enq-name">Your name *</label>
            <input
              id="enq-name"
              name="name"
              type="text"
              autoComplete="name"
              required
              aria-invalid={errors.name ? "true" : undefined}
              aria-describedby={errors.name ? "enq-name-error" : undefined}
            />
            {errors.name ? (
              <span className="enquiry-error" id="enq-name-error">
                {errors.name}
              </span>
            ) : null}
          </div>

          <div className="enquiry-field">
            <label htmlFor="enq-email">Email *</label>
            <input
              id="enq-email"
              name="email"
              type="email"
              autoComplete="email"
              required
              aria-invalid={errors.email ? "true" : undefined}
              aria-describedby={errors.email ? "enq-email-error" : undefined}
            />
            {errors.email ? (
              <span className="enquiry-error" id="enq-email-error">
                {errors.email}
              </span>
            ) : null}
          </div>

          <div className="enquiry-field">
            <label htmlFor="enq-company">Company (optional)</label>
            <input id="enq-company" name="company" type="text" autoComplete="organization" />
          </div>

          <div className="enquiry-field">
            <label htmlFor="enq-country">Country</label>
            <select id="enq-country" name="country" defaultValue="">
              <option value="">Select your country</option>
              {countries.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
          </div>

          <div className="enquiry-field">
            <label htmlFor="enq-service">What do you need?</label>
            <select id="enq-service" name="service" defaultValue={defaultService ?? ""}>
              <option value="">Select a service</option>
              {servicePages.map((service) => (
                <option key={service.slug} value={service.name}>
                  {service.name}
                </option>
              ))}
              <option value="Something else">Something else</option>
            </select>
          </div>

          <div className="enquiry-field">
            <label htmlFor="enq-budget">Budget range</label>
            <select id="enq-budget" name="budget" defaultValue="">
              <option value="">Select a range</option>
              {budgets.map((budget) => (
                <option key={budget} value={budget}>
                  {budget}
                </option>
              ))}
            </select>
          </div>

          <div className="enquiry-field full">
            <label htmlFor="enq-message">Project details *</label>
            <textarea
              id="enq-message"
              name="message"
              required
              placeholder="What are you building or fixing? Any deadlines, current stack, or links we should look at?"
              aria-invalid={errors.message ? "true" : undefined}
              aria-describedby={errors.message ? "enq-message-error" : undefined}
            />
            {errors.message ? (
              <span className="enquiry-error" id="enq-message-error">
                {errors.message}
              </span>
            ) : null}
          </div>

          {/* Honeypot — hidden from users and assistive tech, catches bots. */}
          <div className="enquiry-honeypot" aria-hidden="true">
            <label htmlFor="enq-website">Leave this field empty</label>
            <input id="enq-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
          </div>

          {status.kind === "sent" ? (
            <p className="enquiry-status" role="status">
              {status.message}
            </p>
          ) : null}

          {status.kind === "error" ? (
            <p className="enquiry-status is-error" role="alert">
              {status.message}
            </p>
          ) : null}

          {/* Handoff state.
              This site has no server-side mail transport configured, so the
              browser cannot deliver the enquiry on its own. Rather than a
              quiet line of text, this is a dominant panel: the visitor has
              already done the work, and every extra second spent hunting for
              the send button loses the lead. WhatsApp is primary because it
              is already authenticated on their device. */}
          {status.kind === "handoff" ? (
            <div className="enquiry-handoff" role="status">
              <p className="enquiry-handoff-title">
                <b aria-hidden="true">✓</b> {status.message}
              </p>
              <div className="enquiry-handoff-actions">
                <a
                  className="pill pill-whatsapp"
                  href={status.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-google-ads-conversion
                >
                  Send on WhatsApp <span>↗</span>
                </a>
                <a className="pill pill-outline" href={status.mailto}>
                  Send by email instead <span>↗</span>
                </a>
              </div>
              <p className="enquiry-handoff-hint">
                Your name, email, country and project details are already written into the message —
                you only need to press send.
              </p>
            </div>
          ) : null}

          <div className="enquiry-actions">
            {status.kind === "handoff" ? (
              <button
                className="enquiry-restart"
                type="button"
                onClick={() => setStatus({ kind: "idle" })}
              >
                Edit my details
              </button>
            ) : (
              <button
                className="pill pill-lime"
                type="submit"
                disabled={status.kind === "sending"}
                data-google-ads-conversion
              >
                {status.kind === "sending" ? "Sending…" : "Send enquiry"}
                <span aria-hidden="true">↗</span>
              </button>
            )}
          </div>

          <p className="enquiry-note">
            Prefer to talk now?{" "}
            <a
              href={`https://wa.me/${siteConfig.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              data-google-ads-conversion
            >
              Message us on WhatsApp
            </a>{" "}
            or email {siteConfig.email}. We never share your details.
          </p>
        </form>
        </div>
      </section>
    </div>
  );
}
